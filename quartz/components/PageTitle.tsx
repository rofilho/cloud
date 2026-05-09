import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)

  return (
    <h2 class={classNames(displayClass, "page-title")}>
      {/* Logos trocadas via CSS — sem flash */}
      <a href={baseDir} class="page-title__link">
        <img
          src="https://uniube.br/img/landing/logo_azul.svg"
          alt="Uniube"
          class="page-title__logo page-title__logo--light"
        />
        <img
          src="https://uniube.br/img/landing/logo_branca.svg"
          alt="Uniube"
          class="page-title__logo page-title__logo--dark"
        />
        <span class="page-title__text">{title}</span>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
  font-family: var(--titleFont);
}

.page-title__link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none !important;
  color: inherit;
}

.page-title__logo {
  height: 28px;
  width: auto;
  flex-shrink: 0;
  display: none; /* ambas ocultas por padrão — CSS decide qual mostrar */
}

/* light mode (default) */
:root:not([saved-theme="dark"]) .page-title__logo--light { display: block; }

/* dark mode */
:root[saved-theme="dark"] .page-title__logo--dark { display: block; }

.page-title__text {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
