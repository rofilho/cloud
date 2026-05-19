---
disciplina: Cloud Computing
codigo: "14189"
aula: 11
titulo: "Terraform — Prática de Banco de Dados na Nuvem (RDS)"
tipo: pratica
semana: 11
data: 2026-05-07
status: publicado
tags:
  - cloud
  - terraform
  - iac
  - aws
  - rds
  - banco-de-dados
  - mysql
publicar: true
---

# 🟢 Aula 11: Terraform — Prática de Banco de Dados na Nuvem (RDS)

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados — Uniube
**Semana:** 11 | Quarta-feira
**Professor:** Romualdo Mathias Filho
**Tipo:** 🔬 Prática
**Tópicos:** Terraform, Amazon RDS, MySQL, IaC, Security Groups, `terraform init`, `plan`, `apply`, `destroy`

---

> 💬 *"Na aula passada, aprendemos sobre RDS, Multi-AZ e Read Replicas no console. Hoje, vamos criar tudo isso com código — porque no mercado, ninguém clica botão para criar banco de dados em produção."*

---

## 🎯 Objetivo da Aula

Ao final desta aula, os alunos serão capazes de:

- Provisionar uma instância **Amazon RDS MySQL** totalmente privada (padrão de produção) usando Terraform.
- Provisionar uma **Instância EC2** para atuar como servidor de aplicação.
- Configurar **Security Groups** interligados, onde o banco aceita conexões *apenas* da EC2.
- Conectar à EC2 via AWS Console (Instance Connect) e testar a comunicação com o banco.
- Destruir toda a infraestrutura com um único comando (`terraform destroy`).

---

## 🔄 Revisão Rápida (5 min)

| **Conceito (Aulas Anteriores)** | **Conexão com hoje** |
| --- | --- |
| Amazon RDS (Aula 10) | Hoje provisionamos com Terraform o que vimos na teoria — um banco RDS MySQL gerenciado. |
| Multi-AZ e Read Replicas (Aula 10) | Veremos como habilitar Multi-AZ com uma única linha de código no Terraform. |
| Terraform Básico (se já viu Aula 12) | Aqui aplicamos o mesmo ciclo `init/plan/apply/destroy`, mas para banco de dados. |
| Credenciais AWS (Aula 08) | As mesmas credenciais `~/.aws/credentials` do Academy continuam sendo usadas. |

> 💡 **O salto de hoje:** Na Aula 10, exploramos o RDS pelo console. Hoje, o código criará o banco **fechado para a internet** (padrão de mercado) e uma EC2 para acessá-lo. Isso é a base do **Projeto Final**!

---

## 📌 1. Estrutura do Projeto

Crie uma pasta chamada `terraform-rds` e entre nela:

```bash
mkdir terraform-rds && cd terraform-rds
```

Criaremos 4 arquivos:

```
terraform-rds/
├── provider.tf      ← Qual nuvem e região usar
├── variables.tf     ← Variáveis configuráveis (nome do banco, senha, etc.)
├── main.tf          ← Recursos: EC2 + RDS + Security Groups
└── outputs.tf       ← Mostra o endpoint do banco e IPs
```

---

## 📌 2. `provider.tf` — Conectando ao AWS

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

> 💡 **Mesmo provider da Aula 12.** Se você já tem esse arquivo de outro projeto, pode reutilizar.

---

## 📌 3. `variables.tf` — Variáveis do Projeto

```hcl
# ============================================================
# VARIÁVEIS — Valores configuráveis sem alterar o main.tf
# ============================================================

variable "db_name" {
  description = "Nome do banco de dados a ser criado"
  type        = string
  default     = "aula11db"
}

variable "db_username" {
  description = "Usuário administrador do banco"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "Senha do banco — NUNCA hardcode em produção!"
  type        = string
  sensitive   = true
  default     = "SenhaAula11Cloud2026!"
}

variable "db_instance_class" {
  description = "Tamanho da instância RDS"
  type        = string
  default     = "db.t3.micro"
}
```

> ⚠️ **Sobre a senha no código:** Em produção, a senha seria armazenada no AWS Secrets Manager ou passada via variável de ambiente (`TF_VAR_db_password`). Para fins didáticos do Academy, usamos um default, mas o atributo `sensitive = true` garante que o Terraform **nunca exibe a senha** nos logs.

---

## 📌 4. `main.tf` — Infraestrutura de Produção (EC2 + RDS)

Vamos criar a infraestrutura seguindo o padrão de mercado: a aplicação roda em uma EC2 que tem acesso à internet, mas o banco de dados é **privado**, aceitando conexões *apenas* da EC2.

Copie e cole o código abaixo no seu `main.tf`:

```hcl
# ============================================================
# SECURITY GROUP DA EC2 (Aplicação)
# ============================================================
resource "aws_security_group" "ec2_sg" {
  name        = "ec2-app-sg-aula11"
  description = "Permite acesso SSH via Instance Connect e saida para a internet"

  ingress {
    description = "SSH para o EC2 Instance Connect"
    from_port   = 22
    to_port     = 22
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

# ============================================================
# SECURITY GROUP DO RDS (Banco de Dados Privado)
# ============================================================
resource "aws_security_group" "rds_sg" {
  name        = "rds-sg-aula11"
  description = "Permite acesso MySQL APENAS vindo da EC2 da Aplicacao"

  ingress {
    description     = "MySQL originado da EC2"
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    # A MÁGICA DE PRODUÇÃO: O banco só aceita tráfego do SG da EC2
    security_groups = [aws_security_group.ec2_sg.id] 
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ============================================================
# INSTÂNCIA EC2 — Servidor de Aplicação / Bastion
# ============================================================
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }
}

resource "aws_instance" "app_server" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t2.micro"

  vpc_security_group_ids = [aws_security_group.ec2_sg.id]

  # User Data: Instala o cliente MySQL automaticamente ao ligar
  user_data = <<-EOF
              #!/bin/bash
              dnf update -y
              dnf install mariadb105 -y
              EOF

  tags = {
    Name = "EC2-App-Aula11"
  }
}

# ============================================================
# INSTÂNCIA RDS — Banco MySQL Gerenciado pela AWS
# ============================================================
resource "aws_db_instance" "banco_aula11" {
  identifier     = "banco-terraform-aula11"
  engine         = "mysql"
  engine_version = "8.0"

  instance_class    = var.db_instance_class    
  allocated_storage = 20                       

  db_name  = var.db_name       
  username = var.db_username   
  password = var.db_password   

  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  
  # PRODUÇÃO: Banco fechado para a internet externa!
  publicly_accessible    = false    
  skip_final_snapshot    = true    

  tags = {
    Name = "RDS-Privado-Aula11"
  }
}
```

> 💡 **Repare no conceito de Produção:**
> - O `publicly_accessible` do banco agora é `false`. Ninguém consegue acessar o banco do próprio computador.
> - A regra `ingress` do Security Group do RDS não usa um IP, usa o `security_groups = [aws_security_group.ec2_sg.id]`. Ou seja, se o acesso vier da nossa EC2, está liberado. Se vier de qualquer outro lugar, a AWS bloqueia silenciosamente.

---

## 📌 5. `outputs.tf` — Exibindo a String de Conexão

```hcl
output "ec2_id" {
  value       = aws_instance.app_server.id
  description = "ID da EC2 (Servidor de Aplicação)"
}

output "rds_endpoint" {
  value       = aws_db_instance.banco_aula11.address
  description = "Hostname do banco (necessário para conectar pela EC2)"
}

output "comando_conexao_ec2" {
  value       = "mysql -h ${aws_db_instance.banco_aula11.address} -u ${var.db_username} -p ${var.db_name}"
  description = "Comando que você executará DENTRO da EC2 para testar o banco"
}
```

---

## 📌 6. O Ciclo Terraform: Criando o Banco

### Passo 1: `terraform init`

```bash
terraform init
```

> ✅ **Checkpoint:** `Terraform has been successfully initialized!`

---

### Passo 2: `terraform plan`

```bash
terraform plan
```

Você verá algo como:

```
Plan: 4 to add, 0 to change, 0 to destroy.
```

**4 recursos:** Os dois Security Groups, a EC2 e a instância RDS.

---

### Passo 3: `terraform apply`

```bash
terraform apply
```

Digite `yes` quando solicitado.

> ⏱️ **ATENÇÃO:** O RDS demora **5 a 10 minutos** para ser criado. É normal! A AWS está provisionando o banco, configurando backups automáticos e aplicando as regras de firewall.

```
aws_db_instance.banco_aula11: Creating...
aws_db_instance.banco_aula11: Still creating... [1m0s elapsed]
...
aws_db_instance.banco_aula11: Creation complete after 6m32s

Apply complete! Resources: 4 added, 0 changed, 0 destroyed.

Outputs:

comando_conexao_ec2 = "mysql -h banco-terraform-aula11... -u admin -p aula11db"
ec2_id              = "i-0abcd1234efgh5678"
rds_endpoint        = "banco-terraform-aula11.xxxxxxxxxxxx.us-east-1.rds.amazonaws.com"
```

---

## 📌 7. Conectando ao Banco de Dados (Teste em Produção)

Como o banco é **privado**, se você tentar conectar do seu computador, a requisição dará *Timeout*. Precisamos acessar a EC2 (o servidor de aplicação) primeiro.

### Passo 1: Acessar a EC2 via Console AWS
1. Vá no painel do [EC2 no Console AWS](https://console.aws.amazon.com/ec2/).
2. Selecione a instância **EC2-App-Aula11**.
3. Clique no botão **Conectar (Connect)**.
4. Escolha a aba **EC2 Instance Connect** e clique em **Connect**.
5. Um terminal abrirá no seu navegador. Você está dentro do seu servidor de aplicação!

### Passo 2: Conectar ao Banco de Dados

Dentro do terminal da EC2, cole o comando que o Terraform cuspiu no `outputs.tf`:

```bash
mysql -h <cole_o_rds_endpoint_aqui> -u admin -p
```

Digite a senha (`SenhaAula11Cloud2026!`) quando solicitado.

### Validação — Executando queries no banco

Após conectar, execute:

```sql
-- Ver o banco criado pelo Terraform:
SHOW DATABASES;

-- Criar uma tabela de exemplo:
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    curso VARCHAR(100),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados:
INSERT INTO alunos (nome, curso) VALUES ('Maria', 'IA e Ciência de Dados');
INSERT INTO alunos (nome, curso) VALUES ('João', 'Sistemas de Informação');
INSERT INTO alunos (nome, curso) VALUES ('Ana', 'Engenharia de Software');

-- Consultar:
SELECT * FROM alunos;
```

Resultado esperado:

```
+----+-------+------------------------+---------------------+
| id | nome  | curso                  | criado_em           |
+----+-------+------------------------+---------------------+
|  1 | Maria | IA e Ciência de Dados  | 2026-05-07 14:30:00 |
|  2 | João  | Sistemas de Informação | 2026-05-07 14:30:01 |
|  3 | Ana   | Engenharia de Software | 2026-05-07 14:30:02 |
+----+-------+------------------------+---------------------+
```

> ✅ **Se você viu esta tabela, seu banco de dados na nuvem está funcionando — provisionado 100% por código!**

---

## 📌 8. Comparação: Console vs Terraform para RDS

| **Aspecto** | **Console (Aula 10)** | **Terraform (Aula 11)** |
| --- | --- | --- |
| Tempo de configuração | ~15 min clicando | ~5 min escrevendo código |
| Documentação | Prints de tela? Wiki? | O código **é** a documentação |
| Replicar em outra conta | Clicar tudo de novo | `terraform apply` — idêntico |
| Histórico de mudanças | Nenhum | `git log` completo |
| Destruir tudo | Vários cliques, lembrar o SG | `terraform destroy` — 1 comando |
| Habilitar Multi-AZ | Checkbox no console | `multi_az = true` (1 linha) |

---

## 📌 9. `terraform destroy` — Limpeza Obrigatória

```bash
terraform destroy
```

```
Plan: 0 to add, 0 to change, 4 to destroy.

Do you really want to destroy all resources?
  Enter a value: yes
```

> 🏁 **OBRIGATÓRIO:** O RDS custa mais que o Lightsail. Execute o `destroy` ao final da aula para não consumir a cota do AWS Academy.

---

## 📋 Resumo Estrutural

| **Conceito** | **Definição** |
| --- | --- |
| `aws_db_instance` | Recurso Terraform para criar instâncias RDS (MySQL, PostgreSQL, Aurora...) |
| `aws_security_group` | Firewall virtual que controla quem pode acessar o banco (porta 3306) |
| `variables.tf` | Arquivo que separa configurações do código — facilita reutilização e segurança |
| `sensitive = true` | Marca variáveis que não devem aparecer nos logs do Terraform |
| `publicly_accessible` | Permite acesso externo ao RDS (necessário no lab, evitar em produção) |
| `skip_final_snapshot` | Pula o backup final ao destruir — economia no lab, perigoso em produção |
| `multi_az` | Habilita réplica em outra Zona de Disponibilidade (alta disponibilidade) |
| `endpoint` | URL de conexão do banco gerada pela AWS (host + porta) |

---

%%
## ❓ Banco de Questões

> 🔒 *Seção exclusiva do professor — não publicada para os alunos.*

### Questão 1: Prática — Múltipla Escolha (Nível Básico)

**Enunciado:** No projeto Terraform desta aula, por que a senha do banco foi marcada com `sensitive = true` na variável?

- [ ] A) Para criptografar a senha no banco de dados RDS.
- [x] B) Para impedir que o Terraform exiba a senha nos logs e no output do `plan`/`apply`. ✅
- [ ] C) Para que a senha seja gerada automaticamente pela AWS.
- [ ] D) Para bloquear o acesso remoto ao banco de dados.

**Justificativa:** O atributo `sensitive = true` é uma proteção do Terraform que impede que o valor da variável apareça na saída dos comandos `plan`, `apply` e `output`. Não afeta a criptografia do banco em si — isso é responsabilidade do RDS (via `storage_encrypted`).

---

### Questão 2: Teórica — Dissertativa (Nível Intermediário)

**Enunciado:** Compare a criação de um banco RDS pelo Console AWS (como visto na Aula 10) versus via Terraform (como nesta aula). Cite pelo menos 3 vantagens da abordagem IaC.

**Resposta esperada:** (1) **Documentação automática:** O código `.tf` documenta exatamente o que foi criado, diferente de prints de tela. (2) **Reprodutibilidade:** O mesmo código cria ambientes idênticos em qualquer conta ou região AWS, sem risco de esquecer uma configuração. (3) **Versionamento:** Com Git, cada mudança na infraestrutura fica rastreada no histórico, permitindo auditoria e rollback. Bônus: (4) Destruição simplificada com `terraform destroy` e (5) habilitação de Multi-AZ com uma única linha de código.

---

### Questão 3: Prática — Múltipla Escolha (Nível Intermediário)

**Enunciado:** No `main.tf`, a regra de Ingress do Security Group do RDS foi configurada da seguinte forma: `security_groups = [aws_security_group.ec2_sg.id]`. O que isso significa na prática?

- [ ] A) Que o banco de dados e a EC2 compartilham as mesmas credenciais de login.
- [ ] B) Que o banco de dados ficará acessível para toda a internet.
- [x] C) Que o tráfego na porta 3306 será aceito **apenas** se for originado de recursos que usem o Security Group da EC2. ✅
- [ ] D) Que a EC2 fará backup automático do banco de dados diariamente.

**Justificativa:** Interligar Security Groups é a principal boa prática em nuvem AWS. Ao referenciar o SG da EC2 na regra de entrada do RDS, informamos ao firewall: "Só aceite conexões de quem pertencer a esse grupo específico". Isso garante que o banco fique isolado da internet e apenas a camada de aplicação possa acessá-lo.

---
%%

## 🏋️ Atividade Prática — Entrega no Moodle

Execute o roteiro da aula completo e documente com evidências:

1. 📸 **Screenshot** do terminal com a saída do `terraform init`.
2. 📸 **Screenshot** do terminal com o `terraform plan` mostrando `Plan: 4 to add`.
3. 📸 **Screenshot** do terminal com os **Outputs** após o `terraform apply` (mostrando os endpoints e IDs).
4. 📸 **Screenshot** do navegador mostrando o terminal do **EC2 Instance Connect** conectado ao MySQL e executando `SELECT * FROM alunos;`.
5. 📸 **Screenshot** do terminal local com o `terraform destroy` concluído.
6. **Dissertativa (3-5 linhas):** Explique com suas palavras por que, em um ambiente de produção real, o banco de dados deve ter a configuração `publicly_accessible = false` e aceitar tráfego apenas do Security Group da EC2.

> 🏁 **Certifique-se de executar o `terraform destroy` ao final!** O RDS consome significativamente mais cota que o Lightsail.

---

## 📄 Artigo de Aprofundamento

- [Terraform — AWS Provider: aws_db_instance](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_instance)
  > *Documentação oficial do recurso RDS no Terraform. Explore todos os parâmetros disponíveis (Multi-AZ, Read Replicas, storage_encrypted, etc.).*

- [AWS RDS — User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)
  > *Documentação oficial da AWS para o Amazon RDS. Útil para entender as configurações que o Terraform automatiza.*

---

## 📚 Referências Bibliográficas

- HashiCorp. *Terraform Documentation — AWS Provider: aws_db_instance*. registry.terraform.io, 2025.
- Amazon Web Services. *Amazon RDS User Guide*. aws.amazon.com, 2025.
- Morris, K. *Infrastructure as Code: Managing Servers in the Cloud*. O'Reilly Media, 2020.
- Brikman, Y. *Terraform: Up & Running*. O'Reilly Media, 3ª ed., 2022.

---

*Última atualização: 2026-04-29 | Status: publicado*
