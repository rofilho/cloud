---
disciplina: Cloud Computing
codigo: "14189"
titulo: "Plano Final de Semestre — Semanas 12 a 18"
tipo: planejamento
semana: 12-18
data_inicio: 2026-05-08
data_fim: 2026-06-24
status: publicado
tags:
  - cloud
  - planejamento
  - projeto-final
publicar: true
---

# 📅 Plano Final de Semestre — Cloud Computing

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados — Uniube
**Professor:** Romualdo Mathias Filho
**Período:** Semanas 12 a 18 (08/05 → 24/06/2026)
**Modelo:** Sexta = Teórica | Quarta = Prática

---

## 🎯 Objetivo do Período

Concluir os conteúdos teóricos restantes (Aulas 12–15), integrar tudo no **Projeto Final** e conduzir as apresentações. Os alunos saem com uma aplicação real rodando na nuvem.

---

## 🗓️ Calendário Detalhado

### Semana 12 — Terraform e IaC

| | Data | Tipo | Conteúdo |
|---|---|---|---|
| **Sexta** | 08/05 | 📘 Teórica | [[Aula 12 - Terraform na Pratica - IaC com Lightsail e EC2]] — Conceitos de IaC, HCL, providers, state, plan/apply/destroy |
| **Quarta** | 13/05 | 🔬 Prática | Lab: `terraform apply` criando EC2 + Security Group + output de IP público no AWS Academy |

**Objetivo da semana:** Aluno sai sabendo provisionar infraestrutura via código, sem clicar no console.

---

### Semana 13 — Redes e VPC

| | Data | Tipo | Conteúdo |
|---|---|---|---|
| **Sexta** | 15/05 | 📘 Teórica | [[Aula 15 - Redes e VPC]] — VPC, subnets públicas/privadas, Internet Gateway, NAT Gateway, Security Groups vs NACLs |
| **Quarta** | 20/05 | 🔬 Prática | Lab: criar VPC completa com Terraform — subnet pública exposta + subnet privada para banco |

**Objetivo da semana:** Aluno entende isolamento de rede e consegue criar uma VPC segura via IaC.

---

### Semana 14 — Segurança na Nuvem

| | Data | Tipo | Conteúdo |
|---|---|---|---|
| **Sexta** | 22/05 | 📘 Teórica | [[Aula 13 - Seguranca na Nuvem]] — IAM (usuários, roles, policies), least privilege, KMS, Secrets Manager, WAF |
| **Quarta** | 27/05 | 🔬 Prática | Lab: criar IAM Role para EC2 acessar S3 sem credencial hardcoded; configurar Security Group com porta mínima |

**Objetivo da semana:** Aluno aplica o princípio do menor privilégio e nunca mais coloca senha no código.

---

### Semana 15 — FinOps e Custos

| | Data | Tipo | Conteúdo |
|---|---|---|---|
| **Sexta** | 29/05 | 📘 Teórica | [[Aula 14 - FinOps e Custos]] — Free Tier, Cost Explorer, Billing Alerts, Reserved vs On-Demand vs Spot, rightsizing |
| **Quarta** | 03/06 | 🔬 Prática | Lab: configurar alerta de billing ($5), analisar Cost Explorer, calcular custo do projeto no AWS Pricing Calculator |

**Objetivo da semana:** Aluno sabe estimar, monitorar e reduzir custos de infra na nuvem.

---

### Semana 16 — Kick-off do Projeto Final

| | Data | Tipo | Conteúdo |
|---|---|---|---|
| **Sexta** | 05/06 | 🚀 Projeto | **Kick-off:** apresentação do [[avaliacoes/Projeto_Final]], formação dos grupos (2–4 pessoas), escolha de tema, dúvidas |
| **Quarta** | 10/06 | 🔬 Orientação | **⚠️ Prazo: Etapa 0** — Grupos entregam proposta. Orientação 1: professor revisa arquitetura e repositório de cada grupo |

**Entrega da semana:** Etapa 0 — Proposta (obrigatória, sem nota).

---

### Semana 17 — Desenvolvimento Assistido

| | Data | Tipo | Conteúdo |
|---|---|---|---|
| **Sexta** | 12/06 | 🔬 Orientação | **⚠️ Prazo: Etapa 1** — Documento de Arquitetura no GitHub. Orientação 2: revisão de Terraform + aplicação |
| **Quarta** | 17/06 | 🔬 Orientação | **⚠️ Prazo: Etapas 2 e 3** — Terraform + app rodando. Orientação 3: revisão de CI/CD e segurança |

**Entregas da semana:** Etapa 1 (sexta) + Etapas 2 e 3 (quarta).

---

### Semana 18 — Apresentações Finais

| | Data | Tipo | Conteúdo |
|---|---|---|---|
| **Sexta** | 19/06 | 🎤 Apresentação | **⚠️ Prazo: Etapas 4 e 5** (CI/CD + Segurança/FinOps). **Apresentações — Grupos 1 a 3** (10 min + 5 min perguntas cada) |
| **Quarta** | 24/06 | 🎤 Apresentação | **Apresentações — Grupos 4 a 6** (10 min + 5 min perguntas cada) — Encerramento da disciplina |

**Entregas da semana:** Etapas 4, 5 e 6 (apresentação ao vivo).

---

## 📦 Resumo de Entregas por Data

| Data | Etapa | Descrição | Pontos |
|---|---|---|---|
| Qua 10/06 | Etapa 0 | Proposta do grupo no GitHub | — |
| Sex 12/06 | Etapa 1 | Documento de Arquitetura | 3 pts |
| Qua 17/06 | Etapa 2 | Terraform completo | 5 pts |
| Qua 17/06 | Etapa 3 | Aplicação rodando na URL pública | 4 pts |
| Sex 19/06 | Etapa 4 | CI/CD pipeline funcionando | 3 pts |
| Sex 19/06 | Etapa 5 | Segurança e FinOps documentados | 3 pts |
| Sex 19/06 e Qua 24/06 | Etapa 6 | Apresentação + Demo ao vivo | 2 pts |
| | | **TOTAL TRABALHO** | **20 pts** |

---

## 📚 Aulas que Precisam Ser Escritas

| Aula | Arquivo | Status | Prioridade |
|---|---|---|---|
| 12 | [[Aula 12 - Terraform na Pratica - IaC com Lightsail e EC2]] | 🔧 Em progresso | Alta — 08/05 |
| 15 | [[Aula 15 - Redes e VPC]] | ❌ Placeholder | Alta — 15/05 |
| 13 | [[Aula 13 - Seguranca na Nuvem]] | ❌ Placeholder | Média — 22/05 |
| 14 | [[Aula 14 - FinOps e Custos]] | ❌ Placeholder | Média — 29/05 |

---

## 🔗 Documentos Relacionados

- [[avaliacoes/Projeto_Final]] — Especificação completa do projeto (etapas, rubricas, regras)
- [[avaliacoes/N2_Questoes]] — Banco de questões para a prova (aulas 08–15)
- [[MOC - Cloud Computing]] — MOC central da disciplina

---

*Plano elaborado em 08/05/2026 | Prof. Romualdo Mathias Filho*
