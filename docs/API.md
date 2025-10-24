# API Examples (Auth + Roles)

## Register
POST /api/auth/register
Body: { "name": "Alice", "email": "alice@example.com", "password": "secret" }

## Login
POST /api/auth/login
Body: { "email": "alice@example.com", "password": "secret" }
Response: { "token": "..." }

## Create user (ADMIN only)
POST /api/users
Header: Authorization: Bearer <token>
Body: { "name": "Bob", "email": "bob@example.com", "password": "secret", "role": "USER" }

## Create book (authenticated)
POST /api/books
Header: Authorization: Bearer <token>
Body: { "title": "The Pragmatic Programmer", "author": "Andy Hunt", "userId": 1 }
