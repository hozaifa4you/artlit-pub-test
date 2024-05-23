# Artlit Publication (CRUD API)

> I used the super fast new JavaScript/Typescript runtime [`bun`](https://bun.sh/) for more speed. Please install it from [here.](https://bun.sh/)


To install dependencies:

```bash
bun install
```

To run:

```bash
bun start
```

## What is in the project
- Runtime: `BunJs`
- Framework: `ExpressJs`
- Language: `Typescript`
- Database: `Mongodb`
- ODM: `Prisma`
- Validator: `express-validator`

## Endpoints
- `/api/v1/books/` - Get all books, `GET` method
- `/api/v1/books/` - Create new books, `POST` method and body `book data`
- `/api/v1/books/:id` - Get a single book by id, `GET` method and ID with `params`
- `/api/v1/books/:id` - Delete a book, `DELETE` method and ID with `params`
- `/api/v1/books/:id` - Update a book, `PUT` method, ID with `params` and book data with `body`