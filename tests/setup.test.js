const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/prisma');

beforeAll(async () => {
  // ensure db schema is pushed (prisma db push should be run before tests in CI/local)
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('health', () => {
  it('responds ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});
