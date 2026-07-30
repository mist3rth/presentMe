import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  X, 
  ExternalLink, 
  Clock, 
  User, 
  Sparkles, 
  Code, 
  Layers, 
  Award, 
  CheckCircle2, 
  ArrowLeft,
  Tv,
  Image as ImageIcon,
  Compass
} from 'lucide-react';
import bigleafImg from '../assets/bigleaf.webp';
import elgustoImg from '../assets/elgusto.webp';
import vaAthleticImg from '../assets/vaathletic.webp';
import primeImmobilierImg from '../assets/primeimmobilier.webp';
import japonImg from '../assets/japon.webp';
import japon1Img from '../assets/japon1.webp';
import japon2Img from '../assets/japon2.webp';
import japon3Img from '../assets/japon3.webp';
import japon4Img from '../assets/japon4.webp';
import japanVideo from '../assets/japan.mp4';
import noctaImg from '../assets/nocta.webp';
import nocta1Img from '../assets/nocta1.webp';
import nocta2Img from '../assets/nocta2.webp';
import nocta3Img from '../assets/nocta3.webp';
import nocta4Img from '../assets/nocta4.webp';
import noctaVideo from '../assets/nocta.mp4';
import nikeImg from '../assets/nike.webp';
import nike1Img from '../assets/nike1.webp';
import nike2Img from '../assets/nike2.webp';
import nike3Img from '../assets/nike3.webp';
import nike4Img from '../assets/nike4.webp';
import nikeVideo from '../assets/nike.mp4';
import assosImg from '../assets/assos.webp';
import assos1Img from '../assets/assos1.webp';
import assos2Img from '../assets/assos2.webp';
import assos3Img from '../assets/assos3.webp';
import assos4Img from '../assets/assos4.webp';
import assos5Img from '../assets/assos5.webp';
import DotImageReveal from './DotImageReveal';

export interface Project {
  id: string;
  title: string;
  category: string;
  type: 'digital' | 'artistic';
  duration: string;
  roleOrTools: string;
  link?: string;
  imageUrl: string;
  description: string;
  
  // High fidelity detail fields for 'fiche projet'
  brief?: string;
  stack?: string[];
  workflow?: {
    step: string;
    title: string;
    desc: string;
  }[];
  benefits?: string[];
  conclusion?: string;
  
  // Optional image overrides for custom visual grids
  overviewA?: string;
  overviewB?: string;
  overviewC?: string;
  conclusionA?: string;
  conclusionB?: string;
  conclusionVideo?: string;
}

export const projects: Project[] = [
  {
    id: 'bigleaf',
    title: "Bigleaf - L'E-commerce Botanique Augmenté",
      category: "E-Commerce & GenAI",
      type: "digital",
      duration: "3 jours",
      roleOrTools: "Architecte & Développeur Full-Stack (Assisté par IA)",
      link: "https://bigleaf.vercel.app/",
      imageUrl: bigleafImg,
      description: "Plateforme e-commerce haut de gamme de succulentes rares avec un questionnaire IA d'entretien intelligent.",
      brief: "Bigleaf est une plateforme e-commerce premium dédiée aux succulentes, cactus et plantes rares. L'objectif était de créer une expérience utilisateur haut de gamme, fluide et rassurante, incluant des fonctionnalités innovantes telles qu'un \"CareQuiz\" basé sur l'Intelligence Artificielle pour recommander les plantes parfaites selon l'environnement de l'utilisateur.\n\nLe défi majeur consistait à transformer rapidement un prototype visuel brut en une application de production robuste, performante, accessible (A11Y) et optimisée pour le référencement (SEO).",
      stack: [
        "React 19 (Vite)",
        "TypeScript Strict",
        "Tailwind CSS v4",
        "Framer Motion / GSAP",
        "Express.js & Node.js",
        "@google/genai (Gemini API)",
        "JSON-LD & SEO Structuré"
      ],
      workflow: [
        {
          step: "01",
          title: "Prototypage Visuel (Stitch)",
          desc: "Génération du design et de la structure initiale du catalogue et du quiz via l'outil d'idéation Stitch."
        },
        {
          step: "02",
          title: "Audit & Stratégie (PRD)",
          desc: "Analyse du monolithe brut généré et écriture d'une feuille de route stricte pour préserver le design premium."
        },
        {
          step: "03",
          title: "Refactoring Industriel (AI Studio)",
          desc: "Découpage du code en composants atomiques hautement réutilisables, typage de bout en bout et isolation de l'état."
        },
        {
          step: "04",
          title: "Enrichissement GenAI",
          desc: "Connexion directe du CareQuiz à l'API Gemini pour adapter l'analyse botanique en temps réel selon les réponses."
        },
        {
          step: "05",
          title: "Optimisation & Polish (BMAD)",
          desc: "Nettoyage des scripts, optimisation de l'affichage (LCP < 2.5s, CLS < 0.1), respect de l'accessibilité au clavier et sémantique."
        }
      ],
      benefits: [
        "Vélocité Extrême : Un produit fini, de la conception au déploiement de production, réalisé en seulement 3 jours.",
        "Qualité 'Production-Ready' : Contrairement au 'vibe coding' chaotique, l'IA a été guidée par une architecture logicielle rigoureuse, résultant en une base de code propre, maintenable et scalable.",
        "Innovation Intégrée : Le gain de temps sur l'intégration classique a permis de se concentrer sur des features à haute valeur ajoutée comme le questionnaire intelligent (GenAI).",
        "Zéro Compromis : Les standards industriels (Performance, SEO, A11Y) ont été respectés dès le jour 1, sans repousser la dette technique."
      ]
    },
    {
      id: 'elgusto',
      title: "El Gusto - L'Expérience Gastronomique Augmentée",
      category: "E-Commerce Premium",
      type: "digital",
      duration: "3 jours",
      roleOrTools: "Architecte & Développeur Full-Stack (Assisté par IA)",
      link: "https://elgusto.vercel.app/",
      imageUrl: elgustoImg,
      description: "Plateforme e-commerce haut de gamme de restauration d'exception avec un système de recommandations culinaires intelligent.",
      brief: "El Gusto est une plateforme e-commerce premium dédiée à une expérience gastronomique inoubliable, mettant en valeur des plats faits maison et des produits de saison. L'objectif était de créer une expérience utilisateur haut de gamme, fluide et alléchante, incluant des fonctionnalités innovantes telles qu'un moteur de \"Smart Pairing\" (recommandations intelligentes) pour suggérer des entrées, desserts ou boissons parfaits selon le contenu actuel du panier de l'utilisateur.\n\nLe défi majeur consistait à transformer rapidement un prototype visuel brut en une application de production robuste, immersive (grâce à des animations fluides), accessible (A11Y) et extrêmement performante.",
      stack: [
        "React 19 (Vite)",
        "TypeScript Strict",
        "Tailwind CSS v4",
        "Framer Motion / GSAP",
        "Express.js & Node.js",
        "@google/genai (Gemini API)",
        "JSON-LD & SEO Structuré (React Helmet)"
      ],
      workflow: [
        {
          step: "01",
          title: "Prototypage Visuel (Stitch)",
          desc: "Génération du design et de la structure initiale des menus, des sections d'inspiration et du panier interactif via l'outil d'idéation Stitch."
        },
        {
          step: "02",
          title: "Audit & Stratégie (PRD)",
          desc: "Analyse de la base générée et écriture d'une feuille de route stricte pour garantir une architecture évolutive tout en préservant le design premium et luxueux du restaurant."
        },
        {
          step: "03",
          title: "Refactoring Industriel (AI Studio)",
          desc: "Découpage du code en composants React atomiques hautement réutilisables, implémentation d'un typage TypeScript de bout en bout et gestion d'état isolée (hooks de panier et recommandations)."
        },
        {
          step: "04",
          title: "Enrichissement GenAI",
          desc: "Préparation de l'architecture pour une intégration avancée de l'API Gemini afin de proposer des recommandations de plats ou de vins hyper-personnalisées en temps réel selon les choix de l'utilisateur."
        },
        {
          step: "05",
          title: "Optimisation & Polish (BMAD)",
          desc: "Nettoyage des scripts, intégration des animations complexes (Framer Motion / GSAP), optimisation du rendu visuel (LCP < 2.5s, CLS < 0.1), et strict respect de l'accessibilité (navigation au clavier) et de la sémantique."
        }
      ],
      benefits: [
        "Vélocité Extrême : Un produit fini, immersif et prêt pour la production, réalisé en seulement 3 jours.",
        "Qualité 'Production-Ready' : Contrairement au 'vibe coding' chaotique, le développement a été guidé par une architecture logicielle rigoureuse (isolation des hooks métiers, composants UI lazy-loadés), résultant en une base de code propre, maintenable et scalable.",
        "Expérience Utilisateur Immersive : L'intégration soignée des animations et le 'Smart Pairing' dans le panier apportent une dimension interactive à très haute valeur ajoutée, reflétant le prestige d'un restaurant d'exception.",
        "Zéro Compromis : Les standards industriels (Performance, SEO via Helmet, A11Y) ont été respectés dès le jour 1, sans repousser la dette technique."
      ]
    },
    {
      id: 'vaathletic',
      title: "VA Athletic - L'Excellence du Coaching Privé",
      category: "Vitrine Premium",
      type: "digital",
      duration: "1 jour",
      roleOrTools: "Architecte & Développeur Full-Stack (Assisté par IA)",
      link: "https://va-athletic.vercel.app/",
      imageUrl: vaAthleticImg,
      description: "Vitrine digitale haut de gamme for un coach sportif d'élite, conçue autour d'un flux cognitif inspirant l'autorité et la confiance absolue.",
      brief: "VA Athletic est une plateforme digitale premium dédiée à l'accompagnement sportif sur-mesure par un coach privé. L'objectif absolu était de concevoir un parcours utilisateur (flux cognitif) psychologiquement optimisé pour inspirer la confiance, asseoir l'expertise et convertir les prospects, le tout enveloppé dans une direction artistique sombre, minimaliste et luxueuse.\n\nLe défi majeur de ce projet ne résidait pas dans l'intégration de fonctionnalités complexes, mais dans l'exécution et la vélocité : utiliser l'Intelligence Artificielle non pas comme une feature du site, mais comme un puissant levier d'ingénierie pour transformer un prototype en une application de production parfaitement fluide, accessible et performante en seulement 1 jour.",
      stack: [
        "React 19 (Vite)",
        "TypeScript Strict",
        "Tailwind CSS v4",
        "Framer Motion (motion/react)",
        "IA Générative (Accélération du cycle de développement)",
        "Intersection Observer API"
      ],
      workflow: [
        {
          step: "01",
          title: "Prototypage Visuel (Stitch)",
          desc: "Génération de la direction artistique (dark UI) et de la structure narrative du site visant à rassurer (Credo, Méthodologie, Témoignages)."
        },
        {
          step: "02",
          title: "Audit & Stratégie (PRD)",
          desc: "Cadrage strict de l'architecture pour supporter des animations fluides sans sacrifier les performances, avec une attention particulière portée sur la hiérarchie de l'information."
        },
        {
          step: "03",
          title: "Accélération par l'IA (AI Studio)",
          desc: "Utilisation intensive de l'IA générative pour coder à une vitesse décuplée : refactoring industriel, découpage ultra-rapide des composants React (Hero, Stats, About, Tariffs), typage TypeScript strict de bout en bout et mise en place d'un lazy-loading global (Suspense)."
        },
        {
          step: "04",
          title: "Ingénierie du Flux Cognitif",
          desc: "Placement stratégique de la preuve sociale (Chiffres clés, Médias, Témoignages) et orchestration des micro-interactions pour guider naturellement l'utilisateur vers l'action, renforçant le sentiment de fiabilité à chaque scroll."
        },
        {
          step: "05",
          title: "Optimisation & Polish (BMAD)",
          desc: "Intégration d'animations d'apparition raffinées (Framer Motion / Intersection Observer), optimisation radicale des temps de chargement (LCP < 2.5s) via un preloader SVG, et strict respect de l'accessibilité au clavier."
        }
      ],
      benefits: [
        "Vélocité Record (1 Jour) : L'IA est intervenue comme un 'pair-programmer' surpuissant, permettant de réduire un cycle de développement standard de plusieurs jours à seulement 24 heures, de la conception au déploiement.",
        "Architecture de la Confiance : L'absence de distractions et l'approche psychologique du design (espaces négatifs, typographie élégante, preuves d'autorité) instaurent un climat de sécurité immédiat pour un service haut de gamme.",
        "Qualité 'Production-Ready' : La rapidité d'exécution n'a pas excusé le 'vibe coding'. L'approche architecturale rigoureuse garantit des performances exceptionnelles et une base de code propre.",
        "Zéro Compromis : Les standards industriels de la méthode BMAD (Performance maximale, accessibilité WCAG AA, SEO structuré) ont été validés intégralement, livrant un produit sans dette technique."
      ]
    },
    {
      id: 'primeimmobilier',
      title: "Prime Immobilier - L'Excellence Résidentielle",
      category: "Vitrine de Prestige",
      type: "digital",
      duration: "4 jours",
      roleOrTools: "Architecte & Développeur Full-Stack (Assisté par IA)",
      link: "https://prime-immobilier.vercel.app/",
      imageUrl: primeImmobilierImg,
      description: "Vitrine digitale haut de gamme pour des actifs immobiliers d'exception, alliant design luxueux, flux cognitif optimisé et animations léchées.",
      brief: "Prime Immobilier est une plateforme digitale statutaire conçue pour mettre en valeur des biens résidentiels de prestige. L'objectif absolu était de délivrer un parcours utilisateur d'une fluidité absolue, pensé pour instaurer un \"flow cognitif\" optimum. Chaque interaction devait respirer le luxe et la fiabilité afin de rassurer une clientèle d'investisseurs exigeants.\n\nLe défi majeur consistait à transformer une maquette interactive générée par IA (Stitch) en une véritable application de niveau production (sécurisée, A11Y, SEO-ready) en seulement 4 jours, avec un impératif de zéro régression esthétique et d'intégration d'animations haut de gamme sans jamais pénaliser les performances.",
      stack: [
        "React 19 (Vite)",
        "TypeScript Strict & Zod (Validation / Sécurité)",
        "Tailwind CSS v4",
        "Framer Motion (motion/react)",
        "IA Générative (Accélération du cycle 'Stitch to Production')",
        "JSON-LD & SEO Structuré"
      ],
      workflow: [
        {
          step: "01",
          title: "Prototypage Visuel (Stitch)",
          desc: "Génération de la direction artistique, des grilles de présentation (USP Bento) et des composants interactifs de base (Portfolio, Marquee, FAQ) via l'outil d'idéation Stitch."
        },
        {
          step: "02",
          title: "Audit & Stratégie (PRD)",
          desc: "Rédaction d'une feuille de route technique stricte pour encadrer la transition d'un monolithe vers une architecture atomique, avec un respect maniaque du rythme visuel (grille de 8 points) et de la typographie (Type Scale sur un ratio de 1.25) pour garantir l'élégance visuelle."
        },
        {
          step: "03",
          title: "Refactoring Industriel (AI Studio)",
          desc: "Découpage massif et ultra-rapide du code en composants React assisté par l'IA. Sécurisation complète du projet (Shield Pro) avec validation stricte du formulaire de contact via Zod et implémentation d'Error Boundaries globales."
        },
        {
          step: "04",
          title: "Ingénierie du Flux Cognitif & Animations Léchées",
          desc: "Travail chirurgical sur la fluidité du parcours : orchestration de micro-interactions et d'animations d'apparition d'une grande douceur (Framer Motion) pour sublimer le contenu. Ingénierie 'Compositor-First' (restriction aux animations de Tier 1) garantissant 60 FPS constants au scroll pour un ressenti premium sans la moindre saccade."
        },
        {
          step: "05",
          title: "Optimisation & Polish (BMAD)",
          desc: "Intégration d'images immobilières optimisées (WebP/AVIF), structuration des données pour le référencement (JSON-LD), et validation de l'accessibilité selon les standards WCAG AA (contrastes stricts de 4.5:1, navigation clavier complète) pour ne laisser aucun utilisateur de côté."
        }
      ],
      benefits: [
        "Vélocité Record (4 Jours) : L'utilisation de l'IA comme 'pair-programmer' industriel a permis de convertir une maquette en un site de production complet, sécurisé et performant en 24 heures.",
        "Perception Premium & Flux Cognitif : La rigueur géométrique (grille de 8px) couplée à des animations léchées et sans accrocs engagent l'utilisateur dans une navigation fluide, renvoyant immédiatement un sentiment de luxe et de perfection.",
        "Architecture Robuste : Contrairement au code brut généré par défaut, l'application repose sur des fondations solides (TypeScript strict, Zod) qui la rendent maintenable et scalable à long terme.",
        "Zéro Compromis : Les standards industriels de la méthode BMAD ont été scrupuleusement respectés, assurant une indexation optimale (SEO/AEO) et une accessibilité parfaite dès le jour 1."
      ]
    },
    // Creative / Artistic Projects
    {
      id: 'japon',
      title: "Japan Airlines /// \"Breathe\"",
      category: "Campagne IA (DA & Vidéo)",
      type: "artistic",
      duration: "2 jours",
      roleOrTools: "Claude, Whisk, Flow, CapCut",
      imageUrl: japonImg,
      overviewA: japon1Img,
      overviewB: japon2Img,
      overviewC: japon3Img,
      conclusionA: japon4Img,
      conclusionVideo: japanVideo,
      description: "Une campagne de marque conçue entièrement avec l'IA, de la stratégie créative aux prompts vidéo.",
      brief: "En partant de la nouvelle campagne Air France \"S'envoler en toute élégance\", l'exercice consistait à prouver que l'IA peut générer un travail de création émotionnel, cohérent et publicitairement efficace sans tomber dans le générique.\n\nLe brief s'est construit en direct : choix de Japan Airlines comme marque cible, palette sakura + gris cendre + noir encre, direction poétique et onirique. Le vrai défi était d'éviter l'exotisme décoratif et de trouver une émotion universellement lisible pour un public européen : le calme, la sérénité, l'envie d'y être.\n\nDeux visuels générés sur Whisk ont validé le concept : une femme en kimono entourée d'une grue formée de pétales de cerisier, et une femme en robe blanche en lévitation parmi des plumes. Pour chacun, un prompt vidéo cinématographique a été rédigé du noir absolu jusqu'au plan final sur le logo JAL.\n\nCONCEPT : \"The journey begins when you exhale\"\nPALETTE : Rose sakura · Gris cendre · Noir encre\nFORMAT : 6 visuels print + 2 prompts vidéo\nCIBLE : Marché européen, adultes 30–55 ans",
      stack: ["Claude Sonnet 4.6", "Google Whisk", "Flow", "CapCut"],
      conclusion: "Ce projet démontre qu'une IA peut tenir un rôle de directeur créatif stratégique pas seulement générer des images. La valeur réelle est dans la construction du brief : identifier l'insight émotionnel juste, éviter les clichés culturels, calibrer chaque prompt pour qu'il serve une intention. L'image finale n'est que la surface visible d'un travail de pensée créative et éditoriale mené entièrement en langage naturel."
    },
    {
      id: 'nocta',
      title: "NOCTA /// \"Wear the future. Break the present.\"",
      category: "Campagne IA (Stratégie & DA)",
      type: "artistic",
      duration: "2 jours",
      roleOrTools: "Gemini, Whisk, CapCut, Photopea",
      imageUrl: noctaImg,
      overviewA: nocta1Img,
      overviewB: nocta2Img,
      overviewC: nocta3Img,
      conclusionVideo: noctaVideo,
      conclusionA: nocta4Img,
      description: "Une marque de haute horlogerie créée entièrement avec l'IA, de la stratégie à la campagne finale.",
      brief: "L'exercice consistait à prouver qu'un profil technique sans formation créative, sans background en direction artistique pouvait construire une marque de luxe complète et cohérente en pilotant l'IA.\n\nLe vrai défi n'était pas technique. C'était créatif : éviter les codes attendus de l'horlogerie de luxe (noir profond, or, héritage suisse, clair-obscur façon Caravaggio) pour trouver un territoire visuel inédit et crédible sur le segment 30 000 – 100 000 €.\n\nLe brief s'est construit en direct et par itération : rejet des premiers concepts trop conventionnels, pivot radical vers chrome froid et bleu électrique, ancrage dans la rue urbaine dégradée plutôt qu'en studio. Chaque insatisfaction est devenue une direction. Chaque correction a affiné l'identité.\n\nQuatre visuels générés sur Whisk ont validé le concept : une montre au sol sous la pluie face à des graffitis colorés, un poignet dans un tunnel urbain, un visage aux yeux bleus électriques avec la montre au poignet, un cadran en macro sous la pluie. Pour chacun, un prompt vidéo cinématographique a été rédigé du clip statique jusqu'au brand film final monté dans CapCut.\n\nCONCEPT : \"La montre qui appartient à la rue autant qu'à un poignet à 80 000€\"\nPALETTE : Chrome · Bleu électrique · Béton gris · Noir urban\nFORMAT : 4 visuels print · 1 brand film 5 secondes · Plateforme de marque\nCIBLE : Génération fondatrice, mixte, 40 ans, CSP++, 30 000 – 100 000 €",
      stack: ["Gemini 1.5 Pro", "Google Whisk", "CapCut", "Photopea"],
      conclusion: "Ce projet démontre qu'un profil tech peut tenir un rôle de directeur créatif stratégique pas seulement exécuter des prompts. La valeur réelle est dans la construction itérative du brief : identifier le territoire visuel juste, rejeter les clichés du secteur, calibrer chaque prompt pour qu'il serve une intention de marque précise.\n\nLa campagne finale n'est que la surface visible d'un travail de positionnement, de direction artistique et d'écriture créative mené entièrement en langage naturel.\n\nCe n'est pas l'IA qui a créé NOCTA. C'est l'IA orchestrée par une intention."
    },
    {
      id: 'nike',
      title: "NIKE AIR MAX 90 /// \"Just Do It. Make fun.\"",
      category: "Campagne IA (DA & Rédaction)",
      type: "artistic",
      duration: "4 jours",
      roleOrTools: "Gemini, Whisk, CapCut, Photopea",
      imageUrl: nikeImg,
      overviewA: nike1Img,
      overviewB: nike2Img,
      overviewC: nike3Img,
      conclusionA: nike4Img,
      conclusionVideo: nikeVideo,
      description: "Une campagne publicitaire humoristique créée entièrement avec l'IA, du concept au film final.",
      brief: "L'exercice consistait à imaginer une campagne Nike Air Max 90 radicalement différente de tout ce que la marque a produit et à prouver qu'un profil technique sans formation créative pouvait construire un concept publicitaire cohérent, drôle et efficace en pilotant l'IA.\n\nLe vrai défi n'était pas de générer de beaux visuels. C'était de trouver un angle créatif inédit sur une marque et un produit ultra-codifiés sans tomber dans le pastiche ni dans le générique.\n\nLe brief s'est construit par intuition et itération : rejet du territoire urbain sombre trop attendu, pivot vers l'humour absurde et le premier degré, ancrage dans le jardin de banlieue banal plutôt qu'en studio premium. Le concept central (un homme ordinaire qui utilise sa Air Max 90 comme téléphone, comme pot de fleur avec un sérieux imperturbable) est né d'une conviction simple : les icônes ont besoin qu'on se moque d'elles avec amour.\n\nLa série d'affiches a validé le concept : chaussure en lévitation sur fond sombre avec twists visuels absurdes (bocal de poisson rouge, bouquet de fleurs, personnage fashion week excentrique avec la paire sur la tête). Pour chaque visuel, le même fil rouge : \"...ALMOST.\" en rouge, écho parfait au swoosh et à la semelle.\n\nLe film publicitaire enchaîne les affiches en clips rythmés avec création sonore et se termine sur un logo Nike, \"Just Do It.\", suivi de \"Make fun.\"\n\nCONCEPT : \"La chaussure la plus iconique du monde. Utile à tout. Ou presque.\"\nPALETTE : Blanc · Gris charbon · Rouge Nike · Noir mat\nFORMAT : Série d'affiches print · 1 film publicitaire · 1 scène humoristique photo-réaliste · Assets logo\nCIBLE : Communauté sneakers, culture urbaine, 25 - 45 ans, marché international",
      stack: ["Gemini 3.1", "Google Whisk", "CapCut", "Photopea"],
      conclusion: "Ce projet démontre qu'un profil tech peut construire un concept publicitaire complet, pas seulement assembler des images générées. La valeur réelle est dans l'intention créative derrière chaque choix : le territoire de l'humour absurde, le personnage deadpan, le \"...ALMOST.\" comme fil rouge, la chute finale \"Make fun.\" qui répond au \"Just Do It.\"\n\nL'humour est le registre créatif le plus difficile à maîtriser en publicité. Pas parce que c'est techniquement complexe mais parce qu'il repose entièrement sur la justesse du ton, du timing et de l'intention.\n\nCe n'est pas l'IA qui a trouvé le concept. C'est l'IA orchestrée par le bon angle.\n\nProjet fictif non affilié à Nike"
    },
    {
      id: 'assos',
      title: "CAUSES /// \"L'image dérange. Le mot achève.\"",
      category: "Campagnes IA (DA & Rédaction)",
      type: "artistic",
      duration: "2 jours",
      roleOrTools: "Claude, Flow, Photopea",
      imageUrl: assosImg,
      overviewA: assos1Img,
      overviewB: assos2Img,
      overviewC: assos3Img,
      conclusionA: assos4Img,
      conclusionB: assos5Img,
      description: "Trois campagnes fictives pour des associations nationales, construites entièrement avec l'IA.",
      brief: "L'exercice consistait à prouver qu'un registre créatif habituellement réservé aux grandes agences, les campagnes d'intérêt public, pouvait être construit avec rigueur et impact par un profil technique pilotant l'IA.\n\nLe vrai défi n'était pas de générer de belles images. C'était d'éviter les codes attendus des campagnes associatives (pathos convenu, typographie système, visuels génériques de souffrance) pour trouver un territoire visuel et éditorial qui arrête vraiment le regard.\n\nTrois causes, trois univers distincts, une seule règle : jamais d'explication. L'image révèle. Le texte achève. Chaque affiche repose sur un objet familier détourné (le berceau, le bouquet, la bague, le rouge à lèvres) retourné contre lui-même pour créer un choc émotionnel immédiat. Chaque punchline a été construite par itération : rejet des premières formulations trop attendues, recherche du mot juste, de la rupture de ton au bon endroit.\n\nNeuf affiches finales. Une cohérence de campagne assumée (même typographie, même code couleur rouge sang, même silence entre l'image et le mot).\n\nCONCEPT : \"L'objet de l'amour retourné contre lui-même.\"\nPALETTE : Noir profond · Blanc pur · Rouge sang (#C0001A) · Gris anthracite\nFORMAT : 9 visuels print · 3 territoires éditoriaux · 3 associations nationales · Système typographique cohérent\nCAUSES & ASSOS : Sida (AIDES : \"On transmet l'amour, pas le Sida.\") · Enfants malades (AFM-Téléthon : \"Son combat, il ne l'a pas choisi. Le vôtre commence maintenant.\") · Violences conjugales (Solidarité Femmes 3919 : \"Il lui offrait des bijoux. Avec les mêmes mains.\")",
      stack: ["Claude Sonnet 4.6", "Google Flow", "Photopea"],
      conclusion: "Ce projet démontre qu'un registre créatif exigeant, le message social à fort impact, n'est pas l'apanage des agences. Il est accessible à quiconque sait construire une intention avant de générer une image.\n\nLa valeur réelle n'est pas dans les visuels. Elle est dans les choix : quel objet, quel mot, quelle rupture, quel silence. Identifier le territoire émotionnel juste, rejeter les clichés du secteur associatif, calibrer chaque punchline pour qu'elle serve une cause précise sans la trahir.\n\nNeuf affiches. Zéro agence. Zéro studio. Cent pour cent direction éditoriale et artistique en langage naturel.\n\nCe ne sont pas les images qui portent ces campagnes. C'est l'intention derrière chaque mot."
    }
  ];

export default function ProjetsSection() {
  const digitalProjects = projects.filter(p => p.type === 'digital');
  const artisticProjects = projects.filter(p => p.type === 'artistic');

  const renderProjectCard = (project: Project) => (
    <motion.div
      key={project.id}
      layoutId={`card-${project.id}`}
      onClick={() => {
        window.location.hash = `projet-${project.id}`;
      }}
      className="group relative aspect-[16/10] md:aspect-[4/3] bg-zinc-950 overflow-hidden cursor-pointer flex flex-col justify-end p-6 sm:p-8 rounded-none transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-black/50"
    >
      {/* Background Image with referral policy and smooth scale/reveal effect on hover */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {project.type === 'artistic' ? (
          <>
            <DotImageReveal 
              src={project.imageUrl} 
              alt={project.title}
            />
            {/* Subtle gradient at the bottom for text readability on reveal */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-20" />
          </>
        ) : (
          <>
            <img 
              src={project.imageUrl} 
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle gradient at the bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          </>
        )}
      </div>

      {/* Content Container - Translates up on hover to reveal extra content */}
      <div className="relative z-10 flex flex-col justify-end w-full h-full text-left transition-transform duration-500 ease-out translate-y-6 group-hover:translate-y-0 pointer-events-none">
        {/* Category Badge - subtle fade-in */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
          <span className="inline-block text-[10px] font-mono tracking-widest text-[#F97316] uppercase border-b border-[#F97316]/30 bg-black/60 px-2.5 py-1 backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Title (Always visible, colored on hover) */}
        <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-tight group-hover:text-[#F97316] transition-colors duration-300 mt-2">
          {project.title}
        </h3>

        {/* Description and link: fades in smoothly as container slides up */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col gap-3 mt-3">
          <p className="text-xs sm:text-sm text-slate-300 font-light line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          <div className="flex items-center gap-2 text-xs font-mono text-[#F97316] font-bold tracking-wider uppercase pt-1 select-none">
            <span>Voir la Fiche Projet</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section 
      id="projets" 
      className="relative z-30 w-full max-w-6xl mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-32 md:pb-40 overflow-hidden border-t border-white/5 scroll-mt-32"
    >
      {/* Structural grid lines */}
      <div className="absolute inset-y-0 left-0 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute inset-y-0 left-1/3 w-[1px] bg-white/5 hidden md:block pointer-events-none" />

      {/* Header block */}
      <div className="flex flex-col gap-2 mb-20 relative z-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-end select-none tracking-tight">
            <span className="text-sm font-black text-[#F97316] leading-none">/</span>
            <span className="text-xs font-black text-[#F97316]/80 leading-none">/</span>
            <span className="text-[10px] font-black text-[#F97316]/50 leading-none">/</span>
          </span>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316]">PORTFOLIO & CRÉATIONS</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
          TRAVAUX &<br />RÉALISATIONS.
        </h2>
      </div>

      {/* Réalisations Digitales Section */}
      <div className="mb-8 mt-12 relative z-10 flex items-center gap-3">
        <span className="text-[#F97316] font-black font-mono tracking-tighter select-none">///</span>
        <h3 className="text-xl font-mono uppercase tracking-widest text-[#F97316] font-bold">
          Réalisations Digitales
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mb-24">
        {digitalProjects.map(renderProjectCard)}
      </div>

      {/* Créations Artistiques Section */}
      <div className="mb-8 mt-12 relative z-10 flex items-center gap-3">
        <span className="text-[#F97316] font-black font-mono tracking-tighter select-none">///</span>
        <h3 className="text-xl font-mono uppercase tracking-widest text-[#F97316] font-bold">
          Créations Artistiques
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {artisticProjects.map(renderProjectCard)}
      </div>
    </section>
  );
}
