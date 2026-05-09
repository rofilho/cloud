# 🎓 Skill: Criar Novo Portal de Disciplina Uniube
# Versão: 2.0 · Maio 2026
# Autor: Prof. Romualdo Filho
# Baseado em: github.com/rofilho/cloud (referência de ouro)

## CONTEXTO
Este playbook cria um portal Quartz 4 completo para uma nova disciplina,
com o mesmo design premium (Uniube), navegação anterior/próxima, logos e dark/light mode.

## ETAPA 1 — CLONAR O REPO DE REFERÊNCIA

```powershell
# 1a. Clone o Cloud (repositório de referência)
git clone https://github.com/rofilho/cloud C:\Temp\nova-disciplina
cd C:\Temp\nova-disciplina

# 1b. Desconectar do remote original e conectar ao novo
git remote set-url origin https://github.com/rofilho/[NOME-NOVA-DISCIPLINA].git

# 1c. Confirmar
git remote -v
```

Repositório novo precisa existir no GitHub (criar vazio, sem README).

---

## ETAPA 2 — CONFIGURAR A DISCIPLINA

### 2a. Editar quartz.config.ts
Campos obrigatórios a alterar:
```typescript
pageTitle: "🖥️ Administração de SO",           // Nome da disciplina com emoji
description: "Portal oficial da disciplina...", // Descrição para SEO
```

### 2b. Limpar o content/
```powershell
Remove-Item content\* -Recurse -Force
New-Item -ItemType Directory -Force content\assets
```

### 2c. Copiar templates de conteúdo
```powershell
# Templates estão em quartz/templates/
Copy-Item quartz\templates\index-template.md content\index.md
Copy-Item quartz\templates\aula-template.md  content\Aula 01 - Ementa e Objetivos.md
```

---

## ETAPA 3 — PERSONALIZAR O INDEX.MD

Edite `content/index.md` e substitua:

| Placeholder | Substituir por |
|---|---|
| `title: "☁️ Cloud Computing"` | Nome real da disciplina |
| `TÍTULO DA ÚLTIMA AULA` | Título da primeira aula |
| `./Aula-01---Titulo-da-Aula` | Link real para primeira aula |
| `Módulo 1: NOME DO MÓDULO` | Nome real do módulo |
| `Nome da Aula 02` | Título real de cada aula |

**Regra de link:** espaços → hífens, sem acentos, sem caracteres especiais
Exemplo: "Aula 01 - Fundamentos de Cloud.md" → `./Aula-01---Fundamentos-de-Cloud`

---

## ETAPA 4 — CRIAR AS AULAS

Para cada aula, copie o template e edite:

```powershell
Copy-Item quartz\templates\aula-template.md "content\Aula 02 - Titulo da Aula.md"
```

**Padrão de frontmatter obrigatório:**
```yaml
---
title: "🌐 Aula 02 – Introdução às Redes: Conceitos Fundamentais"
---
```

Formato: `[EMOJI] Aula [NN] – [Título]: [Subtítulo]`

---

## ETAPA 5 — VERIFICAR OS COMPONENTES

Os 3 componentes abaixo são idênticos para todas as disciplinas.
Verifique se estão presentes (devem ter vindo no clone):

- [x] `quartz/components/LessonNavigation.tsx`
- [x] `quartz/components/Footer.tsx`  
- [x] `quartz/components/PageTitle.tsx`
- [x] `quartz/components/index.ts` (deve exportar LessonNavigation)

E no `quartz.layout.ts` deve ter:
```typescript
beforeBody: [
  Component.ConditionalRender({
    component: Component.Breadcrumbs(),
    condition: (page) => page.fileData.slug !== "index",
  }),
  Component.LessonNavigation(),   // ← antes do ArticleTitle
  Component.ArticleTitle(),
  Component.ContentMeta(),
  Component.TagList(),
],
left: [],   // ← sem sidebar
right: [],  // ← sem sidebar
```

---

## ETAPA 6 — TESTAR LOCALMENTE

```powershell
npx quartz build --serve
# Abrir: http://localhost:8080
```

**Checklist de QA:**
- [ ] Página inicial abre com o dashboard Netflix-style
- [ ] Cards das aulas têm emoji e título corretos
- [ ] Clicar numa aula abre a página corretamente
- [ ] Navegação ← Anterior / Próxima → aparece no topo da aula
- [ ] Logo Uniube aparece no header e footer
- [ ] Dark mode funciona (botão no canto superior direito)
- [ ] Mobile: cards ficam em 2 colunas abaixo de 768px

---

## ETAPA 7 — PUBLICAR

```powershell
git add -A
git commit -m "feat: lançamento inicial do portal de [Nome da Disciplina]"
git push -u origin v4
```

Aguardar ~2 minutos. GitHub Actions compila e publica automaticamente.

**URL do site:** `https://rofilho.github.io/[nome-repo]/`

---

## TROUBLESHOOTING RÁPIDO

| Problema | Causa provável | Solução |
|---|---|---|
| Navegação não aparece | Falta `title` no frontmatter | Adicionar `title:` em cada aula |
| Build falha (SCSS error) | `@import` de fonte no custom.scss | Remover o @import, mover para quartz.config.ts |
| Logo pisca ou não aparece | CSS de logo sem `display: none` padrão | Ver padrão `:root:not([saved-theme="dark"])` |
| Cards na ordem errada | Títulos sem "Aula NN" | Adicionar "Aula 01", "Aula 02"... nos títulos |
| H1 sem gradiente | `display: inline-block` no H1 | Remover inline-block do CSS |
| Sidebars aparecendo | custom.scss não carregou | Verificar `@use "./base.scss"` na linha 1 |
