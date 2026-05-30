/**
 * Password hashing with Node's built-in scrypt — no native addon (works in
 * Bolt.new / WebContainer, unlike bcrypt). Uses the SYNCHRONOUS scryptSync:
 * WebContainer's async crypto.scrypt is broken ("u.run is not a function"),
 * while scryptSync works. Hashing one password is fast enough to be fine inline.
 * Format stored: "salt:hash" (hex). @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hashHex] = stored.split(':');
  if (!salt || !hashHex) return false;
  const expected = Buffer.from(hashHex, 'hex');
  const actual = scryptSync(password, salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
