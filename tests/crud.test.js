const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/prisma');

let token;
beforeAll(async () => {
  // ensure there's an admin
  await prisma.user.deleteMany().catch(()=>{});
  await prisma.book.deleteMany().catch(()=>{});
  const admin = await prisma.user.create({ data: { name: 'Admin', email: 'admin@example.com', password: 'x', role: 'ADMIN' } });
  // use login to get token
  const res = await request(app).post('/api/auth/login').send({ email: 'admin@example.com', password: 'x' });
  token = res.body.token;
});

afterAll(async () => {
  await prisma.user.deleteMany().catch(()=>{});
  await prisma.book.deleteMany().catch(()=>{});
  await prisma.$disconnect();
});

describe('CRUD', () => {
  it('creates a user (admin only)', async () => {
    const res = await request(app).post('/api/users').set('Authorization', `Bearer ${token}`).send({ name: 'U1', email: 'u1@example.com', password: 'p' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('email', 'u1@example.com');
  });
});
