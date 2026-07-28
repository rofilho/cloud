---
disciplina: Cloud Computing
codigo: "14189"
aula: "05"
titulo: "Infraestrutura Global AWS e Lab IAM"
tipo: pratica
semana: 3
data: 2026-03-04
status: publicado
tags:
  - cloud
  - aws
  - infraestrutura-global
  - iam
  - seguranca
  - lab
publicar: true
---

# 🟢 Aula 05: Infraestrutura Global AWS e Laboratório de Introdução ao IAM

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana:** 3 | Quarta-feira
**Professor:** Romualdo Mathias Filho
**Tipo:** 🔬 Prática
**Base Teórica:** Aulas 01b e 02 — Fundamentos de Cloud, Modelos de Serviço e Modelos de Implantação

---

## 🎯 Objetivo da Aula

Ao final desta aula prática, os alunos serão capazes de:
- Navegar com autonomia pelo Console de Gerenciamento da AWS (AWS Management Console).
- Identificar e diferenciar as camadas físicas da infraestrutura global: Regiões (Regions), Zonas de Disponibilidade (AZs) e Edge Locations.
- Criar e orquestrar usuários e grupos lógicos de acesso no AWS IAM (Identity and Access Management).
- Associar políticas JSON de permissões a grupos e comprovar a aplicação do Princípio da Menor Permissão (Least Privilege).
- Testar e validar acessos de segurança via login simulado de múltiplos usuários IAM.

---

## 🔄 Revisão Rápida (5 min)

Nas aulas passadas, consolidamos as definições lógicas e práticas de acesso ao laboratório:

| **Conceito (Aula Anterior)** | **Conexão com hoje** |
| --- | --- |
| [[Aula 02 - Introducao a Computacao em Nuvem|IaaS (Infraestrutura como Serviço)]] | O console AWS permite provisionar fisicamente recursos brutos de computação, rede e storage sob demanda. |
| [[Aula 02 - Introducao a Computacao em Nuvem|Nuvem Pública]] | A AWS organiza sua infraestrutura global para garantir alta disponibilidade e elasticidade na nuvem pública. |
| [[Aula 03 e 04 - Introducao a AWS Academy|AWS Academy Learner Lab]] | Utilizaremos o sandbox elástico e chaves de sessão federadas para executar o laboratório prático. |
| [[Aula 03 e 04 - Introducao a AWS Academy|Restrições do IAM (`LabRole`)]] | Aprenderemos a trabalhar sob a `LabRole` e a compreender as regras de menor privilégio na prática corporativa. |

---

## 📋 Pré-requisitos

- [ ] Acesso ativo ao **AWS Academy Learner Lab** (bolinha verde de status no Vocareum).
- [ ] Navegador web moderno (Chrome ou Firefox recomendados).
- [ ] Conexão federada com o Console de Gerenciamento da AWS.

---

## 📌 1. Explorando a Infraestrutura Global da AWS

Antes de entrar no laboratório de IAM, precisamos entender onde os serviços lógicos da AWS rodam fisicamente. A infraestrutura global do provedor é composta por três camadas integradas:

| Componente | O que é | analogia no Cotidiano | Fatores de Escolha |
| --- | --- | --- | --- |
| **Região (Region)** | Área geográfica isolada contendo múltiplos clusters de datacenters. | Uma cidade metropolitana onde o provedor tem instalações. | Latência, compliance regulatório (LGPD) e custo local. |
| **Zona de Disponibilidade (AZ)** | Um ou mais datacenters distintos com energia, refrigeração e redes redundantes. | Bairros independentes com fontes de energia separadas na cidade. | Alta disponibilidade (HA) e tolerância a falhas físicas catastróficas. |
| **Edge Location** | Ponto de presença de rede focado em entrega rápida de conteúdo (CDN via CloudFront). | Quiosques de entrega expressa rápida espalhados pela cidade. | Velocidade de download e cache de dados de mídia. |

> 💡 **Analogia:** Pense na AWS como uma grande rede varejista. As Regiões são as cidades com lojas. As AZs são lojas separadas na mesma cidade (se uma sofrer queda de energia, a outra atende). As Edge Locations são os pequenos quiosques de entrega ultra-rápida espalhados nos bairros para o cliente retirar os produtos sem precisar ir à loja principal.

### 🔬 Etapa Prática 1: O Mapa da Infraestrutura Global
1. Acesse o portal interativo oficial de infraestrutura: [infrastructure.aws](https://infrastructure.aws/).
2. Localize a região geográfica da América do Sul: São Paulo (`sa-east-1`).
3. Clique em São Paulo e comprove a existência de **3 Zonas de Disponibilidade (AZs)** físicas e independentes na região.
4. Identifique no console as regiões com maior disponibilidade de serviços (geralmente as regiões clássicas como `us-east-1` em N. Virginia, nos EUA).

---

## 📌 2. Laboratório Prático: Introdução ao AWS IAM

O **AWS IAM (Identity and Access Management)** é o serviço de segurança centralizado encarregado de controlar a autenticação (quem pode logar) e a autorização (o que pode fazer) em toda a conta AWS.

### 2.1. Componentes do IAM
* **Usuário (User):** Uma identidade lógica que representa uma pessoa ou serviço na conta AWS (crachá de acesso).
* **Grupo de Usuários (User Group):** Coleção de usuários que compartilham das mesmas regras de permissão (departamento corporativo).
* **Política (Policy):** Um documento estruturado em formato JSON que declara explicitamente o que é permitido (`Allow`) ou negado (`Deny`).
* **Função (Role):** Permissões temporárias atribuíveis a pessoas ou serviços internos (chave-mestra temporária).

```json
// Exemplo JSON da política clássica "AmazonS3ReadOnlyAccess"
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:Get*",
                "s3:List*"
            ],
            "Resource": "*"
        }
    ]
}
```

### 🔬 Etapa Prática 2: Configuração e Associação de Permissões
1. No Console AWS, na barra de buscas superior, digite **IAM** e acesse o serviço.
2. No menu lateral esquerdo, vá em **Users** e localize as identidades pré-criadas no laboratório (geralmente `user-1`, `user-2` e `user-3`).
3. Vá em **User groups** e examine as regras JSON associadas aos grupos:
   * **`EC2-Admin`**: Permissão para ler e operar servidores EC2 de forma irrestrita.
   * **`EC2-Support`**: Apenas permissões de visualização (ReadOnly) de servidores.
   * **`S3-Support`**: Acesso de leitura (ReadOnly) aos diretórios de storage no Amazon S3.
4. Associe cada usuário ao seu respectivo grupo corporativo:
   * Associe o **`user-1`** ao grupo **`S3-Support`**.
   * Associe o **`user-2`** ao grupo **`EC2-Support`**.
   * Associe o **`user-3`** ao grupo **`EC2-Admin`**.
5. Obtenha a URL de login do IAM no painel principal e abra uma janela anônima para efetuar login e testar as credenciais.

### 🔬 Etapa Prática 3: Validação das Permissões (Testes de Acesso)
* **Login como `user-1` (S3 Support):** Tente abrir o console do Amazon S3. Você conseguirá listar os buckets e arquivos lógicos. Em seguida, acesse o painel do Amazon EC2. O console exibirá mensagens de erro de autorização bloqueada.
* **Login como `user-2` (EC2 Support):** Você conseguirá visualizar os servidores virtuais no console EC2, mas qualquer tentativa de desligar (Stop) ou iniciar (Start) uma instância resultará em falha por falta de permissão.
* **Login como `user-3` (EC2 Admin):** Você conseguirá iniciar, parar e gerenciar instâncias de computação normalmente, mas sofrerá bloqueio ao tentar acessar arquivos lógicos no Amazon S3.

---

## 📌 3. Visão Comparativa Multi-cloud

Os conceitos de identidade e infraestrutura global se repetem entre os principais provedores públicos de mercado:

| Conceito de TI | Equivalente AWS | Equivalente Microsoft Azure | Equivalente Google Cloud (GCP) |
| --- | --- | --- | --- |
| **Identidade de Usuário** | IAM User | Entra ID User | Google Account / Service Account |
| **Agrupamento de Usuários** | IAM Group | Entra ID Group | Google Group |
| **Estrutura de Permissão** | IAM Policy (JSON) | RBAC Role Assignment | IAM Policy Binding |
| **Espaço de Data Centers** | Região e AZ | Região e Zona de Disponibilidade | Região e Zona |
| **Cache Distribuído (CDN)** | Edge Location | Azure Edge Zone | Cloud CDN Point of Presence |

---

## 📋 Resumo Estrutural

| **Conceito** | **Definição em Uma Frase** |
| --- | --- |
| **Região (Region)** | Uma localização geográfica com múltiplos datacenters agrupados em Zonas de Disponibilidade. |
| **Zona de Disponibilidade (AZ)** | Um ou mais datacenters físicos isolados contra falhas de eletricidade e redes dentro de uma região. |
| **IAM (Identity & Access Management)** | O serviço gerenciado mestre encarregado de controlar as credenciais de segurança e acessos de TI. |
| **Princípio da Menor Permissão** | Diretriz de segurança que determina conceder apenas os privilégios mínimos necessários para realizar a tarefa. |
| **MFA (Multi-Factor Authentication)** | Camada adicional de validação de identidade que exige um token temporário além da senha clássica. |

---
## 📄 Artigo de Aprofundamento

- [AWS Well-Architected Framework: Pilar Segurança (AWS)](https://docs.aws.amazon.com/pt_br/wellarchitected/latest/security-pillar/security.html)
> *Resumo prático: O documento oficial do framework da AWS estabelece as boas práticas mundiais de design seguro na nuvem, destacando a aplicação do least privilege, auditorias de segurança automatizadas e o gerenciamento federado de identidades.*

---

## 📚 Referências Bibliográficas

- SOUSA NETO, Manoel Veras de. *Cloud computing: nova arquitetura da TI*. Brasport, 2012. **(Infraestrutura de data centers e clusters geográficos, Cap. 2, pp. 45–58)**
- ANTUNES, Jonathan Lamim. *Amazon AWS: descomplicando a computação na nuvem*. Casa do Código, 2016. **(Gerenciamento de identidades com IAM e políticas JSON, Cap. 3, pp. 28–42)**
- KOLBE JÚNIOR, Armando. *Computação em nuvem*. Contentus, 2020. **(Segurança, integridade de redes e isolamento em nuvem, Cap. 4, pp. 75–89)**

---
*Última atualização: 2026-05-20 | Status: publicado*
