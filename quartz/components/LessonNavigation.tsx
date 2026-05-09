import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

function parseLessonTitle(fullTitle: string) {
  const match = fullTitle.trim().match(/^([^\w\s0-9]+)?\s*(Aula\s*\d+)?\s*[-–]?\s*(.*)/i)
  const emoji = match?.[1]?.trim() || "📖"
  const lessonNumber = match?.[2]?.trim() || ""
  const title = match?.[3]?.trim() || fullTitle
  return { emoji, lessonNumber, title }
}

const LessonNavigation: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
  if (fileData.slug === "index") {
    return null
  }

  const lessonFiles = allFiles
    .filter(f => f.slug !== "index" && (f.frontmatter?.title || f.slug))
    .sort((a, b) => {
      const titleA = a.frontmatter?.title ?? a.slug ?? ""
      const titleB = b.frontmatter?.title ?? b.slug ?? ""
      return titleA.localeCompare(titleB)
    })
  
  const currentIndex = lessonFiles.findIndex(f => f.slug === fileData.slug)
  if (currentIndex === -1) return null

  const prevPage = currentIndex > 0 ? lessonFiles[currentIndex - 1] : null
  const nextPage = currentIndex < lessonFiles.length - 1 ? lessonFiles[currentIndex + 1] : null

  if (!prevPage && !nextPage) return null

  const renderCard = (page: any, isNext: boolean) => {
    const rawTitle = page.frontmatter?.title ?? page.slug
    const { emoji, title } = parseLessonTitle(rawTitle)
    const cardClass = isNext ? "nav-lesson-card next-card" : "nav-lesson-card prev-card"
    
    return (
      <a href={`/${page.slug}`} class={cardClass} data-spa>
        <div class="nav-lesson-thumb">
          {emoji}
          <div class="nav-lesson-overlay"></div>
        </div>
        <div class="nav-lesson-content">
          <div class="nav-lesson-label">{isNext ? "Próxima Aula →" : "← Aula Anterior"}</div>
          <div class="nav-lesson-title">{title}</div>
        </div>
      </a>
    )
  }

  return (
    <div class={classNames(displayClass, "lesson-nav-top")}>
      {prevPage ? renderCard(prevPage, false) : <div></div>}
      {nextPage ? renderCard(nextPage, true) : <div></div>}
    </div>
  )
}

LessonNavigation.css = `
.lesson-nav-top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2.5rem;
  margin-top: 1rem;
}

.nav-lesson-card {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background: color-mix(in srgb, var(--lightgray) 40%, transparent);
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  border: 1px solid color-mix(in srgb, var(--gray) 30%, transparent);
  width: 48%; /* Keep them from taking full screen */
  max-width: 400px; /* Sensible maximum */
}

.nav-lesson-card.prev-card {
  flex-direction: row;
}

.nav-lesson-card.next-card {
  flex-direction: row-reverse;
  text-align: right;
  margin-left: auto;
}

:root[saved-theme="dark"] .nav-lesson-card {
  background: color-mix(in srgb, var(--darkgray) 40%, transparent);
  border-color: rgba(255,255,255,0.08);
}

.nav-lesson-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  background: color-mix(in srgb, var(--lightgray) 80%, transparent);
}

:root[saved-theme="dark"] .nav-lesson-card:hover {
  background: var(--darkgray);
}

.nav-lesson-thumb {
  width: 65px;
  min-width: 65px;
  min-height: 65px;
  background: #1e293b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  position: relative;
  overflow: hidden;
}

.nav-lesson-overlay {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, rgba(59,130,246,0.2) 0%, transparent 100%);
}

.nav-lesson-content {
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.nav-lesson-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--tertiary);
  margin-bottom: 4px;
  letter-spacing: 0.05em;
}

.nav-lesson-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--dark);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

:root[saved-theme="dark"] .nav-lesson-title {
  color: var(--light);
}

@media (max-width: 700px) {
  .lesson-nav-top {
    flex-direction: column;
    gap: 0.8rem;
  }
  .nav-lesson-card {
    width: 100%;
    max-width: 100%;
  }
}
`

export default (() => LessonNavigation) satisfies QuartzComponentConstructor

