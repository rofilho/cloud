# 🖥️ Prompt 3 — Frontend (HTML + CSS + JavaScript)

> **Instruções:** Copie o texto abaixo e cole no ChatGPT, Claude ou Gemini.  
> Substitua apenas o que está entre `[colchetes]`.  
> **Cole junto o código do app.py** que a IA gerou no Prompt 2 — isso garante que o frontend use as rotas corretas.

---

```
Você é um desenvolvedor frontend especializado em interfaces web modernas, responsivas e visualmente atraentes.

<contexto>
Sou aluno de Cloud Computing na universidade. Estou construindo uma aplicação web para um projeto final. O frontend será servido pelo Flask (templates/index.html) e consumirá a API REST do backend via fetch(). A aplicação rodará em uma instância EC2 na AWS com domínio configurado via Cloudflare.
</contexto>

<tema_da_aplicacao>
Minha aplicação é: [DESCREVA AQUI O MESMO TEMA DOS PROMPTS ANTERIORES]
</tema_da_aplicacao>

<codigo_do_backend>
Este é o backend Flask que já tenho. Use exatamente estas rotas para consumir a API:

[COLE AQUI O CONTEÚDO COMPLETO DO app.py GERADO NO PROMPT 2]
</codigo_do_backend>

<requisitos_obrigatorios>
1. Gere um ÚNICO arquivo HTML completo (index.html) com CSS e JavaScript embutidos — sem arquivos externos, sem frameworks CSS, sem CDN de terceiros (exceto Google Fonts).
2. O design deve ser moderno, com tema escuro (dark mode), usando estas técnicas visuais:
   - Gradientes sutis no fundo da página.
   - Cards com bordas arredondadas e sombras suaves.
   - Animações de entrada nos cards (fadeIn).
   - Botões com efeito hover e transição suave.
   - Fonte "Inter" do Google Fonts.
   - Indicador visual de status da aplicação (bolinha verde/vermelha) que consulta /health a cada 30 segundos.
3. O frontend deve ter estas funcionalidades:
   - Formulário para criar um novo registro (usando POST via fetch).
   - Lista/cards mostrando todos os registros (usando GET via fetch).
   - Botão para deletar um registro (usando DELETE via fetch).
   - Feedback visual ao usuário após cada ação (toast/notificação temporária).
   - Atualização automática da lista após criar ou deletar.
4. O frontend deve fazer requisições para caminhos RELATIVOS (ex: fetch('/health'), fetch('/mensagens')) — nunca URLs absolutas com IP.
5. Use escapeHtml() em todo texto exibido vindo do banco para prevenir XSS.
6. O layout deve ser responsivo (funcionar em desktop e celular).
7. Inclua no rodapé: "Cloud Computing · Uniube 2026 · Prof. Romualdo" e um link para /health.
</requisitos_obrigatorios>

<paleta_de_cores>
Use esta paleta (inspirada no GitHub Dark):
- Fundo principal: #0d1117
- Surface (cards): #161b22
- Bordas: #30363d
- Texto principal: #e6edf3
- Texto secundário: #8b949e
- Accent (botões, links): #58a6ff
- Accent secundário (gradientes): #7c6bff
- Sucesso: #3fb950
- Erro/Danger: #f85149
</paleta_de_cores>

<formato_de_saida>
Gere um único bloco de código com o arquivo index.html completo.
O arquivo deve ser salvo em: templates/index.html (dentro da pasta do projeto Flask).
Inclua comentários em português nas seções principais do HTML, CSS e JavaScript.
</formato_de_saida>
```

---

> 💡 **Após receber o HTML:**
> 1. Crie a pasta `templates/` dentro do diretório do projeto na EC2:
> ```bash
> mkdir -p ~/meu-projeto/templates
> ```
> 2. Salve o HTML como `~/meu-projeto/templates/index.html`
> 3. Reinicie o backend: `python3 app.py`
> 4. Acesse: `http://IP_DA_EC2:5000/` — o mural deve aparecer completo
