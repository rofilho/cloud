# 🔵 Aula 10: Bancos de Dados Gerenciados na Nuvem — RDS, DynamoDB e Aurora

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana 7** | Sexta-feira, 25/04/2026 | Prof. Romualdo Mathias Filho
**Tipo:** 📘 Teórica (Sexta-feira)

---

## 🎯 0. Objetivo da Aula

Ao final desta aula, o aluno deve ser capaz de:

- **Explicar** o conceito de banco de dados como serviço (DBaaS) e suas vantagens em relação a bancos auto-gerenciados
- **Diferenciar** bancos de dados relacionais (SQL) e não relacionais (NoSQL) no contexto da nuvem AWS
- **Descrever** as características e casos de uso do Amazon RDS, Aurora e DynamoDB
- **Comparar** os principais motores de banco de dados disponíveis no RDS (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server)
- **Analisar** cenários reais para selecionar o serviço de banco de dados mais adequado

---

## 🔄 1. Recapitulação

| Aula | Conceito | Definição |
|---|---|---|
| Aula 11 | VPC | Rede virtual privada isolada na AWS |
| Aula 12 | Subnets | Segmentos de rede dentro da VPC (públicas e privadas) |
| Aula 12 | Security Groups | Firewall de regras por instância, controla tráfego de entrada e saída |

**Conexão:** Nas aulas anteriores aprendemos a criar a infraestrutura de rede (VPC, subnets, SGs). Hoje essa base é fundamental: bancos de dados em produção ficam em **subnets privadas**, protegidos por **Security Groups**, dentro da VPC — exatamente o que construímos antes.

---

## 🏗️ 2. Contextualização

Toda aplicação moderna precisa armazenar dados de forma persistente, estruturada e segura. Historicamente, isso significava instalar e administrar um banco de dados manualmente em um servidor — tarefa complexa que envolve patches, backups, replicação e tuning.

A computação em nuvem introduziu o conceito de **DBaaS (Database as a Service)**: o provedor gerencia toda a infraestrutura do banco e você foca apenas nos dados e nas consultas.

💡 **Analogia:** Ter um banco de dados tradicional é como comprar, reformar e manter um imóvel por conta própria. Usar um DBaaS é como alugar um apartamento já mobiliado e com condomínio incluso — você usa o espaço sem se preocupar com encanamento, elétrica ou segurança predial.

---

## 🗄️ 3. Amazon RDS — Relational Database Service

**Definição:** O Amazon RDS é um serviço gerenciado que facilita a configuração, operação e escalabilidade de bancos de dados relacionais na nuvem. (AWS, 2024)

O RDS suporta seis motores de banco de dados:

| Motor | Características | Caso de Uso |
|---|---|---|
| MySQL | Open source, amplamente adotado, comunidade enorme | Aplicações web, e-commerce, CMS |
| PostgreSQL | Avançado, suporte a JSON, extensível | Análises, geoespacial, BI |
| MariaDB | Fork do MySQL, mais features, open source | Substituto direto do MySQL |
| Oracle | Licença comercial, recursos enterprise | Sistemas legados corporativos |
| SQL Server | Microsoft, integração com Azure e .NET | Ambientes Windows/.NET |
| Amazon Aurora | Motor próprio da AWS, compatível com MySQL/PostgreSQL | Alta performance, escala enterprise |

### Recursos Principais do RDS

- **Backups automáticos:** retenção configurável de 0 a 35 dias, point-in-time recovery
- **Multi-AZ:** replica sincronamente para outra zona; failover automático em segundos
- **Read Replicas:** cópias somente leitura para distribuir carga de leitura
- **Storage auto scaling:** aumenta o armazenamento automaticamente quando necessário
- **Patching gerenciado:** AWS aplica patches de SO e banco de forma controlada
- **Encryption at rest:** dados criptografados com AWS KMS
- **Monitoring:** integrado ao CloudWatch — CPU, IOPS, conexões, latência

💡 **Analogia Multi-AZ:** É como ter um gerador de energia em paralelo à rede elétrica. Se a rede cair (falha na AZ), o gerador (standby na segunda AZ) assume em segundos, sem que o usuário perceba.

---

## ⚡ 4. Amazon Aurora

**Definição:** Amazon Aurora é um banco de dados relacional gerenciado desenvolvido pela AWS, compatível com MySQL e PostgreSQL, projetado para oferecer performance e disponibilidade enterprise com custo de banco open source. (AWS, 2024)

| Característica | Aurora | RDS MySQL |
|---|---|---|
| Performance | Até 5x mais rápido que MySQL padrão | Performance padrão MySQL |
| Storage | Distribuído automaticamente em 6 cópias em 3 AZs | EBS tradicional por instância |
| Replicação | Até 15 réplicas de leitura com latência < 10ms | Até 5 read replicas |
| Failover | Automático em 30 segundos | Multi-AZ: ~60-120 segundos |
| Custo | Mais caro que RDS MySQL padrão | Custo menor para cargas menores |
| Serverless | Aurora Serverless disponível | Não disponível |

💡 **Analogia:** O Aurora está para o RDS MySQL assim como um carro de Fórmula 1 está para um carro de passeio — mesmo combustível (SQL), mas motor completamente diferente por baixo do capô.

### Aurora Serverless

O **Aurora Serverless** é uma configuração que escala automaticamente a capacidade de processamento do banco de dados conforme a demanda — e é pausado quando não há atividade, cobrando apenas pelo uso real.

Ideal para: aplicações com demanda variável e imprevisível, ambientes de desenvolvimento/teste, aplicações que ficam ociosas por períodos.

---

## 📦 5. Amazon DynamoDB — NoSQL Gerenciado

**Definição:** Amazon DynamoDB é um banco de dados NoSQL totalmente gerenciado, sem servidor (serverless), que oferece performance de um dígito de milissegundos em qualquer escala. (AWS, 2024)

### SQL vs NoSQL — Conceitos

| Aspecto | SQL (Relacional) | NoSQL |
|---|---|---|
| Estrutura | Tabelas com esquema fixo | Documentos, chave-valor, grafos, colunas |
| Escala | Vertical (instâncias maiores) | Horizontal (mais nós) |
| Consistência | ACID (forte consistência) | BASE (consistência eventual) |
| Flexibilidade | Esquema rígido | Esquema flexível |
| Linguagem | SQL padrão | APIs específicas |

### Como o DynamoDB Funciona

- **Tabelas:** coleções de itens (linhas), sem esquema fixo
- **Itens:** registros individuais (equivalente a uma linha)
- **Atributos:** campos de dados (equivalente a colunas, mas flexíveis)
- **Chave primária:** pode ser simples (partition key) ou composta (partition key + sort key)
- **Throughput:** medido em RCUs (Read Capacity Units) e WCUs (Write Capacity Units)

### Recursos do DynamoDB

- **On-demand e provisioned:** escolha o modelo de cobrança conforme o padrão de acesso
- **Global Tables:** replicação multi-região automática com latência baixa
- **DynamoDB Streams:** captura de alterações em tempo real para integrar com Lambda
- **DAX (DynamoDB Accelerator):** cache in-memory para latência de microssegundos
- **TTL (Time to Live):** expiração automática de itens

💡 **Analogia:** DynamoDB é como uma grande planilha sem cabeçalhos fixos — cada linha pode ter colunas diferentes, e ela consegue crescer para bilhões de linhas sem perder velocidade.

---

## ⚖️ 6. Comparação: Quando Usar Cada Serviço

| Critério | RDS | Aurora | DynamoDB |
|---|---|---|---|
| Tipo de dado | Relacional (SQL) | Relacional (SQL) | Não relacional (NoSQL) |
| Performance | Boa | Muito alta | Extremamente alta |
| Escala | Vertical + Read Replicas | Horizontal | Horizontal ilimitado |
| Custo base | Baixo a médio | Médio a alto | Por requisição/capacidade |
| Esquema | Rígido | Rígido | Flexível |
| Ideal para | Apps tradicionais, ERP, CRM | Alta escala, SaaS enterprise | IoT, sessões, catálogos, logs |
| Administração | Gerenciado | Gerenciado | Totalmente serverless |
| Multi-região | Limitado | Global Database | Global Tables |

---

## 🔮 7. Tendências Contemporâneas

| Tendência | Descrição | Impacto |
|---|---|---|
| Bancos serverless | Aurora Serverless, DynamoDB on-demand — pague só pelo uso | Redução de custo em workloads variáveis |
| HTAP (Hybrid Transactional/Analytical) | Mesma instância para transações e análises | Elimina ETL, análise em tempo real |
| IA no banco de dados | Amazon Q para RDS, sugestões de queries, anomaly detection | Otimização automática, menos DBA |
| Multi-cloud databases | Ferramentas agnósticas de nuvem (CockroachDB, PlanetScale) | Evitar vendor lock-in |
| Vector databases | Armazenamento de embeddings de IA (pgvector no RDS PostgreSQL) | Base para aplicações RAG e IA generativa |

---

## 📋 8. Resumo Estrutural

| Conceito | Definição em Uma Frase |
|---|---|
| DBaaS | Banco de dados como serviço: o provedor gerencia infraestrutura, você gerencia dados |
| Amazon RDS | Serviço gerenciado para bancos relacionais com 6 motores suportados |
| Multi-AZ | Replicação síncrona para alta disponibilidade com failover automático |
| Read Replica | Cópia somente leitura para distribuir carga e melhorar performance de leitura |
| Amazon Aurora | Motor relacional da AWS com performance superior, compatível com MySQL/PostgreSQL |
| Aurora Serverless | Aurora que escala e pausa automaticamente conforme a demanda |
| DynamoDB | Banco NoSQL serverless da AWS com latência de milissegundo em qualquer escala |
| Partition Key | Chave de distribuição dos dados no DynamoDB — define onde o item é armazenado |

---

## 🧩 9. Atividade Prática (PBL)

### Cenário: Escolhendo o Banco Certo para a StartupFit

A StartupFit é uma plataforma de saúde e fitness com 3 módulos principais:

1. **Perfil do usuário e histórico de treinos** — dados estruturados, relatórios mensais, 50.000 usuários ativos
2. **Feed em tempo real de atividades** — posts, curtidas e comentários, picos de acesso imprevisíveis, esquema variável
3. **Catálogo de exercícios e planos** — dados estáticos, leitura intensiva, até 10 milhões de acessos/dia

**Tarefas:**
1. Para cada módulo, indique o serviço AWS mais adequado (RDS, Aurora ou DynamoDB) e justifique a escolha com base nos conceitos da aula
2. Desenhe (ou descreva) a arquitetura proposta, indicando em quais subnets cada banco ficaria e como seriam protegidos
3. Pesquise o custo estimado de cada solução usando a [Calculadora de Preços AWS](https://calculator.aws/pricing/2/home) e elabore uma comparação de custo mensal para 6 meses

---

## 🚀 10. Desafio (Sala de Aula Invertida)

**Para a próxima aula (Quarta-feira — Lab RDS):**

1. Acesse o AWS Academy → Módulo 9 e leia a introdução teórica antes de chegar
2. Pesquise o que é um **DB Subnet Group** e por que é obrigatório para criar uma instância RDS
3. Explore a documentação do [Amazon RDS Free Tier](https://aws.amazon.com/rds/free/) e anote quais recursos são incluídos

💡 **Dica:** Consulte o Módulo 2.4 do AWS Academy Cloud Foundations e a documentação oficial: https://docs.aws.amazon.com/rds/latest/userguide/

---

## 📚 11. Referências Bibliográficas

### Referências Obrigatórias

| Autor | Obra | Capítulo/Seção Utilizada |
|---|---|---|
| ANTUNES, Jonathan Lamim | Amazon AWS: descomplicando a computação na nuvem. Casa do Código, 2016 | Cap. 5 — Serviços de Banco de Dados |
| KOLBE JÚNIOR, Armando | Computação em nuvem. Contentus, 2020 | Cap. 4 — Serviços de Infraestrutura e Plataforma |

### Referências Complementares

| Autor | Obra | Relevância |
|---|---|---|
| SOUSA NETO, Manoel Veras de | Cloud computing: nova arquitetura da TI. Brasport, 2012 | Fundamentos de PaaS e banco de dados gerenciado |
| MARINESCU, D. C. | Cloud Computing: Theory and Practice. 2nd ed. Morgan Kaufmann, 2017 | Modelos de dados, escalabilidade e NoSQL |
| AWS | Amazon Aurora FAQs (online) | Comparação técnica entre Aurora e RDS |

### Links Úteis

| Recurso | Descrição | Link |
|---|---|---|
| Documentação Amazon RDS | Guia completo do serviço RDS | https://docs.aws.amazon.com/rds/latest/userguide/Welcome.html |
| DynamoDB Developer Guide | Documentação oficial do DynamoDB | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html |
| AWS Database Blog | Posts técnicos sobre bancos na AWS | https://aws.amazon.com/blogs/database/ |
| Calculadora de Preços AWS | Estimativa de custo de serviços AWS | https://calculator.aws/pricing/2/home |

### Vídeos Recomendados

| Canal/Autor | Título | Duração | Link |
|---|---|---|---|
| AWS | Amazon RDS Overview | ~8 min | https://www.youtube.com/watch?v=eMzCI7S1P9M |
| AWS | Amazon DynamoDB Overview | ~7 min | https://www.youtube.com/watch?v=sI-zciHAh-4 |
| freeCodeCamp | SQL vs NoSQL — What's the Difference? | ~21 min | https://www.youtube.com/watch?v=ZS_kXvOeQ5Y |
| TechWorld with Nana | AWS RDS Tutorial for Beginners | ~45 min | https://www.youtube.com/watch?v=vLaW9LNKL0U |
