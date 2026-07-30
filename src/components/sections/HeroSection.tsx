import React from 'react';
import { motion } from 'motion/react';
import { ButtonMagnetic } from '../ui/ButtonMagnetic';
import { LinkKinetic } from '../ui/LinkKinetic';

interface HeroSectionProps {
  activePreset: { start: string; mid: string; end: string; };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ activePreset }) => {
  return (
    <main className="min-h-[calc(100vh-104px)] flex-grow flex flex-col justify-between px-6 md:px-12 relative z-20 pt-24 md:pt-32 pb-12 max-w-6xl mx-auto w-full text-left">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full mb-12">
        <div className="lg:col-span-8 flex flex-col">
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl sm:text-6xl md:text-[72px] lg:text-[80px] xl:text-[88px] font-black leading-[0.95] tracking-tighter text-white uppercase select-none flex flex-col"
          >
            <span className="block">CONCEVOIR LE DIGITAL.</span>
            <span 
              className="block text-transparent bg-clip-text bg-gradient-to-r transition-all duration-500"
              style={{ backgroundImage: `linear-gradient(to right, ${activePreset.start}, ${activePreset.mid}, ${activePreset.end})` }}
            >
              PILOTER L'ALGORITHME.
            </span>
          </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          className="lg:col-span-4 flex flex-col gap-6 lg:pl-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-2 lg:pb-1"
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

      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 mt-4 pt-8 border-t border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center gap-8 w-full md:w-auto"
        >
          <ButtonMagnetic href="#methodologie" targetId="methodologie">
            [ Découvrir le Workflow ]
          </ButtonMagnetic>
          <LinkKinetic href="#projets" targetId="projets">
            Voir les cas d'étude &rarr;
          </LinkKinetic>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="flex items-center gap-6"
        >
          <div className="flex flex-col items-end font-mono text-xs text-white/50">
            <span className="text-[#F97316] font-bold">01</span>
            <span className="h-[1px] w-6 bg-white/20 my-1"></span>
            <span className="text-white/30">08</span>
          </div>
          
          <div className="h-12 w-[1px] bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#F97316] to-transparent animate-scroll-line" />
          </div>
        </motion.div>
      </div>
    </main>
  );
};
