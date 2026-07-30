import React from 'react';
import Cubes from '../Cubes';

export const AudienceSection: React.FC = () => {
  return (
    <section 
      className="relative z-30 w-full max-w-6xl mx-auto px-6 md:px-12 py-32 md:py-40 overflow-hidden flex flex-col items-center justify-center min-h-[600px]"
    >
      {/* Fine vertical guide lines matching the page's structural grid lines */}
      <div className="absolute inset-y-0 left-0 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute inset-y-0 left-1/3 w-[1px] bg-white/5 hidden md:block pointer-events-none" />

      {/* Interactive Cubes Background with custom styles and orange faceColor */}
      <div className="absolute inset-0 z-0 opacity-20 hover:opacity-40 transition-opacity duration-500 pointer-events-auto">
        <Cubes 
          gridSize={8}
          maxAngle={45}
          radius={3.5}
          borderStyle="2px dashed rgba(249, 115, 22, 0.4)"
          faceColor="#F97316"
          rippleColor="#ffffff"
          rippleSpeed={1.8}
          autoAnimate
          rippleOnClick
        />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-2xl pointer-events-none">
        {/* Massive Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.95] pointer-events-auto select-none">
          DIFFÉRENTES ÉQUIPES.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400">MÊME CLARTÉ.</span>
        </h2>

        {/* Description Text */}
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-xl pointer-events-auto">
          La méthode s'adapte à toute organisation, que vous définissiez un plan de lancement produit, aligniez vos équipes opérationnelles ou pilotiez la stratégie globale de vos projets.
        </p>
      </div>
    </section>
  );
};
