import { SignJWT, jwtVerify } from 'jose';

// Define a secret key. In production, this should come from environment variables.
// Use a fallback for development/build if needed, but error if not provided in production.
const getSecret = () => {
  const secretStr = import.meta.env.JWT_SECRET || 'default-insecure-secret-key-change-in-prod-12345678901234567890';
  return new TextEncoder().encode(secretStr);
};

export async function createSessionToken(username: string): Promise<string> {
  const secret = getSecret();

  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h') // Session expires in 2 hours
    .sign(secret);

  return token;
}

export async function verifySessionToken(token: string): Promise<{ username: string } | null> {
  try {
    const secret = getSecret();
    const { payload } = await jwtVerify(token, secret);

    if (payload.username && typeof payload.username === 'string') {
      return { username: payload.username };
    }

    return null;
  } catch (error) {
    // Token verification failed (expired, invalid signature, etc.)
    return null;
  }
}
