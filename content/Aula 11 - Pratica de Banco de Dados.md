# 🟢 Aula 11: Lab — Construindo um Servidor de Banco de Dados na AWS

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana 7** | Quarta-feira, 23/04/2026 | Prof. Romualdo Mathias Filho
**Tipo:** 🔬 Prática (Quarta-feira)
**Base Teórica:** Aula 10 — Bancos de Dados Gerenciados: RDS, DynamoDB e Aurora

---

## 🎯 0. Objetivo da Aula

Ao final desta aula prática, o aluno deve ser capaz de:

- **Criar** uma instância de banco de dados gerenciado com Amazon RDS
- **Configurar** grupos de segurança e sub-redes para acesso controlado ao banco
- **Conectar** uma aplicação web ao banco de dados RDS via endpoint
- **Verificar** métricas de monitoramento do banco no console AWS

---

## 🔄 1. Revisão Rápida dos Conceitos (5 min)

| Conceito (da aula teórica) | Aplicação Prática Hoje |
|---|---|
| RDS = banco de dados gerenciado pela AWS | Criar e configurar instância RDS MySQL |
| Multi-AZ = alta disponibilidade | Opção visível na criação da instância |
| Security Group = firewall de regras | Liberar porta 3306 para o EC2 acessar o RDS |
| Endpoint = endereço de conexão | Usar o endpoint gerado pelo RDS para conectar |
| Subnet Group = grupo de sub-redes | Criar DB Subnet Group na VPC correta |

---

## 📋 2. Pré-requisitos

- [ ] Acesso ao AWS Academy Learner Lab ativo (aguardar status verde)
- [ ] Módulo AWS Academy: **2.4 — Serviços Essenciais: Bancos de Dados (RDS, DynamoDB)**
- [ ] Lab: **Build Your DB Server and Interact with Your DB Using an App**
- [ ] Navegador atualizado com acesso ao Console AWS

---

## 🔬 3. Atividade Prática Principal

### Módulo AWS Academy: 2.4 — Bancos de Dados
**Lab:** Build Your DB Server and Interact with Your DB Using an App

⏱️ **Tempo estimado:** 45–60 minutos

---

### Etapa 1: Iniciar o Lab no AWS Academy

1. Acesse [https://awsacademy.instructure.com](https://awsacademy.instructure.com) e faça login
2. Acesse **AWS Academy Cloud Foundations** → **Módulos** → **Módulo 9**
3. Clique em **Launch AWS Academy Learner Lab**
4. Aguarde o status 🟢 e clique em **AWS** para abrir o Console

✅ **Checkpoint:** Console AWS aberto, região us-east-1 visível no canto superior direito.

---

### Etapa 2: Criar o Security Group para o RDS

1. Pesquise **VPC** → **Security Groups** → **Create security group**
2. Preencha:
   - Name: `DB-SecurityGroup`
   - Description: `Permite acesso MySQL ao RDS`
   - VPC: selecione a VPC padrão do lab
3. Em Inbound rules → Add rule:
   - Type: MySQL/Aurora | Protocol: TCP | Port: **3306** | Source: Security Group da EC2
4. Clique em **Create security group**

✅ **Checkpoint:** `DB-SecurityGroup` criado com regra de entrada na porta 3306.

---

### Etapa 3: Criar o DB Subnet Group

1. Pesquise **RDS** → menu lateral → **Subnet groups** → **Create DB Subnet Group**
2. Preencha:
   - Name: `DB-SubnetGroup`
   - VPC: mesma VPC do passo anterior
3. Adicione sub-redes em pelo menos 2 zonas de disponibilidade diferentes (ex: us-east-1a e us-east-1b)
4. Clique em **Create**

✅ **Checkpoint:** Subnet Group com status "Complete" e 2+ sub-redes associadas.

---

### Etapa 4: Criar a Instância RDS MySQL

1. RDS → **Databases** → **Create database**
2. Configurações:
   - Creation method: **Standard Create**
   - Engine: **MySQL** | Version: MySQL 8.0.x
   - Template: **Free tier**
   - DB instance identifier: `lab-db`
   - Master username: `admin` | Password: `lab-password`
   - Instance class: `db.t3.micro`
   - Storage: 20 GB gp2 (desmarque autoscaling)
   - VPC: Lab VPC | DB Subnet Group: `DB-SubnetGroup`
   - Public access: **No**
   - Security Group: `DB-SecurityGroup`
   - Initial database name: `lab`
   - Desmarque "Enable automated backups"
3. Clique em **Create database** e aguarde 5–10 minutos

✅ **Checkpoint:** Instância `lab-db` com status **Available** em verde.

---

### Etapa 5: Anotar o Endpoint

1. Clique em `lab-db` → aba **Connectivity & security**
2. Copie o **Endpoint** (ex: `lab-db.xxxxxx.us-east-1.rds.amazonaws.com`)
3. Anote a porta: **3306**

✅ **Checkpoint:** Endpoint copiado — este é o endereço de conexão para aplicações.

---

### Etapa 6: Conectar o Web App ao Banco

1. Vá em EC2 → Instances → copie o IP público da instância web do lab
2. Abra no navegador: `http://<IP-da-EC2>/`
3. No formulário, preencha:
   - Endpoint: cole o endpoint do RDS
   - Database: `lab` | Username: `admin` | Password: `lab-password`
4. Clique em **Submit**

✅ **Checkpoint:** Aplicação exibe "Successfully Connected!" com dados carregados do banco.

---

### Etapa 7: Explorar e Validar

1. Insira um novo registro na aplicação web
2. Atualize a página e verifique se o registro persiste
3. No console RDS → `lab-db` → aba **Monitoring**: observe CPU, DB Connections, IOPS

✅ **Checkpoint:** Registro inserido visível após reload. Métricas ativas no painel de monitoramento.

---

## ⚠️ 4. Troubleshooting Comum

| Problema | Causa Provável | Solução |
|---|---|---|
| RDS fica em "Creating" por mais de 15 min | Erro silencioso na configuração | Verificar aba Events na instância |
| App retorna "Connection refused" | Security Group bloqueando porta 3306 | Conferir regra de entrada SG do RDS |
| "Access denied for user 'admin'" | Senha incorreta | Confirmar credenciais usadas na criação |
| Subnet Group falha | Sub-redes em apenas uma AZ | Adicionar sub-rede em segunda AZ |
| App não carrega no IP da EC2 | EC2 parada ou porta 80 bloqueada | Verificar estado da EC2 e SG (porta 80) |

---

## 📝 5. Exercício Avaliativo

**Entrega:** Screenshots das etapas concluídas
**Prazo:** Até o início da próxima aula

**O que entregar:**
1. Screenshot da instância RDS com status Available (com endpoint visível)
2. Screenshot da aplicação web mostrando conexão bem-sucedida
3. Screenshot do Monitoring do RDS com pelo menos uma métrica ativa
4. (Bônus) Registro inserido via app e confirmado no banco

**Critérios:**
1. Instância criada com parâmetros corretos
2. Conexão EC2↔RDS demonstrada na aplicação
3. Evidência de monitoramento ativo

---

## 📋 6. Resumo da Prática

| O que fizemos | Serviço Utilizado | Conceito Relacionado |
|---|---|---|
| Criamos regras de acesso ao banco | VPC Security Groups | Segurança de rede em camadas |
| Definimos sub-redes do banco | DB Subnet Group | Isolamento de rede e alta disponibilidade |
| Criamos instância de banco gerenciada | Amazon RDS MySQL 8.0 | Banco de dados como serviço (DBaaS) |
| Obtivemos o endereço de conexão | RDS Endpoint | Descoberta de serviço em nuvem |
| Conectamos app ao banco | EC2 + RDS via rede privada | Arquitetura de 3 camadas |
| Monitoramos a instância | CloudWatch / RDS Monitoring | Observabilidade de infraestrutura |

---

## 📚 7. Material de Apoio

### Documentação Oficial

| Recurso | Link |
|---|---|
| Amazon RDS User Guide | https://docs.aws.amazon.com/rds/latest/userguide/Welcome.html |
| Getting Started: RDS MySQL | https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.MySQL.html |
| DB Subnet Groups | https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html |

### Vídeos de Apoio

| Canal/Autor | Título | Link |
|---|---|---|
| AWS | Amazon RDS Overview | https://www.youtube.com/watch?v=eMzCI7S1P9M |
| TechWorld with Nana | AWS RDS Tutorial for Beginners | https://www.youtube.com/watch?v=vLaW9LNKL0U |
