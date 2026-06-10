---
disciplina: Cloud Computing
codigo: "14189"
aula: "02"
titulo: "Fundamentos de Cloud: História e Conceitos Essenciais"
tipo: teorica
semana: 1
data: 2026-02-13
status: publicado
tags:
  - cloud
  - fundamentos
  - historia
  - capex-opex
  - nist
publicar: true
---

# 🟢 Aula 01b: Fundamentos de Cloud: História e Conceitos Essenciais

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana:** 1 | Sexta-feira
**Professor:** Romualdo Mathias Filho
**Tipo:** 📘 Teórica
**Tópicos:** Evolução do Data Center, Capex vs Opex, Escalabilidade vs Elasticidade, Características NIST, IaC Inicial

---

## 🎯 Objetivo da Aula

Ao final desta aula, os alunos serão capazes de:
- Explicar a evolução histórica de Data Centers físicos locais até a computação em nuvem pública moderna.
- Diferenciar o modelo financeiro de despesas de capital (Capex) do modelo de despesas operacionais (Opex) em TI.
- Contrastar Escalabilidade Vertical (Scale-Up) com Escalabilidade Horizontal (Scale-Out) e correlacioná-las ao conceito de Elasticidade.
- Identificar e descrever as 5 Características Essenciais da computação em nuvem segundo o NIST.

---

## 🔄 Revisão Rápida (5 min)

Como esta é a nossa aula teórica de fundamentos inicial, estabelecemos o alinhamento de infraestrutura base:

| **Conceito de TI Tradicional** | **Conexão com hoje** |
| --- | --- |
| Servidor Local (Bare Metal) | Entenderemos as dores de manter e escalar computação física em sala própria (On-Premises). |
| Compra de Hardware | Compararemos o modelo de aquisição física com o modelo flexível de aluguel por uso da nuvem. |
| Virtualização | Analisaremos como o hypervisor preparou o terreno para o surgimento dos provedores de nuvem pública. |

---

## 📌 1. Linha do Tempo: A Dor do Hardware Físico

A computação em nuvem é uma resposta direta a problemas econômicos e técnicos enfrentados pelas organizações nas décadas anteriores. Conforme destacado por Sousa Neto (2015, p. 42), a transição do modelo físico para a nuvem redefiniu a governança de TI.

### 1.1. Era do Ferro (Anos 1990 e início dos 2000)
* Para lançar um novo sistema ou expandir o banco de dados, a organização precisava **comprar servidores físicos (bare metal)**.
* A compra levava meses devido a importações e burocracia, exigindo espaço físico de refrigeração, energia ininterrupta (nobreaks) e equipe de infraestrutura local dedicada.
* Para suportar picos sazonais (ex.: período de matrículas na faculdade ou Black Friday), era obrigatório comprar hardware superdimensionado, que permanecia **ocioso grande parte do ano** (ociosidade em torno de 80%).
* **Resultado:** Alto investimento inicial, rigidez e desperdício de capital em infraestrutura inativa.

### 1.2. Era da Virtualização (Anos 2000)
* O surgimento de hypervisors (VMware ESXi, KVM, Microsoft Hyper-V) permitiu isolar o sistema operacional do hardware físico.
* Um único servidor robusto passa a hospedar diversas **Máquinas Virtuais (VMs)** rodando aplicações independentes, otimizando o uso de CPU e memória.
* Embora aumente a eficiência lógica, a empresa continua responsável por comprar o hardware físico, gerenciar o espaço, substituir peças e arcar com os custos térmicos e de energia.

### 1.3. Era da Nuvem Pública (2006 em diante)
* Provedores globais percebem a grande capacidade ociosa de seus datacenters e passam a vendê-la como serviço escalável via internet.
* Em 2006, o Amazon Web Services (AWS) comercializa os primeiros serviços de computação e armazenamento virtuais acessados via APIs lógicas.
* Para o usuário, a infraestrutura física torna-se transparente: em vez de comprar "ferro", ele **aluga poder computacional por segundo de uso**.

---

## 📌 2. Dicionário Essencial do Arquiteto Cloud

Use esta tabela estruturada como referência fundacional para o vocabulário das próximas aulas e termos de certificações oficiais:

| Termo | Definição Fundacional | Exemplo Prático no Cotidiano |
| --- | --- | --- |
| **On-Premises** | Infraestrutura local física onde a empresa possui e administra toda a pilha de hardware e redes. | A sala fechada de servidores físicos mantida na reitoria da faculdade. |
| **Hypervisor** | Camada de software que atua na virtualização de hardware, criando e orquestrando as VMs. | KVM, VMware ESXi ou Microsoft Hyper-V. |
| **Workload** | Qualquer carga de trabalho, serviço ou aplicação executada em um ambiente computacional. | Uma API Node.js de processamento do Nubank ou banco de dados PostgreSQL. |
| **Alta Disponibilidade (HA)** | Arquitetura desenhada para manter o sistema online mesmo diante de falhas de componentes individuais. | Servidores espelhados atuando em Zonas de Disponibilidade (AZs) distintas da AWS. |
| **Tolerância a Falhas** | Nível avançado de resiliência onde a falha de hardware é absorvida sem interrupção perceptível. | Cluster redundante ativo-ativo com replicação em tempo real de dados. |
| **SLA (Service Level Agreement)** | Compromisso contratual do provedor de nuvem definindo o tempo máximo tolerável fora do ar. | SLA de 99,99% para serviços críticos (aproximadamente 52 minutos fora do ar por ano). |

---

## 📌 3. Regra de Ouro: Escalabilidade vs Elasticidade

Em termos práticos, **Escalabilidade** é a capacidade arquitetural de suportar mais carga quando recursos adicionais são acoplados. **Elasticidade**, por sua vez, é a capacidade dinâmica de adaptar esses recursos de forma automática para cima ou para baixo conforme a demanda do momento.

### 3.1. Tipos de Escalabilidade

| Característica | Scale-Up (Vertical) | Scale-Out (Horizontal) |
| --- | --- | --- |
| **Ação** | Adicionar mais recursos (CPU, RAM) ao mesmo servidor virtual. | Acoplar mais instâncias de servidores rodando em paralelo. |
| **Exemplo Prático** | Fazer o upgrade de um servidor de banco de dados de 8 GB para 64 GB de RAM. | Adicionar 5 servidores web adicionais por trás de um balanceador de carga no pico do iFood. |
| **Limitação Física** | Restrito à capacidade física máxima da placa-mãe e do hypervisor. | Teoricamente ilimitado em provedores de nuvem pública. |
| **Impacto Operacional** | Frequentemente exige reinicialização da máquina (causando downtime). | Provisionado sob demanda em tempo real sem afetar os usuários logados. |

### 3.2. Elasticidade Rápida
A elasticidade é ativada através de métricas automatizadas (ex.: consumo de CPU > 70%). Ao atingir a regra, o Auto Scaling insere novas instâncias em minutos. Cessado o pico de acessos, as instâncias sobressalentes são destruídas automaticamente, cessando a cobrança no mesmo instante.

---

## 📌 4. Impacto Financeiro: Capex vs Opex

A transição para computação em nuvem altera drasticamente a estrutura de planejamento financeiro corporativo das empresas:

| Modelo de Despesa | Definição Geral | Risco Operacional | Exemplo Prático |
| --- | --- | --- | --- |
| **Capex (Capital Expenditure)** | Investimento em bens tangíveis; aquisição de ativos permanentes que sofrem depreciação contábil ao longo do tempo. | Alto. Caso o projeto seja cancelado, o hardware comprado vira desperdício de capital (peso morto). | Comprar servidores de alta performance por R$ 60.000 para rodar uma simulação científica temporária. |
| **Opex (Operational Expenditure)** | Despesas operacionais recorrentes; custos pagos na forma de serviços sob demanda conforme a necessidade de uso. | Baixo. Se o projeto de TI falhar, basta desligar as instâncias na nuvem para zerar imediatamente os custos da fatura. | Pagar R$ 1.500 mensais para alugar capacidade sob demanda na nuvem pública AWS. |

---

## 📌 5. Definição Oficial: 5 Características Essenciais do NIST

Segundo a definição clássica estabelecida pelo *National Institute of Standards and Technology (NIST)* (MELL; GRANCE, 2011), um modelo de computação só pode ser legitimamente considerado computação em nuvem se preencher cumulativamente estas **cinco características**:

1. **Autoatendimento sob demanda (On-demand self-service):** O provisionamento de recursos de processamento (CPU, redes, storage) ocorre de forma automática via painel, API ou CLI, sem necessidade de suporte humano do provedor.
2. **Acesso amplo à rede (Broad network access):** Recursos disponíveis na rede global através de protocolos padronizados de comunicação, permitindo acesso por celulares, tablets, computadores e dispositivos IoT.
3. **Pool de recursos (Resource pooling):** Os recursos físicos do provedor são agrupados para servir a múltiplos clientes (multi-tenant) de forma compartilhada, com isolamento lógico rígido de dados.
4. **Elasticidade rápida (Rapid elasticity):** Capacidade de expandir ou contrair recursos computacionais de forma automatizada e instantânea, parecendo "ilimitada" ao cliente final.
5. **Serviço medido (Measured service):** O uso da infraestrutura é monitorado, auditado e cobrado proporcionalmente (pay-as-you-go), como contas públicas de água e eletricidade.

---

## 📌 6. Demonstração Conceitual: Infraestrutura como Código (IaC)

No paradigma tradicional, os administradores configuravam servidores de forma manual via clique ou cabos físicos. Na nuvem moderna, a infraestrutura inteira é definida e provisionada via código declarativo ou linha de comando.

```bash
# Exemplo didático de comando AWS CLI para lançar instâncias EC2
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --count 5 \
  --instance-type t3.large \
  --security-group-ids sg-903004f8 \
  --region sa-east-1
```

**Análise pedagógica do comando:**
* `--count 5`: Solicita o provisionamento simultâneo de 5 servidores virtuais idênticos em menos de 1 minuto.
* `--instance-type t3.large`: Define o hardware virtual específico (2 vCPUs e 8 GiB de RAM por máquina).
* `--region sa-east-1`: Configura as instâncias fisicamente localizadas no data center regional de São Paulo (menor latência).

---

## 📋 Resumo Estrutural

| **Conceito** | **Definição em Uma Frase** |
| --- | --- |
| On-Premises | O modelo clássico de TI onde a organização detém e opera localmente todo o hardware de servidores. |
| Hypervisor | Software responsável por simular o hardware físico e gerenciar múltiplas Máquinas Virtuais em paralelo. |
| Escalabilidade horizontal | Estratégia de expandir capacidade computacional por meio da inserção de servidores adicionais (Scale-Out). |
| Capex vs Opex | A migração contábil de despesas de investimento permanente (compra) para despesas operacionais sob demanda (aluguel). |
| Características do NIST | O conjunto de cinco pré-requisitos técnicos exigidos para legitimar um ecossistema como computação em nuvem. |

---

%%
## ❓ Banco de Questões

> 🔒 Esta seção é visível apenas no Obsidian do professor. Não publicada.

### Questão 1: Prática (Múltipla Escolha — Nível: Básico)
**Enunciado:** Uma startup brasileira de comércio eletrônico planeja lançar uma campanha promocional agressiva de 48 horas nas redes sociais. Espera-se picos de tráfego extremos e imprevisíveis no site de vendas. Qual modelo de despesas de TI e qual característica fundamental da computação em nuvem recomendada pelo NIST melhor se aplicam a esse cenário para obter alta eficiência financeira sem desperdícios?

- [ ] A) Despesas de Capital (CAPEX) e Autoatendimento sob Demanda.
- [ ] B) Despesas de Capital (CAPEX) e Acesso Amplo à Rede.
- [x] C) Despesas Operacionais (OPEX) e Elasticidade Rápida. ✅
- [ ] D) Despesas Operacionais (OPEX) e Virtualização Local.

**Justificativa:** O modelo OPEX garante que a startup pague apenas pelas instâncias rodadas durante a promoção de 48 horas, evitando a compra permanente de hardware inativo. A Elasticidade Rápida permite que o sistema escale horizontalmente e contraia a contagem de servidores de forma automatizada ao final da campanha de marketing.

---

### Questão 2: Prática (Múltipla Escolha — Nível: Intermediário)
**Enunciado:** Uma empresa decide migrar seu sistema interno para uma infraestrutura em nuvem privada. No entanto, a equipe de desenvolvimento de software identificou que, para provisionar uma nova máquina virtual de testes, eles precisam preencher um formulário via e-mail e aguardar a verificação e aprovação manual da equipe de administração de redes, que pode levar até 2 dias úteis. Com base na taxonomia do NIST, qual característica essencial da computação em nuvem está sendo VIOLADA neste fluxo?

- [ ] A) Acesso amplo à rede (Broad network access).
- [x] B) Autoatendimento sob demanda (On-demand self-service). ✅
- [ ] C) Pool de recursos (Resource pooling).
- [ ] D) Serviço medido (Measured service).

**Justificativa:** O Autoatendimento sob demanda (On-demand self-service) exige que o cliente possa provisionar capacidades computacionais (como tempo de servidor ou armazenamento em rede) de maneira totalmente autônoma e automatizada, sem necessidade de interação humana com o provedor ou suporte técnico.

---

### Questão 3: Teórica (Dissertativa — Nível: Avançado)
**Enunciado:** Um arquiteto de nuvem precisa tomar a decisão de desenho de rede para hospedar um novo cluster de processamento pesado de Big Data que consome memória RAM intensamente. Explique detalhadamente por que a Escalabilidade Horizontal (Scale-Out) é superior à Escalabilidade Vertical (Scale-Up) no contexto de provedores de nuvem pública elásticos, destacando o limite físico do Scale-Up e o impacto operacional na alta disponibilidade.

**Resposta esperada:** A Escalabilidade Vertical (Scale-Up) possui um limite físico intransponível determinado pela capacidade máxima da placa-mãe do hardware de servidor disponibilizado pelo hypervisor da nuvem pública (limitação de vCPUs e slots de RAM). Além disso, o Scale-Up exige downtime em muitos casos para reconfigurar e reiniciar a VM com o novo "tamanho". Por outro lado, a Escalabilidade Horizontal (Scale-Out) contorna limites físicos adicionando novas VMs de tamanho estável em paralelo atrás de um balanceador de carga. Isso permite que a expansão ocorra de maneira teoricamente ilimitada na nuvem pública, garantindo a Alta Disponibilidade (HA) sem downtime perceptível aos usuários finais, sendo a opção arquitetural padrão em nuvem elástica.

---
%%

## 📄 Artigo de Aprofundamento

- [Above the Clouds: A Berkeley View of Cloud Computing (2009)](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2009/EECS-2009-28.pdf)
> *Resumo prático: Publicado por pesquisadores da UC Berkeley, este artigo é considerado a certidão de nascimento conceitual da nuvem moderna. Ele define os riscos econômicos envolvidos na ociosidade computacional clássica e como a elasticidade rápida elimina barreiras de CAPEX para startups inovadoras.*

---

## 📚 Referências Bibliográficas

- MELL, Peter; GRANCE, Timothy. *The NIST Definition of Cloud Computing*. National Institute of Standards and Technology (NIST), Special Publication 800-145, 2011. **(Características Essenciais, pp. 2–3)**
- SOUSA NETO, Manoel Veras de. *Cloud computing: nova arquitetura da TI*. Brasport, 2012. **(Evolução da TI tradicional e CAPEX/OPEX, Cap. 2, pp. 41–55)**
- MUNIZ, Antonio et al. *Jornada cloud native: do zero ao avançado somando conceitos e práticas*. Brasport, 2023. **(Conceitos básicos de virtualização e escalabilidade, Cap. 1, pp. 20–32)**

---
*Última atualização: 2026-05-20 | Status: publicado*
