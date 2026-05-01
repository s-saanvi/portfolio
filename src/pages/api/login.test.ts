import { describe, it, expect, vi } from 'vitest';
import { POST } from './login';
import type { APIContext } from 'astro';

describe('POST /api/login', () => {
  it('should return 200 on valid credentials', async () => {
    // Inject the expected environment variables for the test
    vi.stubEnv('ADMIN_USERNAME', 'admin');
    vi.stubEnv('ADMIN_PASSWORD', 'password');

    const mockRequest = new Request('http://localhost/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'password',
      }),
    });

    // Provide minimal mock for APIContext if required
    const mockContext = {
      request: mockRequest,
    } as APIContext;

    const response = await POST(mockContext);

    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('application/json');

    const data = await response.json();
    expect(data.success).toBe(true);
  });

  it('should return 401 on invalid credentials', async () => {
    const mockRequest = new Request('http://localhost/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'wrong',
        password: 'wrong',
      }),
    });

    const mockContext = {
      request: mockRequest,
    } as APIContext;

    const response = await POST(mockContext);

    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(401);
    expect(response.headers.get('Content-Type')).toBe('application/json');

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.message).toBe('Invalid credentials');
  });

  it('should return 400 on bad request (e.g. invalid JSON)', async () => {
    const mockRequest = new Request('http://localhost/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'invalid-json',
    });

    const mockContext = {
      request: mockRequest,
    } as APIContext;

    const response = await POST(mockContext);

    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(400);
    expect(response.headers.get('Content-Type')).toBe('application/json');

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.message).toBe('Bad request');
  });
});
