import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  User, 
  Compass, 
  ExternalLink, 
  Code, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { Project } from './ProjetsSection';
import { liveProjects } from '../data/portfolioData';
import CircularText from './ui/CircularText';
import { AutoplayHoverPauseVideo } from './ui/AutoplayHoverPauseVideo';
import { Grid } from './ui/GridPattern';
import GradualBlur from './GradualBlur';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onNext }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll({ container: containerRef });
  const scale = useTransform(scrollY, [0, 600], [1, 1.18]);

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [project?.id]);

  if (!project) return null;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 h-screen w-screen bg-[#050302] z-[120] overflow-y-auto flex flex-col rounded-none pt-24 project-modal-container"
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
            <div className="relative bg-gradient-to-b from-[#241a17] to-[#120d0c] border border-white/20 p-8 rounded-none overflow-hidden flex flex-col gap-2 mb-8">
            <Grid size={24} />
            <div className="relative z-20 flex flex-col gap-2">
              <span className="self-start text-[10px] font-mono tracking-widest text-black bg-[#F97316] font-black px-3 py-1 uppercase">
                {project.category}
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tighter leading-none mt-1">
                {project.title}
              </h1>
            </div>
          </div>

          {/* Quick Navigation CTA under the image */}
          <div className="flex justify-between items-center gap-4 mb-12 border-b border-white/10 pb-6">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Retour aux Projets
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#F97316] hover:text-orange-400 transition-colors cursor-pointer"
            >
              Projet Suivant <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* TWO-COLUMN BENTO INFO GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
            {/* Left Column: Brief */}
            <div className="lg:col-span-8 relative bg-gradient-to-b from-[#241a17] to-[#120d0c] border border-white/20 p-8 rounded-none overflow-hidden flex flex-col gap-4">
              <Grid size={20} brightSquares={[[8, 1], [9, 4], [7, 3], [10, 2]]} />
              <div className="relative z-20 flex flex-col gap-4">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316] flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#F97316]" /> BRIEF DU PROJET
                </h3>
                <p className="text-slate-300 font-light text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {project.brief || project.description}
                </p>
              </div>
            </div>

            {/* Right Column: Bento Meta & Stack Panel */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Duration & Role */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.02] border border-white/10 p-5 flex flex-col gap-1 rounded-none">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#F97316]" /> Durée
                  </span>
                  <span className="text-sm font-bold text-white uppercase tracking-tight">
                    {project.duration}
                  </span>
                </div>
                <div className="bg-white/[0.02] border border-white/10 p-5 flex flex-col gap-1 rounded-none">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <User className="w-3 h-3 text-[#F97316]" /> Rôle
                  </span>
                  <span className="text-xs font-bold text-white tracking-tight truncate">
                    Architecte / Dev
                  </span>
                </div>
              </div>

              {/* Access link card */}
              <div className="bg-[#F97316]/5 border border-[#F97316]/20 p-5 flex flex-col gap-3 rounded-none">
                <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest flex items-center gap-1">
                  <Compass className="w-3 h-3" /> Accès direct
                </span>
                {project.link ? (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 self-start bg-[#F97316] hover:bg-orange-600 text-white font-mono text-xs uppercase tracking-widest px-4 py-2 transition-all"
                  >
                    Visiter le Site <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-[#F97316] uppercase font-bold tracking-widest">
                    Création Hors Ligne
                  </span>
                )}
              </div>

              {/* Stack panel */}
              {project.stack && project.stack.length > 0 && (
                <div className="p-6 border border-white/10 bg-white/[0.02] flex flex-col gap-3">
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400 flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#F97316]" /> STACK TECHNIQUE
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.stack.map((st) => (
                      <span 
                        key={st}
                        className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] text-slate-300 font-mono"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* WORKFLOW GRIDS WITH GRID PATTERNS (USER-PROVIDED LAYOUT) */}
          {project.workflow && project.workflow.length > 0 && (
            <div className="flex flex-col gap-8 mb-16">
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316] flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#F97316]" /> LE WORKFLOW CRÉATIF
                </h3>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tighter">
                  CONCEPTION ÉTAPE PAR ÉTAPE.
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {project.workflow.map((wStep) => (
                  <div
                    key={wStep.step}
                    className="relative bg-gradient-to-b from-[#241a17] to-[#120d0c] border border-white/20 p-6 rounded-none overflow-hidden flex flex-col justify-between min-h-[220px]"
                  >
                    <Grid size={16} />
                    <div className="relative z-20 flex flex-col gap-2 h-full justify-between">
                      <span className="font-mono text-xs text-[#F97316]/50 font-black">
                        STAGE // {wStep.step}
                      </span>
                      <div>
                        <h4 className="font-bold text-white text-base leading-snug tracking-tight mb-2">
                          {wStep.title}
                        </h4>
                        <p className="text-xs text-slate-400 font-light leading-relaxed">
                          {wStep.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits Section */}
          {project.benefits && project.benefits.length > 0 && (
            <div className="flex flex-col gap-8 mb-16 border-t border-white/5 pt-12">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#F97316]" /> APPORTS DE LA MÉTHODE STRUCTURÉE
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="bg-white/[0.01] border border-white/5 p-5 flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Live Projects Infinite Carousel */}
          <div className="mt-20 border-t border-white/5 pt-12 flex flex-col items-start w-full">
            {/* Rotating Text Ring aligned to the left */}
            <div className="relative w-44 h-44 flex items-center justify-center mb-8 group ml-1">
              <CircularText
                words={["LIVE", "PROJECT"]}
                separator="//"
                diameter={160}
                color="#F97316"
                font={{
                  fontSize: "12px",
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: "900",
                  letterSpacing: "0.1em"
                }}
                onHover="pause"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <ArrowUpRight className="w-7 h-7 text-[#F97316] group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>

            <div className="marquee-container w-full overflow-hidden relative py-4">
              <div className="marquee-track">
                {/* First set of cards */}
                {liveProjects.map((proj, idx) => (
                  <a
                    key={`live-1-${idx}`}
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-[280px] flex-shrink-0 bg-gradient-to-b from-[#241a17] to-[#120d0c] border border-white/10 p-6 flex flex-col justify-between min-h-[160px] group transition-all duration-300 hover:border-[#F97316]/40 rounded-none cursor-pointer text-left"
                  >
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-mono tracking-widest text-[#F97316]/60 uppercase">
                        {proj.tag}
                      </span>
                      <h4 className="text-lg font-black uppercase text-white group-hover:text-[#F97316] transition-colors flex items-center gap-1.5">
                        {proj.title} <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        {proj.desc}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors mt-4">
                      {proj.url.replace('https://', '').replace('mist3rth.github.io/', '')}
                    </span>
                  </a>
                ))}
                
                {/* Second set of cards for infinite looping */}
                {liveProjects.map((proj, idx) => (
                  <a
                    key={`live-2-${idx}`}
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-[280px] flex-shrink-0 bg-gradient-to-b from-[#241a17] to-[#120d0c] border border-white/10 p-6 flex flex-col justify-between min-h-[160px] group transition-all duration-300 hover:border-[#F97316]/40 rounded-none cursor-pointer text-left"
                  >
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-mono tracking-widest text-[#F97316]/60 uppercase">
                        {proj.tag}
                      </span>
                      <h4 className="text-lg font-black uppercase text-white group-hover:text-[#F97316] transition-colors flex items-center gap-1.5">
                        {proj.title} <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        {proj.desc}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors mt-4">
                      {proj.url.replace('https://', '').replace('mist3rth.github.io/', '')}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      ) : (
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

          {/* Content Container (max-w-5xl, centered, side padded) */}
          <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col">
            {/* Title & Category Info */}
            <div className="flex flex-col gap-2 mb-6">
              <span className="self-start text-[10px] font-mono tracking-widest text-black bg-[#F97316] font-black px-3 py-1 uppercase">
                {project.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tighter leading-none mt-1">
                {project.title}
              </h1>
            </div>

            {/* Quick Navigation CTA under the image */}
            <div className="flex justify-between items-center gap-4 mb-12 border-b border-white/10 pb-6">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Retour aux Projets
              </button>
              <button
                onClick={onNext}
                className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#F97316] hover:text-orange-400 transition-colors cursor-pointer"
              >
                Projet Suivant <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Meta details blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/[0.02] border border-white/15 p-6 flex flex-col gap-1.5 rounded-none">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#F97316]" /> Temps de développement
                </span>
                <span className="text-lg font-bold text-white uppercase tracking-tight">
                  {project.duration}
                </span>
              </div>

              <div className="bg-white/[0.02] border border-white/15 p-6 flex flex-col gap-1.5 rounded-none">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#F97316]" /> Rôle / Outils
                </span>
                <span className="text-sm font-medium text-white tracking-tight line-clamp-2">
                  {project.roleOrTools}
                </span>
              </div>

              <div className="bg-[#F97316]/5 border border-[#F97316]/30 p-6 flex flex-col justify-between gap-3 rounded-none">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" /> Accès direct
                  </span>
                  <span className="text-xs font-mono text-slate-300 truncate">
                    {project.link ? "Démonstration disponible" : "Création Artistique Hors Ligne"}
                  </span>
                </div>
                {project.link ? (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 self-start bg-[#F97316] hover:bg-orange-600 text-white font-mono text-xs uppercase tracking-widest px-4 py-2.5 transition-all"
                  >
                    Visiter le Site <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-[#F97316] uppercase font-bold tracking-widest">
                    Rendu HD natif
                  </span>
                )}
              </div>
            </div>

            {/* ASYMMETRIC STICKY LAYOUT GRID */}
            <div className="flex flex-col gap-0 border-t border-white/10">
              
              {/* SECTION 1: OVERVIEW */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 border-b border-white/10 items-start">
                {/* Sticky Header Column */}
                <div className="lg:col-span-3 lg:sticky lg:top-28">
                  <span className="text-xs font-mono font-black uppercase text-[#F97316] tracking-[0.2em] block">
                    [OVERVIEW]
                  </span>
                </div>
                {/* Content Column */}
                <div className="lg:col-span-9 flex flex-col gap-6">
                  {project.brief ? (
                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white">
                        BRIEF DU PROJET
                      </h3>
                       <div className="text-slate-300 font-light text-base leading-relaxed flex flex-col gap-3">
                        {project.brief.split('\n').map((line, lineIdx) => {
                          if (!line.trim()) return <div key={lineIdx} className="h-2" />;
                          const match = line.match(/^(CONCEPT|PALETTE|FORMAT|CIBLE|CAUSES\s*&\s*ASSOS)\s*:(.*)$/i);
                          if (match) {
                            return (
                              <p key={lineIdx} className="m-0">
                                <span className="font-black text-white uppercase tracking-wider text-xs">{match[1]}</span> : {match[2].trim()}
                              </p>
                            );
                          }
                          return <p key={lineIdx} className="m-0">{line}</p>;
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white">
                        CONCEPT CRÉATIF
                      </h3>
                      <p className="text-slate-300 font-light text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  )}

                  {/* 3-Image Layout Grid (2 Columns + 1 Full Width) */}
                  <div className="flex flex-col gap-4 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="aspect-[4/3] bg-zinc-950/80 border border-white/10 relative overflow-hidden rounded-none">
                        <img 
                          src={project.overviewA || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"} 
                          alt="Détail conceptuel" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-[4/3] bg-zinc-950/80 border border-white/10 relative overflow-hidden rounded-none">
                        <img 
                          src={project.overviewB || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"} 
                          alt="Aperçu produit" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-full aspect-[21/9] bg-zinc-950/80 border border-white/10 relative overflow-hidden rounded-none">
                      <img 
                        src={project.overviewC || "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"} 
                        alt="Rendu large" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: WORKFLOW */}
              {project.workflow && project.workflow.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 border-b border-white/10 items-start">
                  {/* Sticky Header Column */}
                  <div className="lg:col-span-3 lg:sticky lg:top-28">
                    <span className="text-xs font-mono font-black uppercase text-[#F97316] tracking-[0.2em] block">
                      [WORKFLOW]
                    </span>
                  </div>
                  {/* Content Column */}
                  <div className="lg:col-span-9 flex flex-col gap-6">
                    <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white">
                      LE WORKFLOW CRÉATIF
                    </h3>
                    
                    <div className="flex flex-col border-l border-white/10 pl-6 gap-8 ml-2 mt-4">
                      {project.workflow.map((wStep) => (
                        <div key={wStep.step} className="relative flex flex-col gap-2">
                          {/* Glowing dot */}
                          <span className="absolute left-[-31px] top-1.5 w-2 h-2 rounded-full bg-[#F97316] ring-4 ring-zinc-950" />
                          
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-slate-500 font-black">
                              {wStep.step}
                            </span>
                            <h4 className="font-bold text-white text-base">
                              {wStep.title}
                            </h4>
                          </div>
                          <p className="text-sm text-slate-400 font-light leading-relaxed">
                            {wStep.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 3: CONCLUSION */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 items-start">
                {/* Sticky Header Column */}
                <div className="lg:col-span-3 lg:sticky lg:top-28">
                  <span className="text-xs font-mono font-black uppercase text-[#F97316] tracking-[0.2em] block">
                    [CONCLUSION]
                  </span>
                </div>
                {/* Content Column */}
                <div className="lg:col-span-9 flex flex-col gap-8">
                  {project.conclusion && (
                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white">
                        BILAN & APPRENTISSAGES
                      </h3>
                      <p className="text-slate-300 font-light text-base leading-relaxed whitespace-pre-line">
                        {project.conclusion}
                      </p>
                    </div>
                  )}

                  {project.benefits && project.benefits.length > 0 && (
                    <div className="flex flex-col gap-6">
                      <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white">
                        APPORTS DE LA MÉTHODE STRUCTURÉE
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.benefits.map((benefit, bIdx) => (
                          <div key={bIdx} className="bg-white/[0.01] border border-white/5 p-5 flex items-start gap-3.5">
                            <CheckCircle2 className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Asymmetric Conclusion Images (Vertical Left + Horizontal Right) */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4 items-start">
                    <div className="md:col-span-4 aspect-[9/16] bg-zinc-950/80 border border-white/10 relative overflow-hidden rounded-none">
                      <img 
                        src={project.conclusionA || "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=600&h=800&q=80"} 
                        alt="Focus vertical" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-8 aspect-[16/9] bg-zinc-950/80 border border-white/10 relative overflow-hidden rounded-none md:mt-16">
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

                  {/* Stack Details inside Conclusion / Tools */}
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
};
