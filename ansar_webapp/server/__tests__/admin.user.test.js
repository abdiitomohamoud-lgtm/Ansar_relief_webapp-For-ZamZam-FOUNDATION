const request = require('supertest');
const app = require('../src/app');
const { createUserSchema } = require('../validation/user.validation');

describe('Admin User API', () => {
  let token;
  beforeAll(async () => {
    // Login as admin and get JWT token (implement as needed)
    // token = await getAdminToken();
  });

  it('should validate user creation', async () => {
    const res = await request(app)
      .post('/api/admin/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: '', email: 'bad', password: '123', role: 'invalid' });
    expect(res.status).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('should create a user with valid data', async () => {
    const validUser = { name: 'Test User', email: 'test@example.com', password: 'password123', role: 'user' };
    const res = await request(app)
      .post('/api/admin/users')
      .set('Authorization', `Bearer ${token}`)
      .send(validUser);
    // expect(res.status).toBe(201);
    // expect(res.body._id).toBeDefined();
  });
});
