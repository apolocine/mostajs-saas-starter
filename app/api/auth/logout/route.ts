/**
 * POST /api/auth/logout — délégué à @mostajs/auth-lite (session DB + cookie
 * supprimés, redirect '/'). @author Dr Hamid MADANI <drmdh@msn.com>
 */
export { logout as POST } from '@/lib/auth/handlers';
