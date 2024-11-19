import { jwtVerify } from 'jose';

export async function verifyJwt(token: string, secret: string) {
  const secretKey = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, secretKey);
  return payload;
}
