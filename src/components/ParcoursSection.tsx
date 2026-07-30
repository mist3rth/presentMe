import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import retroImg from '../assets/parcours_retro.webp';
import webImg from '../assets/parcours_web.webp';
import designImg from '../assets/parcours_design.webp';
import aiImg from '../assets/parcours_ai.png';

interface TimelineItem {
  id: number;
  period: string;
  title: string;
  description: string;
}

const images = [retroImg, webImg, designImg, aiImg];

export default function ParcoursSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  
  const items: TimelineItem[] = [
    {
      id: 0,
      period: '1983 - 1997',
      title: "L'Étincelle",
      description: "L'époque des écrans à tube cathodique et de l'exploration brute. De l'Alice à l'Atari ST, en passant par l'Apple II et le PC1512. Fasciné par la logique, j'écris mes premières lignes de BASIC, j'explore MS-DOS et j'assiste aux balbutiements de Windows."
    },
    {
      id: 1,
      period: '1997 - 2005',
      title: "La Fenêtre sur le Monde",
      description: "L'arrivée d'Internet redessine les frontières du possible. Découverte du web originel et de la navigation naissante. C'est la période où j'assimile les fondamentaux du digital et où je plonge dans la genèse de l'optimisation pour les moteurs de recherche."
    },
    {
      id: 2,
      period: '2005 - 2019',
      title: "L'Exigence 360°",
      description: "Plus d'une décennie au cœur de la rigueur et de la performance. Une immersion totale pour forger une vision transverse et maîtriser l'ensemble de la chaîne de valeur : de la stratégie de conception à l'architecture technique, en intégrant pleinement les aspects d'ergonomie et d'expérience utilisateur."
    },
    {
      id: 3,
      period: '2019 - PRÉSENT',
      title: "Le Virage Algorithmique",
      description: "Prise de conscience immédiate de la révolution de l'Intelligence Artificielle. Consolidation théorique via un cursus académique au MIT sur l'IA, suivie d'une accélération exponentielle. Transition de la création digitale classique vers le Vibe Coding et l'orchestration de modèles de langage."
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -45% 0px', // Trigger when item is in middle third of screen
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setActiveIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Find all item elements
    const elements = document.querySelectorAll('.parcours-item');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="parcours" 
      ref={sectionRef}
      className="relative z-30 w-full max-w-6xl mx-auto px-6 md:px-12 py-32 md:py-40 overflow-visible border-t border-white/5 scroll-mt-32"
    >
      {/* Structural side lines matching grid layout */}
      <div className="absolute inset-y-0 left-0 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute inset-y-0 left-1/3 w-[1px] bg-white/5 hidden md:block pointer-events-none" />

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 relative z-10">
        
        {/* LEFT COLUMN: STICKY VISUAL PANEL */}
        <div className="md:col-span-5">
          <div className="sticky top-[150px] flex flex-col gap-6 pt-4 pb-4">
            
            {/* Timeline mini tracker */}
            <div className="flex flex-col gap-2 select-none">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-end tracking-tight">
                  <span className="text-sm font-black text-[#F97316] leading-none">/</span>
                  <span className="text-xs font-black text-[#F97316]/80 leading-none">/</span>
                  <span className="text-[10px] font-black text-[#F97316]/50 leading-none">/</span>
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316]">TRANSITIONS & ÉPOQUES</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white leading-none">
                PARCOURS.
              </h2>
            </div>

            {/* Holographic Interactive Visual Panel */}
            <div className="relative aspect-[3/4] w-full max-w-[380px] mx-auto bg-black/60 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_25px_65px_-15px_rgba(0,0,0,0.9)]">
              
              {/* Background Image with crossfade transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 z-0"
                >
                  <img
                    src={images[activeIndex]}
                    alt="Illustration de l'époque"
                    className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.02]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom active indicators below the card */}
            <div className="flex justify-center gap-1.5 w-full mt-4 select-none">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === item.id ? 'w-6 bg-[#F97316]' : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>

            <div className="text-[10px] font-mono text-center text-slate-500 uppercase tracking-wider hidden md:block select-none mt-2">
              SCROLLEZ POUR DÉCOUVRIR LES ÉTAPES
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: TIMELINE TEXT BLOCKS */}
        <div className="md:col-span-7 flex flex-col pl-0 md:pl-8 pb-[40vh]">
          
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={item.id}
                data-index={index}
                className="parcours-item flex flex-col gap-4 min-h-[65vh] justify-center py-16 md:py-24 border-b border-white/5 last:border-b-0 group scroll-mt-24"
              >
                <div className="flex items-center">
                  
                  {/* Period badge */}
                  <span className={`font-mono text-xs uppercase tracking-widest px-3 py-1 border transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#F97316] text-black border-[#F97316] font-black' 
                      : 'text-slate-400 border-white/10'
                  }`}>
                    {item.period}
                  </span>
                </div>

                {/* Header Title */}
                <h3 className={`text-3xl md:text-4xl font-black uppercase tracking-tight transition-all duration-500 ${
                  isActive 
                    ? 'text-white translate-x-1' 
                    : 'text-white/40 group-hover:text-white/60'
                }`}>
                  {item.title}
                </h3>

                {/* Description */}
                <p className={`text-base leading-relaxed font-light transition-all duration-500 ${
                  isActive 
                    ? 'text-slate-200' 
                    : 'text-slate-500 group-hover:text-slate-400'
                }`}>
                  {item.description}
                </p>

                {/* Progress bar line for visual connection */}
                <div className="relative h-[2px] w-full bg-white/5 mt-4 overflow-hidden rounded">
                  <motion.div 
                    className="absolute h-full bg-gradient-to-r from-[#F97316] to-amber-400"
                    initial={{ width: "0%" }}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
