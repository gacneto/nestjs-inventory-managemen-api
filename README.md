# Coffee Shop Inventory API ☕

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE523A?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

Backend profissional e escalável em NestJS para um sistema de gestão de estoque de cafeteria. Desenvolvido seguindo as melhores práticas de mercado com foco em arquitetura limpa, manutenibilidade e ambiente dockerizado para deploy.

---

## ✨ Funcionalidades (MVP)

- **Autenticação e Autorização:** Sistema completo com JWT, roles (`admin`, `funcionário`), registro e login.
- **Gestão de Produtos:** CRUD completo para produtos, exclusivo para administradores.
- **Controle de Estoque:** Endpoints para registrar entradas e saídas de produtos, com histórico completo de movimentações e validação para não permitir estoque negativo.
- **Relatórios:** Endpoints para consultar o estoque atual de todos os produtos e o histórico de movimentações com filtro por período.
- **Documentação:** Documentação completa e interativa da API gerada automaticamente com Swagger.

---

## 🚀 Tecnologias Utilizadas

- **Backend:** [NestJS](https://nestjs.com/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Autenticação:** [JWT (JSON Web Tokens)](https://jwt.io/)
- **Validação:** `class-validator` e `class-transformer`
- **Documentação da API:** [Swagger (OpenAPI)](https://swagger.io/)
- **Containerização:** [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

---

## 🔧 Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

O Node.js e o npm não são estritamente necessários na máquina local, pois a aplicação roda inteiramente dentro de contêineres Docker.

---

## 🏁 Como Rodar o Projeto

Siga os passos abaixo para executar a aplicação em seu ambiente de desenvolvimento.

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/gacneto/nestjs-inventory-managemen-api.git
    cd nestjs-inventory-managemen-api
    ```

2.  **Crie o arquivo de variáveis de ambiente:**
    Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.

    ```bash
    cp .env.example .env
    ```

    _Você pode alterar as variáveis dentro do `.env` se desejar, mas os valores padrão são projetados para funcionar com o Docker Compose._

3.  **Inicie os contêineres:**
    Este comando irá construir as imagens (se necessário) e iniciar a API e o banco de dados.

    ```bash
    docker-compose up --build
    ```

    _Use a flag `-d` para rodar em modo detached (em segundo plano)._

4.  **Execute as migrations do banco de dados:**
    Com os contêineres rodando, abra um novo terminal e execute o comando abaixo para criar as tabelas no banco de dados.
    ```bash
    docker-compose exec api npm run migration:run
    ```

A aplicação estará disponível em `http://localhost:3000`.

---

## 📚 Documentação da API (Swagger)

Após iniciar a aplicação, a documentação completa e interativa da API estará disponível no seguinte endereço:

➡️ **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

Você pode usar a interface do Swagger para testar todos os endpoints, incluindo o registro de usuários, login para obter um token JWT e o uso desse token para acessar rotas protegidas.

---

## 🗺️ Endpoints Principais

| Método   | Rota                         | Descrição                                    | Permissão          |
| :------- | :--------------------------- | :------------------------------------------- | :----------------- |
| `POST`   | `/auth/register`             | Registra um novo usuário.                    | Pública            |
| `POST`   | `/auth/login`                | Autentica um usuário e retorna um token JWT. | Pública            |
| `GET`    | `/products`                  | Lista todos os produtos.                     | Admin, Funcionário |
| `POST`   | `/products`                  | Cria um novo produto.                        | Admin              |
| `PATCH`  | `/products/:id`              | Atualiza um produto.                         | Admin              |
| `DELETE` | `/products/:id`              | Deleta um produto.                           | Admin              |
| `POST`   | `/inventory/stock-in`        | Registra uma entrada de estoque.             | Admin, Funcionário |
| `POST`   | `/inventory/stock-out`       | Registra uma saída de estoque.               | Admin, Funcionário |
| `GET`    | `/reports/current-stock`     | Retorna o relatório de estoque atual.        | Admin, Funcionário |
| `GET`    | `/reports/inventory-history` | Retorna o histórico de movimentações.        | Admin, Funcionário |

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
