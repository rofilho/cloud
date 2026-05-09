import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const links = opts?.links ?? {}

    return (
      <footer class={`footer ${displayClass ?? ""}`}>
        <div class="footer__brand">
          {/* Logo trocada via CSS — sem flash de ambas */}
          <img
            src="https://uniube.br/img/landing/logo_azul.svg"
            alt="Universidade de Uberaba"
            class="footer__logo footer__logo--light"
          />
          <img
            src="https://uniube.br/img/landing/logo_branca.svg"
            alt="Universidade de Uberaba"
            class="footer__logo footer__logo--dark"
          />
          <div class="footer__info">
            <span class="footer__name">Prof. Romualdo Filho</span>
            <a class="footer__email" href="mailto:romualdo.filho@uniube.br">
              romualdo.filho@uniube.br
            </a>
          </div>
        </div>

        {Object.keys(links).length > 0 && (
          <ul class="footer__links">
            {Object.entries(links).map(([text, href]) => (
              <li>
                <a href={href} target="_blank" rel="noopener noreferrer">{text}</a>
              </li>
            ))}
          </ul>
        )}
      </footer>
    )
  }

  Footer.css = style + `
/* ── Logo com troca por tema (sem flash) ── */
.footer__logo--light,
.footer__logo--dark {
  display: none;
  height: 28px;
  width: auto;
  flex-shrink: 0;
}

/* padrão: mostrar azul (light é o default do Quartz) */
:root:not([saved-theme="dark"]) .footer__logo--light { display: block; }
:root[saved-theme="dark"]      .footer__logo--dark  { display: block; }

/* ── Layout do rodapé ── */
.footer {
  margin-top: 4rem;
  padding: 1.5rem 0;
  border-top: 1px solid color-mix(in srgb, var(--gray) 25%, transparent);
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 0.75rem;
}

.footer__info {
  display: flex;
  flex-direction: column;
  line-height: 1.4;
}

.footer__name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--dark);
}

:root[saved-theme="dark"] .footer__name {
  color: var(--light);
}

.footer__email {
  font-size: 0.82rem;
  color: var(--secondary);
  text-decoration: none;
}
.footer__email:hover {
  text-decoration: underline;
}

.footer__links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1.25rem;
}

.footer__links a {
  font-size: 0.82rem;
  color: var(--gray);
  text-decoration: none;
  transition: color 0.2s;
}
.footer__links a:hover {
  color: var(--secondary);
}
`

  return Footer
}) satisfies QuartzComponentConstructor
