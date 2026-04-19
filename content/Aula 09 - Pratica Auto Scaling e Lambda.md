# Aula 09 - Prática Auto Scaling e Lambda

# 🟢 Aula 09: Prática de Auto Scaling com Terraform e Serverless com AWS Lambda

**Disciplina:** Cloud Computing (Cód. 14189)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana 5** | Quarta-feira | Prof. Romualdo Mathias Filho
**Tipo:** 🔬 Prática (Quarta-feira)
**Base Teórica:** Aula 07 — Computação em Nuvem: EC2, Lambda e Serverless

---

## 🎯 0. Objetivo da Aula

Ao final desta aula prática, o aluno deverá ser capaz de:

- **Provisionar** uma infraestrutura elástica (Auto Scaling Group) utilizando código declarativo (Terraform).
- **Testar** a resiliência do Auto Scaling provocando falhas intencionais nas instâncias (Chaos Engineering simplificado).
- **Criar e executar** uma função Serverless (AWS Lambda) diretamente no console da AWS.
- **Analisar** os logs de execução e faturamento fracionado da função Lambda via CloudWatch.

---

## 🔄 1. Revisão Rápida dos Conceitos (5 min)

| **Conceito (da aula teórica)** | **Aplicação Prática Hoje** |
| --- | --- |
| **Auto Scaling** | Ferramenta que garante que sempre teremos um número ‘X’ de máquinas rodando. Se uma cair, ele cria outra no lugar. |
| **Launch Template** | A “receita do bolo” que o Auto Scaling usa para criar as novas máquinas (qual AMI, qual Security Group, qual tamanho). |
| **Serverless / Lambda** | Código que roda sob demanda, sem subirmos nenhuma instância EC2. |
| **CloudWatch** | Central de monitoramento da AWS onde veremos o log da nossa função Lambda rodando. |

💡 **Analogia da Aula:** No Auto Scaling, nós não cuidamos dos servidores como “animais de estimação” (se ficam doentes, você tenta curar); nós os tratamos como “gado” (se um servidor falhar, o Auto Scaling o descarta e coloca um novo no lugar idêntico). Já no Lambda, nós nem somos donos da fazenda, apenas alugamos um trator mágico por 2 segundos e pagamos só pelos segundos rodados!

---

## 📋 2. Pré-requisitos

- [ ]  Acesso ao AWS Academy Learner Lab ativo (bolinha verde piscando).
- [ ]  Chaves de acesso da AWS copiadas do Vocareum (botão *AWS Details* -> *Show* ao lado de AWS CLI).
- [ ]  Chaves configuradas localmente no seu computador.
💡 **Dica Rápida (Windows no VS Code):** No terminal do VS Code, digite exatamente `code $env:USERPROFILE\.aws\credentials` para criar/abrir o arquivo da forma correta. Cole o bloco que começa com `[default]` fornecido no Lab, salve e aperte *Ctrl+S*.
- [ ]  Terraform instalado e funcionando no terminal do seu computador.

---

## 🔬 3. Parte 1 — Auto Scaling via Terraform

Na aula passada, subimos uma máquina isolada via Terraform (`aws_instance`). Hoje, o nível sobe. Não criaremos a máquina diretamente. Criaremos um **Launch Template** (Modelo) e passaremos para um **Auto Scaling Group (ASG)**.

### 📌 Etapa 1: Preparando o Código Terraform

1. Crie uma nova pasta no seu computador chamada `aula09-autoscaling` e abra-a no VS Code.
2. Crie um arquivo chamado `main.tf` e cole o código abaixo:

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

# 1. Uma rede padrão e suas Subnets (onde as instâncias vão nascer)
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# 1.5. Firewall (Security Group) para liberar a Porta Web (80)
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

# 2. Nosso Modelo de Lançamento (A "Receita" da Máquina)
resource "aws_launch_template" "meu_modelo_asg" {
  name_prefix   = "template-aula09-"
  image_id      = "ami-0c02fb55956c7d316" # Amazon Linux 2023
  instance_type = "t2.micro"

  # Atrelando o Firewall criado acima ao nosso modelo
  vpc_security_group_ids = [aws_security_group.asg_sg.id]

  # Um script simples para identificar quem é a máquina
  user_data = base64encode(<<-EOF
    #!/bin/bash
    yum update -y
    yum install -y httpd
    systemctl start httpd
    systemctl enable httpd
    echo "<h1>Eu sou um clone do Auto Scaling! Meu IP privado e: $(hostname -I)</h1>" > /var/www/html/index.html
  EOF
  )

  lifecycle {
    create_before_destroy = true
  }
}

# 3. O Gerente (Auto Scaling Group)
resource "aws_autoscaling_group" "meu_asg" {
  name                = "asg-aula-09"
  vpc_zone_identifier = data.aws_subnets.default.ids
  desired_capacity    = 2 # Queremos exatas QUATRO máquinas
  min_size            = 1 # No mínimo UMA
  max_size            = 4 # No máximo QUATRO

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

> ✅ **Checkpoint:** Entenda o código! Estamos declarando um bloco `aws_autoscaling_group` e exigindo que a **`desired_capacity` seja 2**. O Terraform forçará a AWS a manter 2 VMs no ar, sempre.
> 

### 📌 Etapa 2: Aplicando a Infraestrutura

Abra o terminal integrado na sua pasta `aula09-autoscaling` e execute nossa tríade mágica:

1. Baixar módulos:
    
    ```bash
    terraform init
    ```
    
2. Analisar o plano de construção:
    
    ```bash
    terraform plan
    ```
    
3. Construir:
    
    ```bash
    terraform apply  # Digite "yes" quando solicitado
    ```
    

### 📌 Etapa 3: Teste de Resiliência (Chaos) 😈

Nós dissemos ao Auto Scaling: “Eu quero 2 máquinas rodando. Sempre”. Vamos testar se ele nos obedece?

1. Acesse o **Console Web da AWS** no navegador.
2. Procure por **EC2** na barra de pesquisas.
3. No menu lateral esquerdo, vá em **Instâncias**.
4. Você verá lá duas instâncias chamadas `maquina-filha-do-asg` com o status *Running*.
5. Selecione **UMA** das instâncias, clique em **Instance state** e escolha **Terminate instance** (Encerrar/Excluir).
*Isto simula uma falha catastrófica de hardware de um de nossos servidores.*

> ✅ **Checkpoint Visual:** Fique atualizando a tela de instâncias. Você verá a sua máquina antiga dando “Terminated”. Mas imediatamente, o Auto Scaling vai detectar que “caiu uma”, o número atual foi de 2 para 1. Ele vai sozinho engatilhar o Launch Template e fazer nascer uma nova instância *Pending* para voltar a conta para 2. **A auto-recuperação funcionou!**
> 

### 📌 Etapa 4: Limpando a Bagunça

Não se recuda aos velhos hábitos. **Nunca mate os servidores do Auto Scaling à mão, pois ele nascerá novos!** O jeito certo de destruir tudo é ordenando o Terraform:

```bash
terraform destroy  # Digite "yes"
```

*(Confira no console web, tudo sumirá misteriosamente — a verdadeira mágica da Infraestrutura como Código!)*

---

## ⚡ 4. Parte 2 — O Mundo Serverless (AWS Lambda)

> **O AWS Academy aceita Lambda?** Sim! No Learner Lab, nós temos acesso livre (Limitado ao Free Tier estudantil) de uso do Lambda para Python, Node e afins. O serviço Lambda está ativo no IAM Role do laboratório nativo.
> 

### 📖 O que é Serverless e como o Lambda Funciona?

O conceito de **Serverless** (Computação sem servidor) não significa que os datacenters deixaram de existir. A verdadeira mágica significa que **nós, desenvolvedores, não precisamos mais gerenciar e nos preocupar com eles**.

Enquanto no EC2 nós decidimos a memória RAM e ficamos responsáveis por atualizar o Linux (como vimos no Terraform), no Serverless nós apenas entregamos o nosso código para a AWS, e ela providencia onde rodá-lo invisivelmente.

| **Critério** | **Virtualização Clássica (EC2)** | **Serverless (Lambda)** |
| --- | --- | --- |
| **Administração** | Alta (S.O., patches, segurança) | Nenhuma (A AWS gerencia a infra) |
| **Escalabilidade** | Requer Auto Scaling configurado | Automática (instantânea e simultânea) |
| **Gasto com Ociosidade** | Sim. Paga-se enquanto a máquina estiver ligada | Zero. Roda 1 seg, paga 1 seg |
| **Billing (Faturamento)** | Cobrado por hora e armazenamento | Cobrado por milissegundo executado |

💡 **A grande Mudança de Paradigma: Gatilhos (Triggers)**
O Lambda não fica rodando 24 horas esperando conexões. Ele “dorme” e só “acorda” através de eventos:
`Evento (ex: Uma mensagem recebida)` ➡️ `Trigger engatilha` ➡️ `AWS aloca um mini-container` ➡️ `Seu código Roda` ➡️ `Devolve a resposta` ➡️ `Container é morto (Fim de Custo)`.

Agora que compreendemos a premissa de não carregar peso morto na nuvem em prol de economizar centavos preciosos a cada transação, vamos ao laboratório criar uma API microscópica de faturamento!

---

### 🔬 Laboratório: Construindo uma Micro-API de Impostos no Lambda

### 📌 Etapa 1: Criando a Função pelo Console

1. No Console da AWS, na barra superior de busca, digite **Lambda** e acesse o serviço.
2. Clique no botão laranja **Create function** (Criar função).
3. Selecione **Author from scratch** (Criar do zero).
4. **Function name:** `minha-primeira-api-uniube`
5. **Runtime (Linguagem):** Selecione **Python 3.12** (ou versão superior).
6. **Architecture:** `x86_64`
7. Expanda a seção **Change default execution role** (Alterar a função de execução padrão).
8. ⚠️ **Obrigatório para contas AWS Academy:** Você não tem permissão para criar novos perfis. Selecione a opção **Use an existing role** (Usar outro perfil).
9. Na caixa que aparecer abaixo, clique na seta para expandir e selecione o papel **`LabRole`** (ou **`lambda-run-role`** dependendo da versão do seu laboratório). Este papel é a permissão-mestre que a AWS nos empresta.
10. Clique em **Create function**.

### 📌 Etapa 2: Codificando no Navegador

Role a tela para baixo até encontrar a sessão **Code source** (onde tem um editor de código embutido). O Lambda já vem com uma função pré-pronta. Vamos substituir tudo por nosso código Python de calculadora de impostos fictícia:

```python
import json
import uuid

def lambda_handler(event, context):
    """
    Função principal. 'event' carrega os dados de entrada.
    'context' traz dados sobre essa execução da AWS.
    """

    print("LOG: Nova transação recebida!")
    print(f"Dados sensíveis do Evento:{event}")

    # Simulação de processamento inteligente de dados!
    nome_cliente = event.get("cliente", "Visitante Misterioso")
    valor_compra = event.get("compra", 0)

    # Calculando um imposto de 15%
    imposto = valor_compra * 0.15
    total = valor_compra + imposto

    id_transacao = str(uuid.uuid4())

    # O que a API deverá retornar
    resposta_api = {
        "status": 200,
        "mensagem": f"Ola{nome_cliente}, processamento finalizado em nuvem!",
        "id_processamento": id_transacao,
        "valores": {
            "compra_original": valor_compra,
            "tributos": imposto,
            "total_a_pagar": total
        }
    }

    return {
        'statusCode': 200,
        'body': json.dumps(resposta_api)
    }
```

> ✅ **Checkpoint:** Após colar, clique no botão cinza/branco acima do código chamado **Deploy**. Isso compila e salva seu código na infraestrutura real da AWS!
> 

### 📌 Etapa 3: Simulando uma Invocação de API (Test Event)

Como nosso Lambda é cego, ele espera que algum serviço envie o dicionário (`event`). Vamos forjar um Teste.

1. Acima do código tem a aba verde/azul **Test**, clique na setinha e vá em **Configure test event**.
2. **Event name:** `VendaBlackFriday`
3. Troque o JSON de Event-JSON substituindo todo o miolo por:
    
    ```json
    {
      "cliente": "Marcos Silva, aluno de IA",
      "compra": 1500.00
    }
    ```
    
4. Clique em **Save**.

### 📌 Etapa 4: Disparando a Execução e Auditando Logs

1. Agora, com o teste salvo, aperte o grande botão azul **Test**.
2. Uma caixa verde aparecerá (**Execution result: succeeded**). Expanda a aba de ‘Details’.
3. Você vai observar a resposta em JSON perfeitamente calculada que sua função emitiu!
4. **Olhe os custos:** Ali embaixo haverá o *Duration* (ex: 1.25 ms), o *Billed Duration* (1.25 ms), o e *Max Memory Used* (ex: 45 MB). **Repare bem:** A AWS computou o segundo pelo MS consumido.

**Indo para o CloudWatch (Log Contínuo)**
O que acontece num servidor que você não domina? Onde vão parar os seus `prints()` para debug?
Vá na aba **Monitor** logo abaixo do título principal da função. Entre em **Logs** e clique no atalho do seu último log stream. Você entrará no Amazon CloudWatch e verá em tela preta escrito `LOG: Nova transação recebida!` que forçamos em Python!

### 🧠 Reflexão Prática: O que alcançamos e por que usar Lambda?

Se você não tivesse o Lambda, para responder a esse simples cálculo de fechamento de carrinho em uma loja virtual, você teria que configurar uma máquina EC2 (com Linux, instalar o Python, configurar um framework web como Flask e pagar o funcionamento dessa máquina 24 horas por dia). A maioria das faturas da AWS estouram no modelo clássico devido à **ociosidade**.

**O verdadeiro poder do que fizemos hoje:**
Você colocou uma Inteligência Lógica no ar que “dorme” custando **R$ 0,00**. Quando uma compra é validada na sua loja, o sistema do e-commerce “atira” os dados do cliente (o que forjamos manualmente no nosso *Test Event*). O Lambda “acorda”, computa o processamento matemático, devolve o ID para a loja, imprime o rastreamento no CloudWatch e então “morre” em questão de milissegundos.

**Como utilizar em Ciência de Dados / MLOps?**
1. **Integração com S3 (Arquivos em Massa):** Imagine que cheguem novos planilhas salvas toda madrugada no formato `.csv`. Você não precisará de um servidor dedicado rodando Pandas. O simples ato de fazer *Upload* da planilha dispara um “Gatilho/Trigger” que chama o Lambda, processa as colunas, envia para Machine Learning e se encerra sozinho.
2. **APIs com Tráfego Explosivo (Black Friday):** Se o seu modelo preditivo (IA de Recomendação de Produtos) de repente saltar de 5 buscas por minuto para 100.000 buscas numa Black Friday, o Lambda cria milhares de ramificações invisíveis de si mesmo automaticamente e processa toda a fila, diferente do EC2 que provavelmente travaria ou exigiria dias de formatação antecipada do Auto Scaling.
3. **Integrações Assíncronas (Automações de Chatbot):** Conectar um webhook (como dados vindos do WhatsApp ou Telegram) com o ecossistema Lex ou Bedrock da AWS instantaneamente sob demanda.

---

## ⚠️ 5. Troubleshooting Comum

| Problema | Causa Provável | Solução |
| --- | --- | --- |
| Auto Scaling Group (Sem instâncias) no console | Subnets com limites esgotados, ou ID da AMI errado no código TF. | Garanta que a AMI está no `us-east-1` (são diferentes id’s por região!). |
| `terraform destroy` ficou em loop eterno matando o ASG | Demora comum do ASG drenar as máquinas filhas antes de morrer ele mesmo. | Apenas tenha paciência (pode levar 3 min). Se der timeout, repita o `destroy`. |
| Lambda Error Executing: `AccessDeniedException` | No AWS Academy, o sistema bloqueia custom roles. | Na criação do Lambda, em vez de ‘Create New Role’, marque ‘Use existing role’ e selecione a **LabRole**. |
| Lambda Runtime Erro: SyntaxError | Indentação do Python falhou ao copiar o código. | Python exige espaços corretos. Revise os tabs do código dentro do console web. |

---

## 📝 6. Exercício Avaliativo

### 📌 Evidências para Moodle (Prazo: Quinta-feira da próxima semana)

1. Faça o seu Auto Scaling Group subir as máquinas com o Terraform. Apague UMA EC2 à mão pelo console e tire um Print Screen da tela de instâncias com as duas filhas e a encerrada no meio de ambas. Isso comprova o teste The Chaos Engineering!
2. Tire print da tela de resultados da Execução do Lambda (Detalhes da aba *Execution Result*), onde apareça o seu nome dentro do parâmetro de retorno `"mensagem"`, juntamente com o *“Billed Duration”*.

---

## 📋 7. Resumo da Prática

| **O que fizemos** | **Serviço AWS Associado** | **Conceito Teórico Relacionado** |
| --- | --- | --- |
| Provisionamento resiliênte de servidores | AWS Auto Scaling Group + Launch Template | Infraestrutura elástica, tratamento de gado (Pets vs Cattle). |
| Destruição intencional do servidor | Amazon EC2 | Tolerância a falhas, self-healing. |
| Criação de API calculando faturamento em MS | AWS Lambda (Serverless) | FaaS, ausência total de infraestrutura de Sistema Operacional, billing fracionado. |
| Leitura de eventos de monitoria | Amazon CloudWatch | Monitoramento central das saídas `stdout` do lambda e de qualquer serviço gerenciado. |

---

## 📚 8. Material de Apoio

### 🔗 Documentação Oficial

| Recurso | Link |
| --- | --- |
| Provedor Oficial do Terraform para Auto Scaling | [Link Documentação](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/autoscaling_group) |
| Introdução ao Lambda pela AWS | [Link AWS Docs](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) |

### 🎥 Vídeos de Apoio

| Canal/Autor | Título | Link |
| --- | --- | --- |
| Cloud Treinamentos | Terraform na Prática: Auto Scaling | [Link YouTube](https://www.youtube.com/watch?v=Fj-E_w44I6E) |
| Zup | Lambda passo a passo na AWS pela Interface Web | [Link YouTube](https://www.youtube.com/watch?v=kYJqD96FmEI) |