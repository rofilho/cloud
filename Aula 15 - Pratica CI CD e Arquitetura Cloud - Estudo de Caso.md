---
disciplina: Cloud Computing
codigo: "14189"
aula: 15
titulo: "Prática CI/CD e Arquitetura Cloud - Estudo de Caso Sana"
tipo: teorica e pratica
semana: 15
data: 2026-04-24
status: publicado
tags:
  - cloud
  - aws
  - cicd
  - devops
  - docker
publicar: true
---

# 🟢 Aula 15: Prática CI/CD e Arquitetura Cloud - Estudo de Caso Sana

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana:** 15 | Sexta-feira
**Professor:** Romualdo Mathias Filho
**Tipo:** 📘 Teórica / 🔬 Prática
**Tópicos:** CI/CD, GitOps V3, Docker, Traefik, Portainer, Zero Downtime Deployment

---

## 🎯 Objetivo da Aula (Competências)

Ao final desta aula, os alunos serão capazes de:
- [ Compreender a arquitetura de uma aplicação moderna nativa da nuvem com separação de serviços (Gateway, Frontends, Backends e Identity). ]
- [ Entender a implementação do padrão "Zero Downtime Deployment" usando infraestrutura imutável e saúde de containers. ]
- [ Mapear e descrever um pipeline completo de CI/CD (GitOps V3), desde o Trunk Based Development no Git até a publicação automatizada usando GitHub Actions e Portainer. ]

---

## 🔄 Revisão Rápida (5 min)

| **Conceito (Aula Anterior)** | **Conexão com hoje** |
| --- | --- |
| Bancos de Dados na Nuvem (RDS/Cloud SQL) | Como mantemos o DB desacoplado e rodamos migrations antes do deploy de forma segura. |
| Redes e VPC | O isolamento da rede interna dos containers (sana-net) e a exposição segura via Traefik. |
| Computação / Instâncias | A divisão lógica de VMs de Produção e Identity. |

---

## 📌 1. Visão Geral: O Ecossistema Sana e a Nuvem

O ecossistema que utilizaremos como Estudo de Caso é dividido logicamente entre a aplicação (**Sana**) e a infraestrutura que a suporta (**Nuvem**).

- **O Sistema Sana:** Uma plataforma de microsserviços. O tráfego bate nos Gateways de API (`sana-api`, `sana-admin-api`) que se comunicam internamente com o processamento central (`sana-core`). A autenticação ocorre centralizada por um cluster separado usando o Zitadel IAM (`vm-sana-identity`).
- **O Sistema Nuvem (Infra):** Envolve a infraestrutura de rede e bancos gerenciados. O tráfego externo passa pelo DNS/WAF do **Cloudflare** e atinge nosso Proxy Reverso, o **Traefik v3**. Os dados persistentes ficam seguros no **Cloud SQL** (PostgreSQL gerido), totalmente fora do cluster Docker.

> 💡 **Exemplo prático:** Pense nisso como um prédio (Cloud SQL) com uma portaria muito inteligente (Traefik) e vários escritórios internos que só conversam entre si por ramais fechados (`sana-net`).

---

## 📌 2. Organização da Infraestrutura e Portainer

A infraestrutura de nuvem prioriza o **isolamento de responsabilidades** e a **imutabilidade**.

**Topologia de Servidores:**
1. **`vm-sana-core` (10.0.1.2):** O coração da aplicação (Frontends, Backends e agentes de métricas).
2. **`vm-sana-identity` (10.0.2.2):** O servidor do IAM e documentação.
3. **Cloud SQL (10.0.2.200):** Onde os dados vitais estão salvos.

Para não quebrar a infraestrutura acidentalmente em deploys, o **Portainer** separa tudo logicamente em **Stacks**:
- `sana-infra`: Traefik v3 e Proxy do Docker (Muda quase nunca).
- `sana-monitoring-core`: Agentes de métricas.
- `sana`: Aplicação principal. Essa é a Stack que o nosso pipeline CI/CD vai atualizar frequentemente!

---

## 📌 3. O Pipeline de Deploy Passo a Passo (GitOps V3)

Como o código sai da máquina do desenvolvedor e vai para o ar sem derrubar os clientes que já estão usando o site?

**Passo 1: Git (O Fluxo de Código)**
Trabalhamos com *Trunk Based Development*. A branch `main` é sagrada. O código entra via Pull Requests. O deploy para produção só é disparado quando fechamos uma "Release" com Tag semântica (ex: `v0.27.0`).

**Passo 2: GitHub Actions (CI/CD)**
O arquivo `.github/workflows/deploy.yml` orquestra a construção das imagens.
- Ele usa o `Docker Buildx` para compilar o Frontend e o Backend em paralelo.
- Ele salva as imagens construídas no GitHub Container Registry (GHCR) atreladas à Tag da Release.

**Passo 3: Orquestração Segura e Migrations**
Antes de substituir os containers, a Action entra na máquina de produção via SSH e executa as migrações de banco de dados diretamente no container antigo que ainda está rodando. Assim, o banco está pronto para o código novo.

**Passo 4: Produção (Zero Downtime / Rolling Updates)**
Em vez de usar Webhooks demorados, o GitOps V3 realiza o deploy via SSH Direto:
1. Um `docker compose pull` assíncrono baixa as novas imagens do GHCR.
2. É feito um `--force-recreate` via Docker Engine.
3. O Traefik faz um *Healthcheck*: ele só começa a enviar os usuários para o container novo quando este avisa que carregou perfeitamente (respondendo `HTTP 200 OK`). Isso garante que não há tempo de inatividade (Zero Downtime).

---

## 📋 Resumo Estrutural

| **Conceito** | **Definição em Uma Frase** |
| --- | --- |
| Traefik | Proxy reverso que roteia inteligentemente requisições da web para containers Docker específicos. |
| Zero Downtime | Prática de deployment onde os usuários não percebem inatividade enquanto a aplicação é atualizada. |
| Imutabilidade de Container | A exata mesma imagem Docker testada em homologação é a que rodará em produção; apenas as variáveis de ambiente mudam. |

---

## ❓ Banco de Questões

> 🔒 Esta seção é visível apenas no Obsidian do professor. Não publicada.

### Questão 1: Prática (Múltipla Escolha — Nível: Intermediário)
**Enunciado:** No estudo de caso do sistema Sana, o pipeline de deploy utiliza um processo de Healthcheck atrelado ao Traefik v3 durante a recriação dos containers com `--force-recreate`. Qual é o principal benefício dessa prática na infraestrutura?

- [ ] A) Reduzir o consumo de CPU durante a compilação paralela das imagens.
- [ ] B) Garantir que o código novo seja testado pela primeira vez dentro do banco de dados relacional.
- [x] C) Permitir o roteamento de tráfego (Zero Downtime), direcionando usuários ao container novo apenas quando ele estiver pronto para receber requisições. ✅
- [ ] D) Evitar o uso do GitHub Actions como servidor de CI central.

**Justificativa:** O Traefik intercepta a rede e realiza healthchecks configurados no Docker Compose. Ele segura o tráfego nos containers antigos até que os novos respondam HTTP 200, efetivando o Zero Downtime.

---

### Questão 2: Teórica (Dissertativa — Nível: Básico/Intermediário)
**Enunciado:** Explique por que o banco de dados principal (Cloud SQL) no sistema Sana não é armazenado como um container comum dentro da Stack `sana` e não é recriado a cada ciclo de CI/CD.

**Resposta esperada:** O banco de dados lida com armazenamento persistente e transacional, que precisa ser mantido com o máximo de estabilidade, isolamento e tolerância a falhas. Mantê-lo como um serviço gerenciado (Cloud SQL) fora do ciclo de vida volátil dos containers da aplicação garante backups automatizados de nível empresarial e impede que um erro de deploy (recreate) afete ou corrompa os dados.

---

## 📚 Referências Bibliográficas e Citações

- Documentação Interna da Organização: `material_aula_sana.md`.
- Docker Documentation. *Best practices for writing Dockerfiles*. Disponível na base oficial.
- Traefik Labs. *Traefik v3 Routing Configuration*.

---
*Última atualização: 2026-04-24 | Status: publicado*
