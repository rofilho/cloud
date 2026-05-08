# Aula 08: Lançando Instâncias EC2 — AWS CLI e Terraform

**Disciplina:** Cloud Computing (Cód. 14189) **Curso:** Inteligência Artificial e Ciência de Dados, Uniube **Semana 4** | Quarta-feira, 15/04/2026 | Prof. Romualdo Mathias Filho **Tipo:** 🔬 Prática (Quarta-feira) **Base Teórica:** Aula 07 — Computação em Nuvem: EC2, Lambda e Serverless

---

## **🎯 0. Objetivo da Aula**

Ao final desta aula prática, você deverá ser capaz de:

- **Comparar** as três formas de criar infraestrutura EC2: Console visual, Linha de Comando (CLI) e Código (Terraform).
- **Compreender** o fluxo de autenticação e configuração via AWS Academy.
- **Executar** comandos `aws ec2` completos para lançar, extrair IPs, acessar via SSH e encerrar instâncias.
- **Instalar e Operar** o ecossistema Terraform localmente.
- **Analisar** a estrutura Declarativa de provisionamento com Terraform (IaC).

---

## **🔄 1. Revisão Rápida dos Conceitos (5 min)**

| **Conceito (da Aula 07)** | **Como aparece hoje na prática** |
| --- | --- |
| Amazon EC2 | O servidor virtual (instância) que eu vou acionar e depois você vai conectar |
| AMI | O sistema base (Linux) escolhido através do ID da imagem |
| Tipo de Instância | Qual hardware estou pedindo (`t2.micro`) |
| Security Group | O firewall contendo a abertura para as portas `22` (SSH) e `80` (HTTP) |
| Key Pair | O arquivo de extensão `.pem` necessário para eu entrar no terminal do Linux |
| IaC | Prática de trocar os "cliques" no portal por arquivos de código (Terraform) |

💡 **Analogia central:** Criar uma EC2 pelo console é como montar móveis seguindo um manual — você tem que conectar peça por peça visualmente. Usar a CLI é como dar macros precisas para um robô assistente. Usar o Terraform é como entregar a planta arquitetônica: a ferramenta avalia o terreno, vê o que falta e constrói tudo sozinha no estado ideal.

---

## **🔑 2. Credenciais e Autenticação (AWS Academy)**

Como não executarei esta prática dentro do console web padrão, o terminal do meu computador precisa ter "permissão" para criar máquinas dentro da conta AWS. Farei isso (e oriento que você repita) através de credenciais de linha de comando.

### **Como pegar e colar as credenciais:**

**(Para Contas AWS Academy):**

1. Acesse sua conta do AWS Academy e inicie a sessão do **Learner Lab**.
2. Quando a bolinha de sessão no topo ficar verde, mas ANTES de clicar em "AWS" para abrir o painel da nuvem, repare que há um link/botão chamado **AWS Details** (no canto superior direito, na tela do Vocareum). Clique nele.
3. Na janela informativa que abrir, clique no botão **Show** na linha chamada `AWS CLI`.
4. Você copiará a estrutura temporária que começa com "ASIA":
    
    ```
    [default]
    aws_access_key_id=ASIAXXXXXXXXX
    aws_secret_access_key=xxxxxxxxxxx
    aws_session_token=xxxxxxxxxxxxxx
    ```
    

**(Para Contas Normais Individuais AWS Pessoais):** Se você usa a AWS normal fora da faculdade, você irá ao Console AWS → Clique no seu nome (canto direito) → Security Credentials → Create Access Key. A estrutura devolverá o seguinte padrão (copie-a):

```
[default]
aws_access_key_id=AKIAXXXXXXXXX
aws_secret_access_key=xxxxxxxxxxx
```

1. **Copie todo este bloco de texto**.
2. Crie o arquivo de credenciais oculto no seu sistema para colar esse texto:
    
    **💻 No Linux/WSL/Mac:**
    
    ```
    mkdir -p ~/.aws
    nano ~/.aws/credentials
    # Cole o bloco copiado, salve (Ctrl+O, Enter) e saia (Ctrl+X)
    ```
    
    **🪟 No Windows (PowerShell/Terminal Padrão):** O Terraform buscará nativamente as chaves na pasta do seu usuário (ex: `C:\Users\SeuNome\.aws\credentials`). Para abrir e criar direto:
    
    ```
    New-Item -Path $env:USERPROFILE\.aws -ItemType Directory -Force
    explorer $env:USERPROFILE\.aws
    # Crie um arquivo sem extensão chamado "credentials". 
    # Abra ele no Bloco de Notas e cole o bloco que você copiou!
    ```
    

---

## **⌨️ 3. Parte 1 — Instanciando EC2 com AWS CLI**

A **AWS CLI** é excelente para automação em scripts de servidores, limpeza e auditorias pontuais pela linha de comando.

### **Etapa 1: Validando sua Autenticação**

Para garantir que seu computador está "conversando" com o AWS Academy, rode:

```
aws sts get-caller-identity
```

> ✅ **Checkpoint:** Você deverá visualizar uma saída `Account` e `UserId` com seus dados, garantindo que o seu perfil logou corretamente.
> 

---

### **Etapa 2: A Chave de Segurança (Key Pair)**

Para conectar na máquina (ver passo 5), primeiro é preciso criar localmente o que será a "chave" SSH e guardá-la em um arquivo isolado. Eu utilizo o comando abaixo para criar a chave e imediatamente proteger o arquivo (`chmod 400`):

```
aws ec2 create-key-pair \
  --key-name minha-chave-ec2 \
  --key-type rsa \
  --query 'KeyMaterial' \
  --output text > minha-chave-ec2.pem

# Protegendo o arquivo para que apenas o seu usuário Linux veja:
chmod 400 minha-chave-ec2.pem
```

*(⚠️ Erro comum: se acusar erro que a chave `minha-chave-ec2` já existe, tudo bem, ignore o comando e apenas garanta que tem o arquivo no diretório).*

---

### **Etapa 3: Criando a Barreira de Fogo (Security Group)**

Eu preciso abrir dois buracos no Firewall: a porta `22` (para controlar o console remoto) e a porta `80` (para a internet acessar o site web). Farei isso armazenando o *ID* criado em uma variável para ser reutilizada:

```
# 1. Cria o Grupo de Segurança e captura o identificador (ID)
SG_ID=$(aws ec2 create-security-group \
  --group-name "demo-cli-sg" \
  --description "Security Group Aula 08" \
  --query 'GroupId' \
  --output text)

echo "✅ Firewall criado! ID Extraído: $SG_ID"

# 2. Libera a porta 22 (SSH Terminal)
aws ec2 authorize-security-group-ingress \
  --group-id $SG_ID \
  --protocol tcp \
  --port 22 \
  --cidr 0.0.0.0/0

# 3. Libera a porta 80 (Acesso Web Público)
aws ec2 authorize-security-group-ingress \
  --group-id $SG_ID \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0

```

> ⚠️ **Solução Rápida:** Caso algum aluno já tenha criado este grupo em testes antigos, o AWS acusará erro de *Duplicate*. Neste caso, em vez do bloco inteiro acima, apenas carregue a variável extraindo do ambiente: `SG_ID=$(aws ec2 describe-security-groups --group-names "demo-cli-sg" --query 'SecurityGroups[0].GroupId' --output text)`
> 

---

### **Etapa 4: O Mega-Comando de Lançamento (Run-Instances)**

Agora a mágica. Com as credenciais, a chave e o Firewall já estabelecidos, instruo a criação referenciando cada peça. Vou injetar também um arquivo de script (`user-data`) ordenando a instalação passiva do App do Apache HTTP no próprio *boot*:

```
aws ec2 run-instances \
  --image-id ami-0c02fb55956c7d316 \
  --instance-type t2.micro \
  --key-name minha-chave-ec2 \
  --security-group-ids $SG_ID \
  --count 1 \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=ec2-via-cli}]' \
  --user-data '#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>MEU DEPLOY FUNCIONOU! - Nuvem UNIUBE</h1>" > /var/www/html/index.html'
```

> Observe a importância fundamental de cada linha! Aqui eu não estou clicando pela tela, listo explicitamente que usarei o ambiente Linux (linha `image-id`), em formato base (linha `instance-type`), protegido via chave que rodei agora há pouco (linha `key-name`) e abrindo as devidas portas usando o ID que extraí (linha `security-groups-ids`). O terminal vai imprimir uma tabela em tela validando o status de "Pending".
> 

---

### **Etapa 5: Resgatando o IP da Máquina e Encontrando-a**

A máquina está inicializando. Vou usar o CLI para filtrar a base de dados do terminal e obter o Endereço de IP público atrelado a ela.

```
# Espere a instância rodar (pode demorar menos de 1 minuto)
aws ec2 wait instance-running --filters "Name=tag:Name,Values=ec2-via-cli"

# Imprima os nomes, ID e o IP Público:
aws ec2 describe-instances \
  --filters "Name=tag:Name,Values=ec2-via-cli" --query "Reservations[].Instances[].{ID:InstanceId, IP:PublicIpAddress, Estado:State.Name}" --output table
```

**Validando a aplicação na Nuvem!**

1. **Pelo navegador:** Pegue o `IP` impresso ali em cima na tabela de terminal. Abra no navegador usando `http://SEU-IP`. A mensagem personalizada deve carregar.
2. **Via acesso Remoto (SSH):** Usando a sua chave, conecte-se no cérebro da VM:*(Responda `yes` na pergunta padrão de chave para acessar; para sair lá de dentro depois de logar, use o comando `exit`).*
    
    ```
    ssh -i minha-chave-ec2.pem ec2-user@<NUMERO_DO_SEU_IP_AQUI>
    # Exemplo: ssh -i minha-chave-ec2.pem ec2-user@54.12.34.56
    
    ```
    

---

### **Etapa 6: Faxina — Desligar e Destruir**

```
# Pegue o ID que constava ali na sua pequena tabela, que começa com i-xxx...
aws ec2 terminate-instances --instance-ids <COLOQUE-SEU-ID-AQUI>

```

---

## **🏗️ 4. Parte 2 — Lançando EC2 com Terraform (IaC)**

Agora opero numa escala superior. Terraform não aplica ordens pontuais "faça isto, faça aquilo". Com Terraform eu declaro **"Eu desejo que a arquitetura seja X, resolva isto p/ mim"**. O aplicativo Terraform lê as pastas locais e concilia isso automaticamente contra a AWS.

### **4.1 Instalação e Preparação do Ambiente Local**

O Terraform é uma ferramenta de terminal da HashiCorp. Como eu o utilizo nas minhas instalações:

- **No Linux (WSL, Ubuntu):**
    
    ```
    sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
    wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
    echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
    sudo apt update && sudo apt install terraform
    
    ```
    
- **No Windows (PowerShell):** Eu recomendo usar o Gerenciador de Pacotes nativo: `winget install Hashicorp.Terraform`. Ou baixar o `.zip` [neste link](https://developer.hashicorp.com/terraform/install) e mapear a pasta no PATH (C: do windows).

---

### **4.2 Organização de Código**

Crie uma pasta vazia e entre nela. Eu gosto de manter o repositório na mesma hierarquia que a maioria das Big Techs utilizam em dev: `main.tf` gerencia os recursos principais, enquanto o resto é focado em suporte, veja os códigos que você precisa criar localmente:

**`provider.tf`** (Comunica o terraform do seu PC com o provedor de computação):

```
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
provider "aws" {
  region = "us-east-1"
}
```

**`main.tf`** (O arquivo de inteligência / infraestrutura primário):

```
# Definição do Firewall novo
resource "aws_security_group" "demo_terraform_sg" {
  name        = "demo-terraform-sg"
  description = "Acesso Terraform - Aula 08"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# A nossa Servidora em si
resource "aws_instance" "ec2_demo" {
  ami                    = "ami-0c02fb55956c7d316"
  instance_type          = "t2.micro"
  key_name               = "minha-chave-ec2"
  vpc_security_group_ids = [aws_security_group.demo_terraform_sg.id]

  user_data = <<-EOF
    #!/bin/bash
    yum update -y
    yum install -y httpd
    systemctl start httpd
    systemctl enable httpd
    cat << 'HTML_FILE' > /var/www/html/index.html
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head><meta charset="UTF-8"><title>Sobrevivemos ao Terraform!</title>
    <style>body { background-color: #282c34; color: white; font-family: sans-serif; text-align: center; padding-top: 10%; } h1 { color: #61dafb; font-size: 4em; text-shadow: 2px 2px #000; } .emoji { font-size: 5em; animation: bounce 2s infinite; } @keyframes bounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-30px);} 60% {transform: translateY(-15px);} }</style>
    </head>
    <body>
        <div class="emoji">🤓💻🚀</div>
        <h1>Terraform Fez a Boa!</h1>
        <h2>Enquanto você lia o roteiro, eu construí um servidor inteiro na AWS.</h2>
        <p><i>Turma de Cloud Computing (IA/Dados) - UNIUBE. Vai dar BOM!</i></p>
    </body>
    </html>
    HTML_FILE
  EOF

  tags = {
    Name = "ec2-via-terraform"
    Aula = "08"
  }
}
```

**`outputs.tf`** (Como devolver dados valiosos se o processo rodar todo em Background):

```
output "mensagem_sucesso" { value = "Parabéns! A sua máquina foi criada." }
output "public_ip" { value = "O IP Público é: ${aws_instance.ec2_demo.public_ip}" }
output "url_acesso" { value = "Para testar, acesse: http://${aws_instance.ec2_demo.public_ip}" }
output "comando_ssh" { value = "Para acessar terminal: ssh -i minha-chave-ec2.pem ec2-user@${aws_instance.ec2_demo.public_ip}" }
```

---

### **4.3 Roteiro de Execução: `init`, `plan` e `apply`**

Observe se os arquivos estão configurados na pasta. Fique com a aba do console EC2 web aberto do lado do terminal. Note que: **O Terraform herdará automaticamente as credencias que você salvou na pasta `~/.aws/credentials` naquela primeira etapa. Tudo já está interconectado.**

**Passo 1: Baixar os Módulos da AWS**

```
terraform init
```

**Passo 2: O Poder do Previsão Operacional (Plan)**

```
bash
terraform plan
```

> Perceba algo incrível! Diferente do CLI, este comando **NÃO aplicou nada**, é apenas uma maquete! O Terraform calculou o diferencial, mostrou que 2 novos recursos serão construídos, garantindo que não quebraremos a plataforma na hora da instalação final.
> 

**Passo 3: Autorizar o Deploy (Apply)**

```
bash
terraform apply
```

*(Digite "yes" quando o terminal interromper as linhas de console)*

> Validação de Ouro: Como eu desenhei o arquivo `outputs.tf`, ao final da criação local, o comando automaticamente enviará na tela o seu novo IP Público e URL compilada! Clique na URL para checar!
> 

**Passo 4: Faxina Master (Destroy)** A nuvem limpa! Diferente do CLI que te obrigava colar o ID manual a dedo de máquina por máquina, ou grupo por grupo, o Terraform rastria os rastros em banco de dados (`.tfstate`). Apague ambos com:

```
bash
terraform destroy
```

---

## **📝 5. Resenha e Laboratório para Entrega**

O modelo `Infrastructure as Code (IaC)` muda a vida de um Engenheiro Cloud. Você pode pegar a pasta inteira do seu Terraform hoje, jogar para o Git do seu colega e ele sobe exatamente a mesma infraestrutura, nas conformidades padronizadas pelas tags, independentemente do sistema local!

### **Avaliação: Moodle / Formato PDF (Semana Que Vem)**

Suba as evidências de teste que você gerou durante o dia de hoje:

1. Foto comprobatória **(CLI)** da saída `get-caller-identity` evidenciando acesso de permissão.
2. Foto comprobatória **(CLI)** da requisição com IP atrelado via `describe-instances` na tela preta.
3. Foto comprobatória **(Terraform)** do output demonstrando o retorno do `url_acesso`.
4. Dissertativa (2-4 linhas): Compare. Se você precisasse subir um projeto com *50 máquinas virtuais, gerando 5 bancos de dados em Subnets distintas.* Qual o peso para fazer via Click no Console vs Cli vs Terraform e qual método deveria ser oficial?

🏁 **Obrigado e bom descarte da infraestrutura! Certifique-se de excluir qualquer Instância em andamento para a cota da disciplina.**
