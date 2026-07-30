import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import bigleafImg from '../../assets/bigleaf.webp';
import elgustoImg from '../../assets/elgusto.webp';
import vaAthleticImg from '../../assets/vaathletic.webp';
import primeImmobilierImg from '../../assets/primeimmobilier.webp';
import japonImg from '../../assets/japon.webp';
import hommeWebp from '../../assets/homme.webp';
import heroWebp from '../../assets/hero.webp';

interface LevierItem {
  id: string;
  num: string;
  pilier: string;
  title: string;
  tags: string[];
  image: string;
  imageAlt: string;
  description: React.ReactNode;
  activeDot: number;
}

export const ValueDriversPinnedSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const leviers: LevierItem[] = [
    {
      id: '001',
      num: '//001',
      pilier: 'PILIER — 01 / USAGE & INTENTION',
      title: 'PSYCHOLOGIE & ERGONOMIE',
      tags: ['Biais cognitifs', 'Parcours UX', 'Stratégie UX'],
      image: vaAthleticImg,
      imageAlt: 'Psychologie & Ergonomie - VA Athletic',
      activeDot: 0,
      description: (
        <>
          DÉCODER <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 font-extrabold pr-2">L'INTENTION</span> D'USAGE. L'ART DE COMPRENDRE <span className="text-white border-b-2 border-[#F97316]/50">LES ATTENTES ET LE COMPORTEMENT</span> DES UTILISATEURS.
        </>
      )
    },
    {
      id: '002',
      num: '//002',
      pilier: 'PILIER — 02 / DÉVELOPPEMENT & IA',
      title: 'INGÉNIERIE & CODE',
      tags: ['TypeScript', 'Web perf', 'Vibe coding'],
      image: bigleafImg,
      imageAlt: 'Ingénierie & Code - Big Leaf',
      activeDot: 1,
      description: (
        <>
          BÂTIR DES <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 font-extrabold pr-2">APPLICATIONS</span> PROPRES. ASSOCIER LA RIGOUREUSE STRUCTURE DU <span className="text-white border-b-2 border-[#F97316]/50">PROMPT D'ARCHITECTURE</span> À LA RAPIDITÉ DE L'IA.
        </>
      )
    },
    {
      id: '003',
      num: '//003',
      pilier: 'PILIER — 03 / DESIGN & CRÉATIVITÉ',
      title: 'DESIGN & ESTHÉTIQUE',
      tags: ['Direction Art', 'UI/UX', 'Motion'],
      image: elgustoImg,
      imageAlt: 'Design & Esthétique - El Gusto',
      activeDot: 2,
      description: (
        <>
          CRÉER DU <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 font-extrabold pr-2">RESSENTI</span> DANS L'IMAGE. METTRE AU POINT DES INTERFACES ET DES CRÉATIONS QUI <span className="text-white border-b-2 border-[#F97316]/50">S'EFFACENT</span> POUR LAISSER PLACE À L'EXPÉRIENCE.
        </>
      )
    },
    {
      id: '004',
      num: '//004',
      pilier: 'PILIER — 04 / PERFORMANCE & ACCÈS',
      title: 'VITESSE & ACCESSIBILITÉ',
      tags: ['Core Web Vitals', 'A11y WCAG', 'Lightweight'],
      image: primeImmobilierImg,
      imageAlt: 'Vitesse & Accessibilité - Prime Immobilier',
      activeDot: 0,
      description: (
        <>
          OPTIMISER <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 font-extrabold pr-2">LE TEMPS DE RÉPONSE</span>. CHAQUE MILLISECONDE GAGNÉE EST UNE <span className="text-white border-b-2 border-[#F97316]/50">FRICTION EN MOINS</span> POUR L'UTILISATEUR.
        </>
      )
    },
    {
      id: '005',
      num: '//005',
      pilier: 'PILIER — 05 / ART DIRECTION',
      title: 'PHOTOGRAPHIE & VISUEL',
      tags: ['Direction Visuelle', 'Composition', 'Colorimétrie'],
      image: japonImg,
      imageAlt: 'Photographie & Visuel - Soleil Levant',
      activeDot: 1,
      description: (
        <>
          SUBLIMER <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 font-extrabold pr-2">L'IDENTITÉ</span> PAR L'IMAGE. COMPOSER DES VISUELS PERCUTANTS QUI <span className="text-white border-b-2 border-[#F97316]/50">MARQUENT LES ESPRITS</span> DÈS LA PREMIÈRE SECONDE.
        </>
      )
    },
    {
      id: '006',
      num: '//006',
      pilier: 'PILIER — 06 / HUMAIN & IA',
      title: 'VISION & STRATÉGIE',
      tags: ['Humain + IA', 'Architecture', 'Systèmes'],
      image: hommeWebp,
      imageAlt: 'Vision & Stratégie',
      activeDot: 2,
      description: (
        <>
          ALLIER <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 font-extrabold pr-2">L'EXPERTISE HUMAINE</span> ET LA PUISSANCE ALGORITHMIQUE POUR CONCEVOIR DES <span className="text-white border-b-2 border-[#F97316]/50">PRODUITS DIGITAUX DURABLES</span>.
        </>
      )
    },
    {
      id: '007',
      num: '//007',
      pilier: 'PILIER — 07 / PROMPT ENGINEERING',
      title: 'ORCHESTRATION AGENTIQUE',
      tags: ['BMAD', 'Agents AI', 'Workflow MIT'],
      image: heroWebp,
      imageAlt: 'Orchestration Agentique',
      activeDot: 0,
      description: (
        <>
          PILOTER <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 font-extrabold pr-2">DES AGENTS AUTONOMES</span>. STRUCTURER LE CADRE DE TRAVAIL DES IA POUR <span className="text-white border-b-2 border-[#F97316]/50">GÉRER LA COMPLEXITÉ SANS DETTE</span>.
        </>
      )
    },
    {
      id: '008',
      num: '//008',
      pilier: 'PILIER — 08 / MOTION & FEEDBACK',
      title: 'MICRO-INTERACTIONS',
      tags: ['Framer Motion', 'Sensorialité', 'UX Motion'],
      image: vaAthleticImg,
      imageAlt: 'Micro-Interactions',
      activeDot: 1,
      description: (
        <>
          INFLUENCER <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 font-extrabold pr-2">PAR LE MOUVEMENT</span>. DONNER DU SENS ET DE LA RÉACTIVITÉ À <span className="text-white border-b-2 border-[#F97316]/50">CHAQUE GESTE DE L'UTILISATEUR</span>.
        </>
      )
    },
    {
      id: '009',
      num: '//009',
      pilier: 'PILIER — 09 / VALEUR & CONVERSION',
      title: 'ALIGNEMENT BUSINESS',
      tags: ['ROI Digital', 'Conversion', 'Impact Product'],
      image: primeImmobilierImg,
      imageAlt: 'Alignement Business',
      activeDot: 2,
      description: (
        <>
          GARANTIR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 font-extrabold pr-2">L'IMPACT RECHERCHÉ</span>. TRANSFORMER L'EXCELLENCE DE CONCEPTION EN <span className="text-white border-b-2 border-[#F97316]/50">RÉSULTATS BUSINESS CONCRETS</span>.
        </>
      )
    }
  ];

  // Tracker de scroll sur tout le grand conteneur
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative w-full border-t border-white/5" style={{ height: `${leviers.length * 75}vh` }}>
      {/* Sticky viewport frame (se bloque quand le haut arrive à ~80px de la nav) */}
      <div className="sticky top-[80px] h-[calc(100vh-80px)] min-h-[600px] flex flex-col justify-between py-8 max-w-6xl mx-auto px-6 md:px-12 overflow-hidden z-30">
        
        {/* Header de section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-6 border-b border-white/10 shrink-0">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-end select-none tracking-tight">
                <span className="text-lg font-black text-[#F97316] leading-none">/</span>
                <span className="text-sm font-black text-[#F97316]/80 leading-none">/</span>
                <span className="text-xs font-black text-[#F97316]/50 leading-none">/</span>
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316]">9 leviers de valeur</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              3 PILIERS, 9 LEVIERS.
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-slate-400 leading-relaxed font-light hidden sm:block">
            Une vision 360 de la création digitale, où chaque compétence nourrit la cohérence globale du projet.
          </p>
        </div>

        {/* Dynamic Split Layout: Image fixe à gauche / Cartes défilantes à droite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-grow py-6 overflow-hidden">
          
          {/* GAUCHE : Image Pinning avec transition crossfade dynamique */}
          <div className="lg:col-span-5 h-[300px] lg:h-[420px] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
            {leviers.map((item, index) => {
              const start = index / leviers.length;
              const end = (index + 1) / leviers.length;
              // Fondu entrant / sortant calculé pour chaque carte
              const opacity = useTransform(
                scrollYProgress,
                [Math.max(0, start - 0.05), start, end - 0.05, Math.min(1, end)],
                [0, 1, 1, 0]
              );
              const scale = useTransform(
                scrollYProgress,
                [start, end],
                [1.05, 1]
              );

              return (
                <motion.div
                  key={item.id}
                  style={{ opacity, scale }}
                  className="absolute inset-0 w-full h-full flex flex-col justify-end p-6"
                >
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Badge Overlay */}
                  <div className="relative z-10 flex flex-col gap-2">
                    <span className="font-mono text-xs text-[#F97316] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 border border-[#F97316]/30 self-start">
                      {item.num} — {item.title}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* DROITE : Défilement des cartes de contenus */}
          <div className="lg:col-span-7 relative h-[300px] lg:h-[420px] flex items-center overflow-hidden">
            {leviers.map((item, index) => {
              const start = index / leviers.length;
              const end = (index + 1) / leviers.length;
              // Glissement vertical et opacité pour défiler les contenus de droite
              const opacity = useTransform(
                scrollYProgress,
                [Math.max(0, start - 0.04), start, end - 0.04, Math.min(1, end)],
                [0, 1, 1, 0]
              );
              const y = useTransform(
                scrollYProgress,
                [Math.max(0, start - 0.05), start, end - 0.05, Math.min(1, end)],
                [50, 0, 0, -50]
              );

              return (
                <motion.div
                  key={item.id}
                  style={{ opacity, y }}
                  className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 border border-white/10 bg-[#070504]/90 backdrop-blur-md rounded-2xl shadow-2xl"
                >
                  <div className="flex flex-col gap-4">
                    <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316]">
                      {item.pilier}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter">
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2.5 py-1 border border-white/10 bg-white/5 text-slate-300 uppercase tracking-wider rounded-sm">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2">
                      <p className="text-base sm:text-xl font-black uppercase tracking-tight leading-snug text-slate-100">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-4">
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className={`w-4 h-[3px] transition-all duration-300 rounded-full ${
                            i === item.activeDot ? 'bg-[#F97316]' : 'bg-zinc-800'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-white/40">{item.num} / 009</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
