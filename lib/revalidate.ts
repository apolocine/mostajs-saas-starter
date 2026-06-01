/**
 * revalidatePath **best-effort**.
 *
 * En WebContainer (StackBlitz / Bolt.new), le « static generation store » peut
 * manquer dans une Server Action → `revalidatePath` lève
 * `Invariant: static generation store missing`. On ignore l'échec : les pages
 * `force-dynamic` re-fetchent de toute façon à la navigation.
 *
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
import { revalidatePath } from 'next/cache';

export function safeRevalidate(path: string): void {
  try {
    revalidatePath(path);
  } catch {
    /* WebContainer: store de génération absent — no-op */
  }
}
