import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { ValueDriverRow } from '../ui/ValueDriverRow';

export const ValueDriversSection: React.FC = () => {
  return (
    <section className="relative z-30 w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 border-t border-white/5 scroll-mt-24 overflow-hidden">
      <SectionHeader
        subtitle="9 leviers de valeur"
        title="3 PILIERS, 9 LEVIERS."
        description="Une vision 360 de la création digitale, où chaque compétence nourrit la coherence globale du projet."
      />

      <div className="flex flex-col border-t border-white/10 mt-12">
        <ValueDriverRow
          number="001"
          category="01 / BUSINESS"
          title="STRATÉGIE & PSYCHOLOGIE"
          tags={['CRO', 'Biais cognitifs', 'PM']}
          activeIndex={0}
          description={
            <>
              LE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 font-extrabold">"POURQUOI"</span> DERRIÈRE CHAQUE CLIC. L'ART DE <span className="text-white border-b-2 border-[#F97316]/50">COMPRENDRE ET D'ANTICIPER</span> LE COMPORTEMENT HUMAIN.
            </>
          }
        />

        <ValueDriverRow
          number="002"
          category="02 / TECH"
          title="TECHNIQUE & IA"
          tags={['SEO', 'Web perf', 'Vibe coding']}
          activeIndex={1}
          delay={0.1}
          description={
            <>
              LE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 font-extrabold">"COMMENT"</span> DE L'INDUSTRIALISATION. EXPLOITER LA <span className="text-white border-b-2 border-[#F97316]/50">PUISSANCE MACHINE</span> POUR UNE EFFICACITÉ DÉCUPLÉE.
            </>
          }
        />

        <ValueDriverRow
          number="003"
          category="03 / DESIGN"
          title="DESIGN & IDENTITÉ"
          tags={['EEAT', 'UX/UI', 'DA']}
          activeIndex={2}
          delay={0.2}
          description={
            <>
              LE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-amber-400 font-extrabold">"RESSENTI"</span> DE L'EXPÉRIENCE. CRÉER DES INTERFACES QUI <span className="text-white border-b-2 border-[#F97316]/50">S'EFFACENT</span> POUR LAISSER PLACE À L'USAGE.
            </>
          }
        />
      </div>
    </section>
  );
};
