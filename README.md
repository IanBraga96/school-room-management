# School Room Management

API desenvolvida para um processo seletivo, com requisitos funcionais e regras de negócios solicitados. A API, criada utilizando AdonisJS, é voltada para o gerenciamento de alocação de salas em escolas e universidades. Ela oferece funcionalidades para gerenciar usuários, salas e a alocação de estudantes em salas específicas.

## Funcionalidades

- **Gerenciamento de Usuários:** Cadastro, edição, exclusão e consulta de usuários.
- **Gerenciamento de Salas:** Cadastro, edição, exclusão e consulta de salas.
- **Alocação de Estudantes:** Alocação e remoção de estudantes em salas específicas.
- **Autenticação:** Sistema de autenticação para administradores e usuários.

## Tecnologias Utilizadas

- **Node.js**
- **AdonisJS**
- **TypeScript**
- **MySQL**

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/IanBraga96/school-room-management.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd school-room-management
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Configure o arquivo `.env` com suas credenciais do banco de dados.
    ```dotenv
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=usuário_do_banco
    DB_PASSWORD=senha_do_banco
    DB_DATABASE=nome_do_banco
    ```

## Uso

1. Execute as migrações do banco de dados:
    ```bash
    node ace migration:run
    ```
2. Gere um administrador através do seed:
    ```bash
    node ace db:seed
    ```
3. Inicie o servidor:
    ```bash
    npm start
    ```
4. Para realizar testes automatizados nas rotas:
    ```bash
    node ace test
    ```

## Endpoints

- **Login**
  - `POST /login`: Login.

- **Usuários**
  - `POST /users`: Cria um novo usuário.
  - `GET /users/:id`: Mostra detalhes de um usuário específico.
  - `PUT /users/:id`: Atualiza um usuário específico.
  - `DELETE /users/:id`: Exclui um usuário específico.

- **Salas**
  - `POST /rooms`: Cria uma nova sala.
  - `GET /rooms/:id`: Mostra detalhes de uma sala específica.
  - `PUT /rooms/:id`: Atualiza uma sala específica.
  - `DELETE /rooms/:id`: Exclui uma sala específica.

- **Alocações**
  - `POST /allocate`: Aloca um estudante em uma sala.
  - `DELETE /deallocate`: Remove um estudante de uma sala.
  - `GET /user/:id/rooms`: Consulta das salas alocadas pelo usuário.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
