---
title: "⚙️ Prompt 2 – Backend (API Python + Flask)"
---

# ⚙️ Prompt 2 — Backend (API Python + Flask)

> **Instruções:** Copie o texto abaixo e cole no ChatGPT, Claude ou Gemini.  
> Substitua apenas o que está entre `[colchetes]` pelo tema do seu grupo.  
> **Cole junto o SQL** que a IA gerou no Prompt 1 — isso garante que o backend seja 100% compatível com o banco.

---

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
   - GET /health → retorna {"status": "ok", "database": "connected"} se o banco estiver acessível, ou {"status": "ok", "database": "error: mensagem"} se não estiver.
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
3. **.env.example** — Arquivo de exemplo das variáveis de ambiente com comentários explicando cada uma. Use estes placeholders:
   - DB_HOST=COLE_AQUI_O_ENDPOINT_DO_RDS
   - DB_PORT=3306
   - DB_NAME=cloudprojeto
   - DB_USER=admin
   - DB_PASS=COLE_AQUI_A_SENHA
4. **.gitignore** — Ignorar .env, venv/, __pycache__/, *.pyc
</arquivos_para_gerar>

<estilo_de_codigo>
- Escreva comentários em português.
- Use type hints nas funções.
- Organize o código com seções separadas por comentários visuais (ex: # ─── Rotas ───).
- Nomeie variáveis e funções em português ou inglês, mas seja consistente.
</estilo_de_codigo>
```

---

> 💡 **Após receber o código:**
> 1. Crie os arquivos na EC2 dentro de `~/meu-projeto/`
> 2. Copie o `.env.example` para `.env` e preencha com os dados do seu RDS
> 3. Instale as dependências:
> ```bash
> cd ~/meu-projeto
> python3 -m venv venv
> source venv/bin/activate
> pip install -r requirements.txt
> ```
> 4. Rode: `python3 app.py`
> 5. Teste: `http://IP_DA_EC2:5000/health`
