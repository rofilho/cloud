---
disciplina: Cloud Computing
codigo: "14189"
aula: "06"
titulo: "Computação em Nuvem: EC2, Lambda e Serverless"
tipo: teorica
semana: 4
data: 2026-03-06
status: publicado
tags:
  - cloud
  - aws
  - ec2
  - lambda
  - serverless
  - faas
  - iaas
publicar: true
---

# 🟢 Aula 06: Computação em Nuvem: EC2, Lambda e Serverless

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana:** 4 | Sexta-feira
**Professor:** Romualdo Mathias Filho
**Tipo:** 📘 Teórica
**Tópicos:** Amazon EC2, Famílias de Instâncias, Computação Serverless, AWS Lambda, Comparativo IaaS vs FaaS

---

## 🎯 Objetivo da Aula

Ao final desta aula, os alunos serão capazes de:
- Descrever o conceito de computação elástica na nuvem e diferenciar os modelos IaaS (Infraestrutura) e FaaS (Função).
- Explicar a arquitetura e classificar as diferentes famílias de instâncias do serviço Amazon EC2 para otimização de IA.
- Diferenciar a computação baseada em servidores tradicionais (EC2) do modelo Serverless (AWS Lambda).
- Analisar casos de uso ideais e projetar arquiteturas para processamento pesado em Inteligência Artificial versus inferências e microsserviços leves.

---

## 🔄 Revisão Rápida (5 min)

Na aula prática anterior, exploramos a distribuição global de datacenters e o controle de segurança:

| **Conceito (Aula Anterior)** | **Conexão com hoje** |
| --- | --- |
| [[Aula 05 - Infraestrutura Global AWS e Lab IAM#1. Explorando a Infraestrutura Global da AWS\|Regiões e AZs]] | Os servidores virtuais (EC2) que provisionaremos hoje serão localizados fisicamente em Regiões e AZs específicas. |
| [[Aula 05 - Infraestrutura Global AWS e Lab IAM#2. Laboratório Prático: Introdução ao AWS IAM\|IAM (Identity & Access)]] | Compreenderemos como as instâncias EC2 e as funções Lambda utilizam credenciais e permissões seguras para atuar na nuvem. |
| [[Aula 03 - Introducao a Computacao em Nuvem#2.1. IaaS – Infrastructure as a Service (Infraestrutura como Serviço)\|IaaS (Infraestrutura)]] | O Amazon EC2 representa a materialização clássica do modelo IaaS na nuvem da AWS. |

---

## 📌 1. Contextualização

A computação (capacidade de processamento de CPU/GPU e RAM) é o coração lógico de qualquer aplicação de Ciência de Dados. Seja para hospedar um servidor simples web, rodar um script diário de extração ou treinar uma Rede Neural Profunda enorme por semanas a fio, você precisa de poder computacional sob demanda. A nuvem redefiniu a forma de obter esse poder: desde alugar a máquina virtual inteira sob controle completo (EC2) até delegar toda a infraestrutura e pagar apenas pelos milissegundos rodados de uma função lógica (AWS Lambda).

> 💡 **Analogia:** Pense na computação na nuvem como transporte urbano.
> * **Amazon EC2 (IaaS):** É como alugar um carro na locadora. Você fica com a chave, dirige para onde quiser, escolhe a rota e paga pelo período diário/mensal (use ou deixe estacionado na garagem).
> * **AWS Lambda (Serverless):** É como chamar uma corrida de Uber. Você simplesmente entra, vai até o destino e paga **estritamente apenas pela corrida (tempo e distância)**. Você não se preocupa com manutenção, combustível, IPVA ou quem conduz o veículo.

---

## 📌 2. Amazon EC2 (Elastic Compute Cloud)

O **Amazon EC2** é o serviço web da AWS que fornece capacidade computacional segura, flexível e redimensionável na nuvem na forma de Máquinas Virtuais (chamadas de instâncias).

### 2.1. Características Principais do EC2
* **Elasticidade Vertical e Horizontal:** É possível alterar a potência do hardware da instância (de 1 vCPU para 128 vCPUs) em minutos, ou multiplicar o número de servidores.
* **Controle Administrativo Total:** Acesso administrativo irrestrito (root em Linux / Administrator em Windows) ao Sistema Operacional selecionado.
* **Faturamento por Segundo:** A cobrança ocorre de forma proporcional por segundo enquanto a instância estiver ativa ("Running").

### 2.2. Famílias de Instâncias EC2 aplicadas à IA e Big Data
Para otimizar custos e performance, a AWS subdivide o hardware virtual em famílias especializadas:

| Família | Foco de Hardware | Uso Típico em Ciência de Dados / IA |
| --- | --- | --- |
| **C (Compute Optimized)** | Processamento matemático robusto por CPU. | Algoritmos de Machine Learning intensivos em CPU, compilação de dados. |
| **R / X (Memory Optimized)** | Cache volumoso e alta taxa de RAM. | Big Data em tempo real (Spark), bancos em memória (Redis). |
| **P / G (Accelerated Computing)** | Placas gráficas dedicadas (GPUs Nvidia). | Treinamento pesado de Deep Learning, redes neurais e LLMs. |
| **T / M (General Purpose)** | Recursos computacionais balanceados. | Servidores de homologação, portais simples de visualização e testes. |

---

## 📌 3. Computação Serverless e AWS Lambda

**Serverless** (computação sem servidor) é um modelo de execução lógica onde a nuvem gerencia de forma invisível toda a infraestrutura computacional subjacente para você. O **AWS Lambda** é o serviço FaaS (Function as a Service) pioneiro e central desse paradigma.

### 3.1. Características Principais do AWS Lambda
* **Administração Zero:** O desenvolvedor foca unicamente em escrever o script (código). Patches de segurança, sistemas operacionais e servidores físicos são de responsabilidade da AWS.
* **Orientação a Eventos (Gatilhos):** A função Lambda permanece inativa até ser invocada por um evento lógico (ex.: um novo arquivo de imagem é salvo no S3, ou uma API web é acessada).
* **Escalabilidade Instantânea e Simultânea:** Se ocorrerem 10.000 requisições síncronas simultâneas, a AWS duplica o container do Lambda em frações de segundo para atender à demanda.
* **Faturamento Sub-segundo:** Cobrança proporcional estrita por milissegundo consumido de computação. Se a função não for invocada, o custo é **absolutamente zero**.

> 💡 **Analogia Econômica:** O EC2 é como deixar a luz da sala acesa a noite inteira mesmo sem ninguém no cômodo — você pagará pela ociosidade. O Lambda funciona como um interruptor com sensor de presença no corredor: a lâmpada acende milimetricamente quando alguém passa, e apaga assim que a pessoa sai, cobrando apenas pelos segundos ativos de iluminação.

---

## 📌 4. Comparação Estrutural: EC2 vs AWS Lambda

| Critério | Amazon EC2 (IaaS) | AWS Lambda (FaaS) |
| --- | --- | --- |
| **Manutenção do OS** | Responsabilidade do cliente (updates, antivírus). | Totalmente transparente e gerenciado pela AWS. |
| **Tempo Limite de Execução** | Sem limites. Pode rodar continuamente por anos. | Rígido: **máximo de 15 minutos** por execução. |
| **Estrutura de Escala** | Lenta (minutos) via Auto Scaling de novas VMs. | Instantânea (milissegundos) baseada em eventos/gatilhos. |
| **Faturamento** | Por segundo ativo com a VM ligada (Running). | Por milissegundo de uso sob invocação de evento. |
| **Cenário Ideal** | Treinamento longo de Machine Learning e Big Data. | APIs web rápidas, micro-scripts diários e ETLs orientados a eventos. |

---

## 📌 5. Cenários e Projetos Contemporâneos de IA na Nuvem
As modernas arquiteturas de IA utilizam abordagens híbridas de computação:
* **Fase de Treinamento (Pesado):** Uso massivo de instâncias **Amazon EC2 otimizadas para GPU (Famílias P ou G)** rodando ininterruptamente por dias ou semanas.
* **Fase de Inferência (Leve / Sob Demanda):** Hospedar o modelo de predição pronto em **funções AWS Lambda** que "acordam" via gatilho HTTP para responder a uma predição em tempo real e se encerram em milissegundos.

---

## 📋 Resumo Estrutural

| **Conceito** | **Definição em Uma Frase** |
| --- | --- |
| **Amazon EC2** | O serviço mestre de IaaS da AWS que fornece servidores virtuais (instâncias) elásticos e customizáveis. |
| **Serverless** | O paradigma onde o desenvolvedor é desonerado de provisionar e gerenciar servidores físicos e SOs. |
| **AWS Lambda** | O serviço FaaS que executa códigos/funções de forma elástica orientada a eventos. |
| **Famílias de EC2** | Categorizações técnicas de hardware (GPU, CPU, RAM) dimensionadas para finalidades específicas de TI. |
| **Gatilho (Trigger)** | Evento lógico ou de rede que inicia a execução automatizada de uma função no Lambda. |

---
## 📄 Artigo de Aprofundamento

- [Serverless AI Inference on AWS Lambda (AWS Whitepaper)](https://aws.amazon.com/pt/lambda/)
> *Resumo prático: Este artigo corporativo da AWS detalha como empresas de tecnologia reduzem custos de MLOps substituindo servidores virtuais dedicados por execuções serverless sob demanda na fase de inferência de algoritmos de aprendizado de máquina.*

---

## 📚 Referências Bibliográficas

- ANTUNES, Jonathan Lamim. *Amazon AWS: descomplicando a computação na nuvem*. Casa do Código, 2016. **(Provisionamento de instâncias EC2 e chaves SSH, Cap. 4, pp. 45–62)**
- KOLBE JÚNIOR, Armando. *Computação em nuvem*. Contentus, 2020. **(Comparativo estrutural de IaaS, PaaS e FaaS, Cap. 3, pp. 51–68)**
- SOUSA NETO, Manoel Veras de. *Cloud computing: nova arquitetura da TI*. Brasport, 2012. **(Escalabilidade de sistemas computacionais elásticos, Cap. 5, pp. 101–118)**

---
*Última atualização: 2026-05-20 | Status: publicado*
