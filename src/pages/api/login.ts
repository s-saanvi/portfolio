import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { username, password } = data;

    // In a real application, this would be validated against a database
    // and use secure hashing for passwords.
    if (username === 'admin' && password === 'password') {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
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
