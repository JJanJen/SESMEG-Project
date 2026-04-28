const request = require('supertest');
const app = require('../src/app');

test('API home route works', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('Housing Roommate Finder API is running');
});
