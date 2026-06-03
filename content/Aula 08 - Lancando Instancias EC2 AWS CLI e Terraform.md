---
disciplina: Cloud Computing
codigo: "14189"
aula: "08"
titulo: "Lançando Instâncias EC2 — AWS CLI e Terraform"
tipo: pratica
semana: 4
data: 2026-04-15
status: publicado
tags:
  - cloud
  - aws
  - ec2
  - aws-cli
  - terraform
  - iac
  - lab
publicar: true
---

# 🟢 Aula 08: Lançando Instâncias EC2 — AWS CLI e Terraform

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana:** 4 | Quarta-feira
**Professor:** Romualdo Mathias Filho
**Tipo:** 🔬 Prática
**Plataforma de Prática:** AWS Academy Learner Lab / Terminal Local

---

> 💬 "Criar recursos de computação em nuvem clicando no console visual é como montar móveis de madeira seguindo um manual impresso — você precisa conectar cada peça de forma lenta e manual. Usar a CLI é como ter um robô assistente a quem você dá ordens rápidas e diretas. Usar o Terraform, porém, é como entregar a planta arquitetônica 3D final: a ferramenta lê o código, avalia o terreno real na nuvem, calcula a diferença e constrói a infraestrutura inteira de forma autônoma." — Analogia sobre a evolução da administração de nuvem.

---

## 🎯 Objetivo da Aula

Ao final desta aula prática, os alunos serão capazes de:
- **Comparar** as três formas fundamentais de interagir e gerenciar recursos na AWS: Console visual, Linha de Comando (AWS CLI) e Código Declarativo (Terraform).
- **Configurar** o fluxo de autenticação e credenciais de chaves de acesso no terminal local para conexão com o AWS Academy Learner Lab.
- **Operar** comandos `aws ec2` completos para criar pares de chaves SSH, configurar regras em Security Groups, lançar instâncias virtuais e desativá-las.
- **Compreender** o fluxo de trabalho declarativo de Infraestrutura como Código (IaC) utilizando o Terraform.
- **Provisionar** e destruir de forma limpa uma infraestrutura computacional de servidor web padronizada utilizando arquivos de configuração Terraform (`.tf`).

---

## 🔄 Revisão Rápida (5 min)

Nas sessões teóricas e práticas anteriores, aprendemos a provisionar servidores e habilitar alta disponibilidade na nuvem:

| **Conceito (Aula Passada)** | **Conexão com hoje** |
| --- | --- |
| [[Aula 07 - Pratica de Auto Scaling e Balanceamento de Carga\|Aula 07 (Auto Scaling)]] | Aprendemos a configurar Launch Templates e Auto Scaling no console visual; hoje automatizaremos isso via linha de comando e código. |
| [[Aula 06 - Computacao em Nuvem EC2 Lambda e Serverless\|Aula 06 (EC2 e Lambda)]] | Compreendemos a fundamentação teórica de servidores virtuais (IaaS) que hoje aprenderemos a instanciar em lote e de forma programática. |
| [[Aula 05 - Infraestrutura Global AWS e Lab IAM\|Aula 05 (IAM)]] | Os conceitos de segurança de acesso, Security Groups e chaves SSH que manipulamos graficamente serão hoje criados via scripts e IaC. |

---

## 📌 1. Credenciais e Autenticação (AWS Academy)

Como executaremos as atividades a partir do terminal de comando local de nossos computadores (fora da interface visual do navegador), o terminal precisa receber "autorização" temporária para comandar nossa infraestrutura AWS.

### 1.1. Obtendo as Credenciais no Ambiente Acadêmico

1. Acesse o portal da **AWS Academy** e inicie o console do seu **Learner Lab**.
2. Aguarde até que o indicador de status da sessão de laboratório (no canto superior esquerdo da tela do Vocareum) mude para a cor verde (**Active**).
3. Antes de abrir o console visual, clique no botão **AWS Details** (no canto superior direito).
4. Na aba de informações do laboratório, clique no botão **Show** associado ao item **AWS CLI**.
5. Copie todo o bloco de configuração apresentado, que possui a estrutura temporária semelhante a esta:
   ```ini
   [default]
   aws_access_key_id=ASIAXXXXXXXXXXXXXXXX
   aws_secret_access_key=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   aws_session_token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx...
   ```

### 1.2. Salvando as Credenciais Localmente

#### 💻 No Linux / macOS / WSL (Windows Subsystem for Linux)
Abra o seu terminal e execute as seguintes linhas de comando para salvar as chaves:
```bash
mkdir -p ~/.aws
nano ~/.aws/credentials
# Cole o bloco copiado. Pressione Ctrl+O e Enter para salvar; Ctrl+X para sair do editor.
```

#### 🪟 No Windows (PowerShell Nativo)
O ecossistema AWS e o Terraform buscam nativamente as chaves no diretório do usuário do Windows (`C:\Users\SeuUsuario\.aws\credentials`). Execute no PowerShell:
```powershell
New-Item -Path $env:USERPROFILE\.aws -ItemType Directory -Force
# Abra a pasta criada no Windows Explorer e salve um arquivo chamado "credentials" (sem extensão) com o bloco colado.
explorer $env:USERPROFILE\.aws
```

---

## 📌 2. Linha de Comando: Instanciando EC2 com AWS CLI

A **AWS CLI (Command Line Interface)** é uma ferramenta robusta voltada a scripts rápidos de automação, varreduras analíticas de segurança e limpezas operacionais.

### 2.1. Validando sua Autenticação no Terminal
Para garantir que a comunicação do seu computador local com a nuvem do laboratório está funcionando, execute:
```bash
aws sts get-caller-identity
```
> 💡 **Checkpoint:** O terminal deve retornar o ID da conta AWS e o identificador do perfil `vocstartsoft` sem erros de conexão.

---

### 2.2. Criando o Par de Chaves de Segurança (Key Pair)
As máquinas Linux exigem autenticação criptográfica segura por chaves. Vamos gerar nossa chave SSH privada e aplicar as permissões UNIX adequadas de leitura:
```bash
aws ec2 create-key-pair \
  --key-name minha-chave-ec2 \
  --key-type rsa \
  --query 'KeyMaterial' \
  --output text > minha-chave-ec2.pem

# Aplique permissão exclusiva de leitura ao arquivo privado (obrigatório para SSH no Linux)
chmod 400 minha-chave-ec2.pem
```

---

### 2.3. Criando a Barreira de Segurança (Security Group)
Precisamos configurar o firewall virtual da AWS para permitir tráfego na porta **22 (SSH)** para fins de gerência e na porta **80 (HTTP)** para que o navegador consiga acessar nosso futuro site:
```bash
# 1. Cria o Grupo de Segurança e captura o ID gerado em uma variável
SG_ID=$(aws ec2 create-security-group \
  --group-name "demo-cli-sg" \
  --description "Security Group Aula 08" \
  --query 'GroupId' \
  --output text)

echo "✅ Firewall criado com sucesso! ID: $SG_ID"

# 2. Permite tráfego de entrada na porta 22 (SSH)
aws ec2 authorize-security-group-ingress \
  --group-id $SG_ID \
  --protocol tcp \
  --port 22 \
  --cidr 0.0.0.0/0

# 3. Permite tráfego de entrada na porta 80 (HTTP)
aws ec2 authorize-security-group-ingress \
  --group-id $SG_ID \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0
```
> ⚠️ **Aviso de Erro:** Caso o grupo `demo-cli-sg` já exista por atividades anteriores, o comando retornará erro. Neste cenário, recupere o ID existente utilizando:
> `SG_ID=$(aws ec2 describe-security-groups --group-names "demo-cli-sg" --query 'SecurityGroups[0].GroupId' --output text)`

---

### 2.4. O Comando de Lançamento da Instância (Run-Instances)
Executaremos a criação da instância EC2 acoplando a chave de segurança, as regras de firewall e injetando um script bash de inicialização (*User Data*) para configurar o servidor Apache:
```bash
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

---

### 2.5. Resgatando o IP e Validando o Servidor
Com a máquina sendo provisionada, use a CLI para aguardar a inicialização e extrair o endereço IP público que a AWS atribuiu a ela:
```bash
# Aguarda até que o status da instância mude para ativo
aws ec2 wait instance-running --filters "Name=tag:Name,Values=ec2-via-cli"

# Imprime o IP público e o ID em uma tabela formatada
aws ec2 describe-instances \
  --filters "Name=tag:Name,Values=ec2-via-cli" \
  --query "Reservations[].Instances[].{ID:InstanceId, IP:PublicIpAddress, Estado:State.Name}" \
  --output table
```

#### Testando no Navegador
Abra seu navegador de preferência e digite o IP gerado (ex.: `http://54.12.34.56`). O título em H1 do deploy deve ser exibido na tela.

#### Conectando via SSH
```bash
ssh -i minha-chave-ec2.pem ec2-user@<IP_PUBLICO_DA_SUA_INSTANCIA>
# Digite "yes" para aceitar a chave do servidor. Para sair, execute "exit".
```

---

### 2.6. Limpeza e Exclusão de Recursos (CLI)
Para evitar o consumo indevido dos créditos do seu laboratório acadêmico, apague a instância utilizando seu ID respectivo:
```bash
aws ec2 terminate-instances --instance-ids <ID_DA_INSTANCIA_AQUI>
```

---

## 📌 3. Infraestrutura como Código: Lançando EC2 com Terraform

O **Terraform** é uma ferramenta declarativa desenvolvida pela HashiCorp. Em vez de descrever o processo executável passo a passo (imperativo), nós escrevemos o arquivo declarativo dizendo **o estado final ideal que desejamos** na nossa arquitetura.

### 3.1. Instalação do Terraform Local
- **No Linux (Debian / Ubuntu / WSL):**
  ```bash
  sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
  wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
  echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
  sudo apt update && sudo apt install terraform
  ```
- **No Windows (PowerShell):** Recomenda-se utilizar o gerenciador de pacotes padrão do Windows:
  ```powershell
  winget install Hashicorp.Terraform
  ```

---

### 3.2. Organização e Criação do Código Declarativo
Crie uma pasta exclusiva para este projeto no seu computador (ex.: `C:\Nuvem\lab-terraform`). Dentro desta pasta, crie os 3 arquivos estruturais de IaC a seguir:

#### Arquivo: `provider.tf`
*(Declara com qual nuvem e região o Terraform deve se integrar)*
```hcl
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

#### Arquivo: `main.tf`
*(Descreve a especificação exata do Security Group e da Instância EC2)*
```hcl
# Configuração do Grupo de Segurança (Firewall)
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

# Configuração do Servidor Virtual EC2
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
    <head>
        <meta charset="UTF-8">
        <title>Sobrevivemos ao Terraform!</title>
        <style>
            body { background-color: #282c34; color: white; font-family: sans-serif; text-align: center; padding-top: 10%; }
            h1 { color: #61dafb; font-size: 4em; text-shadow: 2px 2px #000; }
            .emoji { font-size: 5em; animation: bounce 2s infinite; }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                40% {transform: translateY(-30px);}
                60% {transform: translateY(-15px);}
            }
        </style>
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

#### Arquivo: `outputs.tf`
*(Declara variáveis de saída para exibir informações críticas no terminal ao fim do processo)*
```hcl
output "mensagem_sucesso" {
  value = "Parabéns! A sua máquina foi criada."
}

output "public_ip" {
  value = "O IP Público é: ${aws_instance.ec2_demo.public_ip}"
}

output "url_acesso" {
  value = "Para testar, acesse: http://${aws_instance.ec2_demo.public_ip}"
}

output "comando_ssh" {
  value = "Para acessar o terminal: ssh -i minha-chave-ec2.pem ec2-user@${aws_instance.ec2_demo.public_ip}"
}
```

---

### 3.3. Ciclo de Vida do Terraform: Init, Plan, Apply e Destroy

Navegue com o terminal até a pasta onde salvou os três arquivos estruturais `.tf` e rode os comandos sequenciais:

#### 1. `terraform init` (Inicialização)
Baixa do repositório público da HashiCorp os binários de conexão do provedor da AWS necessários para as operações.

#### 2. `terraform plan` (Planejamento)
Cria uma "maquete lógica" mostrando a diferença entre a infraestrutura que está rodando na AWS real e o que você declarou no código. Ele exibe em tela o plano exato antes de alterar qualquer recurso.

#### 3. `terraform apply` (Aplicação)
Efetiva o deploy na nuvem. Digite `yes` e confirme para autorizar. Ao final da execução, as variáveis de saída (`outputs.tf`) exibirão a URL pronta para teste no terminal.

#### 4. `terraform destroy` (Destruição)
Lê o arquivo de estado (`.tfstate`) gerado localmente pelo Terraform e destrói de forma unificada e limpa todos os recursos criados de uma única vez. Digite `yes` para confirmar.

---

## 📌 4. Exercício Prático e Evidências para Entrega

Os alunos devem criar um relatório em formato PDF no Moodle da Uniube contendo as capturas de tela comprovando a execução com êxito da atividade prática:
1. Print do terminal exibindo o retorno com sucesso do comando `aws sts get-caller-identity` provando que suas chaves locais foram autenticadas.
2. Print do terminal exibindo a tabela com o IP ativo da máquina retornada do comando de filtro `aws ec2 describe-instances`.
3. Print da página Web personalizada (rodando o código HTML do Terraform) carregada em seu navegador web através do IP público real da máquina virtual.
4. **Resenha Crítica (Dissertativa - 2 a 4 linhas):** Imagine que você recebeu a responsabilidade profissional de provisionar uma arquitetura corporativa composta por **50 servidores virtuais EC2 baseados em 5 Zonas de Disponibilidade integrados a 5 bancos de dados relacionais distintos**. Disserte sobre a viabilidade operacional e a taxa de erro envolvida na execução desta demanda utilizando CLI vs interface gráfica vs código Terraform.

---

## 📋 Resumo Estrutural

| **Conceito** | **Definição em Uma Frase** |
| --- | --- |
| **AWS CLI** | A ferramenta oficial unificada de linha de comando para manipular, filtrar e automatizar serviços da AWS através do terminal de comandos. |
| **IaC (Infraestrutura como Código)** | O paradigma moderno de TI onde a infraestrutura computacional é configurada e administrada por meio de arquivos de texto lógicos legíveis por máquina. |
| **Terraform** | A ferramenta open-source declarativa multi-cloud de IaC utilizada para criar, atualizar e gerenciar o ciclo de vida completo de infraestruturas lógicas. |
| **State File (`.tfstate`)** | O arquivo de mapeamento persistente gerado pelo Terraform para controlar com precisão a relação entre os códigos declarados e as entidades físicas reais na nuvem. |
| **Declarativo vs Imperativo** | O método imperativo dita a sequência exata de passos a se executar (CLI), enquanto o declarativo descreve e garante unicamente o estado final desejado (Terraform). |

---

%%
## ❓ Banco de Questões

> 🔒 Esta seção é visível apenas no Obsidian do professor. Não publicada.

### Questão 1: Prática (Múltipla Escolha — Nível: Intermediário)
**Enunciado:** Um Engenheiro de MLOps que atua em Uberlândia escreveu um arquivo Terraform (`main.tf`) para gerenciar um conjunto de instâncias EC2 otimizadas para processamento de Machine Learning. Após realizar o deploy da arquitetura utilizando `terraform apply` com sucesso, ele notou que esqueceu de associar a tag de custo `Billing = IA-Model` nas instâncias. O profissional adicionou a respectiva linha de tags no arquivo `main.tf` e executou o comando `terraform apply` novamente. Qual será a ação lógica do Terraform ao interpretar esta modificação de metadados?

- [ ] A) Destruirá as instâncias EC2 existentes de forma imediata e provisionará novas instâncias do zero para forçar a inserção das tags, acarretando perda temporária de acesso ao servidor.
- [ ] B) Retornará um erro crítico de banco de dados indicando que o recurso com o ID de instância especificado já existe na AWS e encerrará a execução sem fazer nada.
- [x] C) Realizará uma atualização segura no local (*In-Place Update*), modificando unicamente a propriedade de metadados de tags na AWS sem necessidade de interromper ou recriar a máquina virtual. ✅
- [ ] D) Ignorará a alteração, visto que propriedades decorativas como tags de classificação não são monitoradas pelo sistema de controle de estado do Terraform.

**Justificativa:** O Terraform analisa a API do provedor (AWS) para discernir quais alterações exigem destruição de recursos (ex: mudança de VPC ou subnet) e quais podem ser aplicadas com a máquina rodando (*In-Place Update*). Como a adição de tags é um metadado dinâmico atualizado via API da AWS, o Terraform apenas atualiza a propriedade sem impactar o status de execução do servidor.

---

### Questão 2: Prática (Múltipla Escolha — Nível: Intermediário)
**Enunciado:** Uma equipe de engenharia de Cloud de uma grande empresa de tecnologia precisa implantar uma arquitetura de rede complexa em nuvem composta por VPCs, Subnets Públicas e Privadas, Gateways de Internet, Tabelas de Roteamento e 10 servidores EC2. O líder do projeto optou expressamente por utilizar o HashiCorp Terraform ao invés de implementar scripts complexos via AWS CLI operando em loops bash. Qual a principal justificativa técnica fundamentada para justificar o uso do Terraform em detrimento ao AWS CLI neste cenário?

- [ ] A) O Terraform opera requisições de API de forma mais rápida do que a CLI nativa da AWS devido ao suporte nativo a redes CDN proprietárias.
- [x] B) O Terraform constrói um grafo lógico de dependência de recursos na memória, identificando a sequência exata de dependências para criar a VPC antes das subnets e gerencia o estado por meio do arquivo `.tfstate`. ✅
- [ ] C) O Terraform ignora as restrições de permissões do IAM no console AWS, permitindo criar recursos que estariam indisponíveis no terminal comum do CLI.
- [ ] D) O Terraform é um serviço SaaS hospedado na infraestrutura nativa da AWS, reduzindo a necessidade de uso de processamento de hardware na máquina do desenvolvedor.

**Justificativa:** A capacidade de realizar análises lógicas de dependência de recursos (dependency graph) para planejar a criação na ordem correta e a persistência do mapeamento de estado com o arquivo `.tfstate` tornam o Terraform uma ferramenta de gestão de ciclo de vida de infraestrutura autônoma, diferenciando-se da CLI que exige scripts imperativos complexos controlando erros manualmente a cada chamada de API.

---

### Questão 3: Teórica (Dissertativa — Nível: Avançado)
**Enunciado:** Explique em detalhes a diferença conceitual e as implicações práticas envolvidas na abordagem **Imperativa** (como a automatização via AWS CLI / scripts de shell bash) e na abordagem **Declarativa** (como HashiCorp Terraform) no contexto da disciplina de Infraestrutura como Código (IaC). Disserte especialmente sobre a facilidade ou complexidade ao lidar com **desvios de configuração (configuration drift)** do ambiente e o gerenciamento de **limpeza e descarte (cleanup)** de recursos ao final do ciclo de vida da aplicação.

**Resposta esperada:**
1. **Diferença Conceitual:** A abordagem imperativa (ex.: AWS CLI / Shell Scripts) baseia-se em "como" o recurso deve ser feito. O desenvolvedor deve programar comandos passo a passo sequenciais de criação de chaves, grupos e servidores de forma imperativa. A abordagem declarativa (ex.: Terraform) baseia-se no "o quê" deve ser construído. O desenvolvedor declara unicamente o mapa ideal da arquitetura no código, e a própria ferramenta se encarrega de mapear as APIs e alcançar esse estado de forma abstrata.
2. **Implicação no Desvio de Configuração (Drift):** Em scripts imperativos de CLI, se alguém modificar a máquina na nuvem de forma manual (ex.: adicionando uma porta liberada no firewall), o script comum de criação não saberá avaliar esse desvio, gerando erros ao rodar novamente. O Terraform utiliza o controle persistente de arquivo de estado (`.tfstate`). Em cada execução de `plan` ou `apply`, ele compara a nuvem real contra o código. Se detectar um desvio manual não documentado no código, ele reverterá automaticamente a nuvem para coincidir com a verdade expressa no código, blindando a infraestrutura de intervenções informais de operadores.
3. **Implicação em Limpeza e Descarte (Cleanup):** No modelo imperativo, deletar a infraestrutura construída exige mapear cada ID gerado individualmente em variáveis ou arquivos de log, executando a exclusão em ordem inversa manual cuidadosa (se tentar deletar um security group com instâncias presas nele, ocorrerá falha). No Terraform, devido ao rastreamento estruturado do `.tfstate` e do grafo lógico de dependências, um simples comando unificado `terraform destroy` avalia os mapeamentos lógicos de forma imediata e exclui recursivamente todos os recursos encadeados na ordem reversa exata em poucos segundos, eliminando o erro de deixar recursos sobressalentes órfãos gerando despesas invisíveis no orçamento.

---
%%

---

## 📄 Artigo de Aprofundamento

- [Introdução à Infraestrutura como Código (IaC) com Terraform (HashiCorp Learn)](https://developer.hashicorp.com/terraform/tutorials)
> *Resumo prático: Este artigo conceitual detalha os pilares da revolução de IaC na nuvem moderna. Ele explica como arquivos descritivos lógicos minimizam falhas humanas em ambientes corporativos e como o versionamento de código de infraestrutura no Git confere transparência e velocidade à entrega contínua de software.*

---

## 📚 Referências Bibliográficas

- ANTUNES, Jonathan Lamim. *Amazon AWS: descomplicando a computação na nuvem*. Casa do Código, 2016. **(Automação por CLI, Cap. 9, pp. 165–182)**
- SILVA, Marcos. *Infraestrutura como Código com Terraform*. Novatec, 2021. **(Ciclo de Vida do Terraform e Gerenciamento de Estado de Recursos, Cap. 2, pp. 34–58)**
- SOUSA NETO, Manoel Veras de. *Cloud computing: nova arquitetura da TI*. Brasport, 2012. **(Orquestração e Automação de Data Centers Virtuais na Computação Elástica, Cap. 8, pp. 185–202)**

---
*Última atualização: 2026-05-20 | Status: publicado*
