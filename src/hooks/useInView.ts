import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** Margin d'anticipation avant l'entrée dans le viewport (ex: '200px' pour charger 200px avant) */
  rootMargin?: string;
  /** Seuil de visibilité (0 = dès qu'un pixel est visible) */
  threshold?: number;
  /** Une fois visible, reste visible (empêche le re-chargement au scroll) */
  once?: boolean;
}

/**
 * Hook qui retourne true quand l'élément ref est dans le viewport.
 * Utilisé pour le lazy-rendering des sections hors-viewport afin de réduire le TBT initial.
 */
export function useInView({
  rootMargin = '200px',
  threshold = 0,
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, inView };
}
