import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "☁️ Cloud Computing — Uniube",
    pageTitleSuffix: " | Prof. Romualdo",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "pt-BR",
    baseUrl: "rofilho.github.io/cloud",
    ignorePatterns: [
      "private",
      ".obsidian",
      "avaliacoes",
      "_Sistema_de_Aulas",
      "_Template_Aula",
      // Material bruto de apoio, versionado mas nao publicado. Vivia fora do repo
      // (A:\OneDrive\quartz-sites\) ate 25/07/2026; entrou aqui para acabar com a
      // duplicata. Sem esta linha os 9 arquivos viram paginas do site.
      "_knowledge",
    ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Space Grotesk",
        body: "Inter",
        code: "JetBrains Mono",
      },
      // Paleta ancorada na identidade REAL da Uniube, extraida dos proprios
      // ativos da instituicao em 26/07/2026 (nao inventada):
      //   #1D2057  tinta do logo oficial (logo_azul.svg, fill:rgb(29,32,87))
      //   #11275B  azul profundo do uniube.br
      //   #2778C4  azul de acao/link do uniube.br
      //   #00AA9F  turquesa — o acento distintivo da marca
      colors: {
        lightMode: {
          light: "#fafaf8",
          lightgray: "#e9e7e2",
          gray: "#8a8f98",
          darkgray: "#252a3f",
          dark: "#1d2057",
          secondary: "#2778c4",
          tertiary: "#00aa9f",
          highlight: "rgba(39, 120, 196, 0.07)",
          textHighlight: "#ffd97d66",
        },
        darkMode: {
          light: "#10131f",
          lightgray: "#272c42",
          gray: "#7b8397",
          darkgray: "#e2e5ef",
          dark: "#f4f5f9",
          secondary: "#3fd0c4",
          tertiary: "#7fb4ea",
          highlight: "rgba(63, 208, 196, 0.10)",
          textHighlight: "#2778c466",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
