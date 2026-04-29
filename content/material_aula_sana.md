# Arquitetura e Pipeline de CI/CD: Ecossistema Sana & Nuvem

Bem-vindos à nossa aula prática de DevOps e Arquitetura de Nuvem! Hoje vamos mergulhar profundamente na infraestrutura do **Ecossistema Sana**, entendendo como ele se integra aos serviços de nuvem e como orquestramos nossa entrega contínua com zero downtime.

---

## 1. Visão Geral (Sistemas Sana e Nuvem)

O ecossistema é dividido logicamente entre o **Sana** (a suíte de microsserviços da aplicação) e a **Nuvem** (nossa infraestrutura cloud-native que sustenta a plataforma, majoritariamente orquestrada em provedores de Cloud com gerenciamento de DNS via Cloudflare).

### Arquitetura e Propósito
- **Sistema Sana**: É a nossa plataforma principal, dividida em múltiplos serviços conteinerizados. Temos um backend central de processamento (`sana-core`), gateways de APIs (ex: `sana-api`, `sana-admin-api`) e frontends em Angular (`sana-ui`, `sana-admin`). Também inclui um cluster separado de identidade (`vm-sana-identity`) responsável por autenticação centralizada usando Zitadel (IAM).
- **Sistema Nuvem (Cloud Infra)**: Refere-se à nossa arquitetura Cloud de suporte, projetada para ser ágil e segura. Ela engloba os balanceadores de carga, proxy reverso (Traefik v3), DNS (Cloudflare) e bancos de dados gerenciados persistentes (Cloud SQL para PostgreSQL). 

### Comunicação entre os Sistemas
A comunicação segue um modelo seguro de "zero trust" adaptado para contêineres:
1. Tráfego externo chega pela nuvem via Cloudflare (DNS Only) e bate no nosso **Gateway Traefik**.
2. O Traefik roteia as requisições baseadas em `Host` e `PathPrefix` (ex: `sana.app.br/ui/api` vai para o container `sana-api`).
3. As APIs (`sana-api`, `sana-admin-api`) se comunicam em rede Docker interna (`sana-net`) com o `sana-core` e validam tokens remotamente no provedor IAM Zitadel.
4. Todos os serviços persistentes gravam os dados fora do cluster Docker, conectando-se através de rede privada diretamente ao banco de dados em Nuvem (Cloud SQL).

---

## 2. Organização da Infraestrutura Cloud

Nossa infraestrutura de nuvem prioriza **isolamento de responsabilidades** e **imutabilidade**.

### Topologia de Redes e Servidores
O ambiente de **Produção** está organizado nas seguintes instâncias (VMs):
- **`vm-sana-core` (IP Interno: 10.0.1.2)**: Hospeda os stacks da aplicação Sana (Frontends e Backends) e os agentes de observabilidade.
- **`vm-sana-identity` (IP Interno: 10.0.2.2)**: Servidor dedicado à gestão de identidade (Zitadel IAM), fórum (NodeBB) e documentação (MkDocs + OAuth2).
- **Instância Cloud SQL (IP Interno: 10.0.2.200)**: Nosso banco de dados relacional gerenciado na nuvem (PostgreSQL). Desacoplado das VMs para garantir alta disponibilidade e backups automatizados.

*Nota para a aula:* Temos também um ambiente isolado de **Lab/Homologação** (`lab.sana.app.br`), provisionado em uma VM Proxmox dedicada com banco Postgres conteinerizado local, usado como "Test Gate" final.

### Stacks Portainer (Separação Lógica)
Usamos o Portainer como visualizador e gerenciador lógico de Stacks. Elas são separadas para que o deploy da aplicação não quebre serviços essenciais:
- `sana`: Aplicação principal (8 containers - atualizada a cada deploy).
- `sana-infra`: Traefik v3 + Docker-Proxy. Atualizada raramente. Impede que certificados TLS do Let's Encrypt se percam nos deploys diários.
- `sana-monitoring-core`: Agentes de métricas (Prometheus, Promtail, Tempo/Alloy) enviando telemetria para nossa stack Grafana Mimir/Loki.

---

## 3. Detalhamento do Pipeline de Deploy (GitOps V3)

Nosso pipeline CI/CD é a espinha dorsal da operação, garantindo entregas rápidas sem afetar o usuário final.

### Passo 1: Git (O Fluxo de Código)
- **Branch Strategy:** Utilizamos um fluxo restrito baseado em **Trunk Based Development / GitHub Flow**. A branch `main` é estritamente protegida.
- **Trigger de Deploy:** O código sai da máquina do dev via *Pull Requests*. O push direto para a `main` **não** dispara o deploy de produção para evitar acidentes. O deploy para produção no repositório `sana` é engatilhado apenas quando uma **Release é publicada** com uma tag semântica (ex: `v0.27.0`) ou manualmente (`workflow_dispatch`).

### Passo 2: GitHub Actions (CI/CD Pipeline)
O arquivo principal é `.github/workflows/deploy.yml`. Ele orquestra os containers via Docker Buildx.
1. **Validação:** Gera a tag das imagens (ex: `sha-123456` ou a tag da release).
2. **Build Paralelo (Matrix):** Compila simultaneamente as imagens de Frontend e Backend. O cache do GitHub Container Registry (GHCR) é usado para acelerar a compilação.
3. **Registro:** As imagens construídas recebem a tag gerada e também a tag `:latest`, e são enviadas ao GHCR.

> **Exemplo Prático (Trecho do `deploy.yml`):**
> ```yaml
>   build-backends:
>     strategy:
>       matrix:
>         service:
>           - name: sana-core
>             dockerfile: docker/sana-core.Dockerfile
>           # ... outros serviços
>     steps:
>       - name: Build e push — ${{ matrix.service.name }}
>         uses: docker/build-push-action@v6
>         with:
>           context: .
>           file: ${{ matrix.service.dockerfile }}
>           push: true
>           tags: |
>             ghcr.io/alexsandrosm/sana/${{ matrix.service.name }}:${{ needs.validate.outputs.image_tag }}
>             ghcr.io/alexsandrosm/sana/${{ matrix.service.name }}:latest
> ```

### Passo 3: Portainer & Banco de Dados (Orquestração Segura)
A regra fundamental é a **imutabilidade das imagens**: a exata mesma imagem construída é utilizada em Lab e Produção. O que diferencia os ambientes são as **Variáveis de Ambiente** injetadas dinamicamente (`IMAGE_TAG`, `POSTGRES_HOST`, `ZITADEL_API_URL`, etc).

Antes de trocar os contêineres e causar inatividade, executamos as **Migrations do banco de dados (Zero Downtime)** via SSH direto no container do ambiente alvo que *ainda está rodando*.

> **Exemplo Prático de Migration no Deploy:**
> ```bash
> # A Action faz login via SSH e executa diretamente no container antigo antes do deploy:
> docker exec sana-core php artisan migrate --force
> ```

### Passo 4: Produção (Zero Downtime / Rolling Updates)
Inicialmente a infraestrutura usava os Webhooks de Redeploy do Portainer. Porém, para evitar falhas de timeout (que ultrapassavam 120s) e suportar um pipeline mais sofisticado com *rollbacks automáticos*, adotamos no GitOps V3 o **Deploy via SSH Direto com Docker Compose**, mantendo o Portainer primariamente para governança de variáveis, logs e monitoramento.

**Como atualizamos sem inatividade?**
1. O pipeline cria localmente no servidor snapshots das imagens ativas (`docker tag ... :rollback`).
2. Executamos um `docker compose pull` para baixar de forma assíncrona as imagens recém criadas da Action.
3. Executamos a recriação via Docker Engine com a flag `--force-recreate`. O Traefik instantaneamente chaveia o tráfego de rede para os contêineres novos que estão subindo.
4. Um healthcheck aguarda que os endpoints retornem `HTTP 200 OK`. 

> **Exemplo Prático (Configuração do container no `compose.yaml`):**
> Observe que a aplicação não expõe portas globalmente, apenas para a rede `sana-net`. A integração com a "Nuvem" acontece por Labels interpretadas pelo Traefik dinamicamente:
> ```yaml
>   sana-api:
>     image: ghcr.io/alexsandrosm/sana/sana-api:${IMAGE_TAG:-latest}
>     container_name: sana-api
>     environment:
>       APP_URL: https://${SANA_DOMAIN:-sana.app.br}/ui/api
>       DB_HOST: ${POSTGRES_HOST}
>     networks:
>       - sana-net
>     healthcheck:
>       test: ["CMD", "curl", "-f", "http://localhost:80/up"]
>       start_period: 40s  # Impede que tráfego seja roteado antes do boot completo
>     labels:
>       - "traefik.enable=true"
>       - "traefik.http.routers.sana-api.rule=Host(`${SANA_DOMAIN:-sana.app.br}`) && PathPrefix(`/ui/api`)"
>       - "traefik.http.routers.sana-api.middlewares=sana-api-strip,security-headers@docker"
> ```

---

**Resumo de Variáveis Chave que vocês verão na prática:**
* `IMAGE_TAG`: Garante a imutabilidade (`lab` ou `prod`).
* `SANA_DOMAIN`: Define se é homologação ou produção no roteamento (`sana.app.br` vs `lab.sana.app.br`).
* `CF_DNS_API_TOKEN`: Permite a geração dos certificados SSL wildcard pela Nuvem do Cloudflare.
* `APP_KEY` / `ZITADEL_SERVICE_TOKEN`: Segredos isolados por ambiente.
* `CACHE_STORE=file`: Recentemente otimizado na arquitetura para economizar RAM, substituindo o antigo container do Redis.
