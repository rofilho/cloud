---
title: "📋 Trabalho Final e Prova N2 — Cloud Computing"
---

# 📋 Trabalho Final e Prova N2 — Cloud Computing

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados — Uniube
**Professor:** Romualdo Mathias Filho
**Publicado em:** 08/05/2026

---

> 💬 *"Durante o semestre vocês aprenderam os blocos de montar da nuvem — EC2, Lambda, RDS, VPC, Terraform, CI/CD, IAM. Agora é hora de juntar tudo e construir algo real. O mercado não contrata quem sabe a teoria: contrata quem já colocou algo no ar."*

---

## 🧮 Como a Nota é Formada

A nota desta segunda parte do semestre vale **35 pontos**, distribuídos assim:

| Componente | Pontos |
|---|---|
| 🏗️ Trabalho Final (projeto em grupo) | 20 pts |
| 📝 Prova N2 (individual) | 15 pts |
| **Total** | **35 pts** |

---

## 🏗️ Parte 1 — Trabalho Final em Grupo

### O que é

Vocês vão **construir, documentar e apresentar uma aplicação real hospedada na AWS**. Não é um relatório sobre cloud computing — é uma aplicação que qualquer pessoa pode acessar pela internet, com infraestrutura configurada, segurança aplicada e documentação completa.

### Grupos

- **2 a 4 integrantes**
- Grupos formados e confirmados até **quarta-feira, 10/06**

---

### O que a aplicação precisa ter

Independente do tema escolhido, **toda aplicação deve ter obrigatoriamente**:

| Requisito | Descrição | Obrigatório? |
|---|---|---|
| ☁️ Hospedada na AWS | Rodando em EC2, Lambda ou equivalente | ✅ Sim |
| 🗄️ Banco de dados integrado | RDS ou DynamoDB conectado à aplicação | ✅ Sim |
| 🔐 Segurança aplicada | IAM correto, sem senha no código, portas mínimas abertas | ✅ Sim |
| 📄 Documentação | README com diagrama de arquitetura e custo estimado | ✅ Sim |
| 🎤 Apresentação ao vivo | Demo funcionando na data marcada | ✅ Sim |
| 🎥 Vídeo do projeto | Máximo 5 minutos explicando o projeto com a AWS aberta | ✅ Sim |
| 🔧 Infraestrutura como Código | Provisionado com Terraform (VPC, compute, banco) | ⭐ Fortemente aconselhado |
| 🔄 CI/CD automático | Push no GitHub → deploy acontece sozinho | ⭐ Aconselhado |

> 💡 **Terraform e CI/CD não são obrigatórios**, mas **são fortemente recomendados** e agregam pontos na avaliação. O professor pode pedir uma demonstração prática durante a apresentação.

---

### Temas possíveis

Escolham **um** dos temas abaixo ou proponham o próprio (com aprovação do professor até 10/06):

| Opção | Tema | Ideia |
|---|---|---|
| **A** | API de Machine Learning | FastAPI ou Flask com um modelo sklearn simples (previsão de preço, classificação de texto…) |
| **B** | API CRUD com Banco | Backend com criação, leitura, atualização e exclusão de registros em RDS ou DynamoDB |
| **C** | Pipeline de Dados Serverless | Arquivo CSV/JSON enviado ao S3 → Lambda processa → resultado salvo no DynamoDB |
| **D** | Aplicação Web Completa | Frontend estático (S3) + API (Lambda ou EC2) + banco de dados |
| **E** | Tema Livre | Qualquer ideia, desde que use pelo menos 3 serviços AWS e todos os requisitos acima |

> 💡 **Dica para quem é de IA/Ciência de Dados:** o Tema A é o mais alinhado com a carreira de vocês. Treinar um modelo simples localmente e expô-lo como API na AWS é exatamente o que engenheiros de ML fazem no mercado.

> 🤖 **Sobre geração de código com IA:** O código da aplicação pode ser gerado com auxílio de IA (ChatGPT, Claude, Gemini). O professor disponibiliza [Prompts prontos para gerar banco, backend e frontend](./Prompts-IA-Projeto-Final). **O que será avaliado é a infraestrutura, a segurança, a documentação e a capacidade de explicar o projeto.**

---

### As Etapas de Entrega

O trabalho é desenvolvido e acompanhado em partes.

---

#### Etapa 0 — Proposta do Grupo
**Prazo: Quarta, 10/06**

Antes de começar a codar, o grupo precisa ter um plano. Entreguem um documento (`.md` ou Google Docs) com:

- Nome completo e matrícula de cada integrante
- Tema escolhido e o que a aplicação vai fazer (5 a 10 linhas)
- Rascunho da arquitetura (desenho, foto de papel, Excalidraw — qualquer coisa)
- Lista dos serviços AWS que pretendem usar
- Link do repositório GitHub já criado (pode estar vazio)

> ⚠️ Grupo que não entregar a Etapa 0 **não poderá apresentar** o trabalho.

---

#### Etapa 1 — Documento de Arquitetura
**Prazo:** Junto com a entrega final

Arquivo `docs/arquitetura.md` dentro do repositório GitHub, contendo:

- **Diagrama da arquitetura** — pode ser draw.io, Lucidchart, Mermaid ou até uma foto bem feita de um papel
- **Descrição de cada serviço AWS** e por que o grupo escolheu aquele serviço
- **Fluxo dos dados** — como a informação entra, é processada e armazenada
- **Estimativa de custo mensal** usando o [AWS Pricing Calculator](https://calculator.aws)
- **Pelo menos uma decisão de arquitetura explicada** — ex: *"escolhemos Lambda em vez de EC2 porque nossa aplicação tem picos de uso curtos e o Lambda é mais barato nesse cenário"*

---

#### Etapa 2 — Infraestrutura
**Prazo:** Junto com a entrega final

A infraestrutura pode ser criada de **duas formas** (ambas valem a mesma nota base):

**Opção A — Console da AWS (Interface Visual):**
- Criação manual clicando no painel da AWS
- **Obrigatório:** documentar o passo a passo com screenshots no relatório/README

**Opção B — Terraform (Fortemente Aconselhado):**
- Diretório `infra/` no repositório com os arquivos `.tf`
- A infraestrutura deve subir do zero com `terraform apply`
- **Agrega pontos extras na avaliação**

> 💡 **Importante:** Caso o grupo use Terraform, o professor **poderá rodar `terraform apply` durante a apresentação** para validar o funcionamento.

---

#### Etapa 3 — Aplicação Rodando na Nuvem
**Prazo:** Junto com a entrega final

Código da aplicação no repositório, com a aplicação **acessível publicamente via URL** no momento da apresentação.

**Itens obrigatórios:**
- Endpoint `/health` que retorna `{"status": "ok"}` — é o sinal de vida da aplicação
- Pelo menos 1 endpoint que leia ou escreva no banco de dados
- README com instruções para rodar localmente e variáveis de ambiente necessárias

---

#### Etapa 4 — Pipeline CI/CD (Não obrigatória, mas aconselhada)

Arquivo `.github/workflows/deploy.yml` no repositório. O pipeline deve **disparar automaticamente** quando alguém fizer push para a branch `main`.

**O que o pipeline deve fazer (no mínimo):**
1. Fazer o build ou validar o código
2. Fazer o deploy da aplicação na AWS automaticamente

> 💡 **Esta etapa é opcional**, mas agrega pontos significativos na avaliação. Se implementar, documente com screenshot ou link para um run bem-sucedido no README.

> 💡 **Durante a apresentação**, o professor pode pedir para o grupo acionar o pipeline do Git para demonstrar o deploy automático.

---

#### Etapa 5 — Segurança e FinOps
**Prazo:** Junto com a entrega final

Seção `## Segurança e Custos` no `README.md` principal do repositório.

**Itens obrigatórios:**
- Security Groups expondo apenas as portas necessárias (ex: só 443 e 80 para fora)
- **Zero credenciais expostas** no código ou no histórico do git
- Print do Cost Explorer ou do AWS Pricing Calculator mostrando o custo do projeto
- Pelo menos 1 decisão de FinOps documentada — ex: *"usamos t2.micro porque cabe no Free Tier"*

---

### 📦 O que entregar e como

A entrega é composta de **três partes obrigatórias**:

| # | Entregável | Formato | Prazo |
|---|---|---|---|
| 📝 **1** | **Parte escrita completa** — Relatório/README com arquitetura, screenshots, segurança, custos e todo o código no GitHub | Repositório GitHub + PDF no AVA | **10/06/2026 às 23h59** |
| 🎤 **2** | **Apresentação ao vivo** — Demonstração da aplicação funcionando para o professor | Presencial em sala | Data a definir |
| 🎥 **3** | **Vídeo de no máximo 5 minutos** — Explicando o projeto com a AWS aberta, mostrando a aplicação funcionando | Link no README (YouTube, Google Drive) | **10/06/2026 às 23h59** |

> ⚠️ **O prazo de entrega da parte escrita e do vídeo é fixo: 10/06/2026 às 23h59.** A seção de Estudos Autônomos no AVA fecha automaticamente nesse horário. Após o fechamento, **não é possível enviar o arquivo**.

---

### 🎤 Sobre a Apresentação ao Vivo

Durante a apresentação, o professor poderá:

- ✅ Pedir para o grupo **executar o `terraform apply`** ao vivo (se usou Terraform)
- ✅ Pedir para **acionar o pipeline CI/CD** via git push (se implementou)
- ✅ Solicitar **demonstração prática** de qualquer parte da infraestrutura
- ✅ Fazer **perguntas individuais** a qualquer integrante sobre o projeto

> ⚠️ Todos os integrantes devem estar preparados para responder perguntas. Não basta ter feito o trabalho — é preciso saber explicar.

---

### 📊 Como os 20 pontos serão avaliados

| Componente | Critérios | Pontos |
|---|---|---|
| **Parte Escrita e Repositório** | Arquitetura documentada, aplicação funcionando na URL pública, segurança aplicada (sem senhas expostas, portas corretas), custos documentados, código organizado | **10 pts** |
| **Apresentação, Arguição e Vídeo** | Demo ao vivo funcionando, vídeo explicativo, domínio técnico ao responder perguntas do professor | **5 pts** |
| **Diferenciais (Terraform + CI/CD)** | Terraform provisionando a infraestrutura sem erros, pipeline CI/CD automatizado e funcional | **5 pts** |

> 💡 Grupos que usarem apenas o Console da AWS (sem Terraform/CI/CD) podem alcançar até **15 pontos**. Para os 20 completos, é necessário implementar pelo menos um dos diferenciais.

---

### Regras importantes

**Sobre o repositório:**
- Deve ser **público** no GitHub
- O histórico de commits será observado
- Código copiado de outro grupo = **zero na etapa para os dois grupos**

**Sobre a infraestrutura:**
- Usem o **AWS Academy (Learner Lab)** ou o **Free Tier** da própria conta
- Após a apresentação, **destruam os recursos** para não consumir créditos

**Sobre uso de IA (ChatGPT, Claude, Copilot):**

Pode e é incentivado. Mas:
- Vocês precisam **entender e explicar** qualquer código gerado por IA
- Se o professor perguntar "por que fizeram assim?", a resposta *"a IA gerou"* não é aceitável sozinha
- Declarem no README quais partes foram assistidas por IA

---

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

## ❓ Dúvidas Frequentes

**Posso usar outro provedor (GCP, Azure)?**
Não. O projeto usa AWS para alinhar com o AWS Academy e com o conteúdo da disciplina.

**E se minha aplicação cair no dia da apresentação?**
O vídeo de 5 minutos serve como backup. O grupo perde pontos da demonstração ao vivo, mas não zera.

**Preciso usar Terraform obrigatoriamente?**
Não. Terraform é fortemente aconselhado e vale pontos extras, mas o Console da AWS é aceito desde que documentado com screenshots.

**Preciso implementar CI/CD?**
Não é obrigatório, mas é aconselhado e vale pontos extras.

**Preciso usar todos os serviços que aprendi no semestre?**
Não todos, mas no mínimo **3 serviços AWS diferentes** integrados entre si.

**O que acontece se um integrante não aparecer na apresentação?**
Esse integrante recebe zero na apresentação. O restante do grupo não é penalizado.

**Onde entrego a Etapa 0?**
No **AVA — Estudos Autônomos**.

---

*Qualquer dúvida, procure o professor antes das datas de entrega — não depois.*

*Cloud Computing — Uniube 2026 | Prof. Romualdo Mathias Filho*
