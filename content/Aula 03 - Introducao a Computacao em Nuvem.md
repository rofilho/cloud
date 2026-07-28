---
disciplina: Cloud Computing
codigo: "14189"
aula: "03"
titulo: "Introdução à Computação em Nuvem – IaaS, PaaS e SaaS"
tipo: teorica
semana: 2
data: 2026-02-20
status: publicado
tags:
  - cloud
  - iaas
  - paas
  - saas
  - modelos-servico
  - implantacao
publicar: true
---

# 🟢 Aula 03: Introdução à Computação em Nuvem: Modelos de Serviço e Implantação

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana:** 2 | Sexta-feira
**Professor:** Romualdo Mathias Filho
**Tipo:** 📘 Teórica
**Tópicos:** Definição de Cloud, IaaS, PaaS, SaaS, Nuvem Pública, Nuvem Privada, Híbrida, Multi-cloud

---

## 🎯 Objetivo da Aula

Ao final desta aula, os alunos serão capazes de:
- Conceituar detalhadamente a computação em nuvem e reconhecer sua importância para o desenvolvimento ágil moderno.
- Diferenciar com clareza os modelos de serviço de nuvem: IaaS (Infraestrutura), PaaS (Plataforma) e SaaS (Software).
- Compreender e classificar os modelos de implantação de nuvem: pública, privada, híbrida e multi-cloud.
- Avaliar vantagens e desvantagens de cada modelo estrutural e de implantação para propor arquiteturas corporativas ideais.

---

## 🔄 Revisão Rápida (5 min)

Na aula anterior, estudamos os fundamentos econômicos e a taxonomia NIST de nuvem:

| **Conceito (Aula 01b)** | **Conexão com hoje** |
| --- | --- |
| [[Aula 02 - Fundamentos de Cloud#4. Impacto Financeiro: Capex vs Opex\|Despesas Operacionais (Opex)]] | Modelos como IaaS e PaaS viabilizam a eliminação de despesas CAPEX, reduzindo a barreira de entrada técnica. |
| [[Aula 02 - Fundamentos de Cloud#5. Definição Oficial: 5 Características Essenciais do NIST\|Características NIST]] | Veremos como a elasticidade rápida e pool de recursos se traduzem nas ofertas concretas de IaaS, PaaS e SaaS. |
| [[Aula 02 - Fundamentos de Cloud#6. Demonstração Conceitual: Infraestrutura como Código (IaC)\|Virtualização e Hypervisor]] | O hypervisor é o bloco lógico básico que permite aos provedores públicos venderem IaaS escalável. |

---

## 📌 1. O que é Computação em Nuvem?

Computação em nuvem é um modelo de fornecimento de recursos de tecnologia sob demanda (computação, redes, armazenamento, bancos de dados, inteligência artificial) acessados de maneira lógica via internet, com tarifação proporcional ao uso (pay-as-you-go).

### 1.1. Desmistificando Conceitos
* **Infraestrutura Lógica Distribuída:** Não existe uma "nuvem física" suspensa; trata-se de clusters de datacenters geográficos massivos contendo dezenas de milhares de servidores físicos redundantes operados por grandes provedores mundiais.
* **Acessibilidade Ampla:** Os recursos de computação são consumíveis remotamente de qualquer lugar através de APIs abertas, painéis administrativos lógicos ou linhas de comando (broad network access).
* **Foco no Core Business:** A infraestrutura física subjacente e a refrigeração do hardware se tornam invisíveis para quem desenvolve a solução.

### 1.2. Importância Estratégica na TI Moderna
* **Eliminação de CAPEX:** Startups e grandes corporações compartilham da mesma infraestrutura elástica, sem necessidade de aquisição prévia de hardware.
* **Habilitação de DevOps e CI/CD:** Ambientes inteiros de teste nascem e morrem via scripts declarativos em minutos, permitindo ciclos contínuos de entrega de código.

---

## 📌 2. Modelos de Serviço: IaaS, PaaS e SaaS

Os modelos de serviço definem o nível de controle técnico exercido pelo cliente versus a responsabilidade gerenciada pelo provedor de nuvem.

### 2.1. IaaS – Infrastructure as a Service (Infraestrutura como Serviço)
O provedor fornece os blocos de construção de hardware físico virtualizado (servidores virtuais, redes, armazenamento físico, firewalls e balanceadores). O cliente é totalmente responsável por configurar e gerenciar o Sistema Operacional (OS), middlewares, runtimes e a aplicação final.
* **Provedores/Serviços:** AWS (EC2, EBS), Google Cloud (Compute Engine), Microsoft Azure (VMs).
* **Casos de Uso Comuns:** Hospedagem de bancos de dados relacionais customizados, infraestrutura legada que exige controle de SO e ambientes de simulação computacional.

### 2.2. PaaS – Platform as a Service (Plataforma como Serviço)
O provedor gerencia toda a pilha de infraestrutura física, redes, armazenamento e o próprio Sistema Operacional. Ele fornece uma plataforma lógica pronta com runtime pré-configurado para que o desenvolvedor execute seu código. O cliente foca estritamente em código e lógica da aplicação.
* **Provedores/Serviços:** Heroku, Azure App Service, Google App Engine, Railway, Render.
* **Casos de Uso Comuns:** Pipelines ágeis de APIs web, ambientes de homologação rápidos e deploys automatizados baseados em Git.

### 2.3. SaaS – Software as a Service (Software como Serviço)
O software final completo é fornecido pelo provedor e consumido pelo usuário diretamente via navegador ou aplicativos clientes. Toda a administração lógica, bancos de dados, upgrades de segurança, servidores físicos e a própria aplicação são de responsabilidade do provedor de nuvem.
* **Exemplos:** Google Workspace, Microsoft 365, Salesforce, Trello, Slack.
* **Casos de Uso Comuns:** Ferramentas de CRM corporativo, produtividade de e-mails corporativos e planilhas integradas distribuídas.

### 2.4. Tabela de Comparação Estrutural

| Aspecto | IaaS (Infraestrutura) | PaaS (Plataforma) | SaaS (Software) |
| --- | --- | --- | --- |
| **Controle do Cliente** | Elevado (acesso root ao SO, rede e middlewares). | Intermediário (gerenciamento do código e dados). | Mínimo (apenas configuração de perfis e uso). |
| **Complexidade Técnica** | Alta. Exige engenheiros de sistemas e redes dedicados. | Média/Baixa. Ideal para desenvolvedores web ágeis. | Nula. Focado em usuários finais e produtividade direta. |
| **Flexibilidade Lógica** | Máxima. Permite customizar qualquer driver ou SO. | Limitada aos runtimes disponibilizados pelo PaaS. | Rigorosa. Customizações restritas ao ecossistema do app. |
| **Cobrança Típica** | Segundo/Minuto de CPU/RAM rodado + armazenamento. | Tarifação por recursos computacionais de plataforma. | Assinatura mensal fixa por contagem de usuários. |

---

## 📌 3. Modelos de Implantação em Nuvem

Os modelos de implantação definem **onde** e **como** os recursos computacionais são hospedados e organizados do ponto de vista de infraestrutura e governança lógica.

### 3.1. Nuvem Pública
A infraestrutura computacional física inteira pertence ao provedor terceirizado (AWS, GCP, Azure), sendo compartilhada de forma segura entre múltiplos clientes (multi-tenant) com isolamento lógico estrito.
* **Vantagens:** Alta escalabilidade e elasticidade, investimento inicial zero (sem CAPEX), acesso imediato a IA de ponta.
* **Desvantagens:** Dependência absoluta de conexão externa com a rede; risco de vendor lock-in; preocupações rígidas de conformidade em dados altamente regulados.

### 3.2. Nuvem Privada
A infraestrutura computacional física inteira é dedicada exclusivamente a uma única organização, podendo residir no próprio datacenter local da empresa (on-premises) ou ser gerenciada exclusivamente em um espaço reservado em provedor terceirizado (single-tenant).
* **Vantagens:** Controle absoluto sobre conformidade de dados sensíveis; customização de hardware; maior segurança de rede física.
* **Desvantagens:** Alto CAPEX inicial; responsabilidade de manutenção preventiva do hardware; escalabilidade fisicamente limitada.

### 3.3. Nuvem Híbrida
Modelo que integra de forma lógica e operacional a infraestrutura local (on-premises ou nuvem privada) com a infraestrutura de nuvem pública.
* **Vantagens:** Permite manter dados e workloads sensíveis no ambiente privado (compliance) e utilizar a nuvem pública elástica para picos de tráfego temporários (*cloud bursting*) e testes rápidos.
* **Desvantagens:** Complexidade operacional crítica no projeto de redes (VPNs, Direct Connect), governança e gerenciamento de identidade unificado.

### 3.4. Multi-cloud
A estratégia arquitetural de utilizar de forma simultânea ou distribuída **dois ou mais provedores de nuvem pública independentes** (ex.: AWS + Azure + Google Cloud).
* **Vantagens:** Redução crítica de risco de vendor lock-in; aumento na resiliência global de negócios (se um provedor cair, o outro atende); otimização de serviços especializados (ex.: ML no GCP, Active Directory no Azure, Compute no EC2).
* **Desvantagens:** Complexidade operacional exponencial; necessidade de equipe com conhecimentos profundos em múltiplas nuvens públicas; dispersão de custos corporativos de faturamento.

---

## 📌 4. Híbrida x Multi-cloud: O Dilema da Diversificação

Muitos engenheiros confundem os dois termos pela semelhança semântica. Uma forma clara de diferenciar em aula técnica:

> 💬 **"Nuvem Híbrida é sobre integrar o seu ambiente local clássico (Privado) com a nuvem moderna (Pública). Multi-cloud é sobre diversificar a sua infraestrutura pública entre múltiplos provedores concorrentes de mercado para evitar exclusividade tecnológica."**

---

## 📋 Resumo Estrutural

| **Conceito** | **Definição em Uma Frase** |
| --- | --- |
| **IaaS (Infraestrutura como Serviço)** | O provedor aluga o hardware virtual e o cliente configura do Sistema Operacional até a aplicação. |
| **PaaS (Plataforma como Serviço)** | O provedor abstrai o Sistema Operacional e o cliente foca estritamente na entrega do código. |
| **SaaS (Software como Serviço)** | O aplicativo final pronto é consumido de forma direta via web, sem gerenciamento de infraestrutura lógica. |
| **Nuvem Híbrida** | A integração orquestrada e segura de redes entre o datacenter on-premises privado e a nuvem pública global. |
| **Multi-cloud** | O uso de múltiplos provedores de nuvem pública diferentes de forma distribuída para otimizar workloads. |

---
## 📄 Artigo de Aprofundamento

- [Nuvem pública em comparação com nuvem privada e nuvem híbrida (Microsoft Azure)](https://azure.microsoft.com/pt-br/resources/cloud-computing-dictionary/what-are-private-public-hybrid-clouds)
> *Resumo prático: Este artigo conceitual da Microsoft detalha as diferenças fundamentais de infraestrutura operacional dos três modelos de implantação, fornecendo um guia corporativo prático para gestores de TI decidirem a migração gradual entre ambientes híbridos.*

---

## 📚 Referências Bibliográficas

- SOUSA NETO, Manoel Veras de. *Cloud computing: nova arquitetura da TI*. Brasport, 2012. **(Modelos de serviço e modelos de implantação, Cap. 3, pp. 57–74)**
- MUNIZ, Antonio et al. *Jornada cloud native: do zero ao avançado somando conceitos e práticas*. Brasport, 2023. **(Arquiteturas de microsserviços e multi-cloud, Cap. 2, pp. 45–61)**
- BARBOSA, Joelson. *Cloud híbrida vs. multicloud: diferenças, usos e estratégias*. Escola Superior de Redes (ESR RNP), 2024. **(Padrões de conectividade e segurança híbrida, pp. 12–18)**

---
*Última atualização: 2026-05-20 | Status: publicado*
