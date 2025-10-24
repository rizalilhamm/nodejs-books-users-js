const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/prisma');
const jwt = require('jsonwebtoken');
const fs = require('fs');

beforeAll(async () => {
  // Ensure clean sqlite file for tests if using sqlite; for CI, pipeline should set DATABASE_URL to sqlite file
});

afterAll(async () => {
  await prisma.user.deleteMany().catch(()=>{});
  await prisma.book.deleteMany().catch(()=>{});
  await prisma.$disconnect();
});

describe('auth flow', () => {
  it('registers, logs in and returns token', async () => {
    const email = 'test@example.com';
    const registerRes = await request(app).post('/api/auth/register').send({ name: 'Test', email, password: 'secret' });
    expect(registerRes.statusCode).toBe(201);
    const loginRes = await request(app).post('/api/auth/login').send({ email, password: 'secret' });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toHaveProperty('token');
    const token = loginRes.body.token;
    const payload = jwt.decode(token);
    expect(payload).toHaveProperty('email', email);
  });
});
