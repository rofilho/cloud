# Aula-12 - Computação em Nuvem com Foco em AWS e Redes

---

### **Objetivo da Aula:**

Introduzir os conceitos fundamentais de computação em nuvem, com ênfase nas funcionalidades de rede fornecidas pela **AWS**. Explorar serviços relacionados à infraestrutura de rede e propor uma prática que permita aos alunos aplicar os conhecimentos adquiridos.

---

### **Conteúdo da Aula**

### **1. Introdução à Computação em Nuvem**

- **Definição**:
    - Computação em nuvem é o fornecimento de recursos computacionais (como servidores, armazenamento, banco de dados, redes) por meio da internet.
    - Modelos de serviço: **IaaS (Infraestrutura como Serviço), PaaS (Plataforma como Serviço), SaaS (Software como Serviço)**.
    - Modelos de implantação: **Nuvem Pública, Privada e Híbrida**.
- **Por que Computação em Nuvem?**
    - Escalabilidade, elasticidade, custo-benefício, e disponibilidade global.
    - *Redução de complexidade no gerenciamento de infraestrutura.

---

### **2. Introdução à AWS**

- **O que é AWS?**
    - A **Amazon Web Services (AWS)** é uma das maiores plataformas de computação em nuvem do mundo.
    - Oferece uma ampla gama de serviços que suportam diferentes casos de uso, como computação, armazenamento, banco de dados, e redes.
- **Princípios Básicos da AWS:**
    - **Regiões e Zonas de Disponibilidade**: Como a AWS garante resiliência e baixa latência.
    - **Serviços Básicos**:
        - **EC2**: Máquinas virtuais.
        - **S3**: Armazenamento de objetos.
        - **VPC**: Redes Virtuais Privadas.
        - **Route 53**: Gerenciamento de DNS.
        - **ELB**: Balanceamento de carga.

---

### **3. Foco em Redes na AWS**

- **Amazon VPC (Virtual Private Cloud)**:
    - Permite criar redes virtuais personalizadas dentro da infraestrutura da AWS.
    - Principais componentes:
        - **Subnets**: Divisão da VPC em redes menores.
        - **Gateways de Internet**: Permitem conexão com a internet.
        - **Route Tables**: Definem como o tráfego é roteado dentro da VPC.
        - **NAT Gateways**: Permitem que instâncias privadas acessem a internet de forma segura.
- **Segurança na Rede**:
    - **Security Groups**: Firewall em nível de instância.
    - **Network ACLs**: Firewall em nível de sub-rede.
    - **VPC Peering**: Conexão entre diferentes VPCs.
- **AWS Direct Connect**:
    - Serviço para conectar redes locais diretamente à AWS, reduzindo latência e aumentando a segurança.
- **Load Balancers (ELB)**:
    - Distribuem o tráfego de entrada para diferentes instâncias EC2.
    - Tipos:
        - Application Load Balancer (ALB).
        - Network Load Balancer (NLB).

---

### **4. Demonstração Prática**

**Objetivo**: Criar uma infraestrutura simples na AWS para hospedar uma aplicação web, configurando redes seguras.

### **Passo a Passo:**

1. **Criar uma VPC**:
    - Crie uma VPC com um CIDR (exemplo: 10.0.0.0/16).
    - Divida em duas subnets: uma pública e outra privada.
2. **Configurar a Subnet Pública**:
    - Adicione um **Internet Gateway**.
    - Configure a **Route Table** para permitir tráfego de saída para a internet.
3. **Configurar a Subnet Privada**:
    - Adicione um **NAT Gateway** na subnet pública.
    - Configure a **Route Table** para permitir acesso à internet apenas por meio do NAT Gateway.
4. **Criar Instâncias EC2**:
    - Lance uma instância EC2 na subnet pública (servidor web).
    - Lance uma instância EC2 na subnet privada (servidor de banco de dados).
5. **Configurar Security Groups**:
    - Permitir tráfego HTTP/HTTPS para a instância pública.
    - Permitir acesso ao banco de dados somente da instância pública.
6. **Testar a Configuração**:
    - Acesse a instância pública via navegador.
    - Verifique se o banco de dados é acessível apenas pela instância pública.

---

### **5. Trabalho Final**

**Objetivo**: Criar uma rede segura na AWS para hospedar um site simples.

### **Descrição do Trabalho:**

- Criar uma infraestrutura na AWS para hospedar uma aplicação web em um ambiente seguro.
- **Requisitos**:
    1. Criar uma VPC com duas subnets (uma pública e uma privada).
    2. Configurar um **Internet Gateway** e uma **Route Table** para a subnet pública.
    3. Configurar um **NAT Gateway** para a subnet privada.
    4. Criar duas instâncias EC2:
        - Uma na subnet pública para hospedar o servidor web.
        - Outra na subnet privada para hospedar o banco de dados.
    5. Configurar **Security Groups** para:
        - Permitir acesso HTTP/HTTPS à instância pública.
        - Permitir acesso ao banco de dados apenas da instância pública.
        - Instalar um WebService de sua preferência e subir um site.
    6. Testar a configuração e documentar os passos.

**Entrega:**

- Um documento explicando os passos seguidos, incluindo capturas de tela da infraestrutura configurada.
- O acesso público à aplicação web deve ser funcional.

**Critérios de Avaliação:**

- Configuração correta da VPC, subnets, e roteamento (5 pontos).
- Configuração correta das instâncias EC2 (5 pontos).
- Configuração correta de segurança (5 pontos).
- Documentação clara e funcionalidade final (10 pontos).