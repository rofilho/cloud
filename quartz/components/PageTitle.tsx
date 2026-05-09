import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <img src="https://uniube.br/img/landing/logo_azul.svg" alt="Uniube" class="logo-light" style={{ height: "30px", width: "auto" }} />
      <img src="https://uniube.br/img/landing/logo_branca.svg" alt="Uniube" class="logo-dark" style={{ height: "30px", width: "auto" }} />
      <a href={baseDir}>{title}</a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
:root[saved-theme="light"] .logo-dark { display: none; }
:root[saved-theme="light"] .logo-light { display: block; }
:root[saved-theme="dark"] .logo-light { display: none; }
:root[saved-theme="dark"] .logo-dark { display: block; }
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
