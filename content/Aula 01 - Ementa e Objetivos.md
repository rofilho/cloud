---
disciplina: Cloud Computing
codigo: "14189"
aula: "01"
titulo: "Ementa e Objetivos"
tipo: teorica
semana: 1
data: 2026-02-13
status: publicado
tags:
  - cloud
  - ementa
  - planejamento
publicar: true
---

# 🟢 Aula 01: Ementa e Objetivos

---

**Ementa**

A disciplina apresenta os fundamentos da **computação em nuvem** e sua aplicação em ambientes modernos de processamento de dados. Aborda os principais modelos de serviço (IaaS, PaaS, SaaS) e de implantação, bem como os recursos oferecidos por provedores líderes (AWS, Azure, GCP). Enfatiza a integração de soluções em nuvem com aplicações de **Inteligência Artificial** e **Ciência de Dados**, considerando aspectos de desempenho, custo-benefício, sustentabilidade, ética, segurança e governança em projetos escaláveis.

**Objetivos de Aprendizagem**

Ao final da disciplina, o estudante deverá ser capaz de:

- [ ]  Compreender os fundamentos, a arquitetura e os modelos de implantação da computação em nuvem.
- [ ]  Diferenciar IaaS, PaaS e SaaS na **matriz de responsabilidade compartilhada**, identificando limites entre provedor e cliente.
- [ ]  Integrar serviços de nuvem com fluxos de IA e Ciência de Dados (treino, inferência, APIs gerenciadas).
- [ ]  Configurar instâncias de computação, armazenamento e redes virtuais em provedor líder (AWS Academy).
- [ ]  Aplicar princípios de **FinOps** e sustentabilidade para otimizar custo e impacto ambiental de workloads em nuvem.

---

## 🗓️ Cronograma Semestral (Table View no Notion)

| Semana | Tópico Principal                         | Atividade                               | Status        |
| ------ | ---------------------------------------- | --------------------------------------- | ------------- |
| 01     | Aula Inicial: Contrato Pedagógico        | Apresentação e alinhamento              | 🟢 Planejado  |
| 02     | Modelos de Serviço: IaaS, PaaS e SaaS    | Matriz de responsabilidade              | ⚪ Por iniciar |
| 03     | Laboratório 01: IAM e Acesso Seguro      | Hands-on: usuários, grupos, políticas   | ⚪ Por iniciar |
| 04     | Computação e Armazenamento               | Hands-on: EC2 / S3 (ou equivalente)     | ⚪ Por iniciar |
| 05     | Redes na Nuvem: VPC, subnets e segurança | Desenho de topologia                    | ⚪ Por iniciar |
| 06     | Cloud + IA: APIs de Visão e NLP          | Integração de serviços gerenciados      | ⚪ Por iniciar |
| 07     | Avaliação N1                             | Prova – Módulos 1 e 2                   | 🚩 Marco      |
| 08     | Bases de Dados: RDS e NoSQL gerenciado   | Hands-on: persistência                  | ⚪ Por iniciar |
| 09     | Containers I: Dockerizando aplicações    | Criação de Dockerfiles                  | ⚪ Por iniciar |
| 10     | Containers II: Kubernetes                | Deploy em cluster (conceitos básicos)   | ⚪ Por iniciar |
| 11     | Infraestrutura como Código               | Terraform CLI / templates               | ⚪ Por iniciar |
| 12     | FinOps, Ética e Sustentabilidade         | Calculadoras de TCO e pegada de carbono | ⚪ Por iniciar |
| 13     | Laboratório Final                        | Projeto cloud-native integrando módulos | ⚪ Por iniciar |
| 14     | Avaliação N2                             | Prova – Módulos 3, 4 e 5                | 🚩 Marco      |

**Obs.**: Ajustes conforme turma e calendário institucional.

---

## 📑 Conteúdo Programático

**Módulo 1: Arquitetura e Fundamentos**

- Fundamentos de computação em nuvem: virtualização, elasticidade, escalabilidade e alta disponibilidade.
- Modelos de serviço (IaaS, PaaS, SaaS) e modelos de implantação (pública, privada, híbrida, multi-cloud).
- Visão geral da matriz de responsabilidade compartilhada e implicações em segurança e compliance.

**Módulo 2: Provedores e Recursos Core**

- Ecossistema de provedores: AWS, Azure, GCP – visão geral de serviços equivalentes.
- Computação, armazenamento e redes: EC2, S3, VPC, balanceadores; conceitos análogos em outros provedores.
- IAM e segurança básica: controle de acesso, chaves, boas práticas de credenciais.

**Módulo 3: Cloud para IA e Ciência de Dados**

- Bancos de dados gerenciados (RDS, NoSQL, data lakes).
- Treinamento e inferência de modelos de IA na nuvem (serviços gerenciados de ML, APIs de visão, fala e NLP).
- Pipelines de dados, armazenamento de artefatos de modelos e monitoramento.

**Módulo 4: Containers, Orquestração e IaC**

- Conceitos de containers e imagens: Docker, registro de imagens.
- Introdução ao Kubernetes: pods, services, deployments e uso em nuvens públicas.
- Infraestrutura como Código: Terraform, templates básicos de rede, compute e storage.

**Módulo 5: FinOps, Ética e Sustentabilidade em Cloud**

- Noções de FinOps: otimização de custos, reserva vs on-demand, rightsizing, desligamento automático.
- Ferramentas de cálculo de TCO e análise de custo-benefício.
- Sustentabilidade e Green Cloud: métricas de consumo, emissões de carbono e boas práticas.
- Aspectos éticos e legais: LGPD, privacidade de dados e uso responsável de IA na nuvem.

---

## ⚖️ Sistema de Avaliação

| Avaliação | Peso (pts) | Descrição |
| --- | --- | --- |
| N1 | 30 | Prova teórica (25) + Estudo de caso (5) |
| N1 (Online) | 5 | Atividades Uniube+ |
| Inst. | 15 | Avaliação institucional |
| N2 | 40 | Prova final (30) + Projeto prático (10) |
| N2 (Online) | 10 | Atividades Uniube+ |
| **Total** | **100** |  |

**Projeto Prático**: Use recursos core de nuvem (compute, storage, rede) + componente de IA/Dados, otimizando custo e segurança.

---

## 📚 Referências Bibliográficas

- **Principal**: MARINESCU, Dan C. *Cloud Computing: Theory and Practice*.
- **Prática**: Trilha **AWS Academy Cloud Foundations** e cursos correlatos (conceitos, serviços centrais, segurança, arquitetura, precificação).
- **Legislação e Ética**: LGPD e materiais de conformidade em ambientes cloud, incluindo políticas de provedores e guias de boas práticas.
