import React from 'react';
import { motion, MotionValue } from 'motion/react';

interface ExpertiseCardProps {
  number: string;
  category: string;
  title: string;
  description: string;
  delay?: number;
  yCard?: MotionValue<number>;
  accentColor: 'orange' | 'amber' | 'red';
  noBorderLeft?: boolean;
}

const colorMap = {
  orange: { text: 'text-[#F97316]', gradient: 'from-[#F97316]', groupHoverText: 'group-hover:text-[#F97316]' },
  amber: { text: 'text-amber-500', gradient: 'from-amber-500', groupHoverText: 'group-hover:text-amber-500' },
  red: { text: 'text-orange-500', gradient: 'from-orange-500', groupHoverText: 'group-hover:text-orange-500' },
};

export const ExpertiseCard: React.FC<ExpertiseCardProps> = ({
  number,
  category,
  title,
  description,
  delay = 0,
  yCard,
  accentColor,
  noBorderLeft = false,
}) => {
  const styles = colorMap[accentColor];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={yCard ? { y: yCard } : undefined}
      className={`group relative flex flex-col justify-between p-8 md:p-10 md:h-[420px] min-h-[360px] md:self-center rounded-none border border-zinc-800 ${noBorderLeft ? 'md:border-l-0' : ''} bg-black/80 hover:bg-black/95 transition-all duration-300 overflow-hidden`}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r ${styles.gradient} to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Number & Category */}
          <div className="mb-8">
            <span className={`font-mono text-xs ${styles.text} font-bold tracking-widest uppercase`}>
              {number} {category}
            </span>
          </div>

          {/* Big Title */}
          <h3 className={`text-2xl sm:text-3xl font-black uppercase text-white leading-tight mb-6 tracking-tighter ${styles.groupHoverText} transition-colors duration-300`}>
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
