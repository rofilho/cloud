---
title: "🤖 Prompts de IA – Projeto Final Cloud Computing"
---

# 🤖 Prompts de IA — Projeto Final

> Use estes prompts **na ordem indicada**. Cole cada um no ChatGPT, Claude ou Gemini, substitua o que está entre `[colchetes]` e cole o resultado do prompt anterior quando solicitado.

---

## 📋 Prompt 1 — Banco de Dados (Schema SQL)

> **Instruções:** Copie o texto abaixo e cole no ChatGPT, Claude ou Gemini.
> Substitua apenas o que está entre `[colchetes]` pelo tema do seu grupo.

```
Você é um engenheiro de banco de dados especializado em MySQL 8.0 rodando no Amazon RDS.

<contexto>
Sou aluno de Cloud Computing na universidade. Estou construindo uma aplicação web simples para um projeto final. A aplicação será hospedada em uma instância EC2 na AWS e o banco de dados será um RDS MySQL privado (sem acesso direto pela internet). Preciso do schema SQL completo para criar as tabelas do meu projeto.
</contexto>

<tema_da_aplicacao>
Minha aplicação é: [DESCREVA AQUI O TEMA DO SEU GRUPO EM 2-3 FRASES. Exemplos: "Um catálogo de filmes onde o usuário pode adicionar, listar e remover filmes favoritos", "Uma agenda de contatos com nome, telefone e email", "Um sistema de cardápio de restaurante com pratos, preços e categorias"]
</tema_da_aplicacao>

<requisitos_obrigatorios>
1. Crie entre 2 e 4 tabelas que façam sentido para o tema escolhido.
2. Cada tabela deve ter uma coluna `id` como chave primária com AUTO_INCREMENT.
3. Inclua pelo menos uma relação entre tabelas (chave estrangeira).
4. Adicione uma coluna `criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP` em todas as tabelas.
5. O banco de dados deve se chamar: cloudprojeto
6. Inclua ao menos 5 registros de exemplo (INSERT INTO) em cada tabela para que o banco já comece populado.
7. Use tipos de dados adequados (VARCHAR para texto curto, TEXT para texto longo, DECIMAL para valores monetários, INT para números inteiros).
8. Todos os nomes de tabelas e colunas devem estar em português e em snake_case (ex: nome_completo, data_nascimento).
</requisitos_obrigatorios>

<formato_de_saida>
Gere um único arquivo SQL pronto para execução que contenha, nesta ordem:
1. CREATE DATABASE IF NOT EXISTS cloudprojeto;
2. USE cloudprojeto;
3. Todas as instruções CREATE TABLE;
4. Todas as instruções INSERT INTO com dados de exemplo;
5. Comentários explicando cada tabela e cada relação.

O SQL deve funcionar diretamente ao ser colado no terminal MySQL conectado ao RDS.
</formato_de_saida>
```

> 💡 **Após receber o SQL gerado pela IA:** Salve como `schema.sql` e execute dentro da EC2:
> ```bash
> mysql -h ENDPOINT_DO_RDS -u admin -p < schema.sql
> ```

---

## ⚙️ Prompt 2 — Backend (API Python + Flask)

> **Instruções:** Copie o texto abaixo e cole no ChatGPT, Claude ou Gemini.
> **Cole junto o SQL** que a IA gerou no Prompt 1 — isso garante que o backend seja 100% compatível com o banco.

```
Você é um desenvolvedor backend Python especializado em Flask e SQLAlchemy, com experiência em deploy de aplicações na AWS EC2.

<contexto>
Sou aluno de Cloud Computing na universidade. Estou construindo uma aplicação web para um projeto final. O backend rodará em uma instância EC2 (Amazon Linux 2023) e se conectará a um banco MySQL no Amazon RDS. O banco é privado e só aceita conexões da EC2. Preciso de uma API REST completa em Flask.
</contexto>

<tema_da_aplicacao>
Minha aplicação é: [DESCREVA AQUI O MESMO TEMA QUE VOCÊ USOU NO PROMPT 1]
</tema_da_aplicacao>

<schema_do_banco>
Este é o SQL que já criei para o banco de dados. Use exatamente estas tabelas e colunas:

[COLE AQUI O SQL COMPLETO GERADO NO PROMPT 1]
</schema_do_banco>

<requisitos_obrigatorios>
1. Use Flask como framework web e Flask-SQLAlchemy como ORM.
2. Use PyMySQL como driver de conexão ao MySQL.
3. Todas as credenciais do banco (host, porta, nome, usuário, senha) devem ser lidas de VARIÁVEIS DE AMBIENTE usando python-dotenv. Nunca hardcode credenciais no código.
4. Crie os seguintes endpoints obrigatórios:
   - GET /health → retorna {"status": "ok", "database": "connected"} se o banco estiver acessível.
   - GET /[recurso] → lista todos os registros da tabela principal (retorna JSON).
   - POST /[recurso] → cria um novo registro (recebe JSON no body).
   - DELETE /[recurso]/<id> → remove um registro pelo ID.
5. Use Flask-CORS para permitir requisições do frontend.
6. Inclua tratamento de erros (try/except) nos endpoints com respostas JSON claras.
7. A aplicação deve rodar na porta 5000 e aceitar conexões de qualquer IP (host='0.0.0.0').
8. Sirva o frontend diretamente pelo Flask usando render_template — o arquivo HTML ficará em templates/index.html.
</requisitos_obrigatorios>

<arquivos_para_gerar>
Gere exatamente estes arquivos, cada um em um bloco de código separado e identificado:

1. **app.py** — Arquivo principal da aplicação com todos os endpoints e modelos SQLAlchemy.
2. **requirements.txt** — Lista de dependências Python com versões fixas. Inclua: flask, flask-sqlalchemy, flask-cors, pymysql, python-dotenv, cryptography.
3. **.env.example** — Arquivo de exemplo das variáveis de ambiente:
   - DB_HOST=COLE_AQUI_O_ENDPOINT_DO_RDS
   - DB_PORT=3306
   - DB_NAME=cloudprojeto
   - DB_USER=admin
   - DB_PASS=COLE_AQUI_A_SENHA
4. **.gitignore** — Ignorar .env, venv/, __pycache__/, *.pyc
</arquivos_para_gerar>
```

> 💡 **Após receber o código:**
> ```bash
> cd ~/meu-projeto
> python3 -m venv venv
> source venv/bin/activate
> pip install -r requirements.txt
> python3 app.py
> ```
> Teste em: `http://IP_DA_EC2:5000/health`

---

## 🖥️ Prompt 3 — Frontend (Interface Web)

> **Instruções:** Copie o texto abaixo e cole no ChatGPT, Claude ou Gemini.
> **Cole junto o código do `app.py`** que a IA gerou no Prompt 2 — isso garante que o frontend use as rotas corretas.

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
2. O design deve ser moderno, com tema escuro (dark mode), usando:
   - Gradientes sutis no fundo da página.
   - Cards com bordas arredondadas e sombras suaves.
   - Animações de entrada nos cards (fadeIn).
   - Botões com efeito hover e transição suave.
   - Fonte "Inter" do Google Fonts.
   - Indicador visual de status (bolinha verde/vermelha) que consulta /health a cada 30 segundos.
3. Funcionalidades:
   - Formulário para criar um novo registro (POST via fetch).
   - Lista/cards mostrando todos os registros (GET via fetch).
   - Botão para deletar um registro (DELETE via fetch).
   - Feedback visual ao usuário após cada ação (toast/notificação temporária).
4. O frontend deve fazer requisições para caminhos RELATIVOS (ex: fetch('/health')) — nunca URLs absolutas com IP.
5. O layout deve ser responsivo (funcionar em desktop e celular).
6. Inclua no rodapé: "Cloud Computing · Uniube 2026 · Prof. Romualdo".
</requisitos_obrigatorios>

<paleta_de_cores>
- Fundo: #0d1117 | Cards: #161b22 | Bordas: #30363d
- Texto: #e6edf3 | Secundário: #8b949e
- Accent: #58a6ff | Sucesso: #3fb950 | Erro: #f85149
</paleta_de_cores>

<formato_de_saida>
Gere um único bloco de código com o arquivo index.html completo.
Salvar em: templates/index.html (dentro da pasta do projeto Flask).
</formato_de_saida>
```

> 💡 **Após receber o HTML:**
> ```bash
> mkdir -p ~/meu-projeto/templates
> # Cole o HTML como ~/meu-projeto/templates/index.html
> python3 app.py
> ```
> Acesse: `http://IP_DA_EC2:5000/`

---

## 🚀 Prompt 4 — Deploy com Nginx na EC2

> **Instruções:** Use este prompt se tiver dificuldade em configurar o servidor para ficar acessível pela porta 80 (sem precisar digitar `:5000` na URL).

```
Você é um administrador de sistemas Linux especializado em Amazon EC2 com Amazon Linux 2023.

<contexto>
Tenho uma instância EC2 rodando Amazon Linux 2023 na AWS. Nela, tenho uma aplicação Flask rodando na porta 5000 dentro de ~/meu-projeto/. Preciso configurar o Nginx como proxy reverso para que a aplicação fique acessível na porta 80 (HTTP padrão), sem que o usuário precise digitar :5000 na URL.
</contexto>

<requisitos_obrigatorios>
1. Gere os comandos exatos para instalar o Nginx no Amazon Linux 2023 (usando dnf).
2. Gere o conteúdo completo do arquivo de configuração do Nginx que faz proxy reverso da porta 80 para 127.0.0.1:5000.
3. O arquivo de configuração deve ficar em /etc/nginx/conf.d/meu-projeto.conf
4. Gere os comandos para testar a configuração, habilitar o Nginx na inicialização e iniciar o serviço.
5. Gere os comandos para manter a aplicação Flask rodando em background usando screen.
6. Explique como verificar se o Security Group da EC2 tem a porta 80 aberta para tráfego externo (0.0.0.0/0).
</requisitos_obrigatorios>

<formato_de_saida>
Gere um guia passo a passo numerado com os comandos exatos para copiar e colar no terminal da EC2. Inclua o que cada comando faz em um comentário acima dele.
</formato_de_saida>
```

> 💡 **Lembre-se:** Após configurar o Nginx, abra a porta **80** no Security Group da EC2 para `0.0.0.0/0`.

---

*Cloud Computing · Uniube 2026 · Prof. Romualdo Mathias Filho*
