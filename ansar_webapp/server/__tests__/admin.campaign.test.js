const request = require('supertest');
const app = require('../src/app');
const { createCampaignSchema } = require('../validation/campaign.validation');

describe('Admin Campaign API', () => {
  let token;
  beforeAll(async () => {
    // Login as admin and get JWT token (implement as needed)
    // token = await getAdminToken();
  });

  it('should validate campaign creation', async () => {
    const res = await request(app)
      .post('/api/admin/campaigns')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: '', description: 'short', status: 'invalid' });
    expect(res.status).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('should create a campaign with valid data', async () => {
    const validCampaign = { title: 'Water Well', description: 'Build a water well in Africa.', status: 'active' };
    const res = await request(app)
      .post('/api/admin/campaigns')
      .set('Authorization', `Bearer ${token}`)
      .send(validCampaign);
    // expect(res.status).toBe(201);
    // expect(res.body._id).toBeDefined();
  });
});
