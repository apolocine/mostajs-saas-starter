/**
 * POST /api/auth/login — délégué à @mostajs/auth-lite.
 * Le module pose le cookie sur la réponse (pas d'AsyncLocalStorage) et redirige
 * vers l'hôte public (baseFromHeaders) → OK en WebContainer / derrière proxy.
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
export { login as POST } from '@/lib/auth/handlers';
