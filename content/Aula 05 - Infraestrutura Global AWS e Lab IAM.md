# Aula 05 - Infraestrutura Global AWS e Lab IAM

# 🟢 Aula 05: Infraestrutura Global AWS e Laboratório de Introdução ao IAM

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana 3** | Quarta-feira | Prof. Romualdo Mathias Filho
**Tipo:** 🔬 Prática (Quarta-feira)
**Base Teórica:** Aulas 01 e 02 — Fundamentos de Cloud, Modelos de Serviço (IaaS, PaaS, SaaS) e Modelos de Implantação

---

## 🎯 0. Objetivo da Aula

Ao final desta aula prática, o aluno deve ser capaz de:

- Navegar pelo Console de Gerenciamento da AWS com autonomia
- Identificar as Regiões, Zonas de Disponibilidade (AZs) e Edge Locations na infraestrutura global da AWS
- Criar usuários e grupos no AWS IAM (Identity and Access Management)
- Associar políticas de permissão a grupos e verificar seus efeitos
- Testar o acesso de diferentes usuários para comprovar a aplicação das políticas

---

## 🔄 1. Revisão Rápida dos Conceitos (5 min)

| Conceito (das aulas teóricas) | Aplicação Prática Hoje |
| --- | --- |
| Computação em Nuvem | Vamos explorar o console da maior provedora do mundo: a AWS |
| IaaS (Infraestrutura como Serviço) | O console AWS permite provisionar servidores, redes e armazenamento sob demanda |
| Modelos de Implantação (Pública, Privada, Híbrida) | A AWS é uma nuvem pública — veremos como ela organiza sua infraestrutura global |
| Segurança e Controle de Acesso | Vamos usar o IAM para controlar quem pode acessar o quê na nuvem |
| AWS Academy (Aula 03-04) | Utilizaremos o Learner Lab para executar o laboratório prático |

🔗 **Conexão com as aulas anteriores:** Nas aulas teóricas, vocês aprenderam o que é a nuvem e quais modelos existem. Na aula passada, fizeram o primeiro contato com o AWS Academy. Hoje, vamos mergulhar na prática: entender como a AWS organiza seus data centers pelo mundo e aprender a controlar quem pode fazer o quê dentro da sua conta AWS usando o IAM.

---

## 📋 2. Pré-requisitos

- [ ]  Acesso ao AWS Academy Learner Lab ativo (configurado na Aula 03-04)
- [ ]  Navegador web atualizado (Chrome ou Firefox recomendados)
- [ ]  Módulo AWS Academy: Módulo 1.3 — Visão Geral da Infraestrutura Global AWS
- [ ]  Lab AWS Academy: Introdução ao AWS IAM

---

## 🌍 3. Parte 1 — Explorando a Infraestrutura Global da AWS

### 📌 Módulo AWS Academy: Módulo 1.3 — Infraestrutura Global

Antes de entrar no laboratório de IAM, precisamos entender onde os serviços da AWS rodam fisicamente. A infraestrutura global é composta por três camadas:

| Componente | O que é | Quantidade (2025) | Analogia |
| --- | --- | --- | --- |
| Região (Region) | Área geográfica com cluster de data centers | 34+ regiões | Uma cidade onde a AWS tem presença |
| Zona de Disponibilidade (AZ) | Um ou mais data centers isolados dentro de uma região | 100+ AZs | Bairros diferentes dentro da cidade |
| Edge Location | Ponto de presença para cache e entrega de conteúdo (CDN) | 600+ pontos | Quiosques de entrega rápida espalhados |

💡 **Analogia:** Pense na AWS como uma rede de supermercados. As Regiões são as cidades onde existem lojas. As AZs são lojas diferentes dentro da mesma cidade (se uma fechar, outra atende). Os Edge Locations são os pontos de entrega rápida espalhados nos bairros.

---

### Etapa 1: Acessar o Mapa da Infraestrutura Global

1. Abra o navegador e acesse: [infrastructure.aws](https://infrastructure.aws/)
2. Explore o mapa interativo — observe as regiões disponíveis no mundo
3. Identifique a região mais próxima do Brasil: São Paulo (`sa-east-1`)
4. Clique na região de São Paulo e observe quantas AZs ela possui (3 AZs)
5. Observe as regiões planejadas para o futuro

✅ **Checkpoint:** Você deve ser capaz de responder: “Quantas AZs tem a região de São Paulo?” (Resposta: 3)

---

### Etapa 2: Verificar a Região no Console AWS

1. Acesse o AWS Academy Learner Lab e clique em Start Lab
2. Aguarde o indicador ficar verde e clique em AWS para abrir o Console
3. No canto superior direito do console, observe o nome da região selecionada
4. Clique no seletor de região e veja todas as regiões disponíveis
5. Observe que algumas regiões estão desabilitadas (requerem opt-in)
6. Selecione `us-east-1 (N. Virginia)` — esta é a região padrão do Learner Lab

✅ **Checkpoint:** O console deve mostrar “N. Virginia” no canto superior direito

---

### Etapa 3: Entender por que a Região importa

1. Na barra de busca do console, digite “EC2” e clique no serviço
2. Observe que o dashboard mostra os recursos daquela região específica
3. Troque para outra região (ex: `sa-east-1 São Paulo`) — veja que os recursos mudam
4. Volte para `us-east-1`

📌 **Importante:** Cada região é independente. Um servidor criado em N. Virginia não aparece em São Paulo. Isso é fundamental para entender isolamento, latência e conformidade legal (LGPD exige dados no Brasil).

### Fatores para Escolher uma Região

| Fator | Exemplo |
| --- | --- |
| Latência | Aplicação para usuários brasileiros → sa-east-1 (São Paulo) |
| Conformidade Legal | LGPD exige dados no Brasil → sa-east-1 |
| Disponibilidade de Serviços | Nem todos os serviços estão em todas as regiões |
| Custo | Preços variam por região — us-east-1 costuma ser a mais barata |

---

## 🔐 4. Parte 2 — Laboratório: Introdução ao AWS IAM

### 📌 Módulo AWS Academy: Módulo 3 — Segurança da Nuvem AWS

Lab: Introdução ao AWS IAM

O que é o IAM?

AWS IAM (Identity and Access Management) é o serviço que controla quem pode acessar quais recursos na sua conta AWS. É gratuito e fundamental para qualquer uso da nuvem.

| Componente IAM | O que é | Analogia |
| --- | --- | --- |
| Usuário (User) | Identidade com credenciais para acessar a AWS | Crachá de um funcionário |
| Grupo (Group) | Coleção de usuários com mesmas permissões | Departamento da empresa |
| Política (Policy) | Documento JSON que define permissões (Allow/Deny) | Manual de regras do departamento |
| Função (Role) | Permissão temporária assumida por serviços/usuários | Chave-mestra temporária para uma tarefa |
| MFA | Autenticação multifator (código extra além da senha) | Segunda fechadura na porta |

💡 **Analogia:** O IAM é como o sistema de segurança de um prédio corporativo. Cada funcionário tem um crachá (usuário), pertence a um departamento (grupo), e o departamento tem regras sobre quais andares e salas pode acessar (políticas). Algumas áreas restritas exigem biometria adicional (MFA).

---

### Etapa 1: Acessar o IAM no Console AWS

1. No console AWS, na barra de busca superior, digite “IAM”
2. Clique em IAM nos resultados
3. Observe o Dashboard do IAM — ele mostra um resumo de usuários, grupos, políticas e funções
4. Note o IAM Sign-in URL no topo — este é o link que os usuários IAM usam para fazer login

✅ **Checkpoint:** Você deve visualizar o Dashboard do IAM com o resumo dos recursos

---

### Etapa 2: Explorar Usuários Pré-Criados

1. No menu lateral esquerdo, clique em “Users” (Usuários)
2. Observe os usuários que já existem no lab (geralmente: `user-1`, `user-2`, `user-3`)
3. Clique em `user-1` para ver seus detalhes
4. Observe as abas:
    - Permissions (Permissões): mostra as políticas associadas ao usuário
    - Groups (Grupos): mostra os grupos dos quais o usuário faz parte
    - Security credentials (Credenciais): mostra chaves de acesso e status do MFA
5. Repita para `user-2` e `user-3`

📌 **Observe:** Inicialmente, os usuários não pertencem a nenhum grupo e não possuem permissões diretamente atribuídas.

✅ **Checkpoint:** Você deve ver que os usuários existem mas não possuem permissões associadas

---

### Etapa 3: Explorar Grupos Pré-Criados

1. No menu lateral, clique em “User groups” (Grupos de usuários)
2. Observe os grupos pré-criados (geralmente: `EC2-Admin`, `EC2-Support`, `S3-Support`)
3. Clique no grupo `S3-Support`
4. Na aba Permissions, clique no nome da política associada (ex: `AmazonS3ReadOnlyAccess`)
5. Examine o JSON da política — observe a estrutura:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:Get*",
                "s3:List*"
            ],
            "Resource": "*"
        }
    ]
}
```

1. Entenda cada campo:

| Campo | Significado | Neste exemplo |
| --- | --- | --- |
| Effect | Ação da política: permitir ou negar | Allow = Permitir |
| Action | Quais operações são permitidas | s3:Get* e s3:List* = Ler e listar objetos no S3 |
| Resource | Em quais recursos se aplica | * = Todos os buckets S3 |
1. Repita a exploração para os grupos `EC2-Support` e `EC2-Admin`

✅ **Checkpoint:** Você deve entender a diferença entre as permissões dos três grupos

---

### Etapa 4: Adicionar Usuários aos Grupos

Agora vamos associar cada usuário a um grupo:

| Usuário | Grupo | O que poderá fazer |
| --- | --- | --- |
| user-1 | S3-Support | Visualizar buckets e objetos no Amazon S3 (somente leitura) |
| user-2 | EC2-Support | Visualizar instâncias EC2 (somente leitura) |
| user-3 | EC2-Admin | Visualizar e gerenciar instâncias EC2 (iniciar, parar, criar) |

Para cada usuário:

1. Clique em “User groups” no menu lateral
2. Clique no grupo desejado (ex: `S3-Support`)
3. Na aba Users, clique em “Add users”
4. Selecione o checkbox ao lado do usuário correspondente (ex: `user-1`)
5. Clique em “Add users”
6. Repita para os outros dois pares (user-2 → EC2-Support, user-3 → EC2-Admin)

✅ **Checkpoint:** Ao clicar em cada grupo, deve aparecer 1 usuário na aba “Users”

---

### Etapa 5: Testar as Permissões (Sign-in como Usuário IAM)

Esta é a parte mais importante — vamos comprovar que as políticas funcionam!

1. Copie o IAM Sign-in URL do Dashboard do IAM
2. Abra uma janela anônima/privada do navegador
3. Acesse o URL copiado
4. Faça login como `user-1` (com a senha fornecida nas instruções do lab)

Teste com user-1 (grupo S3-Support):

1. Navegue até o serviço Amazon S3 — você deve conseguir ver os buckets e seus conteúdos ✅
2. Navegue até o serviço Amazon EC2 — você deve receber uma mensagem de erro de permissão ❌

Teste com user-2 (grupo EC2-Support):

1. Faça logout e login como `user-2`
2. Amazon EC2: deve conseguir visualizar instâncias ✅
3. Amazon S3: deve receber erro de permissão ❌
4. EC2: NÃO deve conseguir iniciar ou parar instâncias ❌

Teste com user-3 (grupo EC2-Admin):

1. Faça logout e login como `user-3`
2. Amazon EC2: deve conseguir visualizar E gerenciar instâncias ✅ (parar, iniciar)
3. Amazon S3: deve receber erro de permissão ❌

✅ **Checkpoint Final:** Cada usuário deve ter acesso apenas aos recursos definidos pela política do seu grupo.

🔐 **Princípio da Menor Permissão (Least Privilege):** Cada usuário deve ter apenas as permissões necessárias para realizar seu trabalho — nem mais, nem menos. Este é um dos princípios mais importantes de segurança em nuvem.

---

## 🔧 5. Comparação: IAM em Outras Nuvens

Para efeito de comparação, conheçam os serviços equivalentes ao IAM nas outras grandes nuvens:

| Aspecto | AWS | Azure | GCP |
| --- | --- | --- | --- |
| Serviço de Identidade | IAM | Microsoft Entra ID (antigo Azure AD) | Cloud IAM |
| Conceito de Usuário | IAM User | User (Entra ID) | Google Account / Service Account |
| Conceito de Grupo | IAM Group | Group (Entra ID) | Google Group |
| Conceito de Permissão | Policy (JSON) | Role Assignment (RBAC) | IAM Role + Binding |
| MFA | Virtual MFA / Hardware Token | Microsoft Authenticator | Google Authenticator / Titan Key |
| Console | console.aws.amazon.com | portal.azure.com | console.cloud.google.com |

📌 **Observação:** Embora os nomes e interfaces sejam diferentes, o conceito é o mesmo nas três nuvens: controlar quem pode acessar o quê. Se você aprender IAM na AWS, entenderá rapidamente o equivalente no Azure e GCP.

---

## ⚠️ 6. Troubleshooting Comum

| Problema | Causa Provável | Solução |
| --- | --- | --- |
| Learner Lab não inicia (indicador vermelho) | Sessão expirou ou créditos esgotados | Clique em “Start Lab” novamente. Se persistir, feche e reabra o AWS Academy |
| Console AWS abre em branco | Pop-ups bloqueados pelo navegador | Permita pop-ups para awsacademy.com e aws.amazon.com |
| Erro “You are not authorized” | O usuário não tem a política necessária | Verifique se o usuário foi adicionado ao grupo correto na Etapa 4 |
| Não consigo fazer login com o IAM User | URL de sign-in incorreto ou senha errada | Use o IAM Sign-in URL (não o login raiz) e verifique a senha do lab |
| A região mostra “No resources found” | Região errada selecionada no console | Mude para us-east-1 (N. Virginia) no canto superior direito |
| user-3 não consegue parar instância EC2 | Política pode não incluir ec2:StopInstances | Verifique a política do grupo EC2-Admin |
| “Session expired” durante o lab | O Learner Lab tem tempo limitado (60 min) | Clique em “Start Lab” para estender a sessão |

---

## 📝 7. Exercício Avaliativo

### 📌 Entrega: Relatório de Conclusão do Lab

Prazo: até o final da aula

Responda às seguintes perguntas e envie pelo AVA Uniube On-line:

1. **Infraestrutura Global:** Qual é a região AWS mais próxima do Brasil? Quantas Zonas de Disponibilidade ela possui? Por que isso é importante para empresas brasileiras que precisam atender à LGPD?
2. **Política JSON:** Copie a política JSON do grupo S3-Support e explique, campo por campo, o que cada parte significa (Effect, Action, Resource).
3. **Teste de Permissões:** Descreva o que aconteceu quando você tentou acessar o EC2 com user-1 (que só tem permissão de S3). Qual erro apareceu? Por que isso é importante para segurança?
4. **Princípio da Menor Permissão:** Com suas palavras, explique o que é o “Princípio da Menor Permissão” e dê um exemplo prático de por que uma empresa de IA/ML deveria aplicar esse princípio ao dar acesso ao Amazon SageMaker para seus cientistas de dados.
5. **Comparação Multi-Cloud:** Se sua empresa usasse Azure em vez de AWS, qual serviço seria o equivalente ao IAM? (Consulte a tabela da Seção 5)

Critérios de avaliação:

1. Completude das respostas (todas as 5 respondidas)
2. Precisão técnica (conceitos corretos, sem erros factuais)
3. Capacidade de conectar o conceito teórico com a prática realizada

---

## 📋 8. Resumo da Prática

| O que fizemos | Serviço/Recurso Utilizado | Conceito Teórico Relacionado |
| --- | --- | --- |
| Exploramos o mapa de infraestrutura global | infrastructure.aws | Regiões, AZs, Edge Locations (Módulo 1.3) |
| Navegamos no Console AWS e trocamos regiões | AWS Management Console | Infraestrutura como Serviço (IaaS) |
| Exploramos usuários, grupos e políticas IAM | AWS IAM | Segurança e Controle de Acesso (Eixo 5) |
| Adicionamos usuários a grupos | AWS IAM Groups | Gerenciamento centralizado de permissões |
| Testamos permissões com login de diferentes usuários | AWS IAM Sign-in | Princípio da Menor Permissão |
| Comparamos IAM com equivalentes em Azure e GCP | — | Multi-cloud (Eixo 1: Provedores) |

---

## 📚 9. Material de Apoio

### Referências Obrigatórias

| Autor | Obra | Seção Utilizada |
| --- | --- | --- |
| ANTUNES, Jonathan Lamim | Amazon AWS: descomplicando a computação na nuvem. Casa do Código, 2016 | Cap. sobre IAM e controle de acesso |
| KOLBE JÚNIOR, Armando | Computação em nuvem. Contentus, 2020 | Cap. sobre segurança em nuvem |
| SOUSA NETO, Manoel Veras de | Cloud computing: nova arquitetura da TI. Brasport, 2012 | Cap. sobre infraestrutura e data centers |

### Referência Complementar

| Autor | Obra | Relevância |
| --- | --- | --- |
| AWS | AWS Well-Architected Framework — Pilar Segurança | Boas práticas oficiais de segurança e IAM |

### Documentação Oficial

| Recurso | Descrição | Link |
| --- | --- | --- |
| Infraestrutura Global AWS | Mapa interativo com todas as regiões e AZs | [infrastructure.aws](https://infrastructure.aws/) |
| AWS IAM — Documentação | Guia completo do serviço IAM | [docs.aws.amazon.com/iam](https://docs.aws.amazon.com/iam/) |
| IAM Best Practices | Boas práticas oficiais de segurança com IAM | [docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) |
| AWS Regions and AZs | Documentação oficial sobre regiões | [aws.amazon.com/about-aws/global-infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/) |

### 🎥 Vídeos Recomendados

| Canal/Autor | Título | Descrição |
| --- | --- | --- |
| Douglas Mugnos | IAM na AWS — Users, Groups, Roles, Policies | Explicação completa em PT-BR (2024) |
| Marlon Andrei | Laboratório 1: Introdução ao AWS IAM | Walkthrough do lab em PT-BR (2024) |
| CLIIK | Entenda o Conceito de IAM na AWS | Conceitos e prática de grupos IAM (2024) |
| Café com Bug | Introdução ao IAM - Criando usuários e grupos | Curso gratuito AWS Services (2023) |

---

## 🚀 10. Preparação para a Próxima Aula

Próxima aula (Sexta — Teórica): Computação em Nuvem: EC2, Lambda e Serverless

Para se preparar:

1. Leia sobre o Amazon EC2 na documentação oficial: [aws.amazon.com/ec2](https://aws.amazon.com/ec2/) — o que é uma instância? O que são tipos de instância?
2. Pesquise a diferença entre servidores tradicionais (on-premises) e instâncias EC2 (nuvem) — quais são as vantagens?
3. Descubra o que é serverless e como o AWS Lambda funciona — em que situações faz sentido usar Lambda em vez de EC2?
4. Reflita: como um cientista de dados poderia usar EC2 para treinar um modelo de ML? E Lambda?

💡 **Dica:** Consulte o Módulo 2.1 do AWS Academy Cloud Foundations e os capítulos sobre computação na nuvem em KOLBE JÚNIOR (2020) e ANTUNES (2016).
