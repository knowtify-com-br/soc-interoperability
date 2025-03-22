# Sagui API

Uma API simples desenvolvida em Node.js com Express para autenticação de usuários e submissão de fomulários de .

## Estrutura do Projeto

```
sagui/
├── app.js          # Arquivo principal da aplicação
├── package.json    # Configurações e dependências do projeto
└── README.md       # Documentação do projeto
```

## Requisitos

- Node.js (versão 12 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Instalação

1. Clone o repositório ou crie a pasta do projeto:

```bash
mkdir -p sagui
cd sagui
```

2. Inicialize o projeto e instale as dependências:

```bash
npm init -y
npm install express body-parser
npm install --save-dev nodemon
```

## Execução

Para iniciar o servidor:

```bash
npm start
```

Para desenvolvimento (com reinicialização automática):

```bash
npm run dev
```

O servidor será iniciado na porta 3000 por padrão. Você pode alterar a porta definindo a variável de ambiente PORT.

## Endpoints

### Login

**Endpoint:** `GET /login`

**Parâmetros de consulta:**
- `email`: Email do usuário
- `senha`: Senha do usuário

**Respostas:**
- `200 OK`: Login bem-sucedido (quando email="sagui.master" e senha="B@n@n@123")
- `401 Unauthorized`: Credenciais inválidas (para qualquer outra combinação)

**Exemplo de uso:**
```
GET http://localhost:3000/login?email=sagui.master&senha=B@n@n@123
```

### Formulário

**Endpoint:** `GET /formulario`

**Parâmetros de consulta:**
- `nome`: Nome completo do usuário
- `filiacao`: Filiação do usuário
- `cpf`: CPF do usuário (formato: xxx.xxx.xxx-xx)
- `dataNascimento`: Data de nascimento do usuário
- `email`: Email do usuário
- `rendaFamiliar`: Renda familiar do usuário

**Respostas:**
- `201 Created`: Formulário submetido com sucesso (para qualquer CPF diferente de "000.000.000-99")
- `409 Conflict`: CPF já cadastrado (quando CPF="000.000.000-99")
- `400 Bad Request`: Quando algum campo obrigatório não é fornecido

## Exemplo de uso:

### Login

- #### Sucesso: http://localhost:3000/login?email=sagui.master&senha=B@n@n@123

- #### Falha: http://localhost:3000/login?email=outro&senha=senha123

### Formulário:

- #### Sucesso: http://localhost:3000/formulario?nome=Teste&filiacao=Pais&cpf=123.456.789-10&dataNascimento=01/01/1990&email=teste@email.com&rendaFamiliar=5000

- #### Conflito: http://localhost:3000/formulario?nome=Teste&filiacao=Pais&cpf=000.000.000-99&dataNascimento=01/01/1990&email=teste@email.com&rendaFamiliar=5000

## Regras de Negócio

1. **Login:**
   - Apenas o usuário com email "sagui.master" e senha "B@n@n@123" pode fazer login com sucesso.
   - Qualquer outra combinação de credenciais resultará em erro de autenticação.

2. **Formulário:**
   - O CPF "000.000.000-99" é considerado já existente no sistema e resultará em conflito.
   - Qualquer outro CPF será aceito para submissão do formulário.
   - Todos os campos são obrigatórios.

## Dependências

- **express**: Framework web para Node.js
- **body-parser**: Middleware para parsear o corpo das requisições
- **nodemon** (dev): Utilitário que monitora alterações nos arquivos e reinicia automaticamente o servidor

## Licença
ISC