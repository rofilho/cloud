# 📐 Sistema de Elaboração e Publicação de Aulas
**Disciplina-Piloto:** Cloud Computing | Uniube
**Responsável:** Prof. Romualdo Mathias Filho
**Versão:** 1.0 | Abril 2026

---

## 🎯 Objetivo deste Documento
Este arquivo é o **guia de regras e padrões (rulebook)** para criação, organização, apresentação e publicação de aulas da disciplina de Cloud Computing no Obsidian. Ele garante que **toda aula criada aqui** possa ser:
- ✅ Apresentada diretamente no Obsidian (sem PowerPoint ou Notion)
- ✅ Publicada para os alunos via Obsidian Publish
- ✅ Reutilizada para geração de questões de provas
- ✅ Visualizada como mapa de conexões no Graph View

---

## 📁 1. Estrutura de Arquivos (Onde cada coisa fica)

```
Uniube/10_Acao/Uniube/Cloud_Computing/
│
├── _Sistema_de_Aulas.md        ← Este documento (regras)
├── _Template_Aula.md           ← Modelo base para criar novas aulas
├── Cloud_Computing.md          ← Índice principal da disciplina (MOC)
├── Mapa_Visual_Cloud_Computing.canvas  ← Quadro visual das aulas
│
├── assets/                     ← 📸 TODAS as imagens ficam aqui
│   ├── aula01_diagrama_cloud.png
│   └── aula10_rds_multiaz.png
│
├── avaliacoes/                 ← 📝 Banco de questões e provas
│   ├── N1_Questoes.md
│   └── N2_Questoes.md
│
├── Aula 01 - Fundamentos de Cloud.md
├── Aula 10 - Banco de Dados na Nuvem.md
└── ...
```

### Regra de Nomenclatura de Arquivos
| Tipo | Padrão | Exemplo |
|---|---|---|
| Aulas | `Aula NN - Título Limpo.md` | `Aula 10 - Banco de Dados na Nuvem.md` |
| Imagens | `aulaNUM_descricao.png` | `aula10_rds_multiaz.png` |
| Avaliações | `N1_Questoes.md` | `N1_Questoes.md` |
| Templates | `_NomeDoTemplate.md` | `_Template_Aula.md` |

> ⚠️ **Regra de Ouro:** NUNCA use espaços no nome de arquivos de imagem. Use underline `_` sempre.

---

## 🖊️ 2. Estrutura Padrão de uma Aula (Frontmatter + Conteúdo)

Toda aula DEVE começar com o **YAML Frontmatter** abaixo (bloco `---`). Ele é invisível para os alunos mas é o que permite filtros, Graph View e publicação automática.

```yaml
---
disciplina: Cloud Computing
codigo: "14189"
aula: 10
titulo: "Banco de Dados na Nuvem"
tipo: teorica          # teorica | pratica | avaliacao
semana: 6
data: 2026-04-18
status: publicado      # rascunho | revisao | publicado | arquivado
tags:
  - cloud
  - aws
  - banco-de-dados
  - rds
  - dynamodb
publicar: true         # true = visível para alunos
---
```

---

## 🎨 3. Regras de Conteúdo e Formatação

### 3.1 — Seções Obrigatórias de Toda Aula
Toda aula deve ter **exatamente estas seções**, nesta ordem:

1. `## 🎯 Objetivo da Aula` — O que o aluno vai saber fazer ao final
2. `## 🔄 Revisão Rápida` — Conexão com a aula anterior (tabela de 3 linhas)
3. `## [Tópicos de Conteúdo]` — O conteúdo em si (quantos precisar)
4. `## 📋 Resumo Estrutural` — Tabela de 2 colunas: Conceito | Definição em 1 Frase
5. `## ❓ Banco de Questões` — Questões **práticas e teóricas** obrigatórias
6. `## 📄 Artigo de Aprofundamento` — Obrigatório: 1 Artigo acadêmico ou doc oficial da ferramenta
7. `## 📚 Referências Bibliográficas` — Obrigatório: Quando houver citação de autor, informar **Livro e Página** exata.

### 3.2 — Regras de Apresentação (Slides)
O Obsidian usa `---` como **quebra de slide** no modo Apresentação.

- Coloque `---` antes de **cada seção principal** (`## Título`)
- O conteúdo dentro de uma seção deve caber em **1 tela** (sem scroll excessivo)
- Use **tabelas** em vez de listas longas sempre que possível
- Prefira **emojis no título da seção** para facilitar navegação visual

### 3.3 — Regras para Linguagem Pública (Alunos vão ler)
- ❌ Não usar jargão interno ou abreviações sem explicar na primeira vez
- ✅ Sempre explicar siglas: `RDS (Relational Database Service)`
- ✅ Usar exemplos do **dia a dia brasileiro** (ex: iFood, Nubank, Pix)
- ✅ Tabelas de comparação são obrigatórias quando comparar dois conceitos

---

## 🖼️ 4. Regras para Imagens

### 4.1 — Onde salvar
**TODAS** as imagens ficam em `Uniube/10_Acao/Uniube/Cloud_Computing/assets/`

### 4.2 — Como inserir na aula
```markdown
![[assets/aula10_rds_multiaz.png]]
> *Legenda: Arquitetura Multi-AZ do Amazon RDS. Fonte: AWS Documentation.*
```

### 4.3 — Regras de qualidade
| Regra | Detalhe |
|---|---|
| Formato | `.png` preferido, `.jpg` aceito |
| Nome | sem espaços, com número da aula: `aula10_nome.png` |
| Tamanho máximo | 500KB por imagem |
| Legenda | Obrigatória: sempre com fonte |
| Origem | AWS Official Docs, draw.io, ou imagem gerada pelo AI |

---

## 📝 5. Banco de Questões e Provas (Lastro)

### 5.1 — Regra: Toda aula gera questões
No final de cada aula, a seção `## ❓ Banco de Questões` deve ter:

```markdown
## ❓ Banco de Questões

> 🔒 Esta seção é visível apenas no Obsidian do professor. Não publicada.

### Questão 1 (Múltipla Escolha — Nível: Básico)
**Enunciado:** Qual serviço da AWS é um banco de dados relacional totalmente gerenciado?

- [ ] A) Amazon EC2
- [ ] B) Amazon S3  
- [x] C) Amazon RDS ✅
- [ ] D) Amazon Lambda

**Justificativa:** O RDS (Relational Database Service) é o serviço PaaS da AWS para bancos relacionais...

---
### Questão 2 (Dissertativa — Nível: Intermediário)
...
```

### 5.2 — Arquivo central de provas
As questões são **copiadas automaticamente** para:
- `avaliacoes/N1_Questoes.md` → Prova N1 (Aulas 01-07)
- `avaliacoes/N2_Questoes.md` → Prova N2 (Aulas 08-14)

---

## 🌐 6. Publicação para os Alunos

### 6.1 — Canal de publicação: Obsidian Publish
O **Obsidian Publish** é um serviço pago (~$8/mês ou ~R$40/mês) que transforma seu cofre em um site público com URL própria (ex: `publish.obsidian.md/cloud-uniube`).

**Alternativa gratuita:** GitHub Pages com `mkdocs` ou `quartz` (requer configuração única).

### 6.2 — O que é publicado vs. o que fica privado
| Arquivo | Visível para alunos? | Configuração |
|---|---|---|
| `Aula 10 - ...` | ✅ Sim | Frontmatter `publicar: true` |
| `❓ Banco de Questões` | ❌ Não | Bloco/Callout ou `publicar: false` |
| Qualquer arquivo `_*.md` | ❌ Não | Escondido via `ignorePatterns: ["_*.md"]` do Quartz |
| `avaliacoes/` | ❌ Não | Escondido via `ignorePatterns: ["avaliacoes"]` |
| Índice Mestre (ex: `Cloud_Computing.md`) | ❌ Não | Substituído pelo `index.md` do próprio site |

**Regra de Ouro (Infraestrutura e Deploy Seguro):**
Para evitar vazamento de arquivos administrativos no site final (como menus duplicados ou templates no Explorador), **NUNCA copie arquivos iniciados em `_` ou o Índice Mestre do Obsidian** para a pasta `content/` do Quartz. 
Ao configurar um site novo, **copie APENAS as aulas (`Aula*.md`) e a pasta de imagens (`assets/`)**.

**Regra de Ouro (Sintaxe de Links Markdown):**
Ao criar links internos com apelidos (aliases) no formato `[[Arquivo|Apelido]]`, **NUNCA** utilize barras (`/` ou `\`) dentro do apelido. O gerador Quartz interpreta barras como caminhos de diretório e corrompe a renderização.
✅ Certo: `[[Aula 05 - TCP IP|Modelo TCP IP]]`
❌ Errado: `[[Aula 05 - TCP IP|Modelo TCP/IP]]`

---

## 🗺️ 7. Canvas — Quando e Como Usar

O Canvas é um mapa visual infinito. Use-o para:

| Situação | Como usar |
|---|---|
| Apresentar arquitetura AWS em aula | Arraste imagens + cards de texto no Canvas |
| Visão geral do semestre | `Mapa_Visual_Cloud_Computing.canvas` já criado |
| Relação entre aulas | Use setas coloridas entre cards de arquivos |
| Comparar tecnologias | Cards lado a lado com cores diferentes |

**Regra:** Cada disciplina tem **um** canvas principal (`Mapa_Visual_DISCIPLINA.canvas`). Não criar múltiplos.

---

## ⚡ 8. Workflow Completo de Criação de Aula (Passo a Passo)

```
1. Copiar _Template_Aula.md
   └─ Renomear para "Aula NN - Título.md"
   
2. Preencher o YAML frontmatter
   └─ status: rascunho
   
3. Elaborar conteúdo seguindo as seções obrigatórias
   └─ Adicionar imagens em assets/
   
4. Adicionar questões na seção ❓ Banco de Questões
   
5. Revisar linguagem pública (regra 3.3)
   
6. Mudar status: rascunho → revisao → publicado
   
7. Atualizar Cloud_Computing.md (MOC) com o link da nova aula
   
8. Atualizar Mapa_Visual_Cloud_Computing.canvas
   
9. Copiar questões para avaliacoes/NX_Questoes.md
```

---

## 🤖 9. Instruções (Skill) para o Agente de IA

> **Atenção IA (Antigravity ou outro assistente):** Ao ser instruída a criar ou revisar uma aula, você DEVE seguir estas regras de comportamento (*skills*):

1. **Uso Obrigatório de Citações:** O conteúdo gerado NÃO pode ser genérico. Sempre que um conceito técnico for explicado, você deve buscar nas suas bases de conhecimento ou na internet a qual **página** e **livro** aquele conceito pertence, priorizando as **Referências Base** listadas no painel da disciplina.
2. **Formato da Citação:** No texto, insira aspas ou blocos de citação referenciando no formato `(AUTOR, Ano, p. XX)`.
3. **Questões e Artigos:** Nunca pule a geração das questões (Práticas + Teóricas) e a busca por um Artigo Acadêmico/Oficial real. Se não encontrar o artigo exato, faça uma busca na web antes de preencher.
4. **Refatoração de Aulas Legadas:** Ao formatar uma aula antiga (ex: vinda do Notion), **NÃO** altere a essência, o tom ou o conteúdo original do professor. O seu trabalho é apenas "envelopar" o texto dentro do `_Template_Aula.md`, extrair as referências e corrigir links de imagens para o formato nativo `![[assets/imagem.png]]`.

---
*Documento mantido pelo Antigravity AI + Prof. Romualdo. Não edite manualmente.*