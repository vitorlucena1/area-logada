# Área Logada - Gerenciador de Contatos

Este projeto é uma aplicação web para cadastro, login e gerenciamento de contatos, desenvolvida em React com Vite. O frontend consome uma API RESTful (Node.js + Express + MongoDB, hospedada no Vercel) com autenticação JWT.

## Funcionalidades

- Cadastro de usuário
- Login com autenticação JWT
- Logout
- CRUD de contatos (criar, listar, editar, excluir)
- Feedback visual com React Toastify
- Modal de confirmação para exclusão
- Responsivo para desktop e mobile

## Tecnologias Utilizadas

- **Frontend:** React 19 + Vite
- **Gerenciamento de rotas:** React Router DOM
- **Notificações:** React Toastify
- **Estilização:** CSS puro e variáveis CSS
- **Backend:** API RESTful (Node.js + Express + MongoDB, hospedada no Vercel)
- **Autenticação:** JWT (JSON Web Token)
- **Gerenciamento de estado global:** Context API do React

## Como rodar o projeto

1. **Clonar o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd area-logada
   ```

2. **Instalar as dependências**
   ```bash
   npm install
   # ou
   yarn
   ```

3. **Rodar o projeto**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:5173
   ```

## Observações

- Este projeto foi desenvolvido como estudo prático de React, Vite e integração com backend autenticado.
- A API utilizada no backend foi desenvolvida separadamente e está hospedada no Vercel.
- O gerenciamento de autenticação é feito via JWT, armazenado no localStorage.
- O gerenciamento de estado global utiliza Context API do React.
- Para funcionamento completo, é necessário configurar a variável de ambiente `VITE_API_URL` apontando para a URL da API.

---