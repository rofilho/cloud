import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg, fileData, allFiles }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    
    // Auto Prev/Next Navigation
    const lessonFiles = allFiles
      .filter(f => f.slug !== "index" && f.title)
      .sort((a, b) => a.title!.localeCompare(b.title!))
    
    const currentIndex = lessonFiles.findIndex(f => f.slug === fileData.slug)
    const prevPage = currentIndex > 0 ? lessonFiles[currentIndex - 1] : null
    const nextPage = currentIndex !== -1 && currentIndex < lessonFiles.length - 1 ? lessonFiles[currentIndex + 1] : null

    return (
      <footer class={`${displayClass ?? ""}`}>
        {currentIndex !== -1 && (
          <div class="prev-next-nav" style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem", paddingTop: "1rem", borderTop: "1px solid rgba(150,150,150,0.2)" }}>
            <div>
              {prevPage && (
                <a href={`/${prevPage.slug}`} style={{ textDecoration: "none" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--gray)", display: "block" }}>← Anterior</span>
                  <span style={{ fontWeight: "600", color: "var(--secondary)" }}>{prevPage.title}</span>
                </a>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              {nextPage && (
                <a href={`/${nextPage.slug}`} style={{ textDecoration: "none" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--gray)", display: "block" }}>Próxima →</span>
                  <span style={{ fontWeight: "600", color: "var(--secondary)" }}>{nextPage.title}</span>
                </a>
              )}
            </div>
          </div>
        )}
        <p>
          Prof. Romualdo Filho | <a href="mailto:romualdo.filho@uniube.br">romualdo.filho@uniube.br</a>
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
