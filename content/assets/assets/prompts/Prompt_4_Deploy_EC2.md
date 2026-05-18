# 🚀 Prompt 4 — Deploy na EC2 e Configuração do Nginx

> **Instruções:** Use este prompt caso tenha dificuldade em configurar o Nginx como proxy reverso.  
> Copie o texto abaixo e cole no ChatGPT, Claude ou Gemini.

---

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

---

> 💡 **Lembre-se:** Após configurar o Nginx, atualize o Security Group da EC2 para abrir a porta **80** (HTTP) e opcionalmente **443** (HTTPS) para `0.0.0.0/0`.
