---
disciplina: Cloud Computing
codigo: "14189"
aula: 13
titulo: "Terraform na Prática — IaC com Lightsail e EC2"
tipo: pratica
semana: 12
data: 2026-05-07
status: publicado
tags:
  - cloud
  - terraform
  - iac
  - aws
  - lightsail
  - devops
publicar: true
---

# 🟢 Aula 13: Terraform na Prática — IaC com Lightsail e EC2

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados — Uniube
**Semana:** 12 | Quarta-feira
**Professor:** Romualdo Mathias Filho
**Tipo:** 🔬 Prática
**Tópicos:** Terraform, IaC, AWS Lightsail, AWS EC2, `terraform init`, `plan`, `apply`, `destroy`

---

> 💬 *"Hoje não vamos clicar em nada no console da AWS. Vamos escrever código, e o código vai construir a nuvem por nós."*

---

## 🎯 Objetivo da Aula

Ao final desta aula, os alunos serão capazes de:

- Compreender o **paradigma declarativo** do Terraform e como ele difere das abordagens imperativas (console e CLI).
- Instalar e configurar o ambiente Terraform localmente.
- Escrever um arquivo `main.tf` funcional para provisionar uma instância **AWS Lightsail** completa.
- Executar o ciclo completo: `terraform init` → `plan` → `apply` → `destroy`.
- Entender o arquivo de estado `.tfstate` e por que ele é o "cérebro" do Terraform.
- Comparar provisionar um servidor via Lightsail vs EC2 diretamente no Terraform.

---

## 🔄 Revisão Rápida (5 min)

| **Conceito (Aulas Anteriores)** | **Conexão com hoje** |
| --- | --- |
| AWS CLI (Aula 08) | O Terraform usa as mesmas credenciais da pasta `~/.aws/credentials`. |
| EC2 + Security Groups (Aula 06/08) | Hoje provisionamos um servidor equivalente, mas com código declarativo. |
| Lightsail (Aulas anteriores) | O Lightsail aparece aqui como provedor mais simples para começar no Terraform. |
| IaC — Conceito (Aula 08) | Hoje é a aula que aprofunda e expande o que foi introduzido anteriormente. |

> 💡 **Diferença-chave que vamos sentir hoje:**
> - **Console / AWS CLI:** "Faça *isso*, depois *aquilo*, depois *aquilo outro*." *(imperativo)*
> - **Terraform:** "Eu quero que *este* estado de infraestrutura exista. Resolva." *(declarativo)*

---

## 📌 1. Por que o Terraform Mudou o Mercado?

### O Problema Antes do IaC

Imagine que você criou 3 instâncias EC2, 2 bancos de dados RDS, 5 security groups e configurou um load balancer — tudo pelo console. Agora:

- Como você documenta isso para o próximo engenheiro?
- Como você *replica* exatamente o mesmo ambiente para homologação?
- Quando algo quebra às 3h da manhã, como você sabe o que mudou?

A resposta antes era: **não havia resposta boa.** Dependia da memória humana, de wikis desatualizados ou de logs de auditoria difíceis de ler.

### O que o Terraform resolve

O Terraform transforma sua infraestrutura em **arquivos de texto versionáveis no Git**. A consequência prática:

| **Problema antigo** | **Com Terraform** |
| --- | --- |
| Infraestrutura não documentada | O código **é** a documentação |
| Ambientes inconsistentes | O mesmo `.tf` produz infraestrutura idêntica em qualquer conta |
| Quem mexeu em quê? | `git log` mostra o histórico completo de mudanças |
| Criar 50 servidores manualmente | Um `count = 50` no arquivo e um `apply` |
| Destruir tudo cuidadosamente | `terraform destroy` — um comando, limpa tudo rastrado |

> 💡 **Analogia:** Pense na diferença entre um chef que cozinha de memória e um que tem todas as receitas escritas com gramas precisas. O segundo consegue treinar outras pessoas, replicar pratos e saber exatamente o que mudou na receita da semana passada.

---

## 📌 2. Instalação do Ambiente

### 2.1 Instalando o Terraform

**No Linux / WSL (Ubuntu/Debian):**

```bash
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common curl

wget -O- https://apt.releases.hashicorp.com/gpg | \
  gpg --dearmor | \
  sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null

echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
  https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
  sudo tee /etc/apt/sources.list.d/hashicorp.list

sudo apt update && sudo apt install terraform -y

# Verificar a instalação:
terraform -version
```

**No Windows (PowerShell — recomendado via winget):**

```powershell
winget install Hashicorp.Terraform

# Reabra o terminal e verifique:
terraform -version
```

> ✅ **Checkpoint:** O terminal deve responder com algo como `Terraform v1.8.x`. Se aparecer, a instalação funcionou.

---

### 2.2 Configurando as Credenciais AWS

O Terraform **herda automaticamente** as credenciais que você já configurou na Aula 08. Verifique se o arquivo existe:

**No Linux/WSL:**
```bash
cat ~/.aws/credentials
```

**No Windows:**
```powershell
type $env:USERPROFILE\.aws\credentials
```

Você deve ver a estrutura abaixo. Se não tiver, acesse o **AWS Academy → AWS Details → Show CLI** e cole as chaves:

```ini
[default]
aws_access_key_id=ASIA...
aws_secret_access_key=xxxx...
aws_session_token=xxxx...
```

> ⚠️ **Lembrete Academy:** As credenciais do AWS Academy expiram com a sessão do Learner Lab. Se o `terraform apply` retornar erro de autenticação, renove as credenciais repetindo o processo acima.

---

## 📌 3. Projeto 1 — Provisionando um Lightsail com Terraform

O **AWS Lightsail** é o serviço da AWS voltado para casos de uso mais simples: um servidor com IP fixo, armazenamento embutido e preço previsível. Ideal para introduzir Terraform sem a complexidade de VPCs e múltiplos security groups.

### 3.1 Estrutura do Projeto

Crie uma pasta chamada `terraform-lightsail` e entre nela:

```bash
mkdir terraform-lightsail && cd terraform-lightsail
```

Criaremos 3 arquivos:

```
terraform-lightsail/
├── provider.tf    ← Diz ao Terraform qual nuvem usar
├── main.tf        ← Define os recursos que queremos criar
└── outputs.tf     ← Imprime informações úteis após o apply
```

---

### 3.2 `provider.tf` — Conectando ao AWS

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

> 💡 **O que este arquivo faz?** Declara que vamos usar o provider `aws` da HashiCorp (versão 5.x) e que todos os recursos serão criados na região `us-east-1` (Norte da Virgínia — a mais barata e com mais serviços disponíveis).

---

### 3.3 `main.tf` — A Instância Lightsail

```hcl
# ============================================================
# INSTÂNCIA LIGHTSAIL
# Equivalente a um servidor VPS simples na AWS
# ============================================================
resource "aws_lightsail_instance" "meu_servidor" {
  name              = "servidor-terraform-aula12"
  availability_zone = "us-east-1a"
  blueprint_id      = "ubuntu_22_04"   # Sistema Operacional
  bundle_id         = "nano_3_0"       # Tamanho: 1 vCPU, 512MB RAM (mais barato)

  # Script executado automaticamente na primeira inicialização:
  user_data = <<-EOF
  #!/bin/bash
  apt-get update -y
  apt-get install -y nginx
  systemctl start nginx
  systemctl enable nginx
  echo "<h1>🚀 Servidor Terraform — Aula 12 Cloud UNIUBE</h1>" > /var/www/html/index.html
  EOF

  tags = {
    Name       = "servidor-terraform-aula12"
    Disciplina = "Cloud Computing"
    Aula       = "12"
    Professor  = "Romualdo"
  }
}

# ============================================================
# IP ESTÁTICO (OPCIONAL — mas importante!)
# Sem isso, o IP muda toda vez que você reinicia o servidor
# ============================================================
resource "aws_lightsail_static_ip" "ip_fixo" {
  name = "ip-fixo-aula12"
}

resource "aws_lightsail_static_ip_attachment" "vincular_ip" {
  static_ip_name = aws_lightsail_static_ip.ip_fixo.name
  instance_name  = aws_lightsail_instance.meu_servidor.name
}

# ============================================================
# REGRA DE FIREWALL — Abrir porta 80 (HTTP)
# ============================================================
resource "aws_lightsail_instance_public_ports" "portas" {
  instance_name = aws_lightsail_instance.meu_servidor.name

  port_info {
    protocol  = "tcp"
    from_port = 80
    to_port   = 80
  }

  port_info {
    protocol  = "tcp"
    from_port = 22
    to_port   = 22
  }
}
```

> 💡 **Repare na referência entre recursos:** O `aws_lightsail_static_ip_attachment` referencia `aws_lightsail_instance.meu_servidor.name` — isso é o Terraform construindo o **grafo de dependência** automaticamente. Ele sabe que precisa criar a instância *antes* de vincular o IP.

---

### 3.4 `outputs.tf` — Exibindo os Resultados

```hcl
output "ip_publico_estatico" {
  value       = aws_lightsail_static_ip.ip_fixo.ip_address
  description = "IP público fixo do servidor"
}

output "url_acesso" {
  value       = "http://${aws_lightsail_static_ip.ip_fixo.ip_address}"
  description = "Acesse o nginx pelo navegador"
}

output "nome_instancia" {
  value       = aws_lightsail_instance.meu_servidor.name
  description = "Nome da instância no Lightsail"
}

output "comando_ssh" {
  value       = "ssh -i ~/.ssh/SuaChave.pem ubuntu@${aws_lightsail_static_ip.ip_fixo.ip_address}"
  description = "Comando para acessar a instância via SSH"
}
```

---

## 📌 4. O Ciclo Terraform: `init` → `plan` → `apply` → `destroy`

### Passo 1: `terraform init` — Baixando os Plugins

```bash
terraform init
```

O que acontece:
- O Terraform lê o `provider.tf` e identifica que precisa do plugin da AWS.
- Baixa o plugin do **Terraform Registry** (repositório oficial da HashiCorp).
- Cria a pasta `.terraform/` com os binários dos providers.

> ✅ **Checkpoint:** Você deve ver a mensagem `Terraform has been successfully initialized!`

---

### Passo 2: `terraform plan` — A Maquete (Simulação)

```bash
terraform plan
```

> 💡 **Este comando não cria NADA na AWS.** É apenas um "pré-voo". O Terraform compara o que você declarou no código com o que existe na nuvem e mostra exatamente o que será criado, modificado ou destruído.

Você verá algo como:
```
Plan: 4 to add, 0 to change, 0 to destroy.
```

Isso significa: 4 recursos novos serão criados (instância, IP estático, attachment e regra de portas). Nenhum será modificado ou destruído.

> ⚠️ **Regra de ouro:** Nunca execute `terraform apply` sem antes ler o `plan`. É o seu "você tem certeza?" com detalhes técnicos.

---

### Passo 3: `terraform apply` — Construindo a Nuvem

```bash
terraform apply
```

O Terraform exibirá o plano novamente e pedirá confirmação:

```
Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes
```

Digite `yes` e pressione Enter. Observe as mensagens em tempo real:

```
aws_lightsail_instance.meu_servidor: Creating...
aws_lightsail_static_ip.ip_fixo: Creating...
aws_lightsail_instance.meu_servidor: Still creating... [10s elapsed]
aws_lightsail_instance.meu_servidor: Creation complete after 18s
aws_lightsail_static_ip_attachment.vincular_ip: Creating...
...

Apply complete! Resources: 4 added, 0 changed, 0 destroyed.

Outputs:

ip_publico_estatico = "3.x.x.x"
url_acesso          = "http://3.x.x.x"
nome_instancia      = "servidor-terraform-aula12"
comando_ssh         = "ssh -i ~/.ssh/SuaChave.pem ubuntu@3.x.x.x"
```

> ✅ **Validação:** Abra a `url_acesso` no navegador. A página com a mensagem do Nginx deve carregar (pode demorar até 1 minuto enquanto o `user_data` roda).

---

### Passo 4: O Arquivo de Estado (`.tfstate`)

Após o `apply`, um arquivo `terraform.tfstate` é criado na sua pasta. **Este é o arquivo mais importante do projeto Terraform.**

```bash
# Veja o que ele contém:
cat terraform.tfstate
```

Este arquivo JSON mapeia cada recurso do seu código para o recurso real na AWS (com IDs, IPs, ARNs etc.). O Terraform o usa para:
1. Saber o que já existe (e não criar de novo).
2. Calcular o que mudou quando você rodar `plan` novamente.
3. Saber o que destruir quando você rodar `destroy`.

> ⚠️ **Nunca delete o `.tfstate` manualmente!** Sem ele, o Terraform "esquece" que criou aqueles recursos e não consegue gerenciá-los mais.

---

### Passo 5: `terraform destroy` — Faxina Completa

```bash
terraform destroy
```

```
Plan: 0 to add, 0 to change, 4 to destroy.

Do you really want to destroy all resources?
  Enter a value: yes
```

> 💡 **O poder do destroy:** Diferente da CLI, onde você teria que lembrar o ID de cada recurso e destruí-los um a um (na ordem certa!), o Terraform sabe a ordem correta de destruição automaticamente. O IP só pode ser desvinculado *depois* de encerrar a instância — o Terraform resolve isso sozinho.

---

## 📌 5. Projeto 2 — Comparação: Lightsail vs EC2 no Terraform

Para aprofundar, veja a diferença de complexidade entre provisionar um servidor simples no **Lightsail** versus no **EC2** via Terraform:

| **Aspecto** | **Lightsail** | **EC2** |
| --- | --- | --- |
| Linhas de código Terraform | ~40 linhas | ~80-120 linhas |
| Precisa configurar VPC? | Não | Sim (subnet, route table...) |
| Precisa configurar Security Group? | `port_info` simples | Recurso separado `aws_security_group` |
| IP fixo | `aws_lightsail_static_ip` | `aws_eip` (Elastic IP) |
| Custo | Previsível (plano fixo) | Variável (por hora + tráfego) |
| Escalabilidade | Limitada | Total (Auto Scaling, ALB...) |

### Quando usar cada um?

- **Lightsail via Terraform** → Servidores simples, sites, homologações, APIs leves. Quando você quer a **facilidade do Lightsail com a rastreabilidade do IaC**.
- **EC2 via Terraform** → Sistemas complexos, microsserviços, infraestrutura que precisa escalar automaticamente.

---

## 📌 6. Boas Práticas de Terraform no Mercado

Conforme você avançar em projetos reais, estas práticas serão exigidas:

### 6.1 Separação em Módulos

Projetos reais não ficam em um único `main.tf`. Eles são organizados em módulos reutilizáveis:

```
infra/
├── modules/
│   ├── servidor/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── banco/
│       └── ...
├── environments/
│   ├── producao/
│   │   └── main.tf   ← chama o módulo "servidor"
│   └── homologacao/
│       └── main.tf   ← o MESMO módulo, variáveis diferentes
└── provider.tf
```

### 6.2 Remote State (Estado Remoto)

Em times, o `.tfstate` não fica na máquina local — fica num **S3 bucket** compartilhado com travamento via DynamoDB:

```hcl
# backend.tf
terraform {
  backend "s3" {
    bucket         = "meu-tfstate-bucket"
    key            = "producao/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-lock"
    encrypt        = true
  }
}
```

> 💡 **Por quê?** Se dois engenheiros rodarem `terraform apply` ao mesmo tempo com `.tfstate` local, a infraestrutura fica corrompida. O Remote State + Lock garante que apenas um por vez possa modificar.

### 6.3 Variáveis (`variables.tf`)

Nunca hardcode valores como nomes, regiões ou configurações no `main.tf`:

```hcl
# variables.tf
variable "regiao" {
  default = "us-east-1"
}

variable "ambiente" {
  description = "prod, hom ou dev"
  type        = string
}

# Uso no main.tf:
resource "aws_lightsail_instance" "server" {
  name              = "servidor-${var.ambiente}"
  availability_zone = "us-east-1a"
  blueprint_id      = "ubuntu_22_04"
  bundle_id         = "nano_3_0"
  # ... demais configurações ...
}
```

---

## 📋 Resumo Estrutural

| **Conceito** | **Definição** |
| --- | --- |
| `provider.tf` | Declara qual nuvem e região usar. |
| `main.tf` | Define os recursos desejados (servidores, IPs, regras). |
| `outputs.tf` | Imprime informações úteis após o `apply` (IP, URL, etc). |
| `terraform init` | Baixa os plugins (providers). Roda uma vez por projeto. |
| `terraform plan` | Simula as mudanças. Nunca altera nada na nuvem. |
| `terraform apply` | Executa as mudanças. Cria/modifica/destrói recursos. |
| `terraform destroy` | Destrói todos os recursos rastrados pelo `.tfstate`. |
| `.tfstate` | O banco de dados interno do Terraform. Nunca apague manualmente. |
| **Declarativo** | Você define *o que quer*, não *como fazer*. O Terraform resolve o como. |
| **Grafo de dependência** | O Terraform sabe a ordem de criação e destruição automaticamente. |

---
## 🏋️ Atividade Prática — Entrega no Moodle

Execute o roteiro da aula completo e documente com evidências:

1. 📸 **Screenshot** do terminal com a saída do `terraform init` (com `Terraform has been successfully initialized!`).
2. 📸 **Screenshot** do terminal com o `terraform plan` mostrando `Plan: 4 to add, 0 to change, 0 to destroy.`
3. 📸 **Screenshot** do terminal com os **Outputs** após o `terraform apply` (mostrando o IP e a URL).
4. 📸 **Screenshot** do **navegador** acessando a URL gerada (com a página do Nginx da aula).
5. 📸 **Screenshot** do terminal com o `terraform destroy` concluído (`Destroy complete!`).
6. **Dissertativa (3-5 linhas):** Na sua opinião, em que cenário do mercado de trabalho o Terraform seria *imprescindível* em vez de opcional? Justifique com um exemplo concreto.

> 🏁 **Certifique-se de executar o `terraform destroy` ao final!** Instâncias rodando consomem a cota da disciplina no AWS Academy.

---

## 📄 Artigo de Aprofundamento

- [Terraform — Getting Started with AWS](https://developer.hashicorp.com/terraform/tutorials/aws-get-started)
  > *Tutorial oficial da HashiCorp: cobre os conceitos fundamentais com exemplos práticos na AWS. Excelente para fixar o que foi visto na aula.*

- [AWS Lightsail Terraform Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lightsail_instance)
  > *Documentação oficial do recurso `aws_lightsail_instance`. Útil para explorar todos os parâmetros disponíveis (blueprints, bundles, etc.).*

---

## 📚 Referências Bibliográficas

- HashiCorp. *Terraform Documentation — AWS Provider*. registry.terraform.io, 2025.
- Amazon Web Services. *Amazon Lightsail Documentation*. aws.amazon.com, 2025.
- Morris, K. *Infrastructure as Code: Managing Servers in the Cloud*. O'Reilly Media, 2020.
- Brikman, Y. *Terraform: Up & Running*. O'Reilly Media, 3ª ed., 2022.

---

*Última atualização: 2026-04-29 | Status: publicado*


---
**Hub:** MOC - Ensino
