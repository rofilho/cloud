---
disciplina: Cloud Computing
codigo: "14189"
aula: "04"
titulo: "Introdução à AWS Academy"
tipo: pratica
semana: 3
data: 2026-02-27
status: publicado
tags:
  - cloud
  - aws
  - aws-academy
  - lab
publicar: true
---

# 🟢 Aula 03 e 04: Introdução à AWS Academy e Configuração do Learner Lab

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana:** 3 | Sexta-feira
**Professor:** Romualdo Mathias Filho
**Tipo:** 🔬 Prática
**Tópicos:** Login AWS Academy, Sandbox Vocareum, AWS Learner Lab, Controle de Custos, LabRole e IAM Restrictions

---

## 🎯 Objetivo da Aula

Ao final desta aula prática, os alunos serão capazes de:
- Efetuar login com autonomia e navegar no ecossistema acadêmico da AWS Academy.
- Iniciar e gerenciar o ciclo de vida do ambiente sandbox temporário (AWS Learner Lab) através do portal intermediador Vocareum.
- Compreender e aplicar as restrições de custos (limite rígido de USD 100) para evitar o bloqueio precoce da conta de testes.
- Identificar as limitações do IAM no ecossistema de laboratórios acadêmicos e utilizar a credencial mestre `LabRole` para provisionar serviços.

---

## 🔄 Revisão Rápida (5 min)

Nas aulas passadas, estabelecemos as definições lógicas e modelos estruturais da nuvem:

| **Conceito (Aula Anterior)** | **Conexão com hoje** |
| --- | --- |
| [[Aula 02 - Introducao a Computacao em Nuvem#2.1. IaaS – Infrastructure as a Service (Infraestrutura como Serviço)\|IaaS (Infraestrutura)]] | Hoje acessaremos o console real da AWS que utilizaremos para criar nossos recursos IaaS nas próximas semanas. |
| [[Aula 02 - Introducao a Computacao em Nuvem#3.1. Nuvem Pública\|Nuvem Pública]] | A AWS Academy nos fornece um laboratório prático oficial rodando diretamente na nuvem pública global da AWS. |
| [[Aula 01 - Fundamentos de Cloud#5. Definição Oficial: 5 Características Essenciais do NIST\|Autoatendimento sob Demanda]] | O painel do console AWS que usaremos é a materialização do Autoatendimento sob Demanda defendido pelo NIST. |

---

## 📌 1. A Plataforma AWS Academy

A **AWS Academy** é um programa global da Amazon que disponibiliza a instituições de ensino superior um currículo estruturado e laboratórios hands-on oficiais na nuvem AWS.
* **lastro Acadêmico:** Fornece recursos idênticos aos utilizados por engenheiros e arquitetos de soluções seniores de mercado, preparando os estudantes diretamente para certificações oficiais de nuvem.
* **Sandbox Protegido:** Garante um ambiente elástico seguro para que os alunos possam criar, falhar, depurar e aprender sem o risco de gerar cobranças financeiras reais em seus cartões de crédito pessoais.

---

## 📌 2. O Console de Aprendizado e o Learner Lab

Para gerenciar o ciclo de vida das nossas práticas na nuvem, a AWS Academy utiliza o intermediador acadêmico **Vocareum**.

### 2.1. O Ciclo de Acesso ao Console
1. **Acessar o Portal:** O login é feito no portal oficial da [AWS Academy](https://www.awsacademy.com/AcademyClasses).
2. **Entrar no Learner Lab:** Ao clicar na disciplina correspondente, localize a seção de laboratórios e clique em *AWS Academy Learner Lab*.
3. **A Interface Vocareum:** Você será direcionado ao painel administrativo do laboratório. Observe os componentes:
   * **Botão `Start Lab`:** Inicializa e provisiona a conta sandbox temporária exclusiva na nuvem AWS para o seu usuário. A bolinha de status vermelha mudará para amarelo e, finalmente, para verde quando a conta estiver pronta.
   * **Botão `AWS`:** Abre uma aba anônima federada com o Console de Gerenciamento da AWS real na região de N. Virginia (`us-east-1`).
   * **Botão `End Lab`:** Encerra a sessão ativa do laboratório. **Atenção:** Isso não exclui seus recursos (servidores, bancos), apenas desconecta você do console da nuvem.

![[assets/aula03_console_vocareum.png]]
> *Legenda: Fluxo lógico de provisionamento de sessão via portal Vocareum. Fonte: AWS Academy Documentation.*

---

## 📌 3. Boas Práticas e Limitações de Custo no Lab

Como futuros cientistas de dados e engenheiros de nuvem, a gestão de custos é parte integral do seu trabalho diário (FinOps). No Learner Lab, você está sujeito a regras severas de controle:

### 3.1. O Limite Orçamentário (Budget de USD 100)
Cada estudante recebe um limite orçamentário máximo de **USD 100** para consumir durante todo o período acadêmico.
* **Cobrança Real:** Embora seja gratuito para você, o consumo simula os valores exatos cobrados pela AWS no mercado corporativo em dólares.
* **O Risco da Ociosidade:** Deixar instâncias de servidores (como EC2 potentes) ligadas desnecessariamente esgotará seu orçamento de USD 100 de forma passiva. Se atingir os USD 100, sua conta de laboratório será **permanentemente bloqueada/suspensa**, inviabilizando as próximas atividades.

### 3.2. A Regra do Descarte e Desligamento
* **Sempre desligue:** Ao concluir uma atividade prática, desligue temporariamente (Stop) suas instâncias virtuais ou delete os recursos que não serão mais utilizados.
* **Aperte `End Lab`:** Ao terminar os exercícios do dia, clique sempre em `End Lab` na tela do Vocareum para sinalizar o término da sessão.

### 3.3. Restrições do IAM (Identity and Access Management) no Lab
Para evitar violações de segurança e abusos nos datacenters, a AWS bloqueia diversas permissões na conta do Learner Lab via políticas de controle rígidas.
* **Erro `AccessDenied`:** Você receberá um erro administrativo de "permissão negada" se tentar criar novas chaves-mestras, criar perfis administrativos ou criar novas *IAM Roles* e *Policies* personalizadas.
* **A Solução (`LabRole`):** A AWS fornece uma role previamente configurada e autorizada chamada **`LabRole`** (e um profile de instância associado `LabInstanceProfile`). Ao criar funções serverless (Lambda), instâncias ou bancos de dados que exijam perfis lógicos, **sempre utilize a `LabRole` existente** em vez de tentar criar uma do zero.

---

## 📋 Resumo Estrutural

| **Conceito** | **Definição em Uma Frase** |
| --- | --- |
| **AWS Academy** | Programa educacional oficial da Amazon que disponibiliza trilhas práticas de nuvem reais para universidades. |
| **Vocareum** | Plataforma intermediária que gerencia a autenticação, provisionamento de sessões e controle de orçamentos estudantis. |
| **Learner Lab** | O ambiente de testes sandbox temporário onde os alunos têm até USD 100 de cota para provisionar recursos lógicos. |
| **LabRole** | O perfil lógico de segurança pré-aprovado pela AWS que o aluno deve herdar para criar recursos no laboratório. |
| **Budget Limit** | O limite de USD 100 que, se ultrapassado devido a recursos ociosos ligados, causa a suspensão irreversível da conta. |

---

%%
## ❓ Banco de Questões

> 🔒 Esta seção é visível apenas no Obsidian do professor. Não publicada.

### Questão 1: Prática (Múltipla Escolha — Nível: Básico)
**Enunciado:** Ao interagir com o portal do AWS Academy Learner Lab no dia a dia acadêmico, qual é o papel desempenhado pela interface intermediadora Vocareum na orquestração dos laboratórios práticos?

- [ ] A) É o hypervisor físico que cria instâncias de computação locais no computador do estudante.
- [ ] B) É o provedor de nuvem pública concorrente que hospeda os bancos de dados de homologação da universidade.
- [x] C) É o intermediador administrativo que gerencia a sessão sandbox temporária, fornecendo chaves temporárias e acesso federado ao Console AWS. ✅
- [ ] D) É o serviço gerenciado de firewall (Web Application Firewall) que protege a aplicação dos alunos de ataques.

**Justificativa:** O Vocareum atua como o painel administrativo acadêmico que provisiona chaves de acesso de linha de comando temporárias e orquestra a federação de login do estudante para a conta sandbox real da AWS.

---

### Questão 2: Prática (Múltipla Escolha — Nível: Intermediário)
**Enunciado:** Um estudante de Inteligência Artificial finalizou sua prática de Machine Learning na quarta-feira criando duas instâncias potentes EC2 no Learner Lab. Contudo, ele esqueceu de desligar ou terminar as instâncias ao final do exercício. Na semana seguinte, ao tentar logar para a próxima aula, o estudante percebeu que sua conta de testes estava suspensa de forma definitiva. Qual foi a causa provável desse incidente de infraestrutura?

- [ ] A) O hypervisor local da máquina detectou falha no disco rígido e encerrou a sessão.
- [x] B) As instâncias EC2 rodando de forma ociosa e contínua geraram custos virtuais que esgotaram a cota (budget limit) de USD 100 do laboratório. ✅
- [ ] C) O aluno violou as políticas de conformidade da nuvem ao abrir uma janela anônima para acessar o console.
- [ ] D) Ocorreu um bloqueio por tentativa de criar uma IAM Role administrativa personalizada pelo painel web.

**Justificativa:** O Learner Lab possui um limite rígido de faturamento de USD 100. Recursos ociosos ligados continuamente geram consumo de créditos lógicos em dólares e causam a suspensão irreversível da conta sandbox ao atingirem o limite orçamentário.

---

### Questão 3: Teórica (Dissertativa — Nível: Intermediário)
**Enunciado:** Explique em termos de segurança e controle de acessos (IAM) por que um estudante do AWS Academy recebe um erro administrativo de "AccessDenied" ao tentar criar uma nova função de execução (IAM Role) para um script do AWS Lambda, e cite qual o nome da credencial pré-aprovada disponibilizada pela AWS que deve ser associada para contornar esta limitação nos laboratórios práticos.

**Resposta esperada:** O Learner Lab é um ecossistema sandbox controlado por políticas de governança rígidas (SCPs - Service Control Policies) para impedir fraudes, mau uso ou geração de custos astronômicos na nuvem pública. Por isso, privilégios de criação, edição ou exclusão de novos perfis de segurança (IAM Roles) e políticas lógicas (Policies) são estritamente bloqueados para o usuário do aluno. Para contornar essa barreira de segurança e permitir a execução das práticas pedagógicas, a AWS já injeta de forma padrão um perfil de segurança pré-configurado com as permissões mestre necessárias chamado **`LabRole`** (associado ao profile de instância `LabInstanceProfile`). Os estudantes devem obrigatoriamente associar este perfil existente ao criar recursos de plataforma e microsserviços.

---
%%

## 📄 Artigo de Aprofundamento

- [AWS Academy Student Guide - Learner Lab (2025)](https://awsacademy.instructure.com)
> *Resumo prático: O guia oficial do estudante descreve detalhadamente o passo a passo para navegação no Vocareum, os tempos limites das chaves de terminal (que duram 3 horas) e a lista de serviços que pertencem ao Free Tier estudantil.*

---

## 📚 Referências Bibliográficas

- AWS Academy. *AWS Academy Cloud Foundations Student Course Guide*. Amazon Web Services, 2024. **(Lab Environment and Access, Cap. 1, pp. 5–12)**
- SOUSA NETO, Manoel Veras de. *Cloud computing: nova arquitetura da TI*. Brasport, 2012. **(Controle de faturamento e administração de nuvem, Cap. 4, pp. 81–93)**

---
*Última atualização: 2026-05-20 | Status: publicado*
