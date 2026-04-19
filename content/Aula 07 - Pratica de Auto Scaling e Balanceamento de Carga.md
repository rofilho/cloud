# 🟢 Aula 07: Prática de Auto Scaling e Balanceamento de Carga

**Disciplina:** Cloud Computing (Cód. 14189)

**Curso:** Inteligência Artificial e Ciência de Dados, Uniube

**Semana 4 | Quarta-feira | Prof. Romualdo Mathias Filho**

**Tipo:** 🔬 Prática (Quarta-feira)

**Base teórica:** Aula 06, EC2, Lambda e Serverless

[https://labs.vocareum.com/main/main.php?m=clabide&mode=s&asnid=4774895&stepid=4774896](https://labs.vocareum.com/main/main.php?m=clabide&mode=s&asnid=4774895&stepid=4774896)

---

## 🎯 0. Objetivo da Aula

Ao final da prática, o aluno será capaz de:

- Configurar um Launch Template para padronização de instâncias EC2
- Criar um Auto Scaling Group (ASG)
- Configurar política de escala baseada em CPU via CloudWatch
- Validar criação e remoção automática de instâncias

---

## 🔄 1. Revisão Rápida (5 min)

| Conceito | Aplicação |
| --- | --- |
| EC2 | Instâncias criadas automaticamente sob demanda |
| Escalabilidade Horizontal | Adição de novas instâncias |
| CloudWatch | Monitoramento e gatilho de escala |

---

## 📋 2. Pré-requisitos

- Acesso ao AWS Academy Learner Lab ativo
- Módulo 2.5 concluído ou em andamento
- Conhecimento básico de EC2 e VPC

---

## 🔬 3. Atividade Prática

**Lab:** Escalar e balancear carga da arquitetura

**Tempo estimado:** 45 minutos

---

### 🔹 Etapa 1: Criar Launch Template

1. Acesse **EC2 > Launch Templates**
2. Clique em **Create launch template**
3. Nome: `Modelo-Web-App`
4. AMI: **Amazon Linux 2023**
5. Tipo: `t2.micro`
6. Key pair: `vockey`
7. Security Group: permitir porta 80 (HTTP)
8. Criar template

**Checkpoint:** template listado com sucesso

---

### 🔹 Etapa 2: Criar Auto Scaling Group

1. Acesse **EC2 > Auto Scaling Groups**
2. Clique em **Create Auto Scaling group**
3. Nome: `ASG-Minha-App`
4. Selecionar `Modelo-Web-App`

**Rede:**

- VPC padrão
- Selecionar pelo menos 2 subnets em AZs diferentes

**Capacidade:**

- Desired: 1
- Min: 1
- Max: 3

**Política de escala:**

- Tipo: Target tracking
- Métrica: CPU média
- Target: 50%

Finalizar criação

**Checkpoint:** ASG com capacidade 1 ativa

---

### 🔹 Etapa 3: Testar Escalabilidade

Acessar a instância via SSH ou Instance Connect:

```
sudo dnf update-y
sudo dnf install stress-y
stress--cpu4--timeout300
```

Monitorar no painel EC2 e CloudWatch.

**Resultado esperado:**

Nova instância criada automaticamente após alguns minutos de CPU elevada

---

## 🔧 4. Visão Multi-cloud

| Conceito | AWS | Azure | GCP |
| --- | --- | --- | --- |
| Auto Scaling | ASG | VM Scale Sets | Managed Instance Groups |
| Monitoramento | CloudWatch | Azure Monitor | Cloud Monitoring |

---

## ⚠️ 5. Troubleshooting

| Problema | Causa | Ação |
| --- | --- | --- |
| Não escala | Período de avaliação não atingido | Aguardar 3 a 5 minutos |
| Falha ao criar instância | Restrição do Lab/IAM | Usar `t2.micro` |
| Instâncias encerram | Health Check falhando | Revisar Security Group |

---

## 📝 6. Exercício Avaliativo

**Entrega:** print do Auto Scaling Group

**Deve conter:**

- ASG criado
- Histórico de escala (Activity ou Instances)
- Evidência de Scale-Out

**Prazo:** próxima aula

---

## 📋 7. Resumo

| Ação | Serviço | Conceito |
| --- | --- | --- |
| Criar template | EC2 Launch Template | Padronização |
| Criar grupo | Auto Scaling | Elasticidade |
| Definir regra | CloudWatch | Monitoramento |
| Testar carga | EC2 + stress | Alta disponibilidade |

---

## 📚 8. Material de Apoio

### Documentação

- [https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)
- [https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-launch-templates.html](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-launch-templates.html)

### Vídeos

- [https://youtu.be/kKhyQ6wB1Vw](https://youtu.be/kKhyQ6wB1Vw)
- [https://youtu.be/ZfA0iTf51Ew](https://youtu.be/ZfA0iTf51Ew)