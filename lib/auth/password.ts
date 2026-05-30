/**
 * Password hashing — salted, iterated SHA-256.
 *
 * Why not scrypt/bcrypt/argon2? They rely on a worker/threadpool path
 * (`crypto.scrypt`, `pbkdf2`) that is **broken in some WebContainers**
 * (StackBlitz: "TypeError: f.run is not a function"), and bcrypt is a native
 * addon. `crypto.createHash` is a plain digest — it works in every runtime
 * (Node, Bolt.new, StackBlitz, edge), which is what a "boots anywhere" starter
 * needs.
 *
 * 🎓 For production, swap this for a real password KDF (argon2id or scrypt on a
 * real server). The interface (hashPassword / verifyPassword) stays the same.
 *
 * Format stored: "salt:hash" (hex). @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { createHash, randomBytes, timingSafeEqual } from 'crypto';

const ITERATIONS = 10_000;

function derive(password: string, salt: string): Buffer {
  let h = createHash('sha256').update(`${salt}:${password}`).digest();
  for (let i = 0; i < ITERATIONS; i++) h = createHash('sha256').update(h).digest();
  return h;
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${derive(password, salt).toString('hex')}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hashHex] = stored.split(':');
  if (!salt || !hashHex) return false;
  const expected = Buffer.from(hashHex, 'hex');
  const actual = derive(password, salt);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
