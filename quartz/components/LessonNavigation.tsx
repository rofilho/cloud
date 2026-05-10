import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { resolveRelative } from "../util/path"

// Extrai emoji, número da aula e título limpo de strings como:
// "☁️ Aula 01 – Fundamentos de Cloud: ..."
// "Aula 02 - Introdução a Computação em Nuvem"
// "Ementa e Objetivos"
function parseLessonTitle(raw: string) {
  const str = raw.trim()
  
  // Tenta capturar: [emoji opicional] [Aula XX opicional] [separador opicional] [título]
  const m = str.match(/^([\p{Emoji_Presentation}\p{Extended_Pictographic}]+)?\s*(Aula\s*\d+[\w\s]*?)?\s*[-–—:]\s*(.*)|^(.*)/u)
  
  const emoji = m?.[1]?.trim() ?? "📖"
  const lessonNum = m?.[2]?.trim() ?? ""
  const title = (m?.[3] ?? m?.[4] ?? str).trim()
  
  return { emoji, lessonNum, title }
}

// Ordena as aulas: primeiro por número de aula no título, depois alfabético
function sortLessons(a: any, b: any) {
  const getNum = (f: any) => {
    const t = f.frontmatter?.title ?? f.slug ?? ""
    const m = t.match(/Aula\s*(\d+)/i)
    return m ? parseInt(m[1], 10) : Infinity
  }
  const na = getNum(a), nb = getNum(b)
  if (na !== nb) return na - nb
  const ta = a.frontmatter?.title ?? a.slug ?? ""
  const tb = b.frontmatter?.title ?? b.slug ?? ""
  return ta.localeCompare(tb, "pt-BR")
}

const LessonNavigation: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
  if (fileData.slug === "index") return null

  const lessons = allFiles
    .filter(f => f.slug !== "index" && (f.frontmatter?.title || f.slug))
    .sort(sortLessons)

  const idx = lessons.findIndex(f => f.slug === fileData.slug)
  if (idx === -1) return null

  const prev = idx > 0 ? lessons[idx - 1] : null
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null

  if (!prev && !next) return null

  const renderPill = (page: any, isNext: boolean) => {
    const raw = page.frontmatter?.title ?? page.slug ?? ""
    const { emoji, lessonNum, title } = parseLessonTitle(raw)
    const label = isNext ? "Próxima →" : "← Anterior"

    return (
      <a href={resolveRelative(fileData.slug!, page.slug!)} class={`nav-pill ${isNext ? "nav-pill--next" : "nav-pill--prev"}`} data-spa>
        <div class="nav-pill__icon">{emoji}</div>
        <div class="nav-pill__body">
          <span class="nav-pill__label">{label}</span>
          {lessonNum && <span class="nav-pill__num">{lessonNum}</span>}
          <span class="nav-pill__title">{title}</span>
        </div>
      </a>
    )
  }

  return (
    <nav class={classNames(displayClass, "lesson-nav")} aria-label="Navegação entre aulas">
      <div class="lesson-nav__slot">{prev ? renderPill(prev, false) : null}</div>
      <div class="lesson-nav__slot lesson-nav__slot--right">{next ? renderPill(next, true) : null}</div>
    </nav>
  )
}

LessonNavigation.css = `
/* ── Contêiner principal ── */
.lesson-nav {
  display: flex;
  gap: 1rem;
  margin: 0 0 2.5rem;
  width: 100%;
}

.lesson-nav__slot {
  flex: 1;
  display: flex;
}

.lesson-nav__slot--right {
  justify-content: flex-end;
}

/* ── Pill (card horizontal compacto) ── */
.nav-pill {
  display: flex;
  align-items: center;
  gap: 0;
  max-width: 380px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none !important;
  border: 1px solid color-mix(in srgb, var(--gray) 35%, transparent);
  background: color-mix(in srgb, var(--lightgray) 50%, transparent);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  color: inherit;
}

.nav-pill:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--secondary);
  text-decoration: none !important;
}

/* Pill "próxima": ícone à direita */
.nav-pill--next {
  flex-direction: row-reverse;
}

/* ── Ícone (bloco colorido lateral) ── */
.nav-pill__icon {
  flex-shrink: 0;
  width: 60px;
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  background: linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%);
  position: relative;
}
.nav-pill__icon::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(59,130,246,0.25) 0%, transparent 100%);
}

/* ── Corpo de texto ── */
.nav-pill__body {
  flex: 1;
  min-width: 0;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nav-pill--next .nav-pill__body {
  text-align: right;
}

.nav-pill__label {
  display: block;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 700;
  color: var(--tertiary);
  margin-bottom: 3px;
  white-space: nowrap;
}

.nav-pill__num {
  display: block;
  font-size: 0.7rem;
  color: var(--gray);
  margin-bottom: 2px;
}

.nav-pill__title {
  display: block;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--dark);
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* ── Modo escuro ── */
:root[saved-theme="dark"] .nav-pill {
  background: color-mix(in srgb, var(--darkgray) 60%, transparent);
  border-color: rgba(255,255,255,0.08);
}

:root[saved-theme="dark"] .nav-pill:hover {
  background: var(--darkgray);
}

:root[saved-theme="dark"] .nav-pill__title {
  color: var(--light);
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .lesson-nav {
    flex-direction: column;
    gap: 0.6rem;
  }
  .lesson-nav__slot,
  .lesson-nav__slot--right {
    justify-content: stretch;
  }
  .nav-pill,
  .nav-pill--next {
    max-width: 100%;
    flex-direction: row;
    text-align: left;
  }
  .nav-pill--next .nav-pill__body {
    text-align: left;
  }
}
`

export default (() => LessonNavigation) satisfies QuartzComponentConstructor

