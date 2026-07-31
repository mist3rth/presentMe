import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Clock, 
  User, 
  Compass, 
  ExternalLink, 
  Code, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { projects } from './ProjetsSection';
import CircularText from './ui/CircularText';
import { AutoplayHoverPauseVideo } from './ui/AutoplayHoverPauseVideo';
import { Grid } from './ui/GridPattern';
import GradualBlur from './GradualBlur';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();

  const currentIndex = projects.findIndex(p => p.id === id);
  const project = projects[currentIndex >= 0 ? currentIndex : 0];
  
  // Calcul du projet suivant pour le bouton "Projet Suivant →"
  const nextIndex = (currentIndex >= 0 ? currentIndex + 1 : 1) % projects.length;
  const nextProject = projects[nextIndex];

  const { scrollY, scrollYProgress } = useScroll();
  const scale = useTransform(scrollY, [0, 600], [1, 1.18]);
  const blurOpacity = useTransform(scrollYProgress, [0.95, 0.99], [1, 0]);

  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: galleryScroll } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });
  const yParallax1 = useTransform(galleryScroll, [0, 1], ["-10%", "10%"]);
  const yParallax2 = useTransform(galleryScroll, [0, 1], ["10%", "-10%"]);

  const badgeScale = useTransform(scrollY, [0, 400], [1, 1.22]); // scales up by ~20px radius

  const artisticHeroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: artisticHeroScroll } = useScroll({
    target: artisticHeroRef,
    offset: ["start end", "end start"]
  });
  const artisticHeroScale = useTransform(artisticHeroScroll, [0, 1], [1, 1.25]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative z-10 w-full min-h-screen bg-[#050302] text-white flex flex-col pt-24"
    >
      {/* Main Contents */}
      {project.type === 'digital' ? (
        <div className="flex-1 w-full pb-24 md:pb-28 flex flex-col">
          {/* Hero visual inside page - Full Width Viewport with scroll zoom */}
          <div className="relative h-[55vh] w-full border-b border-white/10 overflow-hidden mb-12 rounded-none">
            <motion.img 
              style={{ scale }}
              src={project.imageUrl} 
              alt={project.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-[130%] object-cover"
            />
          </div>

          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col">
            {/* Title & Category Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-8 border-b border-white/10">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316]">
                    CAS D'ÉTUDE — DIGITALE
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 border border-white/10 bg-white/5 text-slate-300 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white">
                  {project.title}
                </h1>
              </div>

              {project.link && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 py-3.5 bg-[#F97316] text-black font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-white transition-colors duration-300 cursor-pointer shrink-0"
                >
                  VOIR LE SITE LIVE <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Asymmetric Bento Details Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
              
              {/* Left Column (Metadata Panel - 4 Cols) */}
              <div className="lg:col-span-4 flex flex-col gap-6 p-8 bg-zinc-950/80 border border-white/10 relative overflow-hidden rounded-none">
                <Grid size={20} className="opacity-15" />

                <div className="flex flex-col gap-6 relative z-10">
                  <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
                    <span className="text-xs font-mono text-slate-400 uppercase flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#F97316]" /> DURÉE DU PROJET
                    </span>
                    <span className="text-base font-bold text-white font-mono">{project.duration}</span>
                  </div>

                  <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
                    <span className="text-xs font-mono text-slate-400 uppercase flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#F97316]" /> RÔLE & RESPONSABILITÉ
                    </span>
                    <span className="text-base font-bold text-white font-mono">{project.roleOrTools}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-mono text-slate-400 uppercase flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-[#F97316]" /> APPRÉCIATION & IMPACT
                    </span>
                    <span className="text-sm text-slate-300 font-light leading-relaxed mt-1">
                      {project.description}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column (Brief & Deliverables - 8 Cols) */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                {/* Brief Statement */}
                <div className="p-8 md:p-10 bg-zinc-950/40 border border-white/10 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316]">
                    / LE CONTEXTE & L'INTENTION
                  </h3>
                  <p className="text-lg md:text-xl font-medium text-slate-100 leading-relaxed">
                    "{project.brief || project.description}"
                  </p>
                </div>

                {/* Benefits / Deliverables List */}
                {project.benefits && project.benefits.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
                      / LIVRABLES & IMPACTS CLÉS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.benefits.map((b, idx) => (
                        <div 
                          key={idx} 
                          className="p-5 border border-white/5 bg-white/[0.01] flex items-start gap-3.5"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-200 leading-snug">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Workflow steps overview */}
                {project.workflow && (
                  <div className="flex flex-col gap-6 mt-4">
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
                      / PROCESSUS DE CRÉATION DE VALEUR
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {project.workflow.map((wf, i) => (
                        <div key={i} className="p-6 border border-white/5 bg-zinc-950/60 flex flex-col gap-3 relative overflow-hidden group">
                          <span className="text-xs font-mono text-[#F97316] font-bold">{wf.step}</span>
                          <h4 className="text-base font-bold text-white uppercase tracking-tight">{wf.title}</h4>
                          <p className="text-xs text-slate-400 font-light leading-relaxed">{wf.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Asymmetric Gallery Sections */}
            <div className="flex flex-col gap-12 border-t border-white/10 pt-16">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316]">
                / APPERÇUS DU RENDU & INTERACTION
              </h3>
              
              {/* Asymmetric Image Grid 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center" ref={galleryRef}>
                <div className="lg:col-span-8 aspect-[16/9] bg-zinc-950/80 border border-white/10 relative overflow-hidden rounded-none">
                  <motion.img 
                    style={{ y: yParallax1 }}
                    src={project.overviewA || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=750&q=80"} 
                    alt="Aperçu principal" 
                    className="absolute -top-[10%] left-0 w-full h-[120%] object-cover"
                  />
                </div>
                <div className="lg:col-span-4 aspect-[4/5] bg-zinc-950/80 border border-white/10 relative overflow-hidden rounded-none">
                  <motion.img 
                    style={{ y: yParallax2 }}
                    src={project.overviewB || "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&h=1000&q=80"} 
                    alt="Aperçu mobile" 
                    className="absolute -top-[10%] left-0 w-full h-[120%] object-cover"
                  />
                </div>
              </div>

              {/* Stack Details / Conclusion */}
              {project.stack && (
                <div className="flex flex-col gap-4 border-t border-white/5 pt-8">
                  <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-slate-400 flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#F97316]" /> TECH STACK & ARCHITECTURE
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((st) => (
                      <div 
                        key={st}
                        className="px-3 py-1.5 bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-mono"
                      >
                        {st}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      ) : (
        /* Artistic Project Layout */
        <div className="flex-1 w-full pb-24 md:pb-28 flex flex-col">
          
          {/* Header section with Circular Badges */}
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/10 pb-12 mb-12">
              
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-red-500">
                    EXPRESSION & ART DIRECTION
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 border border-white/10 bg-white/5 text-slate-300 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-white">
                  {project.title}
                </h1>
                
                <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl leading-relaxed mt-2">
                  {project.description}
                </p>
              </div>

              {/* Circular Interactive Badge */}
              <div className="lg:col-span-4 flex justify-start lg:justify-end items-center text-white/60">
                <motion.div 
                  style={{ scale: badgeScale }}
                  className="relative w-48 h-48 flex items-center justify-center"
                >
                  <CircularText 
                    words={["ART", "DIRECTION", "IA"]}
                    separator="*"
                    diameter={180}
                    transition={{ duration: 25 }}
                    font={{ fontSize: "16px", fontWeight: 900, letterSpacing: "0.1em" }}
                    onHover="pause"
                  />
                  <div className="absolute inset-0 m-auto w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-[#F97316]" />
                  </div>
                </motion.div>
              </div>

            </div>
          </div>

          {/* Full-width Hero image for artistic mode */}
          <div ref={artisticHeroRef} className="relative h-[65vh] w-full border-y border-white/10 overflow-hidden mb-16 rounded-none">
            <motion.img 
              style={{ scale: artisticHeroScale }}
              src={project.imageUrl} 
              alt={project.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-[130%] object-cover"
            />
          </div>

          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col">
            
            {/* Artistic Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
              
              {/* Metadata Panel */}
              <div className="lg:col-span-4 flex flex-col gap-6 p-8 bg-zinc-950/80 border border-white/10 relative overflow-hidden rounded-none">
                <Grid size={20} className="opacity-15" />
                
                <div className="flex flex-col gap-6 relative z-10">
                  <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
                    <span className="text-xs font-mono text-slate-400 uppercase flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-red-500" /> ANNEÉ & CRÉATION
                    </span>
                    <span className="text-base font-bold text-white font-mono">{project.duration}</span>
                  </div>

                  <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
                    <span className="text-xs font-mono text-slate-400 uppercase flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-red-500" /> OUTILS & MÉDIAS
                    </span>
                    <span className="text-base font-bold text-white font-mono">{project.roleOrTools}</span>
                  </div>

                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative mt-2 px-6 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-between hover:bg-[#F97316] transition-colors duration-300 cursor-pointer"
                    >
                      EXPLORER LE PROJET <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Narrative & Visual Exploration */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                <div className="p-8 md:p-10 bg-zinc-950/40 border border-white/10 flex flex-col gap-4">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-red-500">
                    / MANIFESTE ET RECHERCHE VISUELLE
                  </h3>
                  <p className="text-lg md:text-xl font-light text-slate-200 leading-relaxed italic">
                    "{project.brief || project.conclusion || project.description}"
                  </p>
                </div>

                {/* Grille d'images (3 visuels) */}
                {(project.overviewA || project.overviewB || project.overviewC) && (
                  <div className="flex flex-col gap-4 mt-4">
                    {/* Ligne 1: 2 images */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.overviewA && (
                        <div className="aspect-[4/3] relative bg-zinc-950">
                          <img 
                            src={project.overviewA} 
                            alt="Visual A" 
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {project.overviewB && (
                        <div className="aspect-[4/3] relative bg-zinc-950">
                          <img 
                            src={project.overviewB} 
                            alt="Visual B" 
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    {/* Ligne 2: 1 image large */}
                    {project.overviewC && (
                      <div className="w-full aspect-[21/9] relative bg-zinc-950">
                        <img 
                          src={project.overviewC} 
                          alt="Visual C" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Bloc Texte 2 (Conclusion) */}
                {project.conclusion && (
                  <div className="p-8 md:p-10 bg-zinc-950/40 border border-white/10 flex flex-col gap-4 mt-4">
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-red-500">
                      / BILAN & APPRENTISSAGES
                    </h3>
                    <p className="text-lg md:text-xl font-light text-slate-200 leading-relaxed italic whitespace-pre-line">
                      {project.conclusion}
                    </p>
                  </div>
                )}

                {/* Asymmetric Conclusion Images / Video */}
                {(project.conclusionA || project.conclusionVideo || project.conclusionB) && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4 items-start">
                    <div className="md:col-span-4 aspect-[9/16] bg-zinc-950/80 relative overflow-hidden rounded-none">
                      <img 
                        src={project.conclusionA || "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=600&h=800&q=80"} 
                        alt="Focus vertical" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-8 aspect-[16/9] bg-zinc-950/80 relative overflow-hidden rounded-none md:mt-16">
                      {project.conclusionVideo ? (
                        <AutoplayHoverPauseVideo 
                          src={project.conclusionVideo} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <img 
                          src={project.conclusionB || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=750&q=80"} 
                          alt="Vue globale" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Stack Details */}
                {project.stack && project.stack.length > 0 && (
                  <div className="flex flex-col gap-4 border-t border-white/5 pt-8">
                    <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-slate-400 flex items-center gap-2">
                      <Code className="w-4 h-4 text-[#F97316]" /> STACK TECHNIQUE & OUTILS ARTISTIQUES
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((st) => (
                        <div 
                          key={st}
                          className="px-3 py-1.5 bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-mono"
                        >
                          {st}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* BOUTON PROJET SUIVANT (Bottom Banner Navigation) */}
      <div className="w-full border-t border-white/10 bg-zinc-950/90 pt-12 pb-36 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="text-xs font-mono text-[#F97316] uppercase tracking-widest">
              PROJET SUIVANT ({nextIndex + 1}/{projects.length})
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
              {nextProject.title}
            </h3>
          </div>

          <Link
            to={`/projet/${nextProject.id}`}
            onClick={() => {
              if ((window as any).lenis) {
                (window as any).lenis.scrollTo(0, { immediate: true });
              }
              window.scrollTo(0, 0);
            }}
            className="group relative px-8 py-4 bg-white text-black hover:bg-[#F97316] hover:text-white transition-colors duration-300 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-3"
          >
            <span>VOIR LE PROJET SUIVANT</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
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
    </motion.div>
  );
}
