---
disciplina: Cloud Computing
codigo: "14189"
titulo: "Projeto Final — Deploy de Aplicação na Nuvem"
tipo: avaliacao
semana: 16-18
data_inicio: 2026-06-05
data_entrega_final: 2026-06-24
status: publicado
tags:
  - cloud
  - aws
  - terraform
  - cicd
  - projeto-final
  - avaliacao
publicar: true
---

# 🚀 Projeto Final — Deploy de Aplicação na Nuvem

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados — Uniube
**Professor:** Romualdo Mathias Filho
**Valor total:** 20 pontos (+ 15 pts de prova = 35 pts da nota final)
**Grupos:** 2 a 4 integrantes

---

> 💬 *"O projeto final é a prova de que vocês saíram do laboratório e colocaram algo real no ar. Não estamos avaliando se ficou bonito — estamos avaliando se funciona, se foi construído com boas práticas, e se vocês conseguem explicar cada escolha que fizeram."*

---

## 🎯 Objetivo do Projeto

Construir, documentar e apresentar uma **aplicação funcional hospedada na nuvem AWS**, provisionada com **Infraestrutura como Código (Terraform)**, com **pipeline CI/CD automatizado** e práticas de **segurança aplicadas**.

O projeto integra todos os conteúdos da disciplina: EC2/Lambda, RDS/DynamoDB, VPC, IAM, Terraform, CI/CD e FinOps.

---

## 🗂️ Tema do Projeto (Escolha do Grupo)

Cada grupo escolhe **uma** das opções abaixo. Qualquer tema é válido desde que atenda aos [Itens Obrigatórios](#itens-obrigatórios).

| # | Tema Sugerido | Descrição Resumida |
|---|---|---|
| A | **API de Machine Learning** | FastAPI ou Flask com modelo sklearn (previsão, classificação) — ideal para IA/DS |
| B | **API CRUD com Banco de Dados** | Backend com endpoints de criação, leitura, atualização e exclusão + RDS ou DynamoDB |
| C | **Pipeline de Dados Serverless** | S3 → Lambda → DynamoDB: ingestão e transformação automática de arquivos CSV/JSON |
| D | **Aplicação Web Completa** | Frontend estático (S3) + API (Lambda/EC2) + Banco (RDS/DynamoDB) |
| E | **Tema Livre** | Proposta validada pelo professor até a semana 16 |

> ⚠️ **Regra:** Seja qual for o tema, a arquitetura deve usar **pelo menos 3 serviços AWS diferentes** e todos os [Itens Obrigatórios](#itens-obrigatórios) devem estar presentes.

---

## 📦 Itens Obrigatórios

Todo projeto, independente do tema, **deve conter obrigatoriamente**:

- [ ] **Repositório público no GitHub** com o código completo
- [ ] **Terraform** para provisionar 100% da infraestrutura (VPC, compute, banco)
- [ ] **Aplicação rodando e acessível** via URL pública (IP ou domínio)
- [ ] **Banco de dados na nuvem** integrado à aplicação (RDS ou DynamoDB)
- [ ] **Pipeline CI/CD** (GitHub Actions ou equivalente) com deploy automático no push para `main`
- [ ] **IAM Role** configurado corretamente (sem credenciais hardcoded no código ou no Terraform)
- [ ] **README.md** com diagrama de arquitetura, instruções de deploy e custo estimado
- [ ] **Apresentação ao vivo** com demo funcionando na data marcada

---

## 📋 Etapas de Entrega

O projeto é dividido em **6 etapas**. Cada etapa tem data, forma de entrega e pontuação específica.

---

### Etapa 0 — Proposta do Projeto *(sem nota — mas obrigatória)*
**Prazo:** Semana 16 — até quarta-feira (10/06)
**Forma:** Arquivo `.md` ou Google Docs enviado pelo grupo

**O que entregar:**
- Nome do grupo e integrantes (nome completo + matrícula)
- Tema escolhido (A, B, C, D ou E)
- Descrição em 5-10 linhas: o que a aplicação faz
- Rascunho da arquitetura (pode ser feito no draw.io, Excalidraw ou até papel fotografado)
- Serviços AWS que pretendem usar
- Link do repositório GitHub já criado (pode estar vazio)

> ⚠️ **Grupos que não entregarem a Etapa 0 não poderão participar da apresentação final.**

---

### Etapa 1 — Documento de Arquitetura *(3 pontos)*
**Prazo:** Semana 17 — sexta-feira (12/06)
**Forma:** Arquivo `docs/arquitetura.md` dentro do repositório GitHub

**O que entregar:**

| Item | Obrigatório? |
|---|---|
| Diagrama da arquitetura (draw.io, Lucidchart, Mermaid ou similar) | ✅ Sim |
| Descrição de cada serviço AWS usado e por que foi escolhido | ✅ Sim |
| Diagrama de fluxo de dados (como os dados percorrem o sistema) | ✅ Sim |
| Estimativa de custo mensal usando o [AWS Pricing Calculator](https://calculator.aws) | ✅ Sim |
| Análise de pelo menos 1 decisão de arquitetura (ex: "escolhemos Lambda em vez de EC2 porque...") | ✅ Sim |

**Critério de avaliação:**

| Sub-critério | Pontos |
|---|---|
| Diagrama completo e coerente com o que foi implementado | 1,0 |
| Justificativa de serviços e decisões com argumentos técnicos | 1,0 |
| Estimativa de custo presente e realista | 0,5 |
| Documento bem organizado e legível | 0,5 |

---

### Etapa 2 — Infraestrutura como Código *(5 pontos)*
**Prazo:** Semana 17 — quarta-feira (17/06)
**Forma:** Diretório `infra/` no repositório GitHub com todos os arquivos `.tf`

**O que entregar:**

| Item | Obrigatório? |
|---|---|
| `infra/main.tf` — recursos principais (EC2, Lambda, ou equivalente) | ✅ Sim |
| `infra/network.tf` — VPC, subnets, security groups, internet gateway | ✅ Sim |
| `infra/database.tf` — RDS ou DynamoDB | ✅ Sim |
| `infra/variables.tf` — sem valores sensíveis hardcoded | ✅ Sim |
| `infra/outputs.tf` — URL ou IP da aplicação como output | ✅ Sim |
| `infra/README.md` — instruções para rodar (`terraform init`, `plan`, `apply`) | ✅ Sim |

**Critério de avaliação:**

| Sub-critério | Pontos |
|---|---|
| `terraform apply` executa sem erros (testado ao vivo na apresentação) | 2,0 |
| VPC com subnets públicas/privadas e security groups corretos | 1,0 |
| Banco de dados provisionado via Terraform e conectado à app | 1,0 |
| Sem credenciais ou secrets hardcoded nos arquivos `.tf` | 1,0 |

> 💡 **Dica:** Use variáveis de ambiente ou `terraform.tfvars` (no `.gitignore`) para senhas e keys.

---

### Etapa 3 — Aplicação Rodando na Nuvem *(4 pontos)*
**Prazo:** Semana 17 — quarta-feira (17/06) *(mesmo prazo da Etapa 2)*
**Forma:** Código no repositório + URL da aplicação acessível publicamente

**O que entregar:**

| Item | Obrigatório? |
|---|---|
| Código da aplicação no diretório `app/` do repositório | ✅ Sim |
| Endpoint `/health` que retorna `{"status": "ok"}` | ✅ Sim |
| Pelo menos 1 endpoint funcional que leia ou escreva no banco de dados | ✅ Sim |
| URL pública funcionando no momento da apresentação | ✅ Sim |
| `app/README.md` — como rodar localmente e variáveis de ambiente necessárias | ✅ Sim |

**Critério de avaliação:**

| Sub-critério | Pontos |
|---|---|
| Aplicação responde via URL pública no dia da apresentação | 2,0 |
| Integração com banco de dados funcionando (leitura ou escrita demonstrada) | 1,0 |
| Código organizado, sem segredos expostos, com README de execução local | 1,0 |

---

### Etapa 4 — Pipeline CI/CD *(3 pontos)*
**Prazo:** Semana 18 — sexta-feira (19/06)
**Forma:** Diretório `.github/workflows/` no repositório com o arquivo do pipeline

**O que entregar:**

| Item | Obrigatório? |
|---|---|
| Arquivo `.github/workflows/deploy.yml` (ou equivalente) | ✅ Sim |
| Pipeline dispara automaticamente no `push` para branch `main` | ✅ Sim |
| Pipeline executa pelo menos: build/teste + deploy na nuvem | ✅ Sim |
| Evidência de pipeline executado com sucesso (screenshot ou link para o run) | ✅ Sim |
| Secrets configurados no GitHub (sem credenciais no arquivo YAML) | ✅ Sim |

**Critério de avaliação:**

| Sub-critério | Pontos |
|---|---|
| Pipeline dispara e conclui com sucesso no push para `main` | 1,5 |
| Deploy automático reflete a última versão da aplicação na nuvem | 1,0 |
| Secrets configurados no GitHub Actions (sem hardcode no YAML) | 0,5 |

---

### Etapa 5 — Segurança e FinOps *(3 pontos)*
**Prazo:** Junto com o repositório final — semana 18 (19/06)
**Forma:** Seção `## Segurança e Custos` no `README.md` principal do repositório

**O que entregar:**

| Item | Obrigatório? |
|---|---|
| IAM Role com permissões mínimas (princípio do menor privilégio) | ✅ Sim |
| Security Groups que expõem apenas as portas necessárias | ✅ Sim |
| Nenhuma credencial (senhas, keys, tokens) exposta no código ou no git | ✅ Sim |
| Custo real ou estimado do projeto (print do Cost Explorer ou AWS Calculator) | ✅ Sim |
| Pelo menos 1 ação de redução de custo tomada (ex: instância t2.micro, free tier, Lambda no lugar de EC2) | ✅ Sim |

**Critério de avaliação:**

| Sub-critério | Pontos |
|---|---|
| IAM correto e security groups fechados ao necessário | 1,0 |
| Zero credenciais expostas (verificado no histórico do git também) | 1,0 |
| Análise de custo documentada com pelo menos 1 decisão FinOps | 1,0 |

---

### Etapa 6 — Apresentação Final *(2 pontos)*
**Data:** Semana 18 — sexta (19/06) ou quarta (24/06) conforme grade definida pelo professor
**Duração por grupo:** 10 minutos de apresentação + 5 minutos de perguntas
**Formato:** Slides (máximo 8 slides) + demo ao vivo

**Estrutura sugerida dos slides:**

| Slide | Conteúdo |
|---|---|
| 1 | Nome do projeto, grupo, integrantes |
| 2 | Problema que resolve / o que a aplicação faz |
| 3 | Arquitetura (diagrama) |
| 4 | Demo ao vivo (não precisa de slide — é ao vivo) |
| 5 | Terraform: o que foi provisionado |
| 6 | CI/CD: mostrar pipeline executando |
| 7 | Segurança + Custos: decisões tomadas |
| 8 | Aprendizados do grupo e dificuldades encontradas |

**Critério de avaliação:**

| Sub-critério | Pontos |
|---|---|
| Demo ao vivo funciona (aplicação respondendo, banco conectado) | 1,0 |
| Apresentação clara, cada integrante explica sua parte | 0,5 |
| Respostas às perguntas do professor demonstram entendimento técnico | 0,5 |

---

## 📊 Resumo da Pontuação

### Trabalho — 20 pontos

| Etapa | Descrição | Pontos |
|---|---|---|
| Etapa 0 | Proposta (obrigatória, sem nota) | — |
| Etapa 1 | Documento de Arquitetura | 3 pts |
| Etapa 2 | Infraestrutura como Código (Terraform) | 5 pts |
| Etapa 3 | Aplicação Rodando na Nuvem | 4 pts |
| Etapa 4 | Pipeline CI/CD | 3 pts |
| Etapa 5 | Segurança e FinOps | 3 pts |
| Etapa 6 | Apresentação Final + Demo ao Vivo | 2 pts |
| **TOTAL TRABALHO** | | **20 pts** |

### Prova — 15 pontos

| Componente | Descrição | Pontos |
|---|---|---|
| N2 | Questões sobre as aulas 08 a 15 (teoria + prática) | 15 pts |
| **TOTAL PROVA** | | **15 pts** |

### Total Geral — 35 pontos

| Componente | Pontos |
|---|---|
| Trabalho Final | 20 pts |
| Prova N2 | 15 pts |
| **TOTAL** | **35 pts** |

---

## ⚠️ Regras Gerais

### Repositório e Código

- O repositório **deve ser público** até a data da apresentação
- **Histórico de commits** é avaliado: grupos com apenas 1 commit no dia da entrega perderão pontos na Etapa 2 e 3
- Cada integrante do grupo **deve ter pelo menos 1 commit** no repositório
- Código copiado de outro grupo resulta em **zero na etapa correspondente para ambos os grupos**

### Infraestrutura e Custos

- Usem **exclusivamente o AWS Academy** (Learner Lab) ou o **AWS Free Tier** da conta própria
- Não é permitido usar serviços fora do escopo ensinado sem justificativa no documento de arquitetura
- **Destruam os recursos após a apresentação** (`terraform destroy`) para não consumir créditos

### Atrasos

| Situação | Penalidade |
|---|---|
| Entrega em até 48h após o prazo | -20% dos pontos da etapa |
| Entrega entre 48h e 1 semana de atraso | -50% dos pontos da etapa |
| Não entregue ou entregue após 1 semana | Zero na etapa |
| Etapa 0 não entregue | Grupo impedido de apresentar |

### Integridade Acadêmica

- Uso de IA (ChatGPT, Claude, Copilot) é **permitido e incentivado**, mas:
  - O grupo deve **entender e saber explicar** qualquer código gerado por IA
  - Se perguntado na apresentação "por que vocês fizeram assim?", a resposta "a IA gerou" **não é aceitável sozinha**
  - Declarem no README quais partes foram assistidas por IA

---

## 🗓️ Calendário de Entregas

| Data | Evento |
|---|---|
| Qua, 10/06 | **Etapa 0:** Proposta do grupo (obrigatória, sem nota) |
| Sex, 12/06 | **Etapa 1:** Documento de Arquitetura no GitHub |
| Qua, 17/06 | **Etapas 2 e 3:** Terraform + Aplicação rodando |
| Sex, 19/06 | **Etapas 4 e 5:** CI/CD + Segurança/FinOps + Apresentações (grupos 1-3) |
| Qua, 24/06 | **Etapa 6:** Apresentações finais (grupos 4-6) |

---

## 💡 Dicas e Recursos

### Para começar o Terraform
```hcl
# infra/main.tf — estrutura mínima
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}
```

### Para o pipeline CI/CD (GitHub Actions)
```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
```

### Referências obrigatórias
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Terraform AWS Provider Docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [GitHub Actions para AWS](https://github.com/aws-actions)

---

## ❓ Dúvidas Frequentes

**Posso usar GCP ou Azure em vez de AWS?**
Não. O projeto deve usar AWS para alinhar com o conteúdo da disciplina e com o AWS Academy.

**Posso fazer sozinho?**
Não. O trabalho é em grupos de 2 a 4 integrantes. Grupos de 1 integrante só serão aceitos com justificativa ao professor.

**E se a aplicação cair no dia da apresentação?**
Vídeo gravado (máx 5 min) serve como backup para as Etapas 3 e 6. Mas o grupo perde 0,5 pt da demonstração ao vivo.

**Preciso usar todos os serviços AWS que aprendi no semestre?**
Não todos, mas o mínimo são 3 serviços diferentes integrados entre si.

---

*Documento elaborado pelo Prof. Romualdo Mathias Filho | Cloud Computing — Uniube 2026*
*Dúvidas: enviar pelo grupo da turma.*
