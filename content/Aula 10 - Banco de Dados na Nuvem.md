---
disciplina: Cloud Computing
codigo: "14189"
aula: 10
titulo: "Banco de Dados na Nuvem"
tipo: teorica
semana: 6
data: 2026-04-18
status: publicado
tags:
  - cloud
  - aws
  - banco-de-dados
  - rds
  - dynamodb
  - nosql
publicar: true
---

# 🟢 Aula 10: Banco de Dados na Nuvem (Relacionais e NoSQL)

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana 6** | Sexta-feira
**Professor:** Romualdo Mathias Filho
**Tipo:** 📘 Teórica
**Tópicos:** RDS, Aurora, DynamoDB, Multi-AZ, Read Replicas, SQL vs NoSQL

---

## 🎯 Objetivo da Aula

Ao final desta aula, os alunos serão capazes de:
- Entender a diferença entre instalar um banco de dados num servidor EC2 (IaaS) versus usar um serviço gerenciado (PaaS).
- Compreender o Amazon RDS e seus motores suportados (MySQL, Aurora, PostgreSQL...).
- Explicar as estratégias de alta disponibilidade: **Multi-AZ** e **Read Replicas**.
- Identificar casos de uso para o **Amazon DynamoDB** (NoSQL Serverless).

---

## 🔄 Revisão Rápida (5 min)

| **Conceito (Aulas Anteriores)** | **Conexão com hoje** |
| --- | --- |
| **IaaS (EC2)** | Podemos instalar MySQL num EC2, mas gerenciamos backups, patches e falhas sozinhos. |
| **PaaS (Serviços Gerenciados)** | O RDS faz o trabalho braçal de infraestrutura. Focamos apenas nos dados. |
| **Auto Scaling** | Escalamos aplicações web antes; agora veremos como "escalar" um banco de dados. |

---

## 🗃️ 1. Bancos de Dados Relacionais vs Não-Relacionais

Antes de escolher um produto AWS, entendemos a estratégia:

### Banco Relacional (SQL)
- **Estrutura:** Tabelas com linhas e colunas (schema fixo).
- **Uso:** Sistemas financeiros, ERP, CRM — onde integridade e transações ACID são críticas.
- **Exemplos:** MySQL, PostgreSQL, Oracle, SQL Server.

### Banco Não-Relacional (NoSQL)
- **Estrutura:** Chave-Valor, Documentos JSON, Grafos (schema flexível).
- **Uso:** Catálogos de e-commerce, perfis de usuário, IoT, carrinhos de compra.
- **Exemplos:** MongoDB, Cassandra, Redis.

> 💡 **Exemplo brasileiro:** O **Nubank** usa bancos relacionais para transações financeiras. O **iFood** usa NoSQL para o catálogo de restaurantes e pedidos em tempo real.

---

## 🐘 2. Amazon RDS (Relational Database Service)

O **Amazon RDS** é um serviço PaaS que facilita configurar, operar e escalar bancos relacionais na nuvem.

### O que o RDS gerencia pra você?
- Instalação e provisionamento do sistema operacional e motor do banco.
- Patches e atualizações automáticas.
- Backups automáticos e recuperação pontual (Point-in-Time Recovery).
- Alta Disponibilidade (Multi-AZ).

### O que ainda é sua responsabilidade?
- Otimização de queries lentas.
- Modelagem das tabelas e índices.
- Gerenciamento de usuários e senhas do banco.

### Motores Suportados no RDS
| Motor | Observação |
|---|---|
| MySQL | O mais popular do mundo |
| PostgreSQL | Mais robusto, com suporte a JSON |
| MariaDB | Fork open-source do MySQL |
| Oracle | Licença própria (caro) |
| SQL Server | Licença Microsoft |
| **Amazon Aurora** | ⭐ Motor proprietário AWS — até 5x mais rápido que MySQL |

---

## 🛡️ 3. Escalabilidade e Alta Disponibilidade no RDS

Como evitar que o banco caia ou fique lento?

### Multi-AZ (Tolerância a Falhas)
- Cria uma **réplica exata** do banco em outra Zona de Disponibilidade (outro "prédio" físico da AWS).
- Os dados são copiados **sincronamente** (em tempo real).
- Se o banco primário cair, a AWS redireciona o tráfego automaticamente para a réplica.
- **Objetivo:** Sobreviver a falhas. Não melhora performance.

### Read Replicas (Performance de Leitura)
- Cria **cópias do banco apenas para LEITURA**.
- Ideal quando seu sistema tem 90% de consultas (SELECT) e 10% de gravação.
- **Objetivo:** Reduzir a carga do banco principal. Não protege contra falhas.

> 💡 **Resumo:** Multi-AZ = **Segurança**. Read Replica = **Velocidade**.

---

## ⚡ 4. Amazon DynamoDB (Banco NoSQL Serverless)

O **Amazon DynamoDB** é o banco de dados de chave-valor e documentos da AWS.

### Características Principais
| Característica | Detalhe |
|---|---|
| **Performance** | Latência abaixo de 10ms, independente do volume de dados |
| **Serverless** | Sem instâncias para provisionar. Paga pelo que usa. |
| **Escala automática** | Do zero a milhões de requisições/segundo sem configuração |
| **Schema flexível** | Cada registro pode ter campos completamente diferentes |

> 💡 **Caso de uso real:** O sistema de entregas do **Rappi** usa DynamoDB para rastrear a localização de milhões de entregadores em tempo real com latência mínima.

---

## 📋 Resumo Estrutural

| **Conceito** | **Definição em Uma Frase** |
| --- | --- |
| **Amazon RDS** | Banco de dados relacional gerenciado pela AWS — você não precisa instalar nada. |
| **Amazon Aurora** | O banco relacional premium da AWS, até 5x mais rápido que MySQL padrão. |
| **Multi-AZ** | Cópia do banco em outro datacenter para sobreviver a falhas físicas. |
| **Read Replica** | Clone do banco usado apenas para consultas, aliviando o banco principal. |
| **Amazon DynamoDB** | Banco NoSQL Serverless com latência abaixo de 10ms em qualquer escala. |

---

## ❓ Banco de Questões

> 🔒 Esta seção é **visível apenas no Obsidian do professor**. Remover antes de publicar para alunos.

### Questão 1 (Múltipla Escolha — Nível: Básico)
**Enunciado:** Qual serviço da AWS oferece um banco de dados relacional totalmente gerenciado, eliminando a necessidade de gerenciar backups e patches manualmente?

- [ ] A) Amazon EC2
- [ ] B) Amazon S3
- [x] C) Amazon RDS ✅
- [ ] D) Amazon Lambda

**Justificativa:** O RDS (Relational Database Service) é o serviço PaaS da AWS para bancos relacionais. Diferente do EC2 onde você instala e gerencia o banco, o RDS automatiza backups, patches e alta disponibilidade.

---

### Questão 2 (Múltipla Escolha — Nível: Básico)
**Enunciado:** Uma empresa precisa garantir que seu banco de dados no RDS continue funcionando mesmo que o datacenter principal da AWS sofra uma falha física. Qual funcionalidade deve ser habilitada?

- [x] A) Multi-AZ ✅
- [ ] B) Read Replica
- [ ] C) Auto Scaling de EC2
- [ ] D) Amazon S3 Glacier

**Justificativa:** Multi-AZ cria uma réplica sincronizada em outra Zona de Disponibilidade (outro datacenter físico). Em caso de falha, o DNS é redirecionado automaticamente.

---

### Questão 3 (Múltipla Escolha — Nível: Intermediário)
**Enunciado:** Uma aplicação de e-commerce registra que 95% das operações são consultas (SELECT) de catálogo de produtos e apenas 5% são gravações. Qual estratégia de banco de dados reduz a carga no servidor principal?

- [ ] A) Multi-AZ
- [ ] B) Amazon Glacier
- [x] C) Read Replicas ✅
- [ ] D) Amazon S3

**Justificativa:** Read Replicas são cópias do banco exclusivas para leitura. Ao direcionar as consultas para réplicas, o banco principal fica focado apenas nas gravações.

---

### Questão 4 (Dissertativa — Nível: Intermediário)
**Enunciado:** Explique a diferença entre um banco de dados instalado em uma instância EC2 e o serviço Amazon RDS. Quais são as vantagens e desvantagens de cada abordagem?

**Resposta esperada:** 
- **EC2 (IaaS):** O desenvolvedor instala e configura o banco manualmente. Tem controle total (versões, extensões, configurações avançadas), mas é responsável por backups, patches, alta disponibilidade e monitoramento. Maior complexidade operacional.
- **RDS (PaaS):** A AWS gerencia toda a infraestrutura subjacente. Backups automáticos, patches, Multi-AZ e monitoramento inclusos. Menos flexibilidade para configurações muito específicas, mas muito menor esforço operacional. Ideal para equipes pequenas.

---

### Questão 5 (Situação-Problema — Nível: Avançado)
**Enunciado:** Uma startup de delivery precisa armazenar o status de pedidos em tempo real para milhões de usuários simultâneos. O acesso é feito por `pedido_id` e a latência máxima aceitável é de 5ms. Qual serviço AWS você recomendaria e por quê?

**Resposta esperada:** 
**Amazon DynamoDB.** Por ser um banco NoSQL de chave-valor Serverless, o DynamoDB oferece latência abaixo de 10ms em qualquer escala sem necessidade de provisionar servidores. O acesso por `pedido_id` é o padrão ideal para chave-valor. Escala automaticamente para milhões de requisições/segundo, sem configuração manual.

---

## 📚 Leituras Recomendadas

- [ ] Acessar o AWS Console e explorar a seção **RDS** → "Create database" (sem criar, apenas explorar as opções)
- [ ] Revisar comandos SQL básicos: `SELECT`, `INSERT`, `WHERE` — usaremos no laboratório da Aula 11
- [ ] Leitura opcional: [O que é Amazon DynamoDB? (AWS Docs)](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)

---
*Última atualização: 2026-04-19 | Status: publicado*