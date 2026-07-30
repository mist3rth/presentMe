# 📝 TODO - Plan d'Action S2P

## Phase 1 : Préparation & Outillage (Shield Pro)
- [ ] Activer TS `strict` dans `tsconfig.json`.
- [ ] Créer l'utilitaire `utils/logger.ts` (`log.dev()`).
- [ ] Créer le composant `ErrorBoundary` dans `src/components/`.

## Phase 2 : Extraction UI (Dry Mode)
- [ ] Créer `src/ui/ButtonMagnetic.tsx`.
- [ ] Créer `src/ui/LinkKinetic.tsx`.
- [ ] Créer `src/ui/SectionHeader.tsx`.
- [ ] Créer `src/ui/ExpertiseCard.tsx`.
- [ ] Créer `src/ui/ValueDriverRow.tsx`.

## Phase 3 : Découpage des Sections (Slicing)
- [ ] Extraire `HeroSection`.
- [ ] Extraire `MethodologySection` ("Décoder l'humain...").
- [ ] Extraire `ExpertisesSection` ("Champs d'expertise").
- [ ] Extraire `ValueDriversSection` ("3 piliers, 9 leviers").
- [ ] Extraire `AudienceSection` ("Différentes équipes...").
- [ ] Extraire `FAQSection`.

## Phase 4 : Polish & SEO (Polish Grail)
- [ ] Optimiser les images (ex: conversion de `earth_orange_bg.jpeg` en WebP et Lazy-Loading).
- [ ] Vérifier/Ajouter les attributs ARIA et la sémantique HTML5.
- [ ] Implémenter les Meta-tags et `JSON-LD`.
- [ ] Nettoyer les fichiers inutiles et formater le code.
