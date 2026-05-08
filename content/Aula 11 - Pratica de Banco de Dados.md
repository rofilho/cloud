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

- Provisionar uma instância **Amazon RDS MySQL** completa usando Terraform.
- Configurar **Security Groups** para controlar o acesso ao banco de dados.
- Utilizar **variáveis Terraform** para separar configuração de código (boas práticas).
- Conectar ao banco criado via cliente MySQL e executar queries.
- Destruir toda a infraestrutura com um único comando (`terraform destroy`).

---

## 🔄 Revisão Rápida (5 min)

| **Conceito (Aulas Anteriores)** | **Conexão com hoje** |
| --- | --- |
| Amazon RDS (Aula 10) | Hoje provisionamos com Terraform o que vimos na teoria — um banco RDS MySQL gerenciado. |
| Multi-AZ e Read Replicas (Aula 10) | Veremos como habilitar Multi-AZ com uma única linha de código no Terraform. |
| Terraform Básico (se já viu Aula 12) | Aqui aplicamos o mesmo ciclo `init/plan/apply/destroy`, mas para banco de dados. |
| Credenciais AWS (Aula 08) | As mesmas credenciais `~/.aws/credentials` do Academy continuam sendo usadas. |

> 💡 **O salto de hoje:** Na Aula 10, exploramos o RDS pelo console. Hoje, **o código cria o banco, configura o firewall e exibe a string de conexão** — tudo automatizado e versionável no Git.

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
├── main.tf          ← Recursos: Security Group + RDS
└── outputs.tf       ← Mostra endpoint e comando de conexão após o apply
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

## 📌 4. `main.tf` — Security Group + Instância RDS

```hcl
# ============================================================
# SECURITY GROUP — Controla quem pode acessar o banco
# ============================================================
resource "aws_security_group" "rds_sg" {
  name        = "rds-sg-aula11"
  description = "Permite acesso MySQL (porta 3306) de qualquer IP (lab apenas)"

  # Regra de entrada: permitir MySQL (porta 3306)
  ingress {
    description = "MySQL"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]   # Em produção, restringir ao IP da aplicação!
  }

  # Regra de saída: permitir tudo
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name       = "rds-sg-aula11"
    Disciplina = "Cloud Computing"
    Aula       = "11"
  }
}

# ============================================================
# INSTÂNCIA RDS — Banco MySQL Gerenciado pela AWS
# ============================================================
resource "aws_db_instance" "banco_aula11" {
  identifier     = "banco-terraform-aula11"
  engine         = "mysql"
  engine_version = "8.0"

  instance_class    = var.db_instance_class    # db.t3.micro (Free Tier)
  allocated_storage = 20                       # 20 GB de armazenamento

  db_name  = var.db_name       # Nome do banco dentro da instância
  username = var.db_username   # Usuário admin
  password = var.db_password   # Senha (sensível)

  # Configurações de rede e acesso:
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  publicly_accessible    = true    # Necessário para acessar de fora da VPC (lab)
  skip_final_snapshot    = true    # Não criar snapshot ao destruir (economia no lab)

  # Alta disponibilidade (descomente para habilitar):
  # multi_az = true   # Cria réplica em outra AZ — custo dobra!

  tags = {
    Name       = "banco-terraform-aula11"
    Disciplina = "Cloud Computing"
    Aula       = "11"
    Professor  = "Romualdo"
  }
}
```

> 💡 **Repare nos conceitos da Aula 10 aplicados aqui:**
> - O **Security Group** substitui o `port_info` do Lightsail — no EC2/RDS, você controla o firewall com este recurso dedicado.
> - O `multi_az = true` (comentado) é exatamente o **Multi-AZ** que estudamos na teoria.
> - O `publicly_accessible = true` é necessário para acessar o banco de fora da VPC — em produção, seria `false` com acesso apenas via VPN ou bastion host.

---

## 📌 5. `outputs.tf` — Exibindo a String de Conexão

```hcl
output "rds_endpoint" {
  value       = aws_db_instance.banco_aula11.endpoint
  description = "Endpoint de conexão do banco RDS (host:porta)"
}

output "rds_host" {
  value       = aws_db_instance.banco_aula11.address
  description = "Hostname do banco (sem a porta)"
}

output "comando_mysql" {
  value       = "mysql -h ${aws_db_instance.banco_aula11.address} -P 3306 -u ${var.db_username} -p ${var.db_name}"
  description = "Comando para conectar ao banco via cliente MySQL"
}

output "nome_banco" {
  value       = var.db_name
  description = "Nome do banco de dados criado"
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
Plan: 2 to add, 0 to change, 0 to destroy.
```

**2 recursos:** o Security Group e a instância RDS.

---

### Passo 3: `terraform apply`

```bash
terraform apply
```

Digite `yes` quando solicitado.

> ⏱️ **ATENÇÃO:** Diferente do Lightsail (18 segundos), o RDS demora **5 a 10 minutos** para ser criado. É normal! A AWS está provisionando o banco, configurando backups automáticos e aplicando as regras de firewall.

```
aws_security_group.rds_sg: Creating...
aws_security_group.rds_sg: Creation complete after 2s
aws_db_instance.banco_aula11: Creating...
aws_db_instance.banco_aula11: Still creating... [1m0s elapsed]
aws_db_instance.banco_aula11: Still creating... [5m0s elapsed]
aws_db_instance.banco_aula11: Creation complete after 6m32s

Apply complete! Resources: 2 added, 0 changed, 0 destroyed.

Outputs:

rds_endpoint  = "banco-terraform-aula11.xxxxxxxxxxxx.us-east-1.rds.amazonaws.com:3306"
rds_host      = "banco-terraform-aula11.xxxxxxxxxxxx.us-east-1.rds.amazonaws.com"
comando_mysql = "mysql -h banco-terraform-aula11.xxx...com -P 3306 -u admin -p aula11db"
nome_banco    = "aula11db"
```

---

## 📌 7. Conectando ao Banco de Dados

### Opção A: Cliente MySQL no terminal

Se você tem o `mysql` instalado (WSL, Linux ou MySQL Workbench):

```bash
mysql -h <cole_o_rds_host_aqui> -P 3306 -u admin -p
```

Digite a senha (`SenhaAula11Cloud2026!`) quando solicitado.

### Opção B: Instalando o cliente MySQL (se necessário)

```bash
# No Ubuntu/WSL:
sudo apt update && sudo apt install mysql-client -y
```

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
Plan: 0 to add, 0 to change, 2 to destroy.

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

**Enunciado:** No `main.tf`, o Security Group permite acesso na porta 3306 com `cidr_blocks = ["0.0.0.0/0"]`. Em um ambiente de produção, qual seria a prática correta?

- [ ] A) Manter `0.0.0.0/0` porque o RDS já tem autenticação por senha.
- [ ] B) Remover o Security Group e confiar apenas na senha do banco.
- [x] C) Restringir o `cidr_blocks` ao IP da aplicação ou da VPN corporativa. ✅
- [ ] D) Trocar a porta 3306 por uma porta secreta para evitar ataques.

**Justificativa:** O princípio do menor privilégio exige que o acesso ao banco seja restrito ao menor número possível de origens. Em produção, o `cidr_blocks` deve conter apenas o IP ou range da aplicação que precisa acessar o banco. Expor a porta 3306 para toda a internet (`0.0.0.0/0`) é aceitável apenas em laboratórios didáticos.

---

## 🏋️ Atividade Prática — Entrega no Moodle

Execute o roteiro da aula completo e documente com evidências:

1. 📸 **Screenshot** do terminal com a saída do `terraform init`.
2. 📸 **Screenshot** do terminal com o `terraform plan` mostrando `Plan: 2 to add`.
3. 📸 **Screenshot** do terminal com os **Outputs** após o `terraform apply` (mostrando o endpoint e o comando de conexão).
4. 📸 **Screenshot** do terminal **conectado ao MySQL** executando `SELECT * FROM alunos;` com os 3 registros inseridos.
5. 📸 **Screenshot** do terminal com o `terraform destroy` concluído.
6. **Dissertativa (3-5 linhas):** Explique por que o `publicly_accessible = true` é necessário neste laboratório, mas seria uma má prática em produção.

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
