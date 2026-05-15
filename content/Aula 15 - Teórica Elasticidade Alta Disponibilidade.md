---
disciplina: Cloud Computing
codigo: "14189"
aula: 15
titulo: "Elasticidade e Alta Disponibilidade — ELB, Auto Scaling e CloudWatch"
tipo: teorica
semana: 8
data: 2026-05-16
status: publicado
tags:
  - cloud
  - aws
  - alta-disponibilidade
  - auto-scaling
  - elb
  - cloudwatch
  - arquitetura
publicar: true
---

# 🔵 Aula 15: Elasticidade e Alta Disponibilidade — ELB, Auto Scaling e CloudWatch

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana 8** | Sexta-feira, 16/05/2026 | Prof. Romualdo Mathias Filho
**Tipo:** 📘 Teórica (Sexta-feira)
**Eixo:** 2 — Infraestrutura e Plataformas
**AWS Academy:** Módulo 2.5 — Serviços Essenciais: ELB, CloudWatch e Auto Scaling

---

## 🎯 0. Objetivo da Aula

Ao final desta aula, o aluno deve ser capaz de:

- **Explicar** os conceitos de elasticidade, escalabilidade e alta disponibilidade no contexto da computação em nuvem
- **Diferenciar** escalabilidade vertical e horizontal, relacionando cada estratégia ao custo e ao desempenho
- **Descrever** o funcionamento do Elastic Load Balancer (ELB), seus tipos e casos de uso
- **Analisar** como o Auto Scaling garante disponibilidade e eficiência de custo com base em políticas de escalonamento
- **Avaliar** o papel do Amazon CloudWatch como serviço de monitoramento e gatilho para ações automáticas na infraestrutura

---

## 🚀 Demonstração Prática — Conectando ao RDS com DBeaver

No início desta aula, fizemos uma demonstração ao vivo de como acessar um banco de dados gerenciado na AWS usando uma ferramenta profissional. Abaixo está o resumo do que foi apresentado e o script SQL utilizado.

### O que foi demonstrado

| Etapa | O que aconteceu | Ferramenta |
|---|---|---|
| 1 | Verificamos a instância RDS `aula-nuvem-db` ativa no console AWS (status **Available**) | Console AWS |
| 2 | Copiamos o **Endpoint** de conexão na aba Connectivity & security | Console AWS |
| 3 | Conectamos ao banco de dados remotamente usando o endpoint | DBeaver |
| 4 | Exploramos a base `tech_academy` e executamos queries SQL | DBeaver + SQL |

### Pontos-chave observados

- O banco de dados **não está instalado em nenhum computador local** — ele roda inteiramente na infraestrutura da AWS (região sa-east-1, São Paulo)
- O **Security Group** controla quem pode se conectar: neste caso, apenas o IP autorizado para a demonstração. Em produção, seria apenas o IP privado da aplicação
- O **Endpoint** gerado pelo RDS funciona como o "endereço" do banco — qualquer ferramenta compatível com MySQL pode usá-lo para conectar
- A AWS cuida de backups automáticos, patches e replicação — isso é o **DBaaS** (Database as a Service) na prática

### Script SQL utilizado na demonstração

```sql
-- Verificar dados existentes
SELECT * FROM tech_academy.cursos;
SELECT * FROM tech_academy.alunos;

-- Inserir um novo registro
INSERT INTO tech_academy.alunos (nome, email, data_cadastro)
VALUES ('Novo Aluno', 'aluno@uniube.br', CURDATE());

-- Confirmar que o registro persiste
SELECT * FROM tech_academy.alunos ORDER BY id_aluno DESC LIMIT 5;
```

📌 **Reflexão importante:** Se 10.000 usuários acessassem esse banco ao mesmo tempo, o que aconteceria? Quem monitora a saúde do banco? Quem decide criar mais servidores? Quem distribui o tráfego entre eles? Essas são as perguntas que esta aula responde — com ELB, Auto Scaling e CloudWatch.

---

## 🔄 1. Recapitulação

| Aula | Conceito | Definição |
|---|---|---|
| Aula 13 | DBaaS | Banco de dados gerenciado pelo provedor; você foca nos dados, não na infraestrutura |
| Aula 13 | RDS | Amazon Relational Database Service — suporta MySQL, PostgreSQL, Aurora e outros |
| Aula 13 | Multi-AZ | Réplica síncrona em outra zona de disponibilidade para failover automático |
| Aula 14 | Security Group | Firewall de regras por recurso — controlamos quem pode se conectar ao banco |
| Aula 14 | Endpoint | Endereço DNS gerado pelo RDS para que aplicações se conectem ao banco |

🔗 **Conexão com a aula de hoje:** Na demonstração inicial, observamos que o CloudWatch já monitora o RDS automaticamente. Mas e quando a demanda aumenta? O banco aguenta? E a aplicação? É aqui que entram **Elasticidade, Auto Scaling e Alta Disponibilidade** — o tema central desta aula.

---

## 🏗️ 2. Contextualização

Imagine uma loja online que vende ingressos para shows. Durante o ano, o tráfego é normal. Mas no exato momento em que abre a venda para um show do The Weeknd, milhares de pessoas acessam ao mesmo tempo. O servidor tradicional trava. O site cai. A empresa perde dinheiro.

A computação em nuvem resolveu este problema com dois princípios fundamentais:

- **Elasticidade:** a capacidade de expandir E contrair recursos automaticamente conforme a demanda
- **Alta Disponibilidade:** garantir que o sistema continue funcionando mesmo quando partes dele falham

💡 **Analogia:** Pense em uma estrada. Uma estrada convencional tem um número fixo de faixas — se houver engarrafamento, você sofre. Uma estrada elástica magicamente abre novas faixas quando o trânsito aumenta e fecha quando fica vazio. Isso é o Auto Scaling.

---

## 📐 3. Escalabilidade: Vertical vs. Horizontal

**Definição:** Escalabilidade é a capacidade de um sistema aumentar sua capacidade de processamento para atender à crescente demanda. (KOLBE JÚNIOR, 2020)

### Escalabilidade Vertical (Scale Up)

Aumentar o poder de uma única máquina — mais CPU, mais RAM, mais disco.

| Aspecto | Detalhe |
|---|---|
| O que é | Trocar para um servidor maior (ex: de `t3.micro` para `c5.4xlarge`) |
| Vantagem | Simples — não requer mudança na arquitetura da aplicação |
| Desvantagem | Tem limite físico; exige parada/reinicialização; ponto único de falha |
| Custo | Aumenta linearmente mas fica caro rapidamente |
| Exemplo AWS | Mudar o tipo de instância EC2 ou a classe do RDS |

### Escalabilidade Horizontal (Scale Out)

Adicionar mais máquinas menores em paralelo — distribuir a carga.

| Aspecto | Detalhe |
|---|---|
| O que é | Adicionar mais instâncias do mesmo tipo (ex: 10x `t3.micro`) |
| Vantagem | Sem limite teórico; alta resiliência; se uma cai, as outras continuam |
| Desvantagem | Requer que a aplicação seja stateless ou tenha gerenciamento de estado externo |
| Custo | Paga apenas pelo que usa — elástico |
| Exemplo AWS | Auto Scaling Group com múltiplas EC2 por trás de um ELB |

### Comparação Direta

| Critério | Vertical (Scale Up) | Horizontal (Scale Out) |
|---|---|---|
| Limite de crescimento | Hardware máximo disponível | Praticamente ilimitado |
| Downtime ao escalar | Sim (geralmente) | Não |
| Resiliência a falhas | Baixa (único servidor) | Alta (múltiplos servidores) |
| Custo | Alto para instâncias grandes | Paga pelo uso real |
| Complexidade | Baixa | Média/Alta |
| Ideal para | Bancos de dados legados | Aplicações web, APIs, microserviços |

💡 **Analogia:** Scale Up é como um caminhão maior para carregar mais carga. Scale Out é como usar vários caminhões menores — se um quebrar, os outros continuam entregando.

---

## 🔀 4. Amazon Elastic Load Balancer (ELB)

**Definição:** O Elastic Load Balancer distribui automaticamente o tráfego de entrada entre múltiplas instâncias, contêineres ou endereços IP em uma ou mais zonas de disponibilidade. (AWS, 2024)

O ELB é o ponto de entrada único da sua aplicação. Ele recebe as requisições dos usuários e as distribui entre as instâncias disponíveis, garantindo que nenhuma instância fique sobrecarregada.

### Tipos de Load Balancer na AWS

| Tipo | Camada OSI | Caso de Uso Principal | Protocolo |
|---|---|---|---|
| Application Load Balancer (ALB) | Camada 7 (HTTP/HTTPS) | Aplicações web, APIs REST, microserviços | HTTP, HTTPS, WebSocket |
| Network Load Balancer (NLB) | Camada 4 (TCP/UDP) | Alto desempenho, latência ultrabaixa, IoT | TCP, UDP, TLS |
| Gateway Load Balancer (GWLB) | Camada 3 (IP) | Appliances de segurança, firewalls, IDS/IPS | IP |
| Classic Load Balancer (CLB) | Camadas 4 e 7 | Legado (não recomendado para novas aplicações) | HTTP, HTTPS, TCP |

### Como o ALB Funciona (o mais comum)

1. Usuário faz requisição para `https://meusite.com` (apontado para o DNS do ALB)
2. O ALB recebe a requisição e verifica as regras de roteamento
3. O ALB escolhe uma instância saudável no Target Group (baseado no algoritmo Round-Robin por padrão)
4. Encaminha a requisição e retorna a resposta ao usuário
5. O Health Check verifica continuamente se as instâncias estão respondendo

### Recursos Importantes do ELB

| Recurso | Descrição |
|---|---|
| Health Checks | Verifica periodicamente se cada instância está saudável; remove as doentes automaticamente |
| Target Groups | Grupos de destinos (EC2, containers, IPs) que recebem o tráfego |
| Listeners | Regras de entrada — qual porta/protocolo escutar e para onde rotear |
| SSL Termination | Descriptografa HTTPS no ALB, aliviando as instâncias dessa carga |
| Sticky Sessions | Mantém o usuário sempre no mesmo servidor (útil para sessões com estado) |
| Cross-Zone Load Balancing | Distribui tráfego igualmente entre todas as AZs |

💡 **Analogia:** O ELB é como a recepcionista de um hospital. Quando pacientes chegam (requisições), ela verifica qual médico (instância) está disponível e direciona cada paciente para o consultório correto, sem sobrecarregar nenhum médico específico.

### 💡 Exemplos Reais no Cotidiano

- A **Netflix** usa ALB para distribuir requisições de streaming entre centenas de instâncias, garantindo que a reprodução do vídeo não trave mesmo com 200 milhões de assinantes
- O **Mercado Livre** usa NLB para processar milhões de transações financeiras por segundo com latência mínima durante a Black Friday
- A **Twitch** usa ALB com WebSocket para manter conexões persistentes com milhões de espectadores assistindo lives simultaneamente

---

## 🔁 5. Amazon Auto Scaling

**Definição:** O Amazon EC2 Auto Scaling ajusta automaticamente a capacidade de computação para manter desempenho estável e previsível ao custo mais baixo possível. (AWS, 2024)

O Auto Scaling trabalha em conjunto com o ELB: enquanto o ELB distribui o tráfego entre as instâncias existentes, o Auto Scaling decide quantas instâncias devem existir em cada momento.

### Componentes de um Auto Scaling Group (ASG)

| Componente | Função |
|---|---|
| Launch Template | Define o "molde" das instâncias (AMI, tipo, SG, user data) |
| Auto Scaling Group | Define mínimo, máximo e desejado de instâncias, e em quais AZs |
| Scaling Policies | Regras que definem QUANDO e QUANTO escalar |
| CloudWatch Alarms | Métricas que disparam as políticas de escalonamento |

### Tipos de Políticas de Escalonamento

| Tipo | Descrição | Quando Usar |
|---|---|---|
| Target Tracking | Mantém uma métrica em um valor alvo (ex: CPU em 60%) | Cargas previsíveis e contínuas |
| Step Scaling | Escala em passos baseados em alarmes CloudWatch | Quando a resposta precisa variar por nível de alarme |
| Scheduled Scaling | Escala em horários específicos predefinidos | Cargas previsíveis por horário (ex: pico comercial) |
| Predictive Scaling | Usa ML para prever demanda e escalar proativamente | Cargas cíclicas e históricas |

### Ciclo de Vida de uma Instância no ASG

`Pending` → `InService` → `Terminating` → `Terminated`

- **Quando o tráfego aumenta:** ASG lança novas instâncias (Pending → InService)
- **Quando o tráfego cai:** ASG termina instâncias excedentes (InService → Terminating → Terminated)

📌 **Nota:** Existem estados intermediários opcionais como `Standby` (instância pausada para manutenção) e lifecycle hooks que permitem executar scripts antes de a instância entrar ou sair de serviço.

### Parâmetros do ASG

| Parâmetro | Descrição | Exemplo |
|---|---|---|
| Minimum | Número mínimo de instâncias sempre ativas | 2 (para alta disponibilidade) |
| Desired | Número atual desejado de instâncias | 3 |
| Maximum | Número máximo que pode ser criado | 10 |

💡 **Analogia:** O Auto Scaling é como um gerente de escalas de um call center. Quando a fila de chamadas aumenta, ele chama mais atendentes. Quando o movimento cai, alguns vão embora mais cedo. O gerente (Auto Scaling) decide baseado em métricas (tempo médio de espera = CPU/requisições).

### 💡 Exemplos Reais no Cotidiano

- A **Airbnb** escala horizontalmente durante feriados e eventos (Réveillon, Carnaval), quando buscas por hospedagem disparam
- O **iFood** usa Auto Scaling para lidar com picos de pedidos no horário de almoço (11h-14h) e jantar (18h-21h) — fora desses horários, reduz instâncias
- A **Nubank** escala durante datas de pagamento de salários (dia 5, 10, 15, 20 e 30) quando o volume de transações Pix triplica

---

## 📊 6. Amazon CloudWatch — O Centro de Observabilidade

**Definição:** Amazon CloudWatch é um serviço de monitoramento e observabilidade que coleta dados de métricas, logs e eventos de todos os recursos AWS, oferecendo visibilidade unificada da infraestrutura. (AWS, 2024)

O CloudWatch é o sistema nervoso da sua infraestrutura em nuvem — tudo passa por ele. É ele que detecta que a CPU subiu e dispara o Auto Scaling. É ele que registra que o RDS teve lentidão.

### O que o CloudWatch Monitora

| Categoria | O que Coleta | Exemplos de Métricas |
|---|---|---|
| EC2 | Performance de instâncias | CPUUtilization, NetworkIn, DiskReadOps |
| RDS | Performance do banco | DatabaseConnections, ReadLatency, FreeStorageSpace |
| ELB | Tráfego e saúde | RequestCount, HealthyHostCount, TargetResponseTime |
| Lambda | Invocações e erros | Invocations, Duration, Errors, Throttles |
| S3 | Requisições ao bucket | NumberOfObjects, BucketSizeBytes |

### Componentes Principais do CloudWatch

| Componente | Função |
|---|---|
| Metrics | Dados numéricos coletados ao longo do tempo (CPU, memória, etc.) |
| Alarms | Alertas disparados quando uma métrica cruza um threshold definido |
| Logs | Centralização de logs de aplicações e serviços AWS |
| Dashboards | Painel visual personalizado com gráficos e widgets |
| Events/EventBridge | Captura mudanças de estado e dispara ações automatizadas |
| Insights | Análise inteligente de logs com queries (CloudWatch Logs Insights) |

### Fluxo de Automação: CloudWatch + Auto Scaling + ELB

1. 📊 **CloudWatch coleta métricas** de CPU, rede e requisições continuamente
2. 🚨 **Alarm detecta** que a CPU está acima de 70% por 2 períodos consecutivos (ex: 2 minutos)
3. ⚙️ **Auto Scaling Policy é acionada** — a regra de scale-out entra em vigor
4. 🚀 **Nova instância EC2 é lançada** pelo ASG (estado: Pending → InService)
5. 🔀 **ELB registra** a nova instância saudável no Target Group automaticamente
6. ✅ **Tráfego é redistribuído** — o ELB agora envia requisições também para a nova instância
7. 📉 **CPU cai** → Alarm de scale-in é ativado → instância excedente é terminada pelo ASG

💡 **Analogia:** CloudWatch é como o painel do carro — RPM, temperatura, combustível. O alarme é como a luz de check engine. O Auto Scaling é o câmbio automático que engata uma marcha a mais quando você pisa fundo.

### 💡 Exemplos Reais no Cotidiano

- A **Amazon.com** monitora centenas de milhares de métricas simultâneas no CloudWatch para garantir que o site nunca fique lento, especialmente no Prime Day
- O **Spotify** usa CloudWatch para monitorar latência de entrega de streams de áudio e acionar alarmes quando a experiência do usuário degrada
- A **iugu** (fintech brasileira) usa CloudWatch Alarms integrados ao Slack para notificar a equipe de DevOps em tempo real sobre anomalias

---

## 🏛️ 7. Arquitetura de Alta Disponibilidade na AWS

**Definição:** Alta Disponibilidade (HA — High Availability) é a capacidade de um sistema permanecer operacional com mínimo de downtime, mesmo quando componentes individuais falham. (AWS, 2024)

Na AWS, HA é alcançada combinando múltiplos serviços em uma arquitetura distribuída:

### Arquitetura Multi-AZ Típica (3 Camadas)

| Camada | Componente | Alta Disponibilidade |
|---|---|---|
| Camada de Apresentação (Front) | CloudFront + Route 53 *(veremos em aulas futuras)* | CDN global, DNS com health checks |
| Camada de Aplicação (App) | EC2 + Auto Scaling + ELB *(o que aprendemos hoje)* | Múltiplas instâncias em 2+ AZs |
| Camada de Dados (DB) | RDS Multi-AZ *(o que vimos na Aula 13)* | Réplica síncrona em AZ secundária |

### Métricas de Disponibilidade (SLA)

| Disponibilidade | Downtime Anual | Downtime Mensal | Adequado Para |
|---|---|---|---|
| 99% | ~3,65 dias | ~7,2 horas | Dev/Test, aplicações internas |
| 99,9% | ~8,7 horas | ~43 minutos | Sistemas corporativos |
| 99,95% | ~4,3 horas | ~21 minutos | E-commerce, SaaS |
| 99,99% | ~52 minutos | ~4,3 minutos | Sistemas críticos, bancos |
| 99,999% | ~5 minutos | ~26 segundos | Telecomunicações, missão crítica |

🎯 **Ponto importante:** Cada "9" adicionado aumenta o custo exponencialmente. Escolher o SLA certo é uma decisão de negócio, não apenas técnica.

---

## ⚖️ 8. Na Prática: Como Muda Com a Nuvem?

Para consolidar tudo que vimos, veja como os serviços de hoje resolvem problemas reais:

| Cenário | Sem ELB + Auto Scaling | Com ELB + Auto Scaling + CloudWatch |
|---|---|---|
| Black Friday (pico 10x) | Servidor trava, site cai | CloudWatch detecta → ASG lança instâncias → ELB distribui |
| Falha de hardware | Downtime até trocar o servidor | Health Check falha → ASG substitui automaticamente |
| 3h da manhã sem usuários | Servidor ocioso consumindo energia | Alarm de scale-in → ASG reduz para mínimo → custo cai |
| Ataque DDoS | Servidor saturado e fora do ar | ELB absorve, WAF filtra, ASG escala se necessário |
| Custo mensal | Fixo (capacidade máxima 24/7) | Variável (paga pelo uso real, elástico) |

---

## 🔮 9. Tendências Contemporâneas

| Tendência | Descrição | Impacto |
|---|---|---|
| Serverless-first | Lambda + API Gateway eliminam o gerenciamento de servidores completamente | Zero preocupação com Auto Scaling manual |
| FinOps + rightsizing | Ferramentas de análise identificam instâncias superdimensionadas | Redução de 20-40% nos custos de infraestrutura |
| Chaos Engineering | Netflix, Amazon testam falhas deliberadas em produção (Chaos Monkey) | Validar resiliência real antes que ela falhe de verdade |
| KEDA (Kubernetes Event-driven Autoscaling) | Auto Scaling orientado a eventos em containers | Granularidade maior que o ASG tradicional |
| Predictive Scaling com ML | AWS usa histórico para pré-provisionar antes do pico | Elimina lag de provisionamento em cargas cíclicas |

---

## 📋 10. Resumo Estrutural

| Conceito | Definição em Uma Frase |
|---|---|
| Elasticidade | Capacidade de expandir e contrair recursos automaticamente conforme a demanda |
| Scale Up (Vertical) | Aumentar poder de uma única máquina — tem limite físico e pode gerar downtime |
| Scale Out (Horizontal) | Adicionar mais máquinas em paralelo — sem limite teórico e sem downtime |
| ELB | Distribui tráfego entre múltiplas instâncias, garantindo que nenhuma fique sobrecarregada |
| ALB | Tipo de ELB na camada de aplicação (HTTP/HTTPS), mais usado em aplicações web |
| Auto Scaling Group | Define quantas instâncias EC2 devem existir e escala automaticamente por políticas |
| Launch Template | Molde que define as características das instâncias criadas pelo Auto Scaling |
| CloudWatch | Serviço de monitoramento que coleta métricas, dispara alarmes e integra com Auto Scaling |
| Alta Disponibilidade | Garantia de que o sistema continua operando mesmo com falha de componentes individuais |
| Multi-AZ | Distribuir recursos em múltiplas zonas de disponibilidade para eliminar ponto único de falha |

---

## 🧩 11. Atividade Prática (PBL)

### 📌 Cenário: A Plataforma EduStream

A EduStream é uma startup de streaming de videoaulas que está crescendo rapidamente. Hoje tem 5.000 usuários. A projeção é chegar a 500.000 em 6 meses, com picos durante provas (3x o tráfego normal) e madrugadas com 90% menos usuários.

A infraestrutura atual é uma única EC2 `c5.2xlarge` (8 vCPU, 16 GB RAM) com um banco MySQL instalado nela mesma.

**Tarefas:**

1. **Diagnostique o problema atual:** Liste pelo menos 3 riscos críticos na arquitetura atual da EduStream e classifique cada um (disponibilidade, escalabilidade, segurança ou custo)

2. **Projete a nova arquitetura:** Desenhe (ou descreva em texto estruturado) uma arquitetura AWS que resolva os problemas identificados, usando obrigatoriamente: ELB, Auto Scaling Group, RDS Multi-AZ e CloudWatch. Indique em quais sub-redes (pública/privada) cada componente ficaria

3. **Defina as políticas de escalonamento:** Determine os valores de minimum, desired e maximum do ASG, e descreva qual política de escalonamento você usaria e com qual métrica/threshold

4. **Estime o impacto no custo:** Usando a tabela abaixo como referência (valores aproximados para us-east-1), compare o custo mensal da solução atual vs. a nova arquitetura e calcule a economia potencial

| Recurso | Custo Aproximado Mensal |
|---|---|
| EC2 c5.2xlarge (24/7) | ~US$ 245/mês |
| EC2 t3.medium (por instância, 24/7) | ~US$ 30/mês |
| ALB | ~US$ 22/mês + US$ 0,008 por LCU-hora |
| RDS db.t3.micro Multi-AZ (MySQL) | ~US$ 25/mês |
| CloudWatch (métricas padrão) | Gratuito (métricas customizadas: US$ 0,30/métrica/mês) |

---

## 🚀 12. Desafio (Preparação para a Próxima Aula)

**Para a próxima aula (Quarta-feira — Lab: Scale & Load Balance):**

1. Acesse o AWS Academy → **Módulo 2.5 — ELB, CloudWatch e Auto Scaling** e assista a introdução teórica antes de chegar
2. Pesquise o que é um **Launch Template** e como ele difere de uma **Launch Configuration** (que era o padrão antigo)
3. Explore a documentação do [Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html) e identifique: *qual é o tempo médio para uma nova instância ficar InService após o scale-out?*

💡 **Dica:** Consulte o Módulo 2.5 do AWS Academy Cloud Foundations e a documentação oficial: https://docs.aws.amazon.com/autoscaling/ec2/userguide/

---

## 📚 13. Referências Bibliográficas

### 📖 Referências Obrigatórias

| Autor | Obra | Capítulo/Seção Utilizada |
|---|---|---|
| ANTUNES, Jonathan Lamim | Amazon AWS: descomplicando a computação em nuvem. Casa do Código, 2016 | Cap. 3 — EC2 e Auto Scaling; Cap. 6 — Alta Disponibilidade |
| KOLBE JÚNIOR, Armando | Computação em nuvem. Contentus, 2020 | Cap. 5 — Elasticidade e Escalabilidade em Nuvem |

### 📖 Referências Complementares

| Autor | Obra | Relevância |
|---|---|---|
| MARINESCU, D. C. | Cloud Computing: Theory and Practice. 2nd ed. Morgan Kaufmann, 2017 | Elasticidade, virtualização e modelos de provisionamento |
| ERL, T.; PUTTINI, R.; MAHMOOD, Z. | Cloud Computing: Concepts, Technology & Architecture. Prentice Hall, 2013 | Mecanismos de balanceamento e failover |
| AWS | AWS Well-Architected Framework — Reliability Pillar (online) | Boas práticas de alta disponibilidade e resiliência |

### 🔗 Links Úteis

| Recurso | Descrição | Link |
|---|---|---|
| Documentação Amazon ELB | Guia completo do Elastic Load Balancing | https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/ |
| Documentação Auto Scaling | EC2 Auto Scaling User Guide | https://docs.aws.amazon.com/autoscaling/ec2/userguide/ |
| CloudWatch User Guide | Documentação completa do CloudWatch | https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ |
| Calculadora de Preços AWS | Estimativa de custo de serviços AWS | https://calculator.aws/pricing/2/home |

### 🎥 Vídeos Recomendados

| Canal/Autor | Título | Duração | Link |
|---|---|---|---|
| AWS | Elastic Load Balancing Overview | ~5 min | https://www.youtube.com/watch?v=UBl5Kb7sAzA |
| AWS | Introduction to Amazon EC2 Auto Scaling | ~7 min | https://www.youtube.com/watch?v=4EOaAkY4pNE |
| TechWorld with Nana | AWS Auto Scaling & Load Balancer Tutorial | ~42 min | https://www.youtube.com/watch?v=P6EhGfJqFbI |
| freeCodeCamp | AWS Cloud Practitioner — Full Course | ~13 h | https://www.youtube.com/watch?v=NhDYbskXRgc |
