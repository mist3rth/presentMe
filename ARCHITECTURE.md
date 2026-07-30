# 🏗️ ARCHITECTURE - S2P Industrialisation

## 1. Structure des Dossiers (Clean Architecture)
```text
src/
├── layouts/          # MainLayout, Navigation, Footer
├── components/       # Sections métier
│   ├── Hero/
│   ├── Methodology/
│   ├── Expertises/
│   ├── ValueDrivers/
│   └── Audience/
├── ui/               # Composants atomiques
│   ├── Button/
│   ├── Typography/
│   └── Card/
├── styles/           # Design Tokens & CSS globaux
├── hooks/            # Hooks personnalisés (ex: useScrollSpy)
├── utils/            # Helpers, Custom Logger (log.dev)
└── assets/           # Médias (WebP, SVGs)
```

## 2. Plan de Découpage de `App.tsx`
`App.tsx` sera réduit à l'orchestration principale :
- `MainLayout` pour envelopper l'application.
- Sections isolées :
  - `HeroSection` (titre principal, manifeste)
  - `MethodologySection` (Décoder l'humain...)
  - `ExpertisesSection` (Piliers d'intervention)
  - `ValueDriversSection` (9 leviers de valeur)
  - `AudienceSection` (Différentes équipes. Même clarté.)
  - `ContactSection` / FAQ

## 3. Composants UI Mutualisés Identifiés
- `ButtonMagnetic` : CTA principal (Découvrir le workflow).
- `LinkKinetic` : CTA secondaire (Voir les cas d'étude).
- `SectionHeader` : Entête récurrente pour les sections avec indicateurs (ex: Piliers d'intervention, 9 leviers).
- `ExpertiseCard` : Carte animée pour les piliers d'expertises (ex: "Fondateurs & Dirigeants").
- `ValueDriverRow` : Ligne pour les 9 leviers de valeur.

## 4. Sécurité & Qualité (Shield Pro)
- **ErrorBoundary** : Enveloppement des composants majeurs.
- **Logger** : Utilitaires pour logger seulement en mode dev.
