/**
 * POST /api/auth/signup — délégué à @mostajs/auth-lite (création compte +
 * session, cookie sur la réponse). @author Dr Hamid MADANI <drmdh@msn.com>
 */
export { signup as POST } from '@/lib/auth/handlers';
