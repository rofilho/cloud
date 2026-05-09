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
    const { emoji, lessonNumber, title } = parseLessonTitle(rawTitle)
    
    return (
      <a href={`/${page.slug}`} class="nav-lesson-card" data-spa>
        <div class="nav-lesson-thumb">
          {emoji}
          <div class="nav-lesson-overlay"></div>
        </div>
        <div class="nav-lesson-content">
          <div class="nav-lesson-label">{isNext ? "Próxima Aula →" : "← Aula Anterior"}</div>
          <div class="nav-lesson-title">{title}</div>
          {lessonNumber && (
             <div class="nav-lesson-meta">
               <span>{lessonNumber}</span>
             </div>
          )}
        </div>
      </a>
    )
  }

  return (
    <div class={classNames(displayClass, "lesson-nav-top")}>
      {prevPage ? renderCard(prevPage, false) : <div class="nav-lesson-spacer"></div>}
      {nextPage ? renderCard(nextPage, true) : <div class="nav-lesson-spacer"></div>}
    </div>
  )
}

LessonNavigation.css = `
.lesson-nav-top {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  margin-top: 1rem;
}

.nav-lesson-spacer {
  flex: 1;
}

.nav-lesson-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--lightgray);
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--gray);
  min-width: 0; /* Prevent flex overflow */
}

:root[saved-theme="dark"] .nav-lesson-card {
  background: var(--darkgray);
  border-color: rgba(255,255,255,0.05);
}

.nav-lesson-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

.nav-lesson-thumb {
  height: 90px;
  background: #1e293b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
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
  padding: 12px 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.nav-lesson-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--tertiary);
  margin-bottom: 5px;
  letter-spacing: 0.05em;
}

.nav-lesson-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--dark);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 8px;
}

:root[saved-theme="dark"] .nav-lesson-title {
  color: var(--light);
}

.nav-lesson-meta {
  font-size: 0.75rem;
  color: var(--gray);
  margin-top: auto;
}

@media (max-width: 600px) {
  .lesson-nav-top {
    flex-direction: column;
  }
}
`

export default (() => LessonNavigation) satisfies QuartzComponentConstructor

