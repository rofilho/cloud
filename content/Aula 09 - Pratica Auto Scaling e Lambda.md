---
disciplina: Cloud Computing
codigo: "14189"
aula: "09"
titulo: "Prática de Auto Scaling com Terraform e Serverless com AWS Lambda"
tipo: pratica
semana: 5
data: 2026-04-22
status: publicado
tags:
  - cloud
  - aws
  - auto-scaling
  - lambda
  - serverless
  - terraform
  - cloudwatch
  - lab
publicar: true
---

# 🟢 Aula 09: Prática de Auto Scaling com Terraform e Serverless com AWS Lambda

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana:** 5 | Quarta-feira
**Professor:** Romualdo Mathias Filho
**Tipo:** 🔬 Prática
**Plataforma de Prática:** AWS Academy Learner Lab / CLI / Console Web

---

> 💬 "No paradigma clássico de infraestrutura de TI, os servidores eram tratados como 'animais de estimação' (Pets): dávamos nomes personalizados, cuidávamos se ficassem lentos ou doentes e fazíamos de tudo para consertá-los. Na computação em nuvem contemporânea, os servidores são tratados como 'rebanho' (Cattle): não têm nomes, são idênticos e se um falha, o Auto Scaling o descarta e coloca outro idêntico em seu lugar de forma transparente. E no paradigma Serverless, nós sequer nos importamos com a fazenda: apenas alugamos um trator autônomo por 2 segundos e pagamos estritamente pelos milissegundos rodados de execução lúdica." — Analogia clássica sobre resiliência e modelos de provisionamento.

---

## 🎯 Objetivo da Aula

Ao final desta aula prática, os alunos serão capazes de:
- **Provisionar** uma infraestrutura elástica e redundante composta por Launch Templates e Auto Scaling Groups (ASG) utilizando código declarativo do **Terraform**.
- **Analisar** a capacidade de auto-recuperação (Self-Healing) da nuvem simulando falhas catastróficas em servidores (abordagem didática de **Chaos Engineering**).
- **Compreender** os pilares e a mudança de paradigma da computação **Serverless** (Sem Servidor) frente aos modelos tradicionais de IaaS.
- **Desenvolver** e implantar funções lógicas baseadas em eventos no **AWS Lambda** utilizando o runtime Python.
- **Auditar** a telemetria, logs de execução de sistema e faturamento proporcional por milissegundo de funções através do **Amazon CloudWatch**.

---

## 🔄 Revisão Rápida (5 min)

Nas sessões anteriores de laboratório, operamos a nuvem de forma programática utilizando scripts e IaC:

| **Conceito (Aula Passada)** | **Conexão com hoje** |
| --- | --- |
| [[Aula 08 - Lancando Instancias EC2 AWS CLI e Terraform\|Aula 08 (CLI e Terraform)]] | Aprendemos a instanciar servidores EC2 isolados via Terraform; hoje utilizaremos a IaC para provisionar grupos elásticos automatizados. |
| [[Aula 07 - Pratica de Auto Scaling e Balanceamento de Carga\|Aula 07 (Auto Scaling)]] | Configuramos o Auto Scaling graficamente; hoje compararemos esse fluxo visual com o deploy declarativo e resiliência via código. |
| [[Aula 06 - Computacao em Nuvem EC2 Lambda e Serverless\|Aula 06 (EC2 e Lambda)]] | Compreendemos os fundamentos conceituais de IaaS e a revolução da computação orientada a eventos FaaS (Serverless) com o AWS Lambda. |

---

## 📌 1. Pré-requisitos e Preparação do Lab

Antes de iniciarmos o provisionamento, valide se o seu ambiente local de desenvolvimento possui as condições ativas:
- Acesso ao **AWS Academy Learner Lab** devidamente iniciado e ativo.
- Credenciais CLI atualizadas e copiadas da seção **AWS Details** do Vocareum.
- Chaves salvas na pasta oculta `.aws` do seu usuário local.
  - *💡 Dica Rápida:* Se você usa o VS Code no Windows, pode editar rapidamente as chaves abrindo o terminal e digitando `code $env:USERPROFILE\.aws\credentials`.
- Terraform instalado localmente em sua máquina física e acessível no terminal de comandos.

---

## 📌 2. Roteiro Prático: Provisionando Auto Scaling via Terraform

Nas atividades anteriores, subimos servidores virtuais isolados (`aws_instance`). Nesta prática, subiremos de nível: não gerenciaremos instâncias soltas. Criaremos um modelo de inicialização e repassaremos a responsabilidade de manter as máquinas ativas para o Auto Scaling.

### 2.1. Etapa 1: Organização e Escrita do Código Declarativo
Crie uma pasta exclusiva no seu computador chamada `aula09-autoscaling` e abra-a em seu editor de código. Crie um arquivo chamado **`main.tf`** e insira o código descritivo HCL a seguir:

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# 1. Recupera as informações da rede VPC padrão do laboratório
data "aws_vpc" "default" {
  default = true
}

# Recupera as Subnets associadas à VPC padrão
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# 1.5. Configura o Firewall (Security Group) liberando tráfego HTTP na Porta 80
resource "aws_security_group" "asg_sg" {
  name        = "asg-lab-sg"
  description = "Acesso HTTP para as maquinas clonadas"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 2. O Launch Template (A "Receita" padrão do Servidor)
resource "aws_launch_template" "meu_modelo_asg" {
  name_prefix   = "template-aula09-"
  image_id      = "ami-0c02fb55956c7d316" # Amazon Linux 2023 base
  instance_type = "t2.micro"

  # Atrela o firewall Security Group criado acima ao modelo
  vpc_security_group_ids = [aws_security_group.asg_sg.id]

  # Injeta o script de boot em base64 para inicializar a aplicação
  user_data = base64encode(<<-EOF
    #!/bin/bash
    yum update -y
    yum install -y httpd
    systemctl start httpd
    systemctl enable httpd
    echo "<h1>Eu sou um clone do Auto Scaling! Meu IP privado e: \$(hostname -I)</h1>" > /var/www/html/index.html
  EOF
  )

  lifecycle {
    create_before_destroy = true
  }
}

# 3. O Auto Scaling Group (Gerenciador Autônomo de Capacidade)
resource "aws_autoscaling_group" "meu_asg" {
  name                = "asg-aula-09"
  vpc_zone_identifier = data.aws_subnets.default.ids
  desired_capacity    = 2 # Exige que a AWS mantenha sempre 2 instâncias ligadas
  min_size            = 1 # Capacidade mínima tolerável
  max_size            = 4 # Limite máximo do grupo no laboratório

  launch_template {
    id      = aws_launch_template.meu_modelo_asg.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "maquina-filha-do-asg"
    propagate_at_launch = true
  }
}
```

---

### 2.2. Etapa 2: Aplicação do Plano de Deploy com o Terraform
Abra seu terminal integrado na pasta do projeto e execute os comandos sequenciais de ciclo de vida do Terraform:
```bash
# Inicializa e instala o provider da AWS
terraform init

# Valida as configurações e exibe a maquete lógica dos recursos
terraform plan

# Executa a implantação na nuvem (digite "yes" para confirmar)
terraform apply
```

---

### 2.3. Etapa 3: Teste de Resiliência e Auto-recuperação (Chaos Engineering)
Como instruímos a propriedade `desired_capacity = 2` no Terraform, o Auto Scaling Group monitora ativamente para garantir que existam exatamente duas instâncias EC2 no ar. Vamos testar sua resiliência simulando uma falha grave de hardware:

1. Acesse o **Console Web da AWS** pelo seu navegador.
2. Navegue até o painel do **EC2 > Instances (Instâncias)**.
3. Observe que existem duas instâncias em execução chamadas `maquina-filha-do-asg`.
4. Selecione **uma** dessas duas instâncias e force sua exclusão acessando: **Instance state > Terminate instance**.
5. **Observe o comportamento da nuvem:** O status da máquina selecionada mudará para *Shutting-down* e posteriormente *Terminated*. No entanto, em poucos segundos, o Auto Scaling Group perceberá que a capacidade real caiu para 1 (violando o alvo de 2 desejados). O grupo disparará de forma autônoma o Launch Template e criará uma nova instância sobressalente para restabelecer a estabilidade lúdica do sistema.

---

### 2.4. Etapa 4: Exclusão e Descarte da Infraestrutura
**Atenção:** Nunca tente excluir as instâncias EC2 diretamente pela tela do console se o Auto Scaling Group ainda estiver ativo, visto que o grupo criará infinitos clones substitutos! A limpeza total e segura da infraestrutura deve ser comandada pelo Terraform:
```bash
terraform destroy
# Confirme digitando "yes"
```

---

## 📌 3. Computação Serverless com AWS Lambda

O paradigma **Serverless** (Sem Servidor) desonera o desenvolvedor de provisionar, dimensionar, atualizar sistemas operacionais ou pagar pela ociosidade de máquinas de desenvolvimento.

### 3.1. Diferença de Paradigmas: EC2 vs AWS Lambda

| **Critério Estrutural** | **Virtualização Clássica (Amazon EC2)** | **Computação Serverless (AWS Lambda)** |
| --- | --- | --- |
| **Administração** | Alta (atualizações de kernel, Linux, patches). | Totalmente gerenciada e invisível pela AWS. |
| **Escalabilidade** | Requer políticas de Auto Scaling atreladas. | Instantânea, nativa e baseada na concorrência de eventos. |
| **Custo de Ociosidade** | Elevado (cobra pelo tempo ativo independente do uso). | Zero absoluto (cobra estritamente pelo milissegundo ativo). |
| **Faturamento** | Proporcional a segundos ligados por hora. | Por milissegundo de computação processada sob evento. |

---

### 3.2. Roteiro de Laboratório: Criando uma Micro-API de Impostos no AWS Lambda

#### Passo 1: Criando a Função pelo Console AWS
1. No Console AWS, pesquise por **Lambda** no menu superior de busca e acesse a ferramenta.
2. Clique no botão **Create function** (Criar função).
3. Selecione a opção **Author from scratch** (Criar do zero).
4. Configure os parâmetros da função:
   - **Function name:** `minha-primeira-api-uniube`
   - **Runtime (Linguagem):** Selecione **Python 3.12** (ou superior).
   - **Architecture:** `x86_64`
   - Expanda a seção **Change default execution role**:
     - Marque a opção **Use an existing role** (Uso obrigatório nas sandboxes estudantis).
     - Selecione o papel pré-existente chamado **`LabRole`** (que possui as políticas de segurança necessárias injetadas pela academia).
5. Clique em **Create function**.

#### Passo 2: Codificando a Lógica em Python
Na seção de edição de código (**Code source**), substitua todo o script inicial da tela pelo script de tratamento de eventos a seguir:

```python
import json
import uuid

def lambda_handler(event, context):
    """
    Função controladora principal (Handler).
    'event': recebe o dicionário de dados de entrada que dispararam o gatilho.
    'context': fornece metadados do contexto de execução da infraestrutura AWS.
    """
    print("LOG: Nova transacao de fechamento de carrinho recebida!")
    print(f"Dados brutos do Evento: {event}")

    # Extrai dados lógicos do payload de entrada com valores padrão
    nome_cliente = event.get("cliente", "Visitante Anonimo")
    valor_compra = event.get("compra", 0.0)

    # Lógica de processamento: Aplicação de imposto fictício de 15%
    tributo_calculado = valor_compra * 0.15
    valor_total = valor_compra + tributo_calculado
    id_transacao = str(uuid.uuid4())

    # Estrutura JSON de retorno que a API responderá ao cliente
    resposta_api = {
        "status": 200,
        "mensagem": f"Ola {nome_cliente}, seu processamento foi finalizado com sucesso na AWS!",
        "id_processamento": id_transacao,
        "valores": {
            "compra_original": valor_compra,
            "tributos_calculados": tributo_calculado,
            "total_a_pagar": valor_total
        }
    }

    return {
        'statusCode': 200,
        'body': json.dumps(resposta_api, indent=4)
    }
```
> ⚠️ **Importante:** Após colar o script Python, você deve clicar no botão **Deploy** (acima da tela de código) para compilar e salvar o código nas matrizes de execução reais da AWS.

#### Passo 3: Criando o Cenário de Invocação (Test Event)
Como o Lambda funciona respondendo a estímulos lógicos, simularemos uma chamada de sistema configurando um evento simulado:
1. Clique no botão de seta ao lado de **Test** e selecione **Configure test event**.
2. **Event name:** `VendaBlackFriday`
3. No campo **Event JSON**, apague a estrutura existente e insira o payload a seguir:
   ```json
   {
     "cliente": "Marcos Silva, aluno de Ciencia de Dados",
     "compra": 1500.00
   }
   ```
4. Clique em **Save**.

#### Passo 4: Executando e Auditando Logs no CloudWatch
1. Clique no grande botão azul **Test**.
2. O console exibirá uma caixa verde de sucesso (**Execution result: succeeded**). Clique em **Details** para expandir.
3. Observe os dados em JSON retornados com os cálculos e verifique a seção descritiva de faturamento:
   - **Billed Duration:** O número de milissegundos faturados pelo processamento (ex.: `1.50 ms`). Você percebe que a AWS fracionou milimetricamente o custo, gastando frações infinitesimais de centavos.
4. **Visualizando no CloudWatch:**
   - Clique na aba superior **Monitor** e selecione **Logs**.
   - Clique no atalho correspondente ao último fluxo de logs gerados.
   - O console de terminal preto do **Amazon CloudWatch** será carregado, exibindo a saída do nosso `print()` do Python: `LOG: Nova transacao de fechamento de carrinho recebida!`.

---

## 📌 4. Exercício Prático e Evidências de Laboratório

Para validação da presença e nota do laboratório no Moodle da Uniube, envie capturas de tela contendo:
1. **Chaos Engineering:** Foto do painel de instâncias EC2 do Console AWS exibindo três linhas: a instância que você excluiu manualmente (`Terminated`) e as duas instâncias filhas do Auto Scaling ativas (`Running`).
2. **Serverless Execution:** Foto da aba de resultados do AWS Lambda exibindo o JSON retornado com seu próprio nome preenchido no parâmetro de entrada `"cliente"`, com o detalhe de faturamento computado por milissegundos (*Billed Duration*) em destaque.

---

## 📋 Resumo Estrutural

| **Conceito** | **Definição em Uma Frase** |
| --- | --- |
| **Self-Healing (Auto-recuperação)** | O ciclo contínuo de monitoramento onde o ASG avalia a integridade física das instâncias e as substitui de forma autônoma em caso de quedas. |
| **Serverless** | Paradigma de engenharia de software focado em delegar a gerência completa de hardware e middlewares para o provedor de computação em nuvem. |
| **FaaS (Function as a Service)** | Modelo de nuvem onde o desenvolvedor implanta funções lógicas de script que rodam em containers virtuais descartáveis acionados por eventos. |
| **Chaos Engineering** | Disciplina prática focada em injetar falhas e anomalias de forma controlada nos sistemas para assegurar e otimizar a confiabilidade e tolerância a erros. |
| **CloudWatch Logs** | O serviço nativo centralizado de coleta, monitoramento e consolidação de logs e saídas padrão de depuração das ferramentas AWS. |

---

%%
## ❓ Banco de Questões

> 🔒 Esta seção é visível apenas no Obsidian do professor. Não publicada.

### Questão 1: Prática (Múltipla Escolha — Nível: Intermediário)
**Enunciado:** O setor de engenharia de MLOps de uma startup financeira em Uberlândia implantou um modelo preditivo leve de análise de crédito via AWS Lambda integrado à API Gateway. Durante um evento promocional, o volume de requisições de clientes disparou de 5 chamadas por segundo para 5.000 chamadas simultâneas. Como o serviço AWS Lambda responde a esse aumento extremo de requisições em comparação ao comportamento clássico de um Auto Scaling Group (ASG) de instâncias EC2?

- [ ] A) O AWS Lambda entrará em estado de sobrecarga física e abortará as transações, exigindo que o operador da infraestrutura acesse o console para reiniciar manualmente os servidores lógicos.
- [x] B) O AWS Lambda provisiona e executa de forma instantânea e transparente múltiplos containers simultâneos da função em frações de segundo (escala horizontal em milissegundos), sem o atraso de inicialização física de sistemas operacionais. ✅
- [ ] C) O AWS Lambda enfileira as requisições em um buffer local estrito de thread única, processando as predições de crédito sequencialmente ao longo de várias horas consecutivas.
- [ ] D) O AWS Lambda notificará o administrador para criar novas instâncias EC2 baseadas em um Launch Template e aguardará o boot completo da infraestrutura antes de iniciar o processamento lúdico.

**Justificativa:** O AWS Lambda é uma arquitetura FaaS orientada a eventos. Diante de picos severos de acessos, a plataforma gerencia a concorrência instantaneamente, criando cópias isoladas da lógica computacional em containers efêmeros em milissegundos, diferentemente de servidores EC2 em ASG que demoram minutos para realizar o boot completo do SO e middlewares.

---

### Questão 2: Prática (Múltipla Escolha — Nível: Intermediário)
**Enunciado:** Um estudante do curso de Inteligência Artificial da Uniube implantou um script Terraform configurando um Auto Scaling Group (ASG) com `desired_capacity = 2` e `max_size = 4`. Com o intuito de finalizar o dia de práticas e encerrar as despesas do laboratório, o aluno acessou a tela de instâncias EC2 no Console AWS e excluiu manualmente as duas máquinas ativas do grupo. Minutos depois, ele percebeu que a conta do lab continuava computando gastos e que duas novas instâncias EC2 haviam surgido na tela. Qual a explicação lógica para este comportamento e qual o procedimento de descarte correto?

- [ ] A) O console da AWS sofreu um travamento de sincronização de estado com o data center e as instâncias novas são fantasmas virtuais sem custo real.
- [x] B) O Auto Scaling Group detectou que a contagem de instâncias ativas caiu abaixo da capacidade desejada (desired = 2) e instanciou de forma autônoma novas máquinas para cumprir sua regra de conformidade lúdica. O aluno deve rodar o comando `terraform destroy` no terminal para excluir o grupo de vez. ✅
- [ ] C) O estudante corrompeu de forma irreversível as chaves criptográficas locais do arquivo `.tfstate`, impossibilitando qualquer intervenção futura na nuvem do laboratório.
- [ ] D) O papel IAM `LabRole` perdeu as permissões de acesso, travando as instâncias na tela em um loop infinito de segurança corporativa do provedor.

**Justificativa:** A função primordial do Auto Scaling Group é manter o estado desejado (`desired_capacity`). Ao encerrar as instâncias manualmente pelo console, o ASG interpreta a ação como uma falha do hardware e executa a auto-recuperação recriando as máquinas. Para apagar os recursos em conformidade de IaC, é obrigatório destruir a raiz lógica que comanda as regras de escala através do comando `terraform destroy`.

---

### Questão 3: Teórica (Dissertativa — Nível: Avançado)
**Enunciado:** Explique de que forma o conceito de **Chaos Engineering (Engenharia do Caos)** se relaciona com a evolução histórica de paradigmas de gerenciamento de infraestrutura computacional definidos classicamente como **"Pets vs Cattle" (Animais de Estimação vs Gado)** na computação em nuvem. Em sua resposta, analise os mecanismos operacionais internos que o Auto Scaling Group utiliza para executar a auto-recuperação (Self-Healing) de servidores quando uma máquina é desativada manualmente de forma proposital durante as práticas de laboratório.

**Resposta esperada:**
1. **Pets vs Cattle e o Caos:** No paradigma tradicional de "Pets" (Animais de Estimação), os servidores eram tratados como únicos, recebiam nomes especiais e passavam por manutenções manuais minuciosas ao menor sinal de falha. No paradigma moderno de "Cattle" (Rebanho), os servidores são descartáveis, gerados em massa com configurações e tags idênticas. A Engenharia do Caos surge para validar este segundo paradigma: em vez de evitar falhas e quedas a todo custo, assume-se que falhas físicas e lógicas ocorrerão. Injetam-se falhas de forma controlada no ambiente para provar que a infraestrutura é capaz de sobreviver e se reestruturar sem intervenção humana.
2. **Mecanismo Operacional de Self-Healing:** O Auto Scaling Group funciona como um ciclo de controle contínuo fechado (control loop). Ele monitora constantemente a integridade lúdica e o status de presença das instâncias registradas sob sua tutela. Quando uma instância é encerrada propositalmente (falha física ou teste de caos manual), a contagem de servidores cai de 2 para 1. O ASG detecta a discrepância entre a capacidade atual (1) e o estado desejado parametrizado (`desired_capacity = 2`). O ASG aciona imediatamente a API da AWS, processa o Launch Template referenciado e provisiona uma nova máquina virtual idêntica em uma das subnets declaradas. Esse processo automatizado garante a auto-recuperação da estabilidade arquitetônica da infraestrutura de forma autônoma em poucos minutos.

---
%%

---

## 📄 Artigo de Aprofundamento

- [Melhores Práticas para Arquiteturas Serverless e AWS Lambda (AWS Whitepaper)](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
> *Resumo prático: Este artigo corporativo oficial da AWS aborda as diretrizes essenciais para o desenvolvimento de microsserviços FaaS eficientes. Ele analisa em detalhes como gerenciar os tempos de cold start das funções, como otimizar o consumo de memória das chamadas de código para obter o menor faturamento e como implementar políticas de segurança restritas utilizando IAM execution roles.*

---

## 📚 Referências Bibliográficas

- ANTUNES, Jonathan Lamim. *Amazon AWS: descomplicando a computação na nuvem*. Casa do Código, 2016. **(Desenvolvimento e Arquitetura Serverless com AWS Lambda, Cap. 12, pp. 225–242)**
- SILVA, Marcos. *Infraestrutura como Código com Terraform*. Novatec, 2021. **(Configuração de Auto Scaling e Políticas de Elasticidade via HCL, Cap. 6, pp. 135–158)**
- SOUSA NETO, Manoel Veras de. *Cloud computing: nova arquitetura da TI*. Brasport, 2012. **(Confiabilidade de Infraestrutura e Arquitetura de Sistemas Tolerantes a Falhas, Cap. 9, pp. 215–232)**

---
*Última atualização: 2026-05-20 | Status: publicado*
