import React, { useState } from 'react';

export const ScrollStepIndicator: React.FC = () => {
  const [heroActiveStep, setHeroActiveStep] = useState<number>(1);

  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-end font-mono text-xs text-white/50 select-none">
        <span className="text-[#F97316] font-bold">
          {String(heroActiveStep).padStart(2, '0')}
        </span>
        <span className="h-[1px] w-6 bg-white/20 my-1"></span>
        <span className="text-white/30">08</span>
      </div>
      
      {/* Scrolling line indicator */}
      <div className="h-12 w-[1px] bg-white/10 relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#F97316] to-transparent animate-scroll-line" 
          onAnimationIteration={() => setHeroActiveStep(prev => prev === 8 ? 1 : prev + 1)}
        />
      </div>
    </div>
  );
};
