---
disciplina: Cloud Computing
codigo: "14189"
aula: "07"
titulo: "Prática de Auto Scaling e Balanceamento de Carga"
tipo: pratica
semana: 4
data: 2026-03-11
status: publicado
tags:
  - cloud
  - aws
  - auto-scaling
  - load-balancer
  - ec2
  - cloudwatch
  - lab
publicar: true
---

# 🟢 Aula 07: Prática de Auto Scaling e Balanceamento de Carga

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana:** 4 | Quarta-feira
**Professor:** Romualdo Mathias Filho
**Tipo:** 🔬 Prática
**Plataforma de Prática:** AWS Academy Learner Lab (Vocareum Sandbox)

---

> 💬 "Não se constrói um estádio de futebol gigante apenas para suportar a capacidade da final do campeonato uma vez por ano. Na computação na nuvem, a elasticidade horizontal resolve isso: adicionamos servidores adicionais apenas enquanto o pico de tráfego acontece e os devolvemos quando a calmaria retorna." — Adaptação clássica sobre Elasticidade sob Demanda.

---

## 🎯 Objetivo da Aula

Ao final desta aula prática, os alunos serão capazes de:
- Configurar um **Launch Template** (Modelo de Inicialização) na AWS para padronização de instâncias EC2.
- Criar e gerenciar um **Auto Scaling Group (ASG)** para provisionamento elástico sob demanda.
- Configurar políticas de escalabilidade dinâmica baseadas na utilização média de CPU via métricas do **Amazon CloudWatch**.
- Simular testes de estresse de processamento na CPU e validar a criação (Scale-Out) e a remoção (Scale-In) automática de servidores virtuais.

---

## 🔄 Revisão Rápida (5 min)

Na aula teórica anterior, discutimos a diferença conceitual e as capacidades dos serviços de computação com e sem servidor:

| **Conceito (Aula Passada)** | **Conexão com hoje** |
| --- | --- |
| [[Aula 06 - Computacao em Nuvem EC2 Lambda e Serverless#2. Amazon EC2 (Elastic Compute Cloud)\|Amazon EC2]] | Usaremos instâncias EC2 virtuais como base de execução para o nosso modelo de escalabilidade automatizada. |
| [[Aula 05 - Infraestrutura Global AWS e Lab IAM#2. Laboratório Prático: Introdução ao AWS IAM\|Chaves SSH e Security Groups]] | Configuraremos o Launch Template com chaves seguras e liberação da porta 80 (HTTP) para a nossa aplicação. |
| [[Aula 02 - Introducao a Computacao em Nuvem#3. Modelos de Implantação de Nuvem\|Elasticidade e Escala]] | A elasticidade horizontal é a materialização prática da nuvem pública, onde recursos são adicionados ou removidos sob demanda real. |

---

## 📌 1. Pré-requisitos e Preparação

Antes de iniciar as etapas no Console da AWS, garanta que possui as seguintes condições ativas:
- Acesso ao **AWS Academy Learner Lab** ativo via plataforma Vocareum.
- Conhecimento básico sobre o funcionamento de instâncias EC2 e regras de rede (**Security Groups**).
- **Aviso Importante do Lab:** Sob as restrições da AWS Academy, nós não temos permissões de administrador global para criar novas regras de IAM ou papéis (IAM Roles). Sempre que solicitado, utilize a função pré-criada chamada **`LabRole`** (ou `LabInstanceProfile`).

---

## 📌 2. Roteiro Prático: Configuração de Auto Scaling na AWS

### 2.1. Etapa 1: Criar o Launch Template (Modelo de Inicialização)

O Launch Template serve como a "fórmula" ou o "gabarito" da máquina. Ele diz para o Auto Scaling qual tipo de máquina deve ser criada quando for necessário expandir o parque tecnológico.

1. No console da AWS, pesquise por **EC2** no menu superior.
2. No menu lateral esquerdo, sob a seção **Instances**, clique em **Launch Templates**.
3. Clique em **Create launch template** e defina as configurações:
   - **Launch template name:** `Modelo-Web-App`
   - **Template version description:** `Versao 1 - Servidor Web Apache basico`
   - **Application and OS Images (AMI):** Selecione **Amazon Linux 2023 (AMI)** (arquitetura x86_64).
   - **Instance type:** Escolha **`t2.micro`** (ou a instância elegível para o Free Tier no lab).
   - **Key pair:** Selecione a chave **`vockey`** pré-configurada no seu laboratório.
   - **Network settings:**
     - **Subnet:** Não inclua no template (deixaremos o Auto Scaling Group escolher em qual Zona de Disponibilidade colocar).
     - **Security Groups:** Selecione ou crie um Security Group que permita tráfego nas portas **80 (HTTP)** e **22 (SSH)** a partir de qualquer lugar (`0.0.0.0/0`).
4. Clique em **Create launch template** no canto inferior direito.

> 💡 **Checkpoint:** O template deve aparecer listado como criado com sucesso no painel de Launch Templates do EC2.

---

### 2.2. Etapa 2: Criar o Auto Scaling Group (ASG)

Com o gabarito de inicialização pronto, vamos criar o grupo que gerenciará a quantidade dessas instâncias de forma autônoma.

1. No menu lateral do EC2, role até a seção **Auto Scaling** e clique em **Auto Scaling Groups**.
2. Clique em **Create Auto Scaling group**.
3. **Passo 1 (Choose launch template or configuration):**
   - **Auto Scaling group name:** `ASG-Minha-App`
   - **Launch template:** Selecione o `Modelo-Web-App` criado no passo anterior. Clique em **Next**.
4. **Passo 2 (Configure settings):**
   - **VPC:** Mantenha a VPC padrão (`default`).
   - **Availability Zones and subnets:** Selecione pelo menos **2 ou 3 subnets** em Zonas de Disponibilidade (AZs) distintas (ex.: `us-east-1a`, `us-east-1b`, `us-east-1c`). Isso garante alta disponibilidade física para sua arquitetura. Clique em **Next**.
5. **Passo 3 (Configure advanced options):**
   - Para este laboratório inicial, mantenha as opções sem integração de Load Balancer adicional. Clique em **Next**.
6. **Passo 4 (Configure group size and scaling policies):**
   - **Group size (Capacidade):**
     - *Desired capacity:* `1` (quantidade de servidores rodando inicialmente)
     - *Minimum capacity:* `1` (o grupo nunca terá menos que um servidor ativo)
     - *Maximum capacity:* `3` (limite máximo de servidores para evitar surpresas financeiras no lab)
   - **Scaling policies (Políticas de Escala):**
     - Selecione **Target tracking scaling policy**.
     - **Metric type:** *Average CPU utilization*.
     - **Target value:** `50` (o AWS Auto Scaling irá monitorar a CPU média; se ultrapassar 50%, ele cria novas máquinas até o limite de 3. Se cair muito abaixo disso, ele desliga instâncias sobressalentes).
     - **Instances warmup:** `60` segundos (tempo de inicialização antes de coletar métricas novamente).
   - Clique em **Next** até a revisão final.
7. Clique em **Create Auto Scaling group**.

> 💡 **Checkpoint:** Acesse o painel **EC2 > Instances** e observe que uma nova instância EC2 (baseada no seu Launch Template) está sendo criada de forma totalmente automática pelo ASG!

---

### 2.3. Etapa 3: Teste de Carga e Escalabilidade Horizontal (Scale-Out)

Vamos estressar a máquina virtual para forçar a CPU acima do limite estabelecido (50%) e assistir ao Auto Scaling agir.

1. Acesse a instância EC2 criada no passo anterior através do **EC2 Instance Connect** (ou via SSH usando sua chave `vockey`).
2. Atualize os pacotes do sistema operacional e instale a ferramenta de teste de estresse `stress`:
   ```bash
   sudo dnf update -y
   sudo dnf install stress -y
   ```
3. Execute o comando de estresse para ocupar 4 núcleos lógicos de CPU por 5 minutos (300 segundos):
   ```bash
   stress --cpu 4 --timeout 300
   ```
4. **Acompanhe a Mágica:**
   - Deixe o comando rodando no terminal.
   - Abra uma nova aba no Console AWS e vá para **EC2 > Auto Scaling Groups > ASG-Minha-App**.
   - Clique na aba **Activity** (ou *Activity History*) e na aba **Instance management**.
   - **Resultado esperado:** O CloudWatch registrará o aumento da CPU média do grupo acima do limite configurado (50%). Em cerca de 3 minutos, o ASG iniciará uma nova atividade ("Launching a new EC2 instance"), escalando a sua infraestrutura horizontalmente para dividir a carga de trabalho.

---

## 📌 3. Visão Multi-cloud de Escalabilidade

A escalabilidade horizontal automatizada e monitorada por telemetria de hardware é um padrão de projeto unificado entre os principais provedores de nuvem mundiais:

| Conceito e Recurso | Amazon Web Services (AWS) | Microsoft Azure | Google Cloud Platform (GCP) |
| --- | --- | --- | --- |
| **Gabarito de Máquina** | EC2 Launch Template | VM Image / VM Template | Instance Template |
| **Grupo Autônomo** | Auto Scaling Group (ASG) | Virtual Machine Scale Sets | Managed Instance Groups (MIG) |
| **Coleta de Métricas** | Amazon CloudWatch | Azure Monitor | Google Cloud Monitoring (Stackdriver) |

---

## 📌 4. Resolução de Problemas Comuns (Troubleshooting)

| Sintoma de Problema | Possível Causa Lógica | Ação Corretiva Recomendada |
| --- | --- | --- |
| **A CPU está em 100% de uso há minutos, mas nenhuma nova instância EC2 foi provisionada pelo grupo.** | O Auto Scaling Group possui um intervalo de avaliação de métricas e um período de carência (*warmup*) para evitar o efeito "flapping" (oscilações bruscas). | Aguarde entre 3 a 5 minutos. Verifique também se a capacidade máxima (*Maximum capacity*) foi acidentalmente configurada como `1` em vez de `3`. |
| **O Auto Scaling tenta subir uma nova instância, mas ela falha imediatamente com erro de IAM ou quota.** | Limitações severas de Sandbox da conta AWS Academy de estudantes. | Garanta que o Launch Template utiliza o tipo de instância permitido (`t2.micro`) e que nenhuma permissão personalizada de Role foi anexada, utilizando sempre a padrão `LabRole`. |
| **As instâncias estão sendo criadas e destruídas em loops infinitos pelo grupo.** | As instâncias nascem, mas falham nas verificações de integridade (*Health Check*) por falha de conectividade ou serviço web não iniciado. | Revise o Security Group anexado ao Launch Template para confirmar que a porta 80 (HTTP) está aberta, permitindo as requisições de integridade. |

---

## 📋 Resumo Estrutural

| **Conceito** | **Definição em Uma Frase** |
| --- | --- |
| **Launch Template** | O modelo padrão reutilizável que define a imagem de disco (AMI), tipo de instância, rede e Security Groups para inicializar novas máquinas virtuais. |
| **Auto Scaling Group (ASG)** | Uma coleção de instâncias EC2 gerenciadas por regras inteligentes que escalam a capacidade computacional para cima ou para baixo de forma autônoma. |
| **Target Tracking** | Uma política dinâmica de escala baseada em telemetria que ajusta os recursos para manter uma métrica selecionada estável em torno de um alvo específico. |
| **Scale-Out** | O processo automatizado de adicionar instâncias EC2 adicionais ao cluster sob demandas severas de tráfego ou processamento de dados. |
| **Scale-In** | O desligamento e descarte planejado de máquinas virtuais ociosas para evitar o desperdício financeiro de orçamentos. |

---
---

## 📄 Artigo de Aprofundamento

- [Amazon EC2 Auto Scaling: Melhores Práticas de Elasticidade (AWS Documentation)](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)
> *Resumo prático: Este guia técnico abrangente da AWS detalha os princípios de design para desenhar políticas de escalabilidade de alta velocidade. O documento explica as melhores práticas para desenhar políticas baseadas em métricas personalizadas e como escolher tempos de warmup adequados para infraestruturas de produção de grande porte.*

---

## 📚 Referências Bibliográficas

- ANTUNES, Jonathan Lamim. *Amazon AWS: descomplicando a computação na nuvem*. Casa do Código, 2016. **(Elasticidade, Grupos de Auto Scaling e Balanceamento com ELB, Cap. 7, pp. 115–130)**
- SOUSA NETO, Manoel Veras de. *Cloud computing: nova arquitetura da TI*. Brasport, 2012. **(Alta Disponibilidade e Balanceamento Dinâmico de Carga, Cap. 6, pp. 125–142)**
- KOLBE JÚNIOR, Armando. *Computação em nuvem*. Contentus, 2020. **(Escalabilidade vertical vs horizontal e monitoramento por telemetria, Cap. 4, pp. 75–88)**

---
*Última atualização: 2026-05-20 | Status: publicado*
