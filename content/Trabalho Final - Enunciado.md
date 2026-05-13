---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"
disciplina: Cloud Computing
codigo: "14189"
titulo: "Enunciado do Trabalho Final e Prova N2"
tipo: avaliacao
semana: 12
data: 2026-05-08
status: publicado
tags:
  - cloud
  - avaliacao
  - projeto-final
  - prova
publicar: true
---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

# 📋 Trabalho Final e Prova N2 — Cloud Computing

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados — Uniube
**Professor:** Romualdo Mathias Filho
**Publicado em:** 08/05/2026

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

> 💬 *"Durante o semestre vocês aprenderam os blocos de montar da nuvem — EC2, Lambda, RDS, VPC, Terraform, CI/CD, IAM. Agora é hora de juntar tudo e construir algo real. O mercado não contrata quem sabe a teoria: contrata quem já colocou algo no ar."*

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

## 🧮 Como a Nota é Formada

A nota desta segunda parte do semestre vale **35 pontos**, distribuídos assim:

| Componente | Pontos |
|---|---|
| 🏗️ Trabalho Final (projeto em grupo) | 20 pts |
| 📝 Prova N2 (individual) | 15 pts |
| **Total** | **35 pts** |

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

## 🏗️ Parte 1 — Trabalho Final em Grupo

### O que é

Vocês vão **construir, documentar e apresentar uma aplicação real hospedada na AWS**. Não é um relatório sobre cloud computing — é uma aplicação que qualquer pessoa pode acessar pela internet, provisionada com código, com deploy automático e com segurança aplicada.

### Grupos

- **2 a 4 integrantes**
- Cada integrante deve ter commits no repositório
- Grupos formados e confirmados até **quarta-feira, 10/06**

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

### O que a aplicação precisa ter

Independente do tema escolhido, **toda aplicação deve ter obrigatoriamente**:

| Requisito | Descrição |
|---|---|
| ☁️ Hospedada na AWS | Rodando em EC2, Lambda ou equivalente |
| 🔧 Infraestrutura como Código | 100% provisionado com Terraform (VPC, compute, banco) |
| 🗄️ Banco de dados integrado | RDS ou DynamoDB conectado à aplicação |
| 🔄 CI/CD automático | Push no GitHub → deploy acontece sozinho |
| 🔐 Segurança aplicada | IAM Role correto, sem senha no código, portas mínimas abertas |
| 📄 Documentação | README com diagrama de arquitetura e custo estimado |
| 🎤 Apresentação ao vivo | Demo funcionando na data marcada |

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

### Temas possíveis

Escolham **um** dos temas abaixo ou proponham o próprio (com aprovação do professor até 10/06):

| Opção | Tema | Ideia |
|---|---|---|
| **A** | API de Machine Learning | FastAPI ou Flask com um modelo sklearn simples (previsão de preço, classificação de texto, detecção de spam…) |
| **B** | API CRUD com Banco | Backend com criação, leitura, atualização e exclusão de registros em RDS ou DynamoDB |
| **C** | Pipeline de Dados Serverless | Arquivo CSV/JSON enviado ao S3 → Lambda processa → resultado salvo no DynamoDB |
| **D** | Aplicação Web Completa | Frontend estático (S3) + API (Lambda ou EC2) + banco de dados |
| **E** | Tema Livre | Qualquer ideia, desde que use pelo menos 3 serviços AWS e todos os requisitos acima |

> 💡 **Dica para quem é de IA/Ciência de Dados:** o Tema A é o mais alinhado com a carreira de vocês. Treinar um modelo simples localmente e expô-lo como API na AWS é exatamente o que engenheiros de ML fazem no mercado.

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

### As 6 Etapas de Entrega

O trabalho é desenvolvido e acompanhado em partes. **Cada etapa tem um prazo para garantir o ritmo do projeto.**

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

#### Etapa 0 — Proposta do Grupo
**Prazo:** Quarta, 10/06

Antes de começar a codar, o grupo precisa ter um plano. Entreguem um documento (`.md` ou Google Docs) com:

- Nome completo e matrícula de cada integrante
- Tema escolhido e o que a aplicação vai fazer (5 a 10 linhas)
- Rascunho da arquitetura (desenho, foto de papel, Excalidraw — qualquer coisa)
- Lista dos serviços AWS que pretendem usar
- Link do repositório GitHub já criado (pode estar vazio)

> ⚠️ Grupo que não entregar a Etapa 0 **não poderá apresentar** o trabalho.

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

#### Etapa 1 — Documento de Arquitetura
**Prazo:** Sexta, 12/06

Arquivo `docs/arquitetura.md` dentro do repositório GitHub, contendo:

- **Diagrama da arquitetura** — pode ser draw.io, Lucidchart, Mermaid ou até uma foto bem feita de um papel
- **Descrição de cada serviço AWS** e por que o grupo escolheu aquele serviço
- **Fluxo dos dados** — como a informação entra, é processada e armazenada
- **Estimativa de custo mensal** usando o [AWS Pricing Calculator](https://calculator.aws)
- **Pelo menos uma decisão de arquitetura explicada** — ex: *"escolhemos Lambda em vez de EC2 porque nossa aplicação tem picos de uso curtos e o Lambda é mais barato nesse cenário"*

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

#### Etapa 2 — Infraestrutura como Código
**Prazo:** Quarta, 17/06

Diretório `infra/` no repositório com todos os arquivos Terraform. A infraestrutura **deve subir do zero** com um único comando: `terraform apply`.

**Arquivos obrigatórios:**

```
infra/
├── main.tf        ← EC2, Lambda ou recurso principal
├── network.tf     ← VPC, subnets, security groups
├── database.tf    ← RDS ou DynamoDB
├── variables.tf   ← sem senhas ou chaves hardcoded
├── outputs.tf     ← URL ou IP da aplicação como output
└── README.md      ← como rodar (terraform init → plan → apply)
```

> ⚠️ **Atenção:** O professor vai rodar `terraform apply` durante a avaliação. Se não funcionar, a nota da parte escrita cai.

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

#### Etapa 3 — Aplicação Rodando na Nuvem
**Prazo:** Quarta, 17/06

Código da aplicação no diretório `app/` do repositório, com a aplicação **acessível publicamente via URL** no momento da apresentação.

**Itens obrigatórios:**
- Endpoint `/health` que retorna `{"status": "ok"}` — é o sinal de vida da aplicação
- Pelo menos 1 endpoint que leia ou escreva no banco de dados
- `app/README.md` com instruções para rodar localmente e variáveis de ambiente necessárias

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

#### Etapa 4 — Pipeline CI/CD
**Prazo:** Sexta, 19/06

Arquivo `.github/workflows/deploy.yml` no repositório. O pipeline deve **disparar automaticamente** quando alguém fizer push para a branch `main`.

**O que o pipeline deve fazer (no mínimo):**
1. Fazer o build ou validar o código
2. Fazer o deploy da aplicação na AWS automaticamente

**Evidência obrigatória:** screenshot ou link para um run bem-sucedido do pipeline documentado no README.

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

#### Etapa 5 — Segurança e FinOps
**Prazo:** Sexta, 19/06

Seção `## Segurança e Custos` no `README.md` principal do repositório.

**Itens obrigatórios:**
- IAM Role com permissões mínimas — só o que a aplicação realmente precisa
- Security Groups expondo apenas as portas necessárias (ex: só 443 e 80 para fora)
- **Zero credenciais expostas** no código ou no histórico do git (sim, o professor vai checar o histórico)
- Print do Cost Explorer ou do AWS Pricing Calculator mostrando o custo do projeto
- Pelo menos 1 decisão de FinOps documentada — ex: *"usamos t2.micro porque cabe no Free Tier"*

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

#### Etapa 6 — Apresentação Final
**Data:** Sexta, 19/06 (grupos 1–3) e Quarta, 24/06 (grupos 4–6)
**Duração:** 10 minutos de apresentação + 5 minutos de perguntas

Apresentem com slides (máximo 8) e façam uma **demo ao vivo** da aplicação funcionando.

**Estrutura sugerida:**

| Slide | O que colocar |
|---|---|
| 1 | Nome do projeto, grupo, integrantes |
| 2 | O que a aplicação faz (problema que resolve) |
| 3 | Diagrama da arquitetura |
| 4 | Demo ao vivo — não precisa de slide, abram o navegador |
| 5 | Terraform: o que foi provisionado |
| 6 | CI/CD: mostrem o pipeline rodando |
| 7 | Segurança e custos: decisões que tomaram |
| 8 | O que aprenderam e o que foi difícil |

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

### 📊 Como os 20 pontos serão avaliados

A avaliação não dará pontos isolados por etapa. A nota de **20 pontos** será atribuída de forma unificada considerando o pacote final:

| Componente | Critérios | Pontos |
|---|---|---|
| **Parte Escrita / Código (Repositório)** | Arquitetura documentada, Terraform provisionando tudo sem erros (`terraform apply`), aplicação funcionando no IP/URL público, pipeline de CI/CD automatizado, segurança (sem senhas expostas, portas corretas) e custos documentados. | **15 pts** |
| **Apresentação e Arguição** | Demonstração ao vivo funcionando perfeitamente, slides claros, domínio técnico do grupo ao responder às perguntas do professor sobre a arquitetura e o código. | **5 pts** |

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

### Estrutura esperada do repositório

```
meu-projeto-cloud/          ← repositório público no GitHub
│
├── infra/                  ← Etapa 2: Terraform
│   ├── main.tf
│   ├── network.tf
│   ├── database.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── README.md
│
├── app/                    ← Etapa 3: código da aplicação
│   ├── main.py (ou index.js, etc.)
│   ├── requirements.txt
│   └── README.md
│
├── docs/                   ← Etapa 1: documentação
│   └── arquitetura.md
│
├── .github/
│   └── workflows/
│       └── deploy.yml      ← Etapa 4: pipeline CI/CD
│
└── README.md               ← Etapa 5: segurança, custos, como usar
```

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

### Calendário de Entregas

| Data | O que entregar |
|---|---|
| Qua, 10/06 | Etapa 0 — Proposta do grupo (obrigatória) |
| Sex, 12/06 | Etapa 1 — Documento de Arquitetura no GitHub |
| Qua, 17/06 | Etapas 2 e 3 — Terraform + Aplicação rodando |
| Sex, 19/06 | Etapas 4 e 5 — CI/CD + Segurança/FinOps |
| Sex, 19/06 | Etapa 6 — Apresentação (grupos 1–3) |
| Qua, 24/06 | Etapa 6 — Apresentação (grupos 4–6) |

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

### Regras importantes

**Sobre o repositório:**
- Deve ser **público** no GitHub
- O histórico de commits será avaliado — grupos com 1 commit só no dia da entrega perdem pontos
- Cada integrante deve ter **pelo menos 1 commit** no repositório
- Código copiado de outro grupo = **zero na etapa para os dois grupos**

**Sobre a infraestrutura:**
- Usem o **AWS Academy (Learner Lab)** ou o **Free Tier** da própria conta
- Após a apresentação, rodem `terraform destroy` para não consumir créditos

**Sobre atrasos:**

| Situação | Penalidade |
|---|---|
| Até 48h de atraso | -20% dos pontos da etapa |
| Entre 48h e 1 semana | -50% dos pontos da etapa |
| Mais de 1 semana ou não entregue | Zero na etapa |
| Etapa 0 não entregue | Grupo impedido de apresentar |

**Sobre uso de IA (ChatGPT, Claude, Copilot):**

Pode e é incentivado. Mas:
- Vocês precisam **entender e explicar** qualquer código gerado por IA
- Se o professor perguntar "por que fizeram assim?", a resposta *"a IA gerou"* não é aceitável sozinha
- Declarem no README quais partes foram assistidas por IA

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

## 📝 Parte 2 — Prova N2 (Individual)

### O que é

Prova **individual e sem consulta**, aplicada em data a confirmar pelo professor, valendo **15 pontos**.

### O que será cobrado

A prova cobre as **aulas 08 a 15** — a segunda metade do semestre:

| Aula | Tópico |
|---|---|
| 08 | EC2, AWS CLI e Terraform básico |
| 09 | Auto Scaling e Lambda na prática |
| 10 | Banco de dados na nuvem (RDS, DynamoDB) |
| 11 | Prática de banco de dados |
| 11.5 | CI/CD, GitOps, observabilidade |
| 12 | Terraform na prática — IaC completo |
| 13 | Segurança na nuvem (IAM, KMS, Security Groups) |
| 14 | FinOps e otimização de custos |
| 15 | Redes e VPC |

### Formato da prova

| Tipo de questão | Quantidade | Pontos |
|---|---|---|
| Múltipla escolha (4 alternativas) | 8 questões | 8 pts |
| Verdadeiro ou Falso com justificativa | 4 questões | 4 pts |
| Dissertativa curta (1 parágrafo) | 1 questão | 3 pts |
| **Total** | | **15 pts** |

### Como se preparar

- Revise os **Resumos Estruturais** no final de cada aula (tabela Conceito → Definição)
- Pratique os labs que fizemos nas quartas-feiras — as questões partem de situações práticas
- As questões da prova vêm do **Banco de Questões** de cada aula
- Entender o projeto do grupo ajuda: quem implementou entende a teoria muito melhor

> 💡 **Dica:** Quem faz o projeto com atenção normalmente vai bem na prova — os conceitos se fixam na prática.

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

## ❓ Dúvidas Frequentes

**Posso usar outro provedor (GCP, Azure)?**
Não. O projeto usa AWS para alinhar com o AWS Academy e com o conteúdo da disciplina.

**E se minha aplicação cair no dia da apresentação?**
Um vídeo gravado de até 5 minutos serve como backup para as Etapas 3 e 6. O grupo perde 0,5 pt da demonstração ao vivo, mas não zera.

**Preciso usar todos os serviços que aprendi no semestre?**
Não todos, mas no mínimo **3 serviços AWS diferentes** integrados entre si.

**O que acontece se um integrante não aparecer na apresentação?**
Esse integrante recebe zero na Etapa 6. O restante do grupo não é penalizado.

**Onde entrego a Etapa 0?**
No **Diário de Bordo do AVA**.

---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"

*Qualquer dúvida, procure o professor antes das datas de entrega — não depois.*

*Cloud Computing — Uniube 2026 | Prof. Romualdo Mathias Filho*
