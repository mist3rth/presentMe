import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { scrollToTarget } from './utils/scrollTo';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import GradualBlur from './components/GradualBlur';
import { BackToTop } from './components/ui/BackToTop';
import { faqData, presets } from './data/portfolioData';
import { ScrollStepIndicator } from './components/ui/ScrollStepIndicator';
const ProjectDetailPage = lazy(() => import('./components/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })));


// --- Composants principaux de la page d'accueil (chargés directement pour éviter les sauts de scroll) ---
import ScrollVelocity from './components/ScrollVelocity';
import MethodeSection from './components/MethodeSection';
import ProjetsSection, { projects } from './components/ProjetsSection';
import ParcoursSection from './components/ParcoursSection';

// --- Lazy-loaded components ---
const ProjectModal = lazy(() => import('./components/ProjectModal').then(m => ({ default: m.ProjectModal })));


import earthOrangeBg from './assets/earth_orange_bg.webp';
import hommeWebp from './assets/homme.webp';
import heroWebp from './assets/hero.webp';
import bigleafImg from './assets/bigleaf.webp';
import elgustoImg from './assets/elgusto.webp';
import vaAthleticImg from './assets/vaathletic.webp';
import primeImmobilierImg from './assets/primeimmobilier.webp';
import japonImg from './assets/japon.webp';

export type PresetKey = 'sunset' | 'aurora' | 'ocean' | 'neon';

// Type Project défini ici pour éviter l'import statique de ProjetsSection
// (permet le lazy-loading réel de ProjetsSection)
export type Project = {
  id: string;
  title: string;
  category: string;
  type: 'digital' | 'artistic';
  duration: string;
  roleOrTools: string;
  link?: string;
  imageUrl: string;
  description: string;
  brief?: string;
  stack?: string[];
  workflow?: { step: string; title: string; desc: string }[];
  benefits?: string[];
  conclusion?: string;
  overviewA?: string;
  overviewB?: string;
  overviewC?: string;
  conclusionA?: string;
  conclusionB?: string;
  conclusionVideo?: string;
  badgeText?: string;
};

export default function App() {
  const [gradientPreset] = useState<PresetKey>('sunset');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const location = useLocation();

  // Initialisation de Lenis (Smooth Scroll premium pour Desktop, natif sur mobile)
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // On expose l'instance de lenis à window pour y avoir accès partout (notamment au changement de route)
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  // Remonter en haut de la page instantanément à chaque changement de route
  useEffect(() => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleHashChange = async () => {
      const hash = window.location.hash;
      if (hash.startsWith('#projet-')) {
        const projectId = hash.replace('#projet-', '');
        const found = projects.find((p: { id: string }) => p.id === projectId);
        if (found) {
          setSelectedProject(found);
          return;
        }
      }
      setSelectedProject(null);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Lock body scroll when project page is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p: { id: string }) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    window.location.hash = `projet-${projects[nextIndex].id}`;
  };

  // Scroll tracking for Piliers d'intervention section
  const expertiseContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: expertiseContainerRef,
    offset: ["start end", "end start"]
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Card animations
  const yCard1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-120, 120]);
  const yCard3 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [120, -120]);

  const methodoRef = useRef<HTMLElement>(null);
  const { scrollYProgress: methodoScrollY } = useScroll({
    target: methodoRef,
    offset: ["start end", "end start"]
  });
  const slashesX = useTransform(methodoScrollY, [0, 1], [0, 200]);

  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: footerScrollY } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });
  const yParallaxFooter = useTransform(footerScrollY, [0, 1], ["-30%", "30%"]);



  const activePreset = presets[gradientPreset];

  // --- IntersectionObserver sentinels pour le lazy-rendering des sections ---
  // (Removed inView checks to prevent unmounting which broke animations and anchor links)


  return (
    <div className="relative min-h-screen bg-[#050302] text-white flex flex-col font-sans selection:bg-[#F97316] selection:text-white max-w-full overflow-x-clip [overflow-anchor:none]">
      <Header />
      <Suspense fallback={<div className="min-h-screen bg-[#050302]" />}>
        <Routes>
          <Route path="/projet/:id" element={<ProjectDetailPage />} />
          <Route path="*" element={
          /* Main Content Wrapper for Sticky Footer Reveal */
          <div className="relative z-20 bg-[#050302] shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col w-full pb-16 max-w-full overflow-x-clip">
        {/* GRID OVERLAY */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-20 z-0"></div>

      {/* Atmospheric Glows */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 pointer-events-none z-0 transition-colors duration-500"
        style={{ backgroundColor: activePreset.start }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[180px] opacity-10 pointer-events-none z-0 transition-colors duration-500"
        style={{ backgroundColor: activePreset.end }}
      />

      {/* Hero Background — image statique WebP (remplace FloatingLines Three.js) */}
      <div className="absolute top-0 left-0 w-full h-[800px] z-10 pointer-events-none" aria-hidden="true">
        <img
          src={heroWebp}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-60"
          style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }}
        />
      </div>

      {/* Main Hero Stage Container */}
      <main className="min-h-[calc(110vh-104px)] flex-grow flex flex-col justify-between px-6 md:px-12 relative z-20 pt-24 md:pt-32 pb-32 max-w-6xl mx-auto w-full text-left">
        
        {/* 1. Le Hook Visuel & Interactif (Pre-Header) */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-4 mt-2 mb-10 border-b border-white/5 pb-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col gap-2 font-mono text-xs text-white/70"
          >
            <div className="flex items-center">
              <span className="inline-flex items-end mr-3 select-none tracking-tight">
                <span className="text-lg font-black text-[#F97316] leading-none">/</span>
                <span className="text-sm font-black text-[#F97316]/80 leading-none">/</span>
                <span className="text-xs font-black text-[#F97316]/50 leading-none">/</span>
              </span>
              <span>Human-in-the-loop workflow.</span>
            </div>
            <div className="flex items-center">
              <span className="inline-flex items-end mr-3 select-none tracking-tight">
                <span className="text-lg font-black text-[#F97316] leading-none">/</span>
                <span className="text-sm font-black text-[#F97316]/80 leading-none">/</span>
                <span className="text-xs font-black text-[#F97316]/50 leading-none">/</span>
              </span>
              <span>Stratégie digitale, UX & IA Générative.</span>
            </div>
          </motion.div>
        </div>

        {/* 2. Le Titre Principal & 3. Le Texte Manifeste (Asymmetric Layout Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full mb-12">
          {/* Title Area (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col">
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="text-4xl sm:text-6xl md:text-[72px] lg:text-[80px] xl:text-[88px] font-black leading-[0.95] tracking-tighter text-white uppercase select-none flex flex-col"
            >
              <span className="block">
                CONCEVOIR LE DIGITAL.
              </span>
              <span 
                className="block text-transparent bg-clip-text bg-gradient-to-r transition-all duration-500"
                style={{
                  backgroundImage: `linear-gradient(to right, ${activePreset.start}, ${activePreset.mid}, ${activePreset.end})`
                }}
              >
                PILOTER L'ALGORITHME.
              </span>
            </motion.h1>
          </div>

          {/* Manifest Area (lg:col-span-4) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            className="lg:col-span-4 flex flex-col gap-6 p-6 md:p-8 bg-[#050302]/40 backdrop-blur-md border border-white/10 lg:border-l-2 border-t pt-6"
          >
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              Depuis 30 ans, je fusionne stratégie business, design d'expérience et architecture technique. Aujourd'hui, je redéfinis la production digitale en associant une vision critique humaine à la puissance brute de l'IA générative.
            </p>
            <div className="flex flex-col gap-2 border-l-2 border-[#F97316] pl-4 py-1">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#F97316]">
                Pas d'automatisation aveugle.
              </p>
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
                Une optimisation augmentée et maîtrisée.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 4. Les Call-to-Action & 5. L'Indicateur de Défilement (Bottom Row) */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 mt-4 pt-8 border-t border-white/5">
          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center gap-8 w-full md:w-auto relative z-30 pointer-events-auto"
          >
            {/* CTA Principal (Neon Pulse) */}
            <a
              href="#methodologie"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '#methodologie');
                scrollToTarget('methodologie');
              }}
              className="group relative w-full sm:w-64 h-16 rounded-none overflow-visible transition-all duration-500 cursor-pointer active:scale-95 flex items-center justify-center font-mono text-sm uppercase tracking-widest text-center"
            >
              {/* Glow pulsatile externe */}
              <div className="absolute inset-0 bg-[#F97316] blur-[20px] opacity-40 animate-pulse group-hover:opacity-70 group-hover:bg-white transition-all duration-500" />
              
              {/* Fond du bouton */}
              <div className="absolute inset-0 bg-[#F97316] group-hover:bg-white transition-colors duration-500 z-10" />
              
              {/* Texte */}
              <span className="relative z-20 text-[#050302] font-black transition-transform duration-500 group-hover:scale-105">
                Découvrir le Workflow
              </span>
            </a>

            {/* CTA Secondaire (Lien Cinétique) */}
            <a
              href="#projets"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '#projets');
                scrollToTarget('projets');
              }}
              className="group text-sm font-semibold text-white/80 hover:text-white transition-colors duration-300 relative py-2 cursor-pointer"
            >
              <span>Voir les cas d'étude &rarr;</span>
              {/* Kinetic line */}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-white scale-x-100 group-hover:scale-x-110 origin-left transition-all duration-300" />
            </a>
          </motion.div>

          {/* 5. L'Indicateur de Défilement */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <ScrollStepIndicator />
          </motion.div>
        </div>
      </main>

      {/* SECTION MANIFESTE / INTRODUCTION */}
      <section 
        id="manifeste" 
        ref={methodoRef}
        className="relative z-30 w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 border-t border-white/5 scroll-mt-8 overflow-hidden"
      >
        {/* Background decorative slashes /// */}
        <motion.div 
          style={{ x: slashesX }}
          className="absolute right-4 bottom-4 md:right-12 md:bottom-8 pointer-events-none select-none text-[150px] sm:text-[220px] md:text-[300px] font-black text-[#F97316] opacity-[0.15] leading-none tracking-tighter"
        >
          ///
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column - Large Typography Statement */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[1.05]"
            >
              Décoder l'humain <br />
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, ${activePreset.start}, ${activePreset.mid}, ${activePreset.end})`
                }}
              >
                pour bâtir une Tech vivante.
              </span>
            </motion.h2>
          </div>

          {/* Right Column - Manifest Detail */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-6 lg:pl-8 lg:border-l border-white/5 pt-6 lg:pt-0"
          >
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">
              Bienvenue dans mon espace de partage.
            </h3>
            
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              Ici, je sors du cadre professionnel pour explorer librement mes passions : du <strong className="text-white font-medium">Vibe coding</strong> aux <strong className="text-[#F97316] font-medium">biais cognitifs</strong>. Découvrez les projets qui m'animent et ma vision d'une technologie plus proche de nos comportements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION SCROLL VELOCITY / MARQUEE */}
      <section className="relative z-30 w-full overflow-hidden border-t border-b border-white/5 bg-black/20 py-8 my-8 md:my-12">
        <Suspense fallback={<div className="h-24 w-full" />}>
          <ScrollVelocity
            texts={[
              <div className="inline-flex items-center gap-8 pr-8 select-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 pr-2">AI driven</span>
                <span className="text-white/10 text-3xl font-extralight">/</span>
                <span className="text-white hover:text-[#F97316] transition-colors">Bmad</span>
                <span className="text-white/10 text-3xl font-extralight">/</span>
                <span className="text-slate-100 font-black">UXPro</span>
                <span className="text-white/10 text-3xl font-extralight">/</span>
                <span className="text-slate-300 font-medium">Awesome skills</span>
                <span className="text-white/10 text-3xl font-extralight">/</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 font-extrabold pr-2">Human in the loop</span>
                <span className="text-white/10 text-3xl font-extralight">/</span>
              </div>,
              <div className="inline-flex items-center gap-8 pr-8 select-none">
                <span className="text-slate-300 font-extrabold">Human in the loop</span>
                <span className="text-white/10 text-3xl font-extralight">/</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 pr-2">Awesome skills</span>
                <span className="text-white/10 text-3xl font-extralight">/</span>
                <span className="text-[#F97316] font-black">UXPro</span>
                <span className="text-white/10 text-3xl font-extralight">/</span>
                <span className="text-white font-medium">Bmad</span>
                <span className="text-white/10 text-3xl font-extralight">/</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#F97316] pr-2">AI driven</span>
                <span className="text-white/10 text-3xl font-extralight">/</span>
              </div>
            ]}
            velocity={40}
            className="text-white font-black uppercase text-3xl sm:text-5xl md:text-[5.5rem] tracking-tighter opacity-90 py-2"
            numCopies={6}
            damping={50}
            stiffness={300}
          />
        </Suspense>
      </section>

      {/* SECTION EXPERTISES */}
      <section 
        id="expertises" 
        ref={expertiseContainerRef}
        className="relative z-30 w-full border-t border-white/5 scroll-mt-8 overflow-hidden"
      >
        {/* Background Image Container with parallax/blend effects */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 pointer-events-none"
          style={{ backgroundImage: `url(${earthOrangeBg})` }}
        />
        {/* Subtle dark gradient overlay to blend into the overall dark template and ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050302] via-black/40 to-[#050302] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-end select-none tracking-tight">
                  <span className="text-xl font-black text-[#F97316] leading-none">/</span>
                  <span className="text-base font-black text-[#F97316]/80 leading-none">/</span>
                  <span className="text-xs font-black text-[#F97316]/50 leading-none">/</span>
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316]">Piliers d'intervention</span>
              </div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-white"
              >
                CHAMPS D'EXPERTISE.
              </motion.h2>
            </div>
            <p className="max-w-md text-sm text-slate-400 leading-relaxed font-light">
              Une approche systémique alliant vision stratégique haut niveau, excellence opérationnelle et maîtrise algorithmique.
            </p>
          </div>

          {/* Expertises Grid - Desktop: 600px height with md:items-center for centered alignment and vertical swapping */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:h-[600px] h-auto md:items-center items-stretch relative mt-16 md:mt-24">
            
            {/* Card 1: Dirigeants & Fondateurs */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ y: yCard1 }}
              className="group relative flex flex-col justify-between p-8 md:p-10 md:h-[420px] min-h-[360px] md:self-center rounded-none border border-zinc-800 bg-black/80 hover:bg-black/95 transition-colors duration-300 overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#F97316] to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Number & Category */}
                  <div className="mb-8">
                    <span className="font-mono text-xs text-[#F97316] font-bold tracking-widest uppercase">
                      01 DESIGN & INTERACTION
                    </span>
                  </div>

                  {/* Big Title */}
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight mb-6 tracking-tighter group-hover:text-[#F97316] transition-colors duration-300">
                    CONCEVOIR DES INTERFACES REMARQUABLES ET FLUIDES.
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  Création de chartes graphiques, d'identités visuelles et d'interfaces utilisateur modernes. Une attention obsessionnelle est portée aux détails, à la typographie et à la fluidité du mouvement.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Opérations & Stratégie */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative flex flex-col justify-between p-8 md:p-10 md:h-[420px] min-h-[360px] md:self-center rounded-none border border-zinc-800 md:border-l-0 bg-black/80 hover:bg-black/95 transition-colors duration-300 overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-amber-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Number & Category */}
                  <div className="mb-8">
                    <span className="font-mono text-xs text-amber-500 font-bold tracking-widest uppercase">
                      02 INGÉNIERIE & CODE
                    </span>
                  </div>

                  {/* Big Title */}
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight mb-6 tracking-tighter group-hover:text-amber-500 transition-colors duration-300">
                    TRADUIRE LE DESIGN EN CODE PERFORMANT ET PROPRE.
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  Développement front-end moderne sous React, TypeScript et Tailwind CSS. Intégration soignée de micro-interactions fluides et optimisation agressive des performances web.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Agences & Conseils */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ y: yCard3 }}
              className="group relative flex flex-col justify-between p-8 md:p-10 md:h-[420px] min-h-[360px] md:self-center rounded-none border border-zinc-800 md:border-l-0 bg-black/80 hover:bg-black/95 transition-colors duration-300 overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-orange-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Number & Category */}
                  <div className="mb-8">
                    <span className="font-mono text-xs text-orange-500 font-bold tracking-widest uppercase">
                      03 PROMPTING & PROCESSUS IA
                    </span>
                  </div>

                  {/* Big Title */}
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight mb-6 tracking-tighter group-hover:text-orange-500 transition-colors duration-300">
                    PILOTER LES MODÈLES DE MANIÈRE STRUCTURÉE.
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  Mise en place de méthodes pour guider les IA génératives (prompts d'architecture, spécifications strictes). L'assurance de produire du code qualitatif à très haute vélocité.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION CITATION / COLLABORATION */}
      <div id="vision-manifeste" className="scroll-mt-8" />
      <section 
        id="vision-manifeste-quote" 
        className="relative z-30 w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 border-t border-white/5 scroll-mt-8 overflow-hidden"
      >
        {/* Background decorative slashes /// */}
        <div className="absolute right-4 bottom-4 md:right-12 md:bottom-8 pointer-events-none select-none text-[150px] sm:text-[220px] md:text-[300px] font-black text-[#F97316] opacity-[0.15] leading-none tracking-tighter">
          ///
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Big typography quote & descriptive text below */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-2"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] select-none">
                CONCEVOIR LE PLAN,<br />
                AVANT DE PROMPTER<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${activePreset.start}, ${activePreset.mid}, ${activePreset.end})`
                      }}>
                  L'ALGORITHME.
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-6 pl-6 border-l-2 border-[#F97316] text-slate-300 max-w-xl"
            >
              <p className="text-sm sm:text-base leading-relaxed">
                Prompter sans plan, c'est naviguer à vue. On multiplie les essais aléatoires, on sature le contexte des modèles et on obtient des résultats instables. Ma méthodologie repose sur une conviction forte : <strong className="text-white font-medium">l'architecture doit impérativement précéder la génération.</strong>
              </p>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Je commence par concevoir l'ossature, les structures de données et la logique d'expérience utilisateur. Ce plan d'action rigoureux sert ensuite de guide chirurgical pour l'IA générative. C'est l'unique manière de garantir un code robuste, des interfaces fluides et une optimisation technique parfaitement maîtrisée.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Beautiful vertical portrait image, desaturated matching theme */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end w-full max-w-full overflow-hidden"
          >
            <div className="w-full max-w-[85vw] sm:max-w-[300px] md:max-w-[360px] mx-auto lg:mr-0 flex flex-col gap-4 items-center justify-center">
              <ProfileCard
                name="Thierry Thiesson"
                title="Architecte Digital & Designer"
                handle="tthiesson"
                status="Online"
                contactText="Contact Me"
                avatarUrl={hommeWebp}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt
                onContactClick={() => {
                  scrollToTarget('contact');
                }}
                behindGlowColor={`${activePreset.start}66`}
                behindGlowEnabled
                innerGradient="linear-gradient(145deg, rgba(249, 115, 22, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%)"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION: 9 leviers de valeur */}
      <section 
        className="relative z-30 w-full max-w-6xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-0 border-t border-white/5 scroll-mt-8"
      >
        {/* Section Header (Invisible, just for spacing) */}
        <div className="invisible flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-white/5 mb-16 -mx-4 px-4 md:-mx-8 md:px-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-end select-none tracking-tight">
                <span className="text-xl font-black text-[#F97316] leading-none">/</span>
                <span className="text-base font-black text-[#F97316]/80 leading-none">/</span>
                <span className="text-xs font-black text-[#F97316]/50 leading-none">/</span>
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316]">9 leviers de valeur</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              3 PILIERS, 9 LEVIERS.
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400 leading-relaxed font-light">
            Une vision 360 de la création digitale, où chaque compétence nourrit la coherence globale du projet.
          </p>
        </div>

        <div className="flex flex-col gap-12 mt-12 mb-12 relative pb-0">
          {/* Row 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sticky top-[320px] z-10 group grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-12 border border-white/10 bg-[#070504] rounded-none items-center transition-all duration-300 shadow-[0_-15px_30px_rgba(0,0,0,0.8)] shadow-black/80"
          >
            {/* Absolute Visible Title anchored to Card 1 */}
            <div 
              className="absolute left-[-32px] right-[-32px] md:left-[-48px] md:right-[-48px] flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-white/5 -mx-4 px-4 md:-mx-8 md:px-8"
              style={{ bottom: 'calc(100% + 112px)' }}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-end select-none tracking-tight">
                    <span className="text-xl font-black text-[#F97316] leading-none">/</span>
                    <span className="text-base font-black text-[#F97316]/80 leading-none">/</span>
                    <span className="text-xs font-black text-[#F97316]/50 leading-none">/</span>
                  </span>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316]">9 leviers de valeur</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                  3 PILIERS, 9 LEVIERS.
                </h2>
              </div>
              <p className="max-w-md text-sm text-slate-400 leading-relaxed font-light">
                Une vision 360 de la création digitale, où chaque compétence nourrit la coherence globale du projet.
              </p>
            </div>

            {/* Left Col */}
            <div className="md:col-span-4 flex flex-col justify-between h-auto md:min-h-[140px] gap-4">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">
                PILIER — 01 / USAGE & INTENTION
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter group-hover:text-[#F97316] transition-colors duration-300">
                  PSYCHOLOGIE & ERGONOME
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-white/10 bg-white/5 text-slate-300 uppercase tracking-wider">Biais cognitifs</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-white/10 bg-white/5 text-slate-300 uppercase tracking-wider">Parcours</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-white/10 bg-white/5 text-slate-300 uppercase tracking-wider">Stratégie UX</span>
                </div>
              </div>
              
              {/* Dash indicators */}
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-4 h-[3px] bg-[#F97316] transition-all duration-300 rounded-full" />
                <span className="w-4 h-[3px] bg-zinc-800 transition-all duration-300 rounded-full" />
                <span className="w-4 h-[3px] bg-zinc-800 transition-all duration-300 rounded-full" />
              </div>
              
              <div className="text-xs font-mono text-white/30">
                //001
              </div>
            </div>

            {/* Middle Col (Arrow) */}
            <div className="md:col-span-1 flex justify-start md:justify-end">
              <ArrowRight className="w-6 h-6 text-[#F97316] opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
            </div>

            {/* Right Col */}
            <div className="md:col-span-7 pl-0 md:pl-8 border-l-0 md:border-l border-white/10 min-h-[100px] flex items-center">
              <p className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight leading-snug text-slate-100">
                DÉCODER <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 font-extrabold pr-2">L'INTENTION</span> D'USAGE. L'ART DE COMPRENDRE <span className="text-white border-b-2 border-[#F97316]/50">LES ATTENTES ET LE COMPORTEMENT</span> DES UTILISATEURS.
              </p>
            </div>
          </motion.div>

          {/* Row 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="sticky top-[320px] z-20 group grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-12 border border-white/10 bg-[#070504] rounded-none items-center transition-all duration-300 shadow-[0_-15px_30px_rgba(0,0,0,0.8)] shadow-black/80"
          >
            {/* Left Col */}
            <div className="md:col-span-4 flex flex-col justify-between h-auto md:min-h-[140px] gap-4">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">
                PILIER — 02 / DÉVELOPPEMENT & IA
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter group-hover:text-[#F97316] transition-colors duration-300">
                  INGÉNIERIE & CODE
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-white/10 bg-white/5 text-slate-300 uppercase tracking-wider">TypeScript</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-white/10 bg-white/5 text-slate-300 uppercase tracking-wider">Web perf</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-white/10 bg-white/5 text-slate-300 uppercase tracking-wider">Vibe coding</span>
                </div>
              </div>
              
              {/* Dash indicators */}
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-4 h-[3px] bg-zinc-800 transition-all duration-300 rounded-full" />
                <span className="w-4 h-[3px] bg-[#F97316] transition-all duration-300 rounded-full" />
                <span className="w-4 h-[3px] bg-zinc-800 transition-all duration-300 rounded-full" />
              </div>
              
              <div className="text-xs font-mono text-white/30">
                //002
              </div>
            </div>

            {/* Middle Col (Arrow) */}
            <div className="md:col-span-1 flex justify-start md:justify-end">
              <ArrowRight className="w-6 h-6 text-[#F97316] opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
            </div>

            {/* Right Col */}
            <div className="md:col-span-7 pl-0 md:pl-8 border-l-0 md:border-l border-white/10 min-h-[100px] flex items-center">
              <p className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight leading-snug text-slate-100">
                BÂTIR DES <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 font-extrabold pr-2">APPLICATIONS</span> PROPRES. ASSOCIER LA RIGOUREUSE STRUCTURE DU <span className="text-white border-b-2 border-[#F97316]/50">PROMPT D'ARCHITECTURE</span> À LA RAPIDITÉ DE L'IA.
              </p>
            </div>
          </motion.div>

          {/* Row 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-30 group grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-12 border border-white/10 bg-[#070504] rounded-none items-center transition-all duration-300 shadow-[0_-15px_30px_rgba(0,0,0,0.8)] shadow-black/80"
          >
            {/* Left Col */}
            <div className="md:col-span-4 flex flex-col justify-between h-auto md:min-h-[140px] gap-4">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">
                PILIER — 03 / DESIGN & CRÉATIVITÉ
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter group-hover:text-[#F97316] transition-colors duration-300">
                  DESIGN & ESTHÉTIQUE
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-white/10 bg-white/5 text-slate-300 uppercase tracking-wider">Direction Art</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-white/10 bg-white/5 text-slate-300 uppercase tracking-wider">UI/UX</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-white/10 bg-white/5 text-slate-300 uppercase tracking-wider">Motion</span>
                </div>
              </div>
              
              {/* Dash indicators */}
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-4 h-[3px] bg-zinc-800 transition-all duration-300 rounded-full" />
                <span className="w-4 h-[3px] bg-zinc-800 transition-all duration-300 rounded-full" />
                <span className="w-4 h-[3px] bg-[#F97316] transition-all duration-300 rounded-full" />
              </div>
              
              <div className="text-xs font-mono text-white/30">
                //003
              </div>
            </div>

            {/* Middle Col (Arrow) */}
            <div className="md:col-span-1 flex justify-start md:justify-end">
              <ArrowRight className="w-6 h-6 text-[#F97316] opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
            </div>

            {/* Right Col */}
            <div className="md:col-span-7 pl-0 md:pl-8 border-l-0 md:border-l border-white/10 min-h-[100px] flex items-center">
              <p className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight leading-snug text-slate-100">
                CRÉER DU <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 font-extrabold pr-2">RESSENTI</span> DANS L'IMAGE. METTRE AU POINT DES INTERFACES ET DES CRÉATIONS QUI <span className="text-white border-b-2 border-[#F97316]/50">S'EFFACENT</span> POUR LAISSER PLACE À L'EXPÉRIENCE.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION: WHO IT IS FOR (DIFFÉRENTES ÉQUIPES. MÊME CLARTÉ.) */}
      <section 
        id="methodologie"
        className="relative z-30 w-full max-w-6xl mx-auto px-6 md:px-12 py-32 md:py-40 overflow-hidden flex flex-col items-center justify-center min-h-[600px] scroll-mt-8"
      >
        {/* Fine vertical guide lines matching the page's structural grid lines */}
        <div className="absolute inset-y-0 left-0 w-[1px] bg-white/5 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[1px] bg-white/5 pointer-events-none" />
        <div className="absolute inset-y-0 left-1/3 w-[1px] bg-white/5 hidden md:block pointer-events-none" />

        {/* Fond dégradé CSS — remplace les Cubes GSAP (0 KB de JS, 0 canvas) */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(249,115,22,0.07) 0%, transparent 70%), repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(249,115,22,0.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(249,115,22,0.04) 40px)',
          }}
        />

        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-2xl pointer-events-none">
          {/* Massive Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.95] pointer-events-auto select-none"
          >
            DIFFÉRENTES ÉQUIPES.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400">MÊME CLARTÉ.</span>
          </motion.h2>

          {/* Description Text */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-xl pointer-events-auto"
          >
            La méthode s'adapte à toute organisation, que vous définissiez un plan de lancement produit, aligniez vos équipes opérationnelles ou pilotiez la stratégie globale de vos projets.
          </motion.p>
        </div>
      </section>

      {/* MethodeSection */}
      <div id="methodologie" className="scroll-mt-8">
        <Suspense fallback={<div className="h-screen w-full" />}>
          <MethodeSection />
        </Suspense>
      </div>

      {/* ProjetsSection */}
      <div id="projets" className="scroll-mt-8">
        <Suspense fallback={<div className="h-screen w-full" />}>
          <ProjetsSection />
        </Suspense>
      </div>

      {/* ParcoursSection */}
      <div id="parcours" className="scroll-mt-8">
        <Suspense fallback={<div className="h-screen w-full" />}>
          <ParcoursSection />
        </Suspense>
      </div>

      {/* SECTION CONTACT */}
      <section 
        id="contact" 
        className="relative z-30 w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 border-t border-white/5 scroll-mt-8"
      >
        <div className="flex flex-col gap-12">
          
          {/* Top Title Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-white/10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-end select-none tracking-tight">
                  <span className="text-sm font-black text-[#F97316] leading-none">/</span>
                  <span className="text-xs font-black text-[#F97316]/80 leading-none">/</span>
                  <span className="text-[10px] font-black text-[#F97316]/50 leading-none">/</span>
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316]">RÉPONSE SOUS 24 HEURES</span>
              </div>
              <h2 className="text-5xl sm:text-7xl md:text-[6.5rem] font-black uppercase tracking-tighter text-white leading-none">
                CONTACT.
              </h2>
            </div>
            
            <div className="flex flex-col gap-4 max-w-md">
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Discutons de vos projets, de vos défis techniques ou de vos opportunités de recrutement en CDI. Échangeons sur la manière de marier design et ingénierie de production.
              </p>
              <a 
                href="#projets"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget('projets');
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-mono text-xs uppercase tracking-widest px-6 py-4 transition-all duration-300 hover:-translate-y-0.5"
              >
                projets preview <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* High Contrast Info Bar */}
          <div className="bg-zinc-100 text-black py-4 px-6 flex flex-col md:flex-row justify-between items-start md:items-center font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest gap-4 md:gap-0">
            <div>
              <span className="text-black/40">MAIL:</span> <a href="mailto:mist3rth@gmail.com" className="hover:text-[#F97316] transition-colors">mist3rth@gmail.com</a>
            </div>
            <div>
              <span className="text-black/40">DÉLAI DE RÉPONSE:</span> <span className="text-[#F97316]">SOUS 24H</span>
            </div>
            <div>
              <span className="text-black/40">STATUT:</span> RECHERCHE ACTIVE EN CDI
            </div>
          </div>

          {/* Bottom Row: Detailed Context & Quote */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-8">
            
            {/* Left Box: Start Conversation */}
            <div className="md:col-span-7 flex flex-col justify-between gap-8 p-8 border border-white/10 bg-white/[0.02]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-end select-none tracking-tight">
                    <span className="text-sm font-black text-[#F97316] leading-none">/</span>
                    <span className="text-xs font-black text-[#F97316]/80 leading-none">/</span>
                    <span className="text-[10px] font-black text-[#F97316]/50 leading-none">/</span>
                  </span>
                  <span className="text-xs font-mono text-[#F97316]">ÉCHANGE CONSTRUCTIF</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  DISCUTONS ET COLLABORONS.
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  Pas de chichi ni de formalisme commercial. Juste un échange authentique et technique autour du développement moderne, de l'utilisation des méthodes et processus IA dans la production créative, ou d'une future collaboration au sein de vos équipes.
                </p>
              </div>

              {/* Grid of details */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Disponibilité</div>
                  <div className="text-sm font-medium text-white mt-1">Immédiate</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Modalité</div>
                  <div className="text-sm font-medium text-white mt-1">Hybride & Présentiel</div>
                </div>
              </div>
            </div>

            {/* Right Box: Quote & Subtitle */}
            <div className="md:col-span-5 flex flex-col justify-between gap-8 p-8 border border-white/10 bg-[#F97316]/5 relative overflow-hidden">
              {/* Backlight effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/20 blur-3xl pointer-events-none rounded-full" />
              
              <div className="flex flex-col gap-6 relative z-10">
                <span className="inline-flex items-end select-none tracking-tight">
                  <span className="text-2xl font-black text-[#F97316] leading-none">/</span>
                  <span className="text-xl font-black text-[#F97316]/80 leading-none">/</span>
                  <span className="text-lg font-black text-[#F97316]/50 leading-none">/</span>
                </span>
                <p className="text-lg sm:text-xl font-black uppercase tracking-tight text-white leading-snug">
                  L'IA ne remplace pas l'intention humaine. Elle démultiplie l'exécution de ceux qui savent concevoir l'architecture avant de lancer la génération.
                </p>
              </div>

              <div className="relative z-10 flex flex-col pt-6 border-t border-white/5">
                <span className="text-xs font-mono font-bold text-[#F97316] tracking-widest uppercase">T.THIESSON</span>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-1">Architecte Digital</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION FAQ */}
      <section 
        id="faq" 
        className="relative z-30 w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 border-t border-white/5 scroll-mt-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Title & CTA */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none uppercase">
              Des Questions ?
            </h2>
            <p className="text-sm text-slate-400 font-light mt-2">
              Vous ne trouvez pas la réponse à votre question ?{" "}
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget('contact');
                }}
                className="text-[#F97316] hover:underline font-medium"
              >
                Contactez-moi
              </a>
            </p>
          </div>
          <div className="lg:col-span-7 flex flex-col divide-y divide-white/10">
            {faqData.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                  className="py-6 first:pt-0 last:pb-0"
                >
                  <button
                    id={`faq-question-${idx}`}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full flex justify-between items-center text-left gap-4 group cursor-pointer"
                  >
                    <span className={`text-base sm:text-lg font-medium transition-colors duration-200 group-hover:text-[#F97316] ${
                      isOpen ? "text-[#F97316]" : "text-white"
                    }`}>
                      {item.question}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-slate-400 group-hover:text-[#F97316] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-[#F97316]" : ""
                      }`}
                    />
                  </button>
                  
                  <motion.div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                      marginTop: isOpen ? 16 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer ref={footerRef} className="relative z-20 w-full px-6 md:px-12 pt-16 pb-8 border-t border-white/5 bg-[#080605] overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/5">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-end select-none tracking-tight">
                <span className="text-sm font-black text-[#F97316] leading-none">/</span>
                <span className="text-xs font-black text-[#F97316]/80 leading-none">/</span>
                <span className="text-[10px] font-black text-[#F97316]/50 leading-none">/</span>
              </span>
              <span className="text-[10px] font-mono text-[#F97316] uppercase tracking-[0.2em]">VISION & IMPACT</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              Redéfinissons ensemble <br />
              les processus de création digitale.
            </h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 w-full md:w-auto">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Navigation & Documents</span>
              <div className="flex flex-col gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#F97316]">
                <a 
                  href="https://www.linkedin.com/in/thierry-thiesson-7887501" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="/cv-thierry-thiesson.pdf" 
                  download="cv-thierry-thiesson.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  Télécharger le CV <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Informations</span>
              <div className="flex flex-col gap-1.5 text-xs font-mono text-slate-300">
                <div>
                  <span className="text-white/40 uppercase">Mail:</span>{" "}
                  <a href="mailto:mist3rth@gmail.com" className="hover:text-[#F97316] transition-colors font-bold">
                    mist3rth@gmail.com
                  </a>
                </div>
                <div>
                  <span className="text-white/40 uppercase">Statut:</span>{" "}
                  <span className="text-[#F97316] font-bold">Recherche active en CDI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width image strip, truncated on both sides */}
        <div className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 overflow-hidden py-8">
          <div className="flex justify-center gap-4 min-w-max px-4">
            {[
              {
                url: bigleafImg,
                alt: "Big Leaf - Application Mobile & Web3",
                title: "Big Leaf"
              },
              {
                url: elgustoImg,
                alt: "El Gusto - Haute Gastronomie",
                title: "El Gusto"
              },
              {
                url: vaAthleticImg,
                alt: "VA Athletic - Private Coaching",
                title: "VA Athletic"
              },
              {
                url: primeImmobilierImg,
                alt: "Prime Immobilier - Prestige",
                title: "Prime Immobilier"
              },
              {
                url: japonImg,
                alt: "Soleil Levant - Photographie & IA",
                title: "Soleil Levant"
              }
            ].map((img, idx) => (
              <div 
                key={idx} 
                className="w-[180px] sm:w-[260px] md:w-[340px] aspect-[16/10] overflow-hidden border border-white/10 group/img relative bg-zinc-900"
              >
                <motion.div style={{ y: yParallaxFooter }} className="w-full h-[160%] -top-[30%] relative">
                  <img 
                    src={img.url} 
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 text-[10px] font-mono text-white/30 uppercase tracking-widest">
          <span>© 2026 THIESSON. Tous droits réservés.</span>
          <span>Architecte & Développeur Full-Stack (Assisté par IA)</span>
        </div>
      </footer>

      {/* Screen bottom fixed gradual blur overlay */}
      <GradualBlur
        target="page"
        position="bottom"
        height="7rem"
        strength={3}
        divCount={6}
        curve="bezier"
        exponential
        opacity={0.95}
        zIndex={50}
      />
      
      {/* ProjectModal — chargé en lazy uniquement quand un projet est ouvert */}
      {selectedProject && (
        <Suspense fallback={null}>
          <AnimatePresence>
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
              onNext={handleNextProject} 
            />
          </AnimatePresence>
        </Suspense>
      )}
          </div>
        } />
        </Routes>
      </Suspense>
      <BackToTop />
    </div>
  );
}



