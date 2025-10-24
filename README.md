# Node.js Users & Books (Plain JavaScript) with Auth, Tests, CI

This project is a plain JavaScript (CommonJS) implementation of the Users-Books API with:
- JWT authentication (role-based: USER / ADMIN)
- Prisma ORM (schema included)
- Redis integration (optional, example included)
- Jest & Supertest tests (uses SQLite via `prisma db push` for quick local runs)
- GitHub Actions CI workflow to run tests and lint

## Quick start (using SQLite for quick local testing)
1. Copy `.env.example` to `.env` and uncomment `DATABASE_URL="file:./dev.db"` for sqlite usage.
2. Install dependencies: `npm install`
3. Generate Prisma client and push schema: `npm run prisma:generate && npm run prisma:dbpush`
4. Run tests: `npm test`
5. Run server: `npm run dev`

API highlights:
- POST /api/auth/register -> register (stores hashed password, default role USER)
- POST /api/auth/login -> login (returns JWT)
- Protected endpoints require `Authorization: Bearer <token>`
- Role-guard middleware for ADMIN-only actions
