import React from 'react';
import { motion } from 'motion/react';

interface MethodologySectionProps {
  activePreset: { start: string; mid: string; end: string; };
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ activePreset }) => {
  return (
    <section 
      id="methodologie" 
      className="relative z-30 w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 border-t border-white/5 scroll-mt-24 overflow-hidden"
    >
      <div className="absolute right-4 bottom-4 md:right-12 md:bottom-8 pointer-events-none select-none text-[150px] sm:text-[220px] md:text-[300px] font-black text-[#F97316] opacity-[0.15] leading-none tracking-tighter">
        ///
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
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
              style={{ backgroundImage: `linear-gradient(to right, ${activePreset.start}, ${activePreset.mid}, ${activePreset.end})` }}
            >
              pour bâtir une Tech vivante.
            </span>
          </motion.h2>
        </div>

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
  );
};
