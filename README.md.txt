# Sistema de Gestão de Laboratórios -guia para implantação e execução

Projeto de gestão de laboratórios realizado para aplicação em bolsa de estudos do IFRS de acordo com especificações do edital PROPPI Nº 11/2025 Função 10.
Desenvolvedor
Júnior Java/Vue (React)

## Requisitos

- JDK 11 ou superior
- Node.js 14 ou superior
- npm 6 ou superior
- Maven 3.6 ou superior

## Passo a Passo para Instalação e Execução


Este projeto foi realizado utilizando as IDEs IntelliJ IDEA e VSCode. Portanto irei exemplificar primeiramente como iniciar o projeto utilizandos essas IDEs.

### 1. Clone o repositório

```bash
git clone https://github.com/0Chaves/projeto-laboratorios.git
```
### 2. Rodando o backend
- Abra a pasta 'backend' com intelliJ e clique em Run (Shift + F10)
- Seu servidor backend estará rodando em http://localhost:8080

### 3. Rodando o frontend
- Abra a pasta 'frontend' com vscode
- Abra o terminal (certifique-se do terminal estar apontado para a pasta frontend)
- Execute o comando "npm install" (sem aspas) e aguarde
- Execute o comando "npm start" (sem aspas)

### O projeto estará rodando e abrirá uma página no seu navegador. Caso a página não abra, acesse http://localhost:3000/

Para rodar através do terminal, siga os passos abaixo:

### 1. Clone o repositório

```bash
git clone https://github.com/0Chaves/projeto-laboratorios.git
cd sistema-gestao-laboratorios
```
### 2. Rodando o backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```
### 2. Rodando o frontend

```bash
cd frontend
npm install
npm start
```

O projeto estará aberto e acessível em http://localhost:3000/

## Screenshots

![Listagem](/listagem.jpg)

![Cadastro](/cadastro.jpg)

![Detalhes](/detalhes.jpg)

![Validacoes](/validacoes.jpg)