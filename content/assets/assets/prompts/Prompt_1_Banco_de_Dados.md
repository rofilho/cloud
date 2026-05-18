# 🗄️ Prompt 1 — Banco de Dados (Schema SQL)

> **Instruções:** Copie o texto abaixo e cole no ChatGPT, Claude ou Gemini.  
> Substitua apenas o que está entre `[colchetes]` pelo tema do seu grupo.

---

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

---

> 💡 **Após receber o SQL gerado pela IA:** Salve como `schema.sql` e execute dentro da EC2 conectada ao banco:
> ```bash
> mysql -h ENDPOINT_DO_RDS -u admin -p < schema.sql
> ```
