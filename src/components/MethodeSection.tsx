import React, { useId } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Cpu, Layers, Workflow } from 'lucide-react';

interface MethodStep {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  color: string;
  bgGradient: string;
}

// Grid Pattern helper components local to the file
const Grid = ({ size, brightSquares }: { size?: number; brightSquares?: number[][] }) => {
  const pLow = [[5, 2], [6, 4], [8, 1], [10, 3], [12, 5], [7, 2]];
  const pMedium = [[7, 3], [9, 1], [11, 4], [8, 5], [6, 2]];
  const pHigh = brightSquares ?? [[8, 2], [10, 4], [9, 5]];

  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)] z-0 select-none">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#F97316]/5 from-orange-100/5 to-transparent opacity-60">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={pLow}
          mediumSquares={pMedium}
          brightSquares={pHigh}
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:stroke-[#F97316]/10 stroke-orange-500/10"
        />
      </div>
    </div>
  );
};

function GridPattern({ width, height, x, y, squares, mediumSquares, brightSquares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible fill-[#F97316]/5 dark:fill-[#F97316]/5">
          {squares.map(([x, y]: any) => (
            <rect strokeWidth="0" key={`low-${x}-${y}`} width={width + 1} height={height + 1} x={x * width} y={y * height} />
          ))}
        </svg>
      )}
      {mediumSquares && (
        <svg x={x} y={y} className="overflow-visible fill-[#F97316]/15 dark:fill-[#F97316]/15">
          {mediumSquares.map(([x, y]: any) => (
            <rect strokeWidth="0" key={`med-${x}-${y}`} width={width + 1} height={height + 1} x={x * width} y={y * height} />
          ))}
        </svg>
      )}
      {brightSquares && (
        <svg x={x} y={y} className="overflow-visible fill-[#F97316]/40 dark:fill-[#F97316]/40 stroke-[#F97316]/50 stroke-[1px]">
          {brightSquares.map(([x, y]: any) => (
            <rect key={`bright-${x}-${y}`} width={width + 1} height={height + 1} x={x * width} y={y * height} />
          ))}
        </svg>
      )}
    </svg>
  );
}

// 4 SVG Micro-Animation Subcomponents
const StitchVisual = () => {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden bg-black/20 border border-white/5 mt-6 rounded-none">
      <svg className="w-40 h-40 overflow-visible" viewBox="0 0 100 100">
        {/* Orbits */}
        <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(249, 115, 22, 0.15)" strokeWidth="1" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(249, 115, 22, 0.1)" strokeWidth="1" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(249, 115, 22, 0.08)" strokeWidth="1" />
        
        {/* Center Glowing Node */}
        <motion.circle 
          initial={{ r: 5, opacity: 0.8 }}
          cx="50" 
          cy="50" 
          r="5" 
          fill="#F97316" 
          animate={{ r: [5, 7, 5], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Spark 1 */}
        <motion.circle
          initial={{ cx: 50 + 15 * Math.cos(0), cy: 50 + 15 * Math.sin(0) }}
          cx={50 + 15 * Math.cos(0)}
          cy={50 + 15 * Math.sin(0)}
          r="2.5"
          fill="#F97316"
          animate={{
            cx: [50 + 15 * Math.cos(0), 50 + 15 * Math.cos(2*Math.PI)],
            cy: [50 + 15 * Math.sin(0), 50 + 15 * Math.sin(2*Math.PI)],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Spark 2 */}
        <motion.circle
          initial={{ cx: 50 + 28 * Math.cos(Math.PI), cy: 50 + 28 * Math.sin(Math.PI) }}
          cx={50 + 28 * Math.cos(Math.PI)}
          cy={50 + 28 * Math.sin(Math.PI)}
          r="2"
          fill="#F97316"
          animate={{
            cx: [50 + 28 * Math.cos(Math.PI), 50 + 28 * Math.cos(Math.PI + 2*Math.PI)],
            cy: [50 + 28 * Math.sin(Math.PI), 50 + 28 * Math.sin(Math.PI + 2*Math.PI)],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* Spark 3 */}
        <motion.circle
          initial={{ cx: 50 + 40 * Math.cos(Math.PI/2), cy: 50 + 40 * Math.sin(Math.PI/2) }}
          cx={50 + 40 * Math.cos(Math.PI/2)}
          cy={50 + 40 * Math.sin(Math.PI/2)}
          r="1.5"
          fill="#F97316"
          animate={{
            cx: [50 + 40 * Math.cos(Math.PI/2), 50 + 40 * Math.cos(Math.PI/2 - 2*Math.PI)],
            cy: [50 + 40 * Math.sin(Math.PI/2), 50 + 40 * Math.sin(Math.PI/2 - 2*Math.PI)],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
};

const StudioVisual = () => {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden bg-black/20 border border-white/5 mt-6 rounded-none">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 16 }).map((_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          return (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 bg-[#F97316]"
              animate={{
                opacity: [0.1, 0.9, 0.1],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: (row + col) * 0.25,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const AntigravityVisual = () => {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden bg-black/20 border border-white/5 mt-6 rounded-none">
      <svg className="w-40 h-28 overflow-visible" viewBox="0 0 100 80">
        <g transform="translate(0, 10)">
          {/* Layer 3 (Bottom) */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <polygon points="50,60 80,45 50,30 20,45" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          </motion.g>

          {/* Layer 2 (Middle) */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <polygon points="50,45 80,30 50,15 20,30" fill="rgba(249, 115, 22, 0.05)" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1" />
          </motion.g>

          {/* Layer 1 (Top) */}
          <motion.g
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <polygon points="50,30 80,15 50,0 20,15" fill="rgba(249, 115, 22, 0.15)" stroke="#F97316" strokeWidth="1" />
          </motion.g>
        </g>
      </svg>
    </div>
  );
};

const BmadVisual = () => {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden bg-black/20 border border-white/5 mt-6 rounded-none">
      <svg className="w-40 h-24 overflow-visible" viewBox="0 0 120 80">
        {/* Intersecting paths */}
        <path d="M 20 40 L 60 20 L 100 40 L 60 60 Z" fill="none" stroke="rgba(249, 115, 22, 0.15)" strokeWidth="1" />
        <line x1="20" y1="40" x2="100" y2="40" stroke="rgba(249, 115, 22, 0.15)" strokeWidth="1" />
        <line x1="60" y1="20" x2="60" y2="60" stroke="rgba(249, 115, 22, 0.15)" strokeWidth="1" />

        {/* Animated connection pulses */}
        <motion.circle initial={{ cx: 20, cy: 40 }} cx={20} cy={40} r="2" fill="#F97316" animate={{ cx: [20, 60, 100, 60, 20], cy: [40, 20, 40, 60, 40] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
        <motion.circle initial={{ cx: 100, cy: 40 }} cx={100} cy={40} r="2" fill="#F97316" animate={{ cx: [100, 60, 20, 60, 100], cy: [40, 60, 40, 20, 40] }} transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 3 }} />

        {/* Nodes */}
        <circle cx="20" cy="40" r="3.5" fill="#F97316" />
        <circle cx="60" cy="20" r="3.5" fill="#F97316" />
        <circle cx="100" cy="40" r="3.5" fill="#F97316" />
        <circle cx="60" cy="60" r="3.5" fill="#F97316" />
      </svg>
    </div>
  );
};

export default function MethodeSection() {
  const steps: MethodStep[] = [
    {
      id: 'stitch',
      num: '01',
      title: 'Stitch',
      subtitle: "L'idée prend forme",
      description: "Tout commence ici. Stitch est mon espace d'idéation et d'itération rapide. Je génère, je teste, je rejette, je recommence. L'IA devient un partenaire de brainstorming autonome qui structure la créativité.",
      icon: <Sparkles className="w-4 h-4" />,
      tags: ['Idéation', 'Itération', 'Stitch Engine'],
      color: '#F97316',
      bgGradient: 'from-[#1a110e] to-[#080504]'
    },
    {
      id: 'ai-studio',
      num: '02',
      title: 'Google AI Studio',
      subtitle: 'Du concept au vivant',
      description: "Une fois la direction trouvée, le projet bascule vers Google AI Studio. C'est là que l'idée brute prend vie. Une interface réelle est bootstrappée, compilant des bases saines prêtes pour l'intégration.",
      icon: <Cpu className="w-4 h-4" />,
      tags: ['Gemini API', 'TypeScript Base', 'Prototypage'],
      color: '#F97316',
      bgGradient: 'from-[#16120e] to-[#080605]'
    },
    {
      id: 'antigravity',
      num: '03',
      title: 'Antigravity',
      subtitle: 'Le polish UX/UI',
      description: "L'ossature est là, place à l'âme. Antigravity prend le relais pour le raffinement visuel, l'optimisation des performances de rendu et la mise au point des micro-détails interactifs qui transcendent l'interface.",
      icon: <Layers className="w-4 h-4" />,
      tags: ['Polish Premium', 'A11Y & LCP', 'Framer Motion'],
      color: '#F97316',
      bgGradient: 'from-[#141211] to-[#080707]'
    },
    {
      id: 'bmad-agents',
      num: '04',
      title: 'BMAD + Agents MIT',
      subtitle: 'La méthode structurée',
      description: "Ce cycle n'est pas improvisé. Il est piloté par la méthodologie BMAD et consolidé par des agentic skills certifiés par le MIT. Une rigueur discrète qui supprime la dette technique dès le premier jour.",
      icon: <Workflow className="w-4 h-4" />,
      tags: ['BMAD Framework', 'MIT Skills', 'Zéro Dette'],
      color: '#F97316',
      bgGradient: 'from-[#121212] to-[#060606]'
    }
  ];

  return (
    <section 
      id="methodologie" 
      className="relative z-30 w-full max-w-6xl mx-auto px-6 md:px-12 py-32 md:py-40 overflow-hidden border-t border-white/5 scroll-mt-24"
    >
      {/* Decorative Guidelines */}
      <div className="absolute inset-y-0 left-0 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute inset-y-0 left-1/3 w-[1px] bg-white/5 hidden md:block pointer-events-none" />

      {/* Title block */}
      <div className="flex flex-col gap-2 mb-16 relative z-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-end select-none tracking-tight">
            <span className="text-sm font-black text-[#F97316] leading-none">/</span>
            <span className="text-xs font-black text-[#F97316]/80 leading-none">/</span>
            <span className="text-[10px] font-black text-[#F97316]/50 leading-none">/</span>
          </span>
          <span className="text-xs font-mono uppercase tracking-[0.15em] text-[#F97316]">UN PROCESS EN 4 ÉTAPES</span>
        </div>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-none mt-1">
          LA MÉTHODE, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400">UN FLUX</span>.
        </h3>
      </div>

      {/* BENTO GRID (NON-TIMELINE MODERN LAYOUT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Row 1: 50% / 50% */}
        <div className="lg:col-span-6 relative bg-gradient-to-b from-[#241a17] to-[#120d0c] border border-white/20 p-8 rounded-none overflow-hidden flex flex-col justify-between min-h-[380px] group transition-all duration-300">
          <Grid size={22} brightSquares={[[6, 2], [9, 4]]} />
          <div className="relative z-20 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-[#F97316] tracking-[0.2em] font-black uppercase">
                  PHASE 01 // IDÉATION
                </span>
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-[#F97316] transition-colors duration-300">
                {steps[0].title}
              </h4>
              <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                {steps[0].description}
              </p>
            </div>
            
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {steps[0].tags.map(tag => (
                  <span key={tag} className="text-[9px] font-mono tracking-widest uppercase border px-2 py-0.5 bg-white/[0.02] border-white/10 text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              <StitchVisual />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative bg-gradient-to-b from-[#241a17] to-[#120d0c] border border-white/20 p-8 rounded-none overflow-hidden flex flex-col justify-between min-h-[380px] group transition-all duration-300">
          <Grid size={22} brightSquares={[[8, 3], [10, 1]]} />
          <div className="relative z-20 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-[#F97316] tracking-[0.2em] font-black uppercase">
                  PHASE 02 // PROTOTYPAGE
                </span>
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-[#F97316] transition-colors duration-300">
                {steps[1].title}
              </h4>
              <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                {steps[1].description}
              </p>
            </div>
            
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {steps[1].tags.map(tag => (
                  <span key={tag} className="text-[9px] font-mono tracking-widest uppercase border px-2 py-0.5 bg-white/[0.02] border-white/10 text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              <StudioVisual />
            </div>
          </div>
        </div>

        {/* Row 2: 40% / 60% */}
        <div className="lg:col-span-5 relative bg-gradient-to-b from-[#241a17] to-[#120d0c] border border-white/20 p-8 rounded-none overflow-hidden flex flex-col justify-between min-h-[380px] group transition-all duration-300">
          <Grid size={22} brightSquares={[[5, 1], [7, 3]]} />
          <div className="relative z-20 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-[#F97316] tracking-[0.2em] font-black uppercase">
                  PHASE 03 // POLISH
                </span>
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-[#F97316] transition-colors duration-300">
                {steps[2].title}
              </h4>
              <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                {steps[2].description}
              </p>
            </div>
            
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {steps[2].tags.map(tag => (
                  <span key={tag} className="text-[9px] font-mono tracking-widest uppercase border px-2 py-0.5 bg-white/[0.02] border-white/10 text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              <AntigravityVisual />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 relative bg-gradient-to-b from-[#241a17] to-[#120d0c] border border-white/20 p-8 rounded-none overflow-hidden flex flex-col justify-between min-h-[380px] group transition-all duration-300">
          <Grid size={22} brightSquares={[[10, 2], [11, 4]]} />
          <div className="relative z-20 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-[#F97316] tracking-[0.2em] font-black uppercase">
                  PHASE 04 // MÉTHODE
                </span>
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-[#F97316] transition-colors duration-300">
                {steps[3].title}
              </h4>
              <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                {steps[3].description}
              </p>
            </div>
            
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {steps[3].tags.map(tag => (
                  <span key={tag} className="text-[9px] font-mono tracking-widest uppercase border px-2 py-0.5 bg-white/[0.02] border-white/10 text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              <BmadVisual />
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
