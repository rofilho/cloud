# Aula-Extra-Nuvem - Demonstrativa: Implantação de um Site Personalizado na AWS EC2 com Docker

Olá, pessoal! Hoje, vamos realizar uma demonstração prática de como implantar um site personalizado na AWS EC2 utilizando o Docker. Vamos criar um site simples que cumprimenta a turma e mostra as horas atuais. Vamos começar!

### **1. Criando o Site Simples**

Vamos começar criando o código para nosso site simples. Abra seu editor de texto favorito e crie um arquivo chamado **`index.html`** com o seguinte conteúdo:

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cumprimento e Horas</title>
</head>
<body>
    <h1>Olá, turma!</h1>
    <p>Atualmente são <span id="horas"></span>.</p>

    <script>
        function atualizarHora() {
            var agora = new Date();
            var horas = agora.getHours();
            var minutos = agora.getMinutes();
            var segundos = agora.getSeconds();
            document.getElementById('horas').innerText = horas + ":" + minutos + ":" + segundos;
        }
        setInterval(atualizarHora, 1000);
    </script>
</body>
</html>

```

Este código HTML simples exibirá um cumprimento para a turma e mostrará as horas atualizadas em tempo real.

### **2. Criando o Dockerfile**

Agora, vamos criar um Dockerfile para empacotar nosso site em um contêiner Docker. Crie um arquivo chamado **`Dockerfile`** com o seguinte conteúdo:

```
DockerfileCopy code
FROM nginx:alpine
COPY index.html /usr/share/nginx/html

```

Este Dockerfile usa a imagem oficial do Nginx como base e copia nosso arquivo **`index.html`** para o diretório de documentos padrão do Nginx.

### **3. Implantação na AWS EC2**

Agora que temos nosso site e Dockerfile prontos, vamos implantá-lo na AWS EC2.

1. Faça login no Console de Gerenciamento da AWS e vá para o serviço EC2.
2. Crie uma nova instância EC2 e selecione uma AMI do Amazon Linux.
3. Em "Configurar Detalhes da Instância", configure as opções desejadas (tamanho da instância, rede, etc.).
4. Na seção "Configurar Grupos de Segurança", adicione uma regra de entrada para permitir o tráfego HTTP na porta 80.
5. Na seção "Revisar e Lançar", inicie a instância e associe uma chave SSH, se necessário.

### **4. Instalando o Docker na Instância EC2**

Após iniciar a instância, conecte-se a ela via SSH e execute os seguintes comandos para instalar o Docker:

```bash
sudo yum update -y
sudo yum install docker
sudo service docker start
sudo usermod -a -G docker ec2-user

```

### **5. Construindo e Executando o Contêiner Docker**

Agora, transfira o arquivo **`index.html`** e o **`Dockerfile`** para a instância EC2 (você pode usar o **`scp`** ou o serviço AWS S3).

Em seguida, execute os seguintes comandos para construir e executar o contêiner Docker:

```bash

docker build -t meu-site .
docker run -d -p 80:80 meu-site

```

### **6. Visualizando o Site**

Agora, abra um navegador da web e navegue até o endereço IP público da sua instância EC2 para visualizar o site implantado.