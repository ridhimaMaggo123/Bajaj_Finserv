const request = require('supertest');
const app = require('../index');

describe('API Tests', () => {
  // Test health check endpoint
  test('GET /health should return success', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      is_success: true,
      official_email: 'ridhima3915.beai23@chitkara.edu.in'
    });
  });

  // Test Fibonacci endpoint
  test('POST /bfhl with fibonacci should return correct sequence', async () => {
    const response = await request(app)
      .post('/bfhl')
      .send({ fibonacci: 7 });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      is_success: true,
      official_email: 'ridhima3915.beai23@chitkara.edu.in',
      data: [0, 1, 1, 2, 3, 5, 8]
    });
  });

  // Test Prime endpoint
  test('POST /bfhl with prime should return prime numbers', async () => {
    const response = await request(app)
      .post('/bfhl')
      .send({ prime: [2, 4, 7, 9, 11] });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      is_success: true,
      official_email: 'ridhima3915.beai23@chitkara.edu.in',
      data: [2, 7, 11]
    });
  });

  // Test LCM endpoint
  test('POST /bfhl with lcm should return correct LCM', async () => {
    const response = await request(app)
      .post('/bfhl')
      .send({ lcm: [12, 18, 24] });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      is_success: true,
      official_email: 'ridhima3915.beai23@chitkara.edu.in',
      data: 72
    });
  });

  // Test HCF endpoint
  test('POST /bfhl with hcf should return correct HCF', async () => {
    const response = await request(app)
      .post('/bfhl')
      .send({ hcf: [24, 36, 60] });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      is_success: true,
      official_email: 'ridhima3915.beai23@chitkara.edu.in',
      data: 12
    });
  });

  // Test validation errors
  test('POST /bfhl with invalid input should return error', async () => {
    const response = await request(app)
      .post('/bfhl')
      .send({ invalid: 'input' });
    
    expect(response.status).toBe(400);
    expect(response.body.is_success).toBe(false);
  });
});