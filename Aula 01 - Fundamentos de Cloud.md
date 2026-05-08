# ☁️ Aula 01 – Fundamentos de Cloud: História e Conceitos Essenciais

## 🎯 Objetivos da Aula

Ao final desta aula, você será capaz de:

- Explicar a evolução de Data Centers físicos até a nuvem pública.
- Diferenciar o modelo de comprar hardware do modelo de **alugar capacidade computacional**.
- Entender os conceitos centrais cobrados em certificações de AWS, Azure e GCP.

---

## 1. Linha do Tempo: A Dor do Hardware Físico

A computação em nuvem é resposta a problemas econômicos e técnicos das décadas anteriores, não um “milagre repentino”. Vamos separar em três eras.

**1.1. Era do Ferro (Anos 1990 e início dos 2000)**

- Para lançar um novo sistema, a organização precisava **comprar servidores físicos (bare metal)** de fabricantes como HP, Dell ou IBM.
- A compra podia levar meses, exigia projeto de refrigeração, energia, cabeamento e equipe especializada.
- Para suportar picos (ex.: período de matrículas), era necessário comprar servidores superdimensionados, que ficavam **ociosos grande parte do ano**.
- Resultado: alto investimento inicial, baixa flexibilidade e muito “dinheiro parado” em ferro.

**1.2. Era da Virtualização (Anos 2000)**

- Surgem hypervisors como **VMware ESXi, Microsoft Hyper‑V, KVM**.
- Um único servidor físico passa a hospedar diversas **Máquinas Virtuais (VMs)**, aumentando a taxa de utilização de CPU e memória.
- Melhora de eficiência, mas a responsabilidade por:
    - compra e renovação de hardware
    - energia, refrigeração, espaço físico
    - manutenção e substituição de peças
        
        continua sendo da empresa.
        

**1.3. Era da Nuvem Pública (2006 em diante)**

- Grandes players percebem capacidade ociosa em seus data centers e passam a vendê‑la como serviço.
- A Amazon lança o **Amazon Web Services (AWS)**, iniciando com serviços de **armazenamento** e **computação** acessados pela internet
- Para o usuário, o hardware se torna **invisível**:
    - em vez de comprar servidores, ele **aluga capacidade por hora ou segundo**;
    - toda a infraestrutura é exposta via **painéis web, APIs e linha de comando**.

---

## 2. Dicionário Essencial do Arquiteto Cloud

Use esta tabela como “base de vocabulário” para as próximas aulas e para certificações.

| Termo | Definição Fundacional | Exemplo Prático |
| --- | --- | --- |
| On‑Premises | Data Center local; a empresa possui e administra toda a infraestrutura física e lógica | Sala de servidores da universidade |
| Hypervisor | Software que cria e gerencia VMs, separando SO do hardware | KVM, VMware ESXi, Microsoft Hyper‑V |
| Workload | Qualquer carga de trabalho rodando em TI | Banco PostgreSQL, site WordPress, API Node.js |
| Alta Disponibilidade (HA) | Arquitetura que mantém o sistema online mesmo com falhas pontuais | Dois servidores em data centers distintos |
| Tolerância a Falhas | Nível acima de HA; falhas não causam interrupção perceptível | Cluster espelhado com failover automático |
| SLA | Acordo de Nível de Serviço, define metas de disponibilidade | SLA de 99,99% ≈ até ~52 min/ano fora do ar synopsys+1 |

---

## 3. Regra de Ouro: Escalabilidade vs Elasticidade

**Escalabilidade** é a capacidade de atender mais carga. **Elasticidade** é a capacidade de crescer e depois voltar ao tamanho original, automaticamente.

## 3.1 Tipos de Escalabilidade

| Característica | Scale‑Up (Vertical) | Scale‑Out (Horizontal) |
| --- | --- | --- |
| Ação | Adicionar mais recursos à mesma máquina | Adicionar mais máquinas em paralelo |
| Exemplo | Trocar servidor de 8 GB por um de 64 GB de RAM | Passar de 2 para 10 servidores web atrás de um balanceador |
| Limite | Restrito à capacidade física da máquina | Teoricamente ilimitado na nuvem pública |
| Tempo de inatividade | Normalmente exige reinicialização | Pode ser feito sem desligar as instâncias existentes |

## 3.2 Elasticidade

- Escalar **para cima** quando a demanda cresce e **para baixo** quando ela cai.
- Exemplo:
    - ao meio‑dia, o sistema identifica pico de acesso e sobe para 50 instâncias;
    - à meia‑noite, derruba 48 instâncias e você **para de pagar por elas**.
- Essa característica está no coração das definições formais de nuvem (elasticidade rápida e serviço medido).nvlpubs.nist+2

---

## 4. Impacto Financeiro: Capex vs Opex

Cloud muda também a forma como a empresa faz contas.

| Modelo de Despesa | Definição | Risco para o Negócio | Exemplo |
| --- | --- | --- | --- |
| Capex | Investimento em bens de capital; compra de ativos que se depreciam | Alto: se o projeto falhar, o hardware sobra e envelhece | Comprar servidor de R$ 50.000 para projeto de 3 meses |
| Opex | Despesa operacional paga conforme o uso | Baixo: se o projeto falhar, basta desligar recursos | Pagar R$ 500/mês ao provedor; desligou, a fatura cai |

---

## 5. Definição Oficial: 5 Características Essenciais do NIST

Segundo o **NIST**, só é computação em nuvem se a solução apresentar **todas** estas características:

1. **Autoatendimento sob demanda**
    - O usuário provisiona recursos sem depender de um operador humano (portal, API, CLI).
2. **Acesso amplo à rede**
    - Recursos acessíveis via rede, usando protocolos padrão (HTTP/HTTPS, etc.) a partir de diversos dispositivos.
3. **Pool de recursos (resource pooling / multi‑tenancy)**
    - Recursos físicos compartilhados entre vários clientes, com isolamento lógico.
4. **Elasticidade rápida**
    - Capacidade de escalar rapidamente para cima e para baixo, dando a sensação de recursos “quase infinitos”.
5. **Serviço medido (pay‑as‑you‑go)**
    - Uso monitorado e cobrado de forma proporcional (CPU‑hora, GB armazenado, tráfego, etc.).

---

## 6. Demonstração Conceitual: Infraestrutura como Código (IaC)

Na nuvem moderna, não “apertamos parafusos”; escrevemos código.

`bash# Exemplo AWS CLI – criação de instâncias EC2
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --count 5 \
  --instance-type t3.large \
  --security-group-ids sg-903004f8 \
  --region sa-east-1`

**O que esse comando representa didaticamente**:

- `-count 5`: solicita 5 servidores virtuais.
- `-instance-type t3.large`: define o “tamanho” da instância (2 vCPUs, 8 GiB de RAM, classe geral).aws.amazon+2
- `-image-id`: escolhe a imagem de sistema operacional.
- `-security-group-ids`: define regras de firewall.
- `-region sa-east-1`: região São Paulo.

Em menos de um minuto, uma infraestrutura que levaria semanas para ser adquirida “no ferro” fica pronta.

---

## 7. Leitura Guiada e Discussão

📚 **Material de Apoio e Referências Bibliográficas**

A excelência em **Cloud Computing** exige base teórica sólida e contato com textos clássicos e materiais alinhados ao estado da arte. Use esta seção como bloco único no Notion, logo após a aula ou plano de ensino.

---

## 📄 Artigo Científico Fundacional

Este é o documento obrigatório que deve ser compartilhado com a turma no Notion ou no AVA. Ele é, na prática, a “certidão de nascimento” da computação em nuvem moderna.

**Above the Clouds: A Berkeley View of Cloud Computing**

- **Autores**: Michael Armbrust, Armando Fox, Rean Griffith, Anthony D. Joseph, Randy Katz, Andy Konwinski, Gunho Lee, David Patterson, Ariel Rabkin, Ion Stoica, Matei Zaharia.
- **Instituição**: UC Berkeley – Reliable Adaptive Distributed Systems Laboratory (RAD Lab).
- **Ano**: 2009.
- **Link de acesso direto**:
    
    [https://www2.eecs.berkeley.edu/Pubs/TechRpts/2009/EECS-2009-28.pdf](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2009/EECS-2009-28.pdf)
    

**Sugestão pedagógica**

- Oriente os alunos a focar especialmente nas partes que:
    - explicam a **elasticidade** e a “ilusão de recursos infinitos”;
    - discutem a **redução de risco financeiro** ao substituir compra de hardware por uso sob demanda.
- Use o texto como base para debates em sala e conexão com casos reais (startups, universidades, órgãos públicos).

---

## 📚 Bibliografia Oficial da Disciplina

As referências abaixo estão alinhadas à ementa e às práticas atuais de AWS, Azure e arquiteturas cloud‑native. Sugestão: crie um *database* no Notion com colunas “Tipo”, “Autor(es)”, “Título”, “Editora/Ano” e “Foco”.

**Bibliografia Básica e Complementar**

| Tipo | Autor(es) | Título da Obra | Editora / Ano | Foco Técnico |
| --- | --- | --- | --- | --- |
| Básica | SOUSA NETO, Manoel Veras de | *Cloud computing: nova arquitetura da TI* | Brasport, 2012 | Fundamentos, virtualização e transição da TI tradicional para a nuvem. |
| Complementar | MUNIZ, Antonio et al. | *Jornada cloud native: do zero ao avançado somando conceitos e práticas* | Brasport, 2023 | Práticas modernas de DevOps e arquiteturas cloud‑native. |
| Complementar | CUSTODIO, Thiago | *Azure: coloque suas plataformas e serviços no cloud* | Casa do Código, 2015 | Implementação de IaaS e PaaS no ecossistema Microsoft Azure. |
| Complementar | SIÉCOLA, Paulo | *Web services REST: com ASP.NET Web API e Windows Azure* | Casa do Código, 2016 | Desenvolvimento e integração de APIs REST escaláveis em nuvem. |

## 8. Livros em português sobre Computação em Nuvem

---

- SOUSA NETO, Manoel Veras de. **Computação em Nuvem: Nova Arquitetura de TI**. Brasport, 2015.everand+1
- SOUSA NETO, Manoel Veras de. **Cloud Computing – Nova Arquitetura da TI** (edição/versão anterior). Brasport.sistemas24horas+1
- MUNIZ, Antonio et al. **Jornada Cloud Native: do zero ao avançado somando conceitos e práticas**. Brasport, 2022/2023.books.google+2
- CUSTÓDIO, Thiago. **Azure: coloque suas plataformas e serviços no Cloud**. Casa do Código, 2015.[passeidireto](https://www.passeidireto.com/arquivo/118580448/azure-coloque-suas-plataformas-e-servicos-no-cloud)
- SIÉCOLA, Paulo. **Web Services REST com ASP.NET Web API e Windows Azure**. Casa do Código, 2016.[everand](https://pt.everand.com/book/405671561/Web-Services-REST-com-ASP-NET-Web-API-e-Windows-Azure)

---

## 9. Textos introdutórios e guias práticos (complementares)

- OPServices. **Guia Completo do Funcionamento de Cloud Computing** (e‑book).[opservices.com](https://www.opservices.com.br/files/cloud-computing.pdf)
- Artigos e listas de livros de Cloud Computing (relação atualizada de boas leituras):.[santodigital.com](https://santodigital.com.br/os-melhores-livros-de-cloud-computing-para-voce-nao-deixar-de-ler-em-2020/)