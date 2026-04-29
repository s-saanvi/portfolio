import type { APIRoute } from 'astro';
import { createSessionToken } from '../../utils/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { username, password } = data;

    // Use environment variables for secure authentication
    if (
      username === import.meta.env.ADMIN_USERNAME &&
      password === import.meta.env.ADMIN_PASSWORD
    ) {
      const token = await createSessionToken(username);

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `admin-session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax`
        }
      });
    }

    return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'Bad request' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
