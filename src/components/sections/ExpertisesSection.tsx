import React, { forwardRef } from 'react';
import { MotionValue } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { ExpertiseCard } from '../ui/ExpertiseCard';

interface ExpertisesSectionProps {
  bgImage: string;
  yCard1: MotionValue<number>;
  yCard3: MotionValue<number>;
}

export const ExpertisesSection = forwardRef<HTMLElement, ExpertisesSectionProps>(({ bgImage, yCard1, yCard3 }, ref) => {
  return (
    <section 
      id="expertises" 
      ref={ref}
      className="relative z-30 w-full border-t border-white/5 scroll-mt-24 overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050302] via-black/40 to-[#050302] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <SectionHeader
          subtitle="Piliers d'intervention"
          title="CHAMPS D'EXPERTISE."
          description="Une approche systémique alliant vision stratégique haut niveau, excellence opérationnelle et maîtrise algorithmique."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:h-[600px] h-auto md:items-center items-stretch relative mt-16 md:mt-24">
          <ExpertiseCard
            number="01"
            category="FONDATEURS & DIRIGEANTS"
            title="TRANSFORMER LES GRANDS OBJECTIFS EN PLANS CLAIRS."
            description="Définissez les objectifs de l'entreprise, attribuez les responsabilités et gardez tout le monde aligné, du conseil d'administration au backlog."
            yCard={yCard1}
            accentColor="orange"
          />

          <ExpertiseCard
            number="02"
            category="ÉQUIPES OPÉRATIONS & STRATÉGIE"
            title="COORDONNER LA PLANIFICATION À TRAVERS CHAQUE ÉQUIPE."
            description="Alignez les données, les calendriers et les ressources à travers chaque équipe pour garder votre stratégie connectée, cohérente et mesurable."
            delay={0.1}
            accentColor="amber"
            noBorderLeft
          />

          <ExpertiseCard
            number="03"
            category="AGENCES & CONSULTANTS"
            title="LIVRER DES STRATÉGIES PLUS VITE, PLUS INTELLIGEMMENT."
            description="Générez des plans structurés et basés sur les données pour de multiples clients, et gérez vos projets de manière organisée avec moins de surcharge."
            delay={0.2}
            yCard={yCard3}
            accentColor="red"
            noBorderLeft
          />
        </div>
      </div>
    </section>
  );
});

ExpertisesSection.displayName = 'ExpertisesSection';
