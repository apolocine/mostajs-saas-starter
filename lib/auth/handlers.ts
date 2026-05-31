/**
 * Auth handlers — délégués à @mostajs/auth-lite.
 *
 * Le starter consomme désormais le module publié (dogfood) au lieu d'une copie
 * inline. auth-lite pose le cookie sur la réponse (Route Handlers) et calcule la
 * base de redirect via @mostajs/url/baseFromHeaders → fonctionne en WebContainer
 * (Bolt.new/StackBlitz) et derrière un reverse proxy. Les défauts du module
 * (afterAuth '/dashboard', loginError '/login?error=invalid', signupError
 * '/signup?error=<kind>', afterLogout '/') correspondent au comportement attendu.
 *
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { createAuthHandlers } from '@mostajs/auth-lite';
import { getRepos } from '../orm/repositories';

export const { login, signup, logout } = createAuthHandlers({ getRepos });
