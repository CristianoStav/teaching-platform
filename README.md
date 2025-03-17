# Teaching Platform API

Uma API RESTful construída com NestJS para gerenciar uma plataforma de ensino.

## 📋 Descrição

Esta plataforma permite o gerenciamento de cursos, aulas e comentários, oferecendo uma estrutura completa para criar e administrar conteúdo educacional.

## 🚀 Funcionalidades

- Gerenciamento de Cursos
  - Criar, listar, atualizar e deletar cursos
  
- Gerenciamento de Aulas
  - Criar, listar, atualizar e deletar aulas
  - Associação de aulas com cursos
  
- Sistema de Comentários
  - Adicionar comentários em aulas

## 🛠️ Tecnologias Utilizadas

- NestJS
- PostgreSQL
- Prisma ORM
- Docker
- Swagger/OpenAPI

## 💻 Pré-requisitos

- Node.js
- Docker e Docker Compose
- PostgreSQL

## 🚀 Instalação e Execução

1. Clone o repositório:
```bash
git clone [url-do-repositório]
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie os containers Docker:
```bash
docker-compose up -d
```

4. A aplicação estará disponível em:
- API: http://localhost:3000
- Documentação (Swagger): http://localhost:3000/api-docs

## 📚 Estrutura da API

### Cursos
- `GET /courses` - Lista todos os cursos
- `GET /courses/:id` - Obtém um curso específico
- `POST /courses` - Cria um novo curso
- `PUT /courses/:id` - Atualiza um curso
- `DELETE /courses/:id` - Remove um curso

### Aulas
- `GET /courses/:courseId/lessons` - Lista todas as aulas de um curso
- `GET /courses/:courseId/lessons/:id` - Obtém uma aula específica
- `POST /courses/:courseId/lessons` - Cria uma nova aula
- `PUT /courses/:courseId/lessons/:id` - Atualiza uma aula
- `DELETE /courses/:courseId/lessons/:id` - Remove uma aula

### Comentários
- `GET /courses/:courseId/lessons/:lessonId/comments` - Lista comentários de uma aula
- `POST /courses/:courseId/lessons/:lessonId/comments` - Adiciona um comentário
- `PUT /courses/:courseId/lessons/:lessonId/comments/:id` - Atualiza um comentário
- `DELETE /courses/:courseId/lessons/:lessonId/comments/:id` - Remove um comentário

## 🐳 Configuração Docker

O projeto inclui um `docker-compose.yaml` que configura:
- PostgreSQL na porta 5431
- Aplicação Node.js na porta 3000

## 🔧 Variáveis de Ambiente

```env
DATABASE_URL="postgresql://postgres:pass123@localhost:5431/teaching-platform"
PORT=3000
```

## Testes

O projeto possui testes unitários, apara executa-los, execute o comando
```bash
npm test
```

Caos queira ver o coverage do projeto, execute:
```bash
npm run test:cov
```

O resultado estará dentro da pasta coverage, na raiz do projeto.


## Swagger
Para acessar o swagger da aplicação, após concluir o as configurações iniciais e executar o projeto, acesse: `http://localhost:3000/api-docs`