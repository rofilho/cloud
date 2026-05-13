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

Vocês vão **construir, documentar e apresentar uma aplicação real hospedada em nuvem**. Não é um relatório — é uma aplicação que qualquer pessoa pode acessar pela internet, com infraestrutura configurada, segurança aplicada e documentação completa.

### Grupos

- **2 a 4 integrantes**
- Grupos formados e confirmados com o professor até **quarta-feira, 20/05**
- A apresentação dos projetos começa a partir de **10/06**

---

### O que a aplicação precisa ter

#### ✅ Requisitos Obrigatórios

| Requisito | Descrição |
|---|---|
| ☁️ Hospedada em nuvem | Rodando em EC2, Lambda ou equivalente |
| 🗄️ Banco de dados integrado | RDS ou DynamoDB conectado à aplicação |
| 🔐 Segurança aplicada | Sem senha no código, portas mínimas abertas |
| 📄 Relatório técnico (ABNT) | Com diagrama de arquitetura, screenshots e custo estimado |
| 🎤 Apresentação ao vivo | Demo funcionando na data marcada |
| 🎥 Vídeo do projeto (máx. 5 min) | Explicando o projeto com a AWS aberta — link incluído no PDF |

#### ⭐ Diferenciais (Não obrigatórios — o professor incentiva, mas não impõe)

| Diferencial | Descrição |
|---|---|
| 🔧 Terraform | Infraestrutura provisionada via código (IaC) |
| 🔄 CI/CD | Push no GitHub → deploy acontece automaticamente |

> 💡 Grupos que usarem **Terraform** e/ou **CI/CD** demonstram maior domínio técnico. Isso é valorizado positivamente pelo professor, especialmente nas perguntas da arguição ao vivo.

---

### Temas possíveis

Escolham **um** dos temas abaixo ou proponham o próprio (com aprovação do professor até 20/05):

| Opção | Tema | Ideia |
|---|---|---|
| **A** | API de Machine Learning | FastAPI ou Flask com um modelo sklearn simples |
| **B** | API CRUD com Banco | Backend com criar, ler, atualizar e deletar registros em banco de dados |
| **C** | Pipeline de Dados Serverless | CSV/JSON enviado ao S3 → Lambda processa → resultado salvo no DynamoDB |
| **D** | Aplicação Web Completa | Frontend + API + banco de dados |
| **E** | Tema Livre | Qualquer ideia, desde que use pelo menos 3 serviços de nuvem |

> 🤖 **Sobre uso de IA:** O código da aplicação pode ser gerado com auxílio de IA (ChatGPT, Claude, Gemini). O professor disponibiliza [Prompts prontos](./Prompts-IA-Projeto-Final). **O que será avaliado é a infraestrutura, a segurança e a capacidade de explicar o projeto.**

---

### O que entregar

A entrega é composta por **três partes**:

| # | Entregável | Formato |
|---|---|---|
| 📝 **1** | **Relatório técnico completo** (ABNT) com screenshots, arquitetura e custos | PDF no AVA |
| 🎥 **2** | **Link do vídeo** (máx. 5 min) incluído dentro do PDF | YouTube ou Google Drive |
| 🎤 **3** | **Apresentação ao vivo** em sala, com demonstração da aplicação funcionando | Presencial |

**Formato do arquivo:** `nome_do_grupo.pdf`

> ⚠️ Arquivos nomeados incorretamente ou em formato diferente de PDF terão desconto de **2 pontos**.

---

### ⚠️ Atenção ao Prazo — Sem Exceções

> **O prazo de entrega do PDF é fixo: 10/06/2026 às 23h59.**
>
> A seção de Estudos Autônomos no AVA fecha automaticamente nesse horário. Após o fechamento, **não é possível enviar o arquivo**, independentemente do motivo. Não há entrega tardia, não há exceção.
>
> **Entregue antes do prazo. Não deixe para o último dia.**

---

### 🎤 Sobre a Apresentação ao Vivo

A apresentação começa a partir de **10/06**. Durante a apresentação, o professor poderá:

- ✅ Pedir para o grupo **executar o `terraform apply`** ao vivo (se usou Terraform)
- ✅ Pedir para **acionar o pipeline CI/CD** via git push (se implementou)
- ✅ Solicitar **demonstração prática** de qualquer parte da infraestrutura
- ✅ Fazer **perguntas individuais** a qualquer integrante sobre o projeto

> ⚠️ Todos os integrantes devem estar preparados para responder perguntas.

---

### 📊 Como os 20 pontos serão avaliados

| Componente | Critérios | Pontos |
|---|---|---|
| **Parte Escrita + Vídeo** | Arquitetura documentada, aplicação funcionando na URL pública, segurança aplicada, custos documentados, vídeo explicativo | **13 pts** |
| **Apresentação e Arguição** | Demo ao vivo funcionando, domínio técnico ao responder perguntas do professor | **7 pts** |

> 💡 Grupos que usarem **Terraform** e/ou **CI/CD** demonstram maior domínio técnico e isso é considerado positivamente pelo professor na avaliação geral, especialmente nas perguntas da arguição.

---

### Regras importantes

**Sobre o código:**
- Código copiado de outro grupo = **zero para os dois grupos**
- Uso de IA é permitido e incentivado — mas o grupo precisa saber explicar o que foi gerado
- **Zero credenciais expostas** no código

**Sobre a infraestrutura:**
- Usem o **AWS Academy (Learner Lab)** ou o **Free Tier** da própria conta
- Após a apresentação, destruam os recursos para não consumir créditos

---

## 📝 Parte 2 — Prova N2 (Individual)

### O que é

Prova **individual e sem consulta**, aplicada em data a confirmar pelo professor, valendo **15 pontos**.

### O que será cobrado

A prova cobre as **aulas 08 a 15**:

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
| Questões objetivas | 10 questões | 15 pts |
| **Total** | | **15 pts** |

> 💡 **Dica:** Quem faz o projeto com atenção normalmente vai bem na prova — os conceitos se fixam na prática.

---

## ❓ Dúvidas Frequentes

**Posso usar outro provedor (GCP, Azure)?**
A disciplina é de **Cloud Computing** — não exclusivamente de AWS. Outros provedores são aceitos. Porém, o conteúdo, os labs e o suporte do professor são focados na AWS Academy, então recomendamos fortemente o uso da AWS.

**Precisa ter repositório no GitHub?**
Não é obrigatório. Se quiser usar GitHub (especialmente para CI/CD), é um diferencial valorizado.

**E se minha aplicação cair no dia da apresentação?**
O vídeo de 5 minutos serve como backup. O grupo perde pontos da demonstração ao vivo, mas não zera.

**O que acontece se um integrante não aparecer na apresentação?**
Esse integrante recebe zero na apresentação. O restante do grupo não é penalizado.

**Onde entrego a parte escrita e o vídeo?**
No **AVA — Estudos Autônomos**, em um único arquivo PDF contendo o relatório e o link do vídeo.

---

*Qualquer dúvida, procure o professor antes das datas de entrega — não depois.*

*Cloud Computing — Uniube 2026 | Prof. Romualdo Mathias Filho*
