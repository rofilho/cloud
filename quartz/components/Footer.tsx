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
      .filter(f => f.slug !== "index" && (f.frontmatter?.title || f.slug))
      .sort((a, b) => {
        const titleA = a.frontmatter?.title ?? a.slug ?? ""
        const titleB = b.frontmatter?.title ?? b.slug ?? ""
        return titleA.localeCompare(titleB)
      })
    
    const currentIndex = lessonFiles.findIndex(f => f.slug === fileData.slug)
    const prevPage = currentIndex > 0 ? lessonFiles[currentIndex - 1] : null
    const nextPage = currentIndex !== -1 && currentIndex < lessonFiles.length - 1 ? lessonFiles[currentIndex + 1] : null

    return (
      <footer class={`${displayClass ?? ""}`}>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "1rem" }}>
          <img src="https://uniube.br/img/landing/logo_azul.svg" alt="Uniube" class="logo-light" style={{ height: "25px", width: "auto" }} />
          <img src="https://uniube.br/img/landing/logo_branca.svg" alt="Uniube" class="logo-dark" style={{ height: "25px", width: "auto" }} />
          <p style={{ margin: 0 }}>
            Prof. Romualdo Filho | <a href="mailto:romualdo.filho@uniube.br">romualdo.filho@uniube.br</a>
          </p>
        </div>
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

  Footer.css = style + `
  :root[saved-theme="light"] .logo-dark { display: none; }
  :root[saved-theme="light"] .logo-light { display: block; }
  :root[saved-theme="dark"] .logo-light { display: none; }
  :root[saved-theme="dark"] .logo-dark { display: block; }
  `
  return Footer
}) satisfies QuartzComponentConstructor
