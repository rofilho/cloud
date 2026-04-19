# 🔵 Aula 06: Computação em Nuvem: EC2, Lambda e Serverless

**Disciplina:** Cloud Computing (Cód. 14189)**Curso:** Inteligência Artificial e Ciência de Dados, Uniube**Semana 4** | Sexta-feira | Prof. Romualdo Mathias Filho**Tipo:** 📘 Teórica (Sexta-feira)

---

## 🎯 0. Objetivo da Aula

Ao final desta aula, o aluno deve ser capaz de:

- **Descrever** o conceito de computação elástica na nuvem e diferenciar os modelos IaaS e FaaS.
- **Explicar** os componentes e as diferentes famílias de instâncias do serviço Amazon EC2.
- **Diferenciar** o modelo estrutural de servidores (EC2) da computação Serverless (AWS Lambda).
- **Analisar** casos de uso ideais de instâncias tradicionais versus funções orientadas a eventos.
- **Projetar** abordagens fundamentais para processamento pesado em Inteligência Artificial versus inferências leves.

---

## 🔄 1. Recapitulação

| **Aula** | **Conceito** | **Definição** |
| --- | --- | --- |
| Aula 05 | Regiões e AZs | Locais físicos estratificados onde os data centers da AWS operam. |
| Aula 05 | IaaS | Infraestrutura como Serviço, onde "alugamos" recursos brutos (como servidores e redes). |
| Aula 05 | IAM | Serviço de Gerenciamento de Identidade e Acesso para controle de segurança. |

🔗 **Conexão:** Na aula passada, entendemos ONDE nossos recursos ficarão fisicamente nas Regiões da AWS e QUEM tem permissão para acessá-los através do IAM. Hoje, vamos criar o primeiro grande bloco da nossa infraestrutura: o **Processamento (Computação)**. Vamos entender como ter um "computador" rodando na nuvem.

---

## 🏗️ 2. Contextualização

A computação (processamento CPU/GPU e RAM) é o coração de qualquer aplicação de Ciência de Dados. Seja para hospedar um servidor simples web, rodar um script contínuo ou treinar uma Rede Neural Profunda enorme por semanas a fio, você precisa de poder computacional. A nuvem trouxe diferentes maneiras de conseguir isso: desde "alugar a máquina virtual inteira" até "pagar apenas pela fração de segundo que seu script precisa para rodar".

> 💡 **Analogia:** Pense na computação como transporte. O Amazon EC2 é como alugar um carro na locadora: você fica com o carro por dias (IaaS), liga a chave, dirige pra onde quiser e paga pela diária, usando ou deixando ele na garagem. O AWS Lambda (Serverless) é como um aplicativo de táxi/Uber: você entra, vai até o destino, sai e paga **exatamente apenas pela corrida**. Você não se preocupa com o óleo, manutenção ou de quem é o carro.
> 

---

## 📦 3. Amazon EC2 (Elastic Compute Cloud)

**Definição:** O Amazon EC2 é um serviço web que disponibiliza capacidade computacional segura e escalável (redimensionável) na nuvem em formato de Máquinas Virtuais (instâncias). É o pilar do modelo IaaS da AWS.

| **Característica** | **Detalhe** |
| --- | --- |
| Elasticidade | É possível aumentar a potência térmica da instância de 1 vCPU para 128 vCPUs em minutos. |
| Controle Total | Acesso root/administrador diretamente ao Sistema Operacional. |
| Customização | Escolha total do SO (Linux, Windows, macOS), processador (Intel, AMD, Graviton ARM) e hardware. |
| Pague pelo que "Ligar" | O faturamento ocorre por segundo rodado (pago em dólar) enquanto a instância permanecer ligada ("Running"). |

### 💡 Exemplos Reais no Cotidiano

- Hospedar todo o backend (API) de uma startup e o seu banco de dados relacional que precisa ficar ligado 24h por dia.
- Criar um cluster contendo 10 máquinas potentes com 8 GPUs dedicadas em cada uma para treinar um LLM.
- Servidor para um site institucional (WordPress) rodando perfeitamente num servidor simples na Virgínia.

### 📌 Famílias de Instâncias EC2 e IA

O hardware virtual é dividido em "Famílias" para atender necessidades diferentes. Para Big Data e Cientistas de Dados, escolher isso reduz tempo e custo drasticamente:

| **Foco** | **Uso Comum / Exemplo em Dados** |
| --- | --- |
| **C (Compute)** | Processamento rápido em lote (batch-processing), modelos matemáticos que exigem CPU forte. |
| **R, X (RAM)** | Otimizado para Memória (Redis, Apache Spark de Big Data guardando grandes DataFrames em RAM). |
| **P, G (GPU)** | Computação Gráfica Acelerada (Ideal para Machine Learning, treinamento em PyTorch/TensorFlow). |
| **T, M (Geral)** | Propósito Geral (Equilibrado). Ideal para servidores de teste e ambientes de pequeno tráfego. |

> **Analogia:** Não dá pra correr na Fórmula 1 usando um caminhão. O EC2 permite que você alugue o "tipo de carro" ideal para o tipo exato de carga de trabalho momentânea no servidor.
> 

---

## ⚡ 4. Computação Serverless e AWS Lambda

**Definição:** *Serverless* (Computação sem servidor) é um modelo de execução onde a AWS gerencia a alocação e gerenciamento completo dos servidores para você. O **AWS Lambda** é o serviço FaaS (Function as a Service) central desse conceito.

| **Característica** | **Detalhe** |
| --- | --- |
| Zero Manutenção | Não há servidores para atualizar, nem sistema operacional ou patches de segurança em Linux/Windows. O foco é escrever o script (Código). |
| Pagamento Sub-segundo | Cobrança exata por número de requisições e pelo tempo consumido *em milissegundos*! Se o script não for acionado, você não paga NADA. |
| Orientado a Eventos | Executado por gatilhos. Por exemplo: Uma foto nova foi salva em uma pasta? Roda o código e converte. Requisição web (HTTP)? Atende e processa na hora. |
| Escalonamento Real | Se caírem 10 mil pedidos por segundo instantaneamente, a AWS duplica seu código em 10 mil workers concorrentes. Acabou os eventos? Tudo some. |

### 💡 Exemplos Reais no Cotidiano

- Um script automatizado (Lambda function em Python) que roda todos os dias à meia-noite extraindo a cotação do dólar e jogando num banco SQL.
- Chatbots onde a resposta em mensagens é feita em tempo real usando integrações simples com AI.
- Processamento automatizado de pequenos arquivos PDF ou CSVs de extratos anexados em um sistema da empresa.

> **Analogia:** O EC2 (mesmo de madrugada) é como deixar a luz da sala acesa a noite toda. Você paga por isso. O Lambda é semelhante a um interruptor de luz com sensor de movimento num corredor: a luz só acende (gasta energia) exata e milimetricamente quando você está passando, e apaga assim que o gatilho some de perto.
> 

---

## ⚖️ 5. Comparação Estrutural: EC2 vs AWS Lambda

| **Critério** | **Amazon EC2 (IaaS/Instância Virtual)** | **AWS Lambda (FaaS/Serverless)** |
| --- | --- | --- |
| **Gestão do SO** | Cliente administra, usa SSH, atualiza antivírus. | Totalmente gerenciado pela AWS. |
| **Tempo Suportado** | Pode ficar ligada por ANOS diretos treinando IA. | Máximo de 15 MINUTOS por execução de função. |
| **Ponto Econômico** | Previsível, custa "X" o mês enquanto ligada. | Mais barato que EC2 mas apenas se as requisições possuírem muitas horas inativas/variáveis. |
| **Como Escala?** | Cria mais máquinas virtuais usando o Auto-Scaling ("demora" minutos). | Imediatamente para cada um executando no evento. |

---

## 🔮 6. Tendências Contemporâneas

| **Tendência** | **Descrição** | **Impacto** |
| --- | --- | --- |
| **Serverless AI Inference** | Hospedar a inferência dos modelos de IA não mais em grandes servidores, mas em containers e lambdas serverless. | Fim de servidores EC2 dedicados e caros com ociosidade. A predição roda sob demanda no gatilho do cliente custando frações de centavos. |
| **AWS Graviton (Processamento Sustentável)** | Nova arquitetura de CPUs ARM criadas por eles. | Otimiza carga, gasta muito menos energia real/térmica e reduz em até 40% a fatura. |

---

## 📋 7. Resumo Estrutural

| **Conceito** | **Definição em Uma Frase** |
| --- | --- |
| **Elastic Compute Cloud (EC2)** | Suas tradicionais máquinas virtuais (IaaS) rodam na nuvem AWS de modo altamente flexível e controlável. |
| **Tipos de Instâncias** | Famílias de hardware pré-estruturados (GPU, CPU ou RAM) à lá carte. |
| **Computação Serverless** | Modelo onde a AWS provê infraestrutura transparente para nós rodarmos nossa aplicação. |
| **AWS Lambda** | O serviço do tipo FaaS para focar em escrever uma "Função" disparada por eventos pontuais. |

---

## 🧩 8. Atividade Prática (PBL)

### 📌 Cenário: Arquitetura Global Uniube "ProcessData Analytics"

O seu departamento de Inteligência Artificial da reitoria solicitou um parecer técnico. O sistema processa inscrições diárias e também analisa os TCCs no final do ano. Eles dividiram o gargalo do sistema atual em duas partes (A e B). Como o engenheiro em nuvem e futuro cientista de dados, você precisa tomar essa decisão de infraestrutura.

**O Processo (A):**

Durante as duas últimas semanas do ano existe um algoritmo robusto de PNL para rastreamento de plágios e modelagem de tópicos em TCCs. A execução do treino base nos documentos durará seguidas 48 HORAS com capacidade computacional gráfica densa exigindo placas de vídeo top de linha.

**O Processo (B):**

Um micro-script Python de 20 linhas foi criado que: na virada de cada dia, em qualquer momento do dia, vai na base de dados rápida, extrai um dado e envia por e-mail um pequeno log para a diretoria. Leva em torno de 500 milissegundos para rodar e rodar 24h a fio é um exagero inútil.

**Tarefas Analíticas (Reflita e Responda):**

1. Consolidando IaaS x FaaS, qual modelo atende O Processo A e qual atende O Processo B?
2. Justifique tecnicamente: se você usar EC2 para o O Processo B, estaria gerando gastos passivos? Explique.
3. Considerando apenas O Processo A usando Amazon EC2; qual "Família" do EC2 você indicaria (uma C, uma R, ou uma Instância P/G com GPU)?

---

## 🚀 9. Desafio (Sala de Aula Invertida)

**Para a próxima aula ([Quarta — Prática de Lançamento de Máquina Virtual]):**

1. Acesse o AWS Academy e clique em **Módulo 2.1 — Serviços Essenciais Parte 1 (Computação)** e dê play na vídeo-aula do Amazon EC2.
2. Descubra os requisitos para acesso. Procure online: o que é uma **"Chave Privada (.pem/.ppk)"(Key-Pair SSH)**? Teremos de usar uma na nossa próxima aula.
3. Se o seu Windows ainda for antigo, busque online instalar o "PuTTY". Para a maioria com Windows atualizado, o CMD padrão (que tenha suporte à palavra `ssh` em terminal aberto) bastará.
4. Pense: se hoje você fizesse um deploy, qual "Tipo de Instância EC2" você acredita que caberia grátis? Dica: chamam as grátis providas via Free Tier de *Micro*. Busque como elas funcionam.

> 💡
> 
> 
> **Dica de Sucesso:**
> 

---

## 📚 10. Referências Bibliográficas

### 📖 Referências Obrigatórias

| **Autor** | **Obra** | **Capítulo/Seção Utilizada** |
| --- | --- | --- |
| ANTUNES, Jonathan Lamim | Amazon AWS: descomplicando a computação na nuvem. Casa do Código, 2016 | Capítulos focados em EC2, SSH e Instâncias |
| KOLBE JÚNIOR, Armando | Computação em nuvem. Contentus, 2020 | Capítulos Focados no IaaS vs FaaS |
| SOUSA NETO, Manoel Veras de | Cloud computing: nova arquitetura da TI. Brasport, 2012 | Capítulos sobre Escalabilidade Virtual |

### 📖 Referências Complementares

| **Autor** | **Obra** | **Relevância** |
| --- | --- | --- |
| BARR, Jeff. | AWS News Blog sobre Serverless e Lambda e EC2 Graviton | Visões diretas do CTO das tecnologias usadas pelas gigantes AWS |

### 🔗 Links Úteis

| **Recurso** | **Descrição** | **Link** |
| --- | --- | --- |
| Página Oficial Amazon EC2 | Comparativo oficial dos tipos de servidores IaaS com detalhamento das famílias | [aws.amazon.com/pt/ec2/](https://aws.amazon.com/pt/ec2/) |
| Página AWS Lambda | O FaaS poderoso com estudos de caso do NuBank na página | [aws.amazon.com/pt/lambda/](https://aws.amazon.com/pt/lambda/) |

### 🎥 Vídeos Recomendados

| **Canal/Autor** | **Título** | **Duração** | **Link** |
| --- | --- | --- | --- |
| Cloud Treinamentos | O QUE É EC2 NA AWS E COMO FUNCIONA (PT-BR) | 08:34 | [Assistir no YouTube](https://www.youtube.com/watch?v=Fj7nB_k-p_8) |
| Código Fluente | Aula 11 - O que é o EC2 e Subindo nossa máquina virtual | 14:00+ | [Assistir no YouTube](https://www.youtube.com/watch?v=K3S1f1W4w0o) |