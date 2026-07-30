export interface LiveProject {
  title: string;
  url: string;
  desc: string;
  tag: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const presets = {
  sunset: { start: '#F97316', mid: '#EAB308', end: '#c83c3c' },
  aurora: { start: '#10B981', mid: '#06B6D4', end: '#3B82F6' },
  ocean: { start: '#06B6D4', mid: '#3B82F6', end: '#6366F1' },
  neon: { start: '#EC4899', mid: '#8B5CF6', end: '#EF4444' }
};

export const liveProjects: LiveProject[] = [
  {
    title: "Eva",
    url: "https://eva-fr.com",
    desc: "Création d'un site one page d'impact et de design épuré.",
    tag: "One Page Showcase"
  },
  {
    title: "Lumeboard",
    url: "https://mist3rth.github.io/lumeboard/",
    desc: "Prototype interactif et concept de tableau de bord produit.",
    tag: "Product Concept"
  },
  {
    title: "Reflex.io",
    url: "https://mist3rth.github.io/Reflex.io/",
    desc: "Journal de bord et d'expérimentation de biais cognitifs.",
    tag: "Mind Journal"
  },
  {
    title: "Aquapownder",
    url: "https://mist3rth.github.io/aquapownder/",
    desc: "Plateforme et landing page au ton satirique engagé.",
    tag: "Satirical Web"
  },
  {
    title: "Japon-Omega",
    url: "https://japon-omega.vercel.app/",
    desc: "Carnet de voyage digital immersif et interactif.",
    tag: "Travel Log"
  },
  {
    title: "VortexAI",
    url: "https://vortexai-alpha.vercel.app/",
    desc: "Interface expérimentale explorant la synergie avec l'IA.",
    tag: "Experimental AI"
  }
];

export const faqData: FaqItem[] = [
  {
    question: "Pourquoi ce portfolio met-il autant l'accent sur l'IA générative ?",
    answer: "L'IA générative est un formidable accélérateur de production, mais elle nécessite un cadre rigoureux. Je l'explore comme un partenaire de pair-programming au quotidien pour démultiplier ma vitesse de création, tout en conservant une démarche d'architecte pour structurer, nettoyer et optimiser le code produit."
  },
  {
    question: "Qu'est-ce que la méthode \"l'architecture avant la génération\" ?",
    answer: "C'est ma règle d'or : ne jamais laisser une IA écrire du code sans avoir préalablement conçu l'architecture (schémas de données, spécifications, parcours utilisateur). Structurer d'abord les fondations permet de guider l'IA de manière chirurgicale et d'obtenir un code propre, modulaire et maintenable à long terme."
  },
  {
    question: "Quels sont tes outils et technologies de prédilection ?",
    answer: "Côté code, je privilégie React, TypeScript et Tailwind CSS pour concevoir des applications web performantes. Pour driver les IA et accélérer mon workflow, j'utilise des outils de prompt engineering structurés et des assistants comme Antigravity IDE. Pour la création graphique et vidéo, j'expérimente avec Flow, Whisk, Gemini et Photopea."
  },
  {
    question: "Quel est ton objectif professionnel aujourd'hui ?",
    answer: "Je cherche à mettre en avant mes compétences hybrides en design, stratégie et ingénierie de production augmentée par l'IA. Je suis actuellement à la recherche d'un poste en CDI au sein d'une équipe innovante souhaitant repousser les limites du développement et du design digital."
  }
];
