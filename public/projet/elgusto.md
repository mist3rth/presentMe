# El Gusto — L'Expérience Gastronomique Augmentée

> Catégorie : E-Commerce Premium
> Durée : 3 jours
> Rôle / Outils : Architecte & Développeur Full-Stack (Assisté par IA)
> Lien de production : https://elgusto.vercel.app/

## Brief du Projet
El Gusto est une plateforme e-commerce premium dédiée à une expérience gastronomique inoubliable, mettant en valeur des plats faits maison et des produits de saison. L'objectif était de créer une expérience utilisateur haut de gamme, fluide et alléchante, incluant des fonctionnalités innovantes telles qu'un moteur de "Smart Pairing" (recommandations intelligentes) pour suggérer des entrées, desserts ou boissons parfaits selon le contenu actuel du panier de l'utilisateur.
Le défi majeur consistait à transformer rapidement un prototype visuel brut en une application de production robuste, immersive (grâce à des animations fluides), accessible (A11Y) et extrêmement performante.

## Stack Technologique
- React 19 (Vite)
- TypeScript Strict
- Tailwind CSS v4
- Framer Motion / GSAP
- Express.js & Node.js
- @google/genai (Gemini API)
- JSON-LD & SEO Structuré (React Helmet)

## Workflow d'Implémentation
1. **Prototypage Visuel (Stitch)** : Génération du design et de la structure initiale des menus, des sections d'inspiration et du panier interactif via l'outil d'idéation Stitch.
2. **Audit & Stratégie (PRD)** : Analyse de la base générée et écriture d'une feuille de route stricte pour garantir une architecture évolutive tout en préservant le design premium et luxueux du restaurant.
3. **Refactoring Industriel (AI Studio)** : Découpage du code en composants React atomiques hautement réutilisables, implémentation d'un typage TypeScript de bout en bout et gestion d'état isolée (hooks de panier et recommandations).
4. **Enrichissement GenAI** : Préparation de l'architecture pour une intégration avancée de l'API Gemini afin de proposer des recommandations de plats ou de vins hyper-personnalisées en temps réel selon les choix de l'utilisateur.
5. **Optimisation & Polish (BMAD)** : Nettoyage des scripts, intégration des animations complexes (Framer Motion / GSAP), optimisation du rendu visuel (LCP < 2.5s, CLS < 0.1), et strict respect de l'accessibilité (navigation au clavier) et de la sémantique.

## Bénéfices Clés
- **Vélocité Extrême** : Un produit fini, immersif et prêt pour la production, réalisé en seulement 3 jours.
- **Qualité "Production-Ready"** : Le développement a été guidé par une architecture logicielle rigoureuse (isolation des hooks métiers, composants UI lazy-loadés), résultant en une base de code propre, maintenable et scalable.
- **Expérience Utilisateur Immersive** : L'intégration soignée des animations et le 'Smart Pairing' dans le panier apportent une dimension interactive à très haute valeur ajoutée, reflétant le prestige d'un restaurant d'exception.
- **Zéro Compromis** : Les standards industriels (Performance, SEO via Helmet, A11Y) ont été respectés dès le jour 1, sans repousser la dette technique.
