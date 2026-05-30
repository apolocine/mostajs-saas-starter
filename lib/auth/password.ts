/**
 * Password hashing with Node's built-in scrypt — no native addon (works in
 * Bolt.new / WebContainer, unlike bcrypt). Async (non-blocking) so heavy hashing
 * never stalls the event loop. Format stored: "salt:hash" (hex).
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const hash = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${hash.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hashHex] = stored.split(':');
  if (!salt || !hashHex) return false;
  const expected = Buffer.from(hashHex, 'hex');
  const actual = (await scryptAsync(password, salt, 64)) as Buffer;
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
