/**
 * Custom Logger (Shield Pro)
 * N'affiche les logs qu'en mode développement.
 */
export const log = {
  dev: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.log('[DEV]', ...args);
    }
  },
  error: (...args: unknown[]) => {
    console.error('[ERROR]', ...args);
  },
  warn: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.warn('[WARN]', ...args);
    }
  }
};
