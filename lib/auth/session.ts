/**
 * getCurrentUser — délégué à @mostajs/auth-lite.
 *
 * `createGetCurrentUser` lit le cookie AVANT toute requête DB (sûr en Server
 * Components / WebContainer), résout la session et peuple l'utilisateur. Même
 * signature qu'avant → les pages du dashboard restent inchangées.
 *
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { createGetCurrentUser } from '@mostajs/auth-lite/next';
import { getRepos } from '../orm/repositories';
import type { User } from '../orm/repositories';

export const getCurrentUser = createGetCurrentUser<User>({ getRepos });
