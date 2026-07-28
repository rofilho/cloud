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

# 🟢 Aula 04 e 04: Introdução à AWS Academy e Configuração do Learner Lab

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
| [[Aula 03 - Introducao a Computacao em Nuvem#2.1. IaaS – Infrastructure as a Service (Infraestrutura como Serviço)\|IaaS (Infraestrutura)]] | Hoje acessaremos o console real da AWS que utilizaremos para criar nossos recursos IaaS nas próximas semanas. |
| [[Aula 03 - Introducao a Computacao em Nuvem#3.1. Nuvem Pública\|Nuvem Pública]] | A AWS Academy nos fornece um laboratório prático oficial rodando diretamente na nuvem pública global da AWS. |
| [[Aula 02 - Fundamentos de Cloud#5. Definição Oficial: 5 Características Essenciais do NIST\|Autoatendimento sob Demanda]] | O painel do console AWS que usaremos é a materialização do Autoatendimento sob Demanda defendido pelo NIST. |

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
## 📄 Artigo de Aprofundamento

- [AWS Academy Student Guide - Learner Lab (2025)](https://awsacademy.instructure.com)
> *Resumo prático: O guia oficial do estudante descreve detalhadamente o passo a passo para navegação no Vocareum, os tempos limites das chaves de terminal (que duram 3 horas) e a lista de serviços que pertencem ao Free Tier estudantil.*

---

## 📚 Referências Bibliográficas

- AWS Academy. *AWS Academy Cloud Foundations Student Course Guide*. Amazon Web Services, 2024. **(Lab Environment and Access, Cap. 1, pp. 5–12)**
- SOUSA NETO, Manoel Veras de. *Cloud computing: nova arquitetura da TI*. Brasport, 2012. **(Controle de faturamento e administração de nuvem, Cap. 4, pp. 81–93)**

---
*Última atualização: 2026-05-20 | Status: publicado*
