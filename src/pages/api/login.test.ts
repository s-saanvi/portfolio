import { describe, it, expect } from 'vitest';
import { POST } from './login';

describe('Login API', () => {
  it('should return 200 for valid credentials', async () => {
    const request = new Request('http://localhost/api/login', {
      method: 'POST',
      body: JSON.stringify({ username: 'admin', password: 'password' }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // @ts-ignore - Mocking APIContext, only need request
    const response = await POST({ request });
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
  });

  it('should return 401 for invalid credentials', async () => {
    const request = new Request('http://localhost/api/login', {
      method: 'POST',
      body: JSON.stringify({ username: 'wrong', password: 'password' }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // @ts-ignore
    const response = await POST({ request });
    expect(response.status).toBe(401);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.message).toBe('Invalid credentials');
  });

  it('should return 400 for malformed JSON request body', async () => {
    // Intentionally pass an invalid JSON string to trigger the catch block in the API
    const request = new Request('http://localhost/api/login', {
      method: 'POST',
      body: '{ this-is-not-valid-json }',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // @ts-ignore
    const response = await POST({ request });
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.message).toBe('Bad request');
  });
});
