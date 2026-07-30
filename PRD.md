# 📋 Product Requirements Document (PRD) - Industrialisation S2P

## 1. Objectifs
- Refactoriser le monolithe `App.tsx` vers une architecture atomique et modulaire.
- Mutualiser le code (DRY) et créer des composants UI réutilisables.
- Renforcer la robustesse technique (Typage TypeScript strict, Shield Pro, Error Boundaries).
- Optimiser les performances, le SEO (AEO Ready), et l'accessibilité (A11y).
- Appliquer un niveau de Polish "Grail" (GSAP, Animations) sans altérer le design initial.

## 2. Périmètre
- Découpage complet de `src/App.tsx` qui fait actuellement plus de 1100 lignes.
- Mise en place d'un système de log de développement (`log.dev()`).
- Implémentation d'Error Boundaries pour la résilience.
- Intégration de balises SEO, attributs ARIA pour l'accessibilité.
- Nettoyage des assets et fichiers inutiles.

## 3. Contraintes & Règles
- **Zéro décision autonome** sur l'esthétique.
- **Respect Absolu du Design (Stitch-First)**.
- Conservation stricte des textes et médias réels (Zéro placeholders).
- Pas de "Vibe Coding" esthétique, focus technique uniquement.
