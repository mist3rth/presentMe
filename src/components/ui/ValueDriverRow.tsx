import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface ValueDriverRowProps {
  number: string;
  category: string;
  title: string;
  tags: string[];
  description: React.ReactNode;
  delay?: number;
  activeIndex: number; // 0, 1, or 2 to highlight the dot
}

export const ValueDriverRow: React.FC<ValueDriverRowProps> = ({
  number,
  category,
  title,
  tags,
  description,
  delay = 0,
  activeIndex,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-white/10 items-center hover:bg-white/[0.01] transition-all duration-300 px-4 md:px-6"
    >
      {/* Left Col */}
      <div className="md:col-span-4 flex flex-col justify-between h-auto md:min-h-[140px] gap-4">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">
          PILIER — {category}
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter group-hover:text-[#F97316] transition-colors duration-300">
            {title}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((tag, idx) => (
              <span key={idx} className="text-[10px] font-mono px-2 py-0.5 border border-white/10 bg-white/5 text-slate-300 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Dash indicators */}
        <div className="flex items-center gap-1.5 mt-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`w-4 h-[3px] transition-all duration-300 rounded-full ${i === activeIndex ? 'bg-[#F97316]' : 'bg-zinc-800'}`} />
          ))}
        </div>
        
        <div className="text-xs font-mono text-white/30">
          //{number}
        </div>
      </div>

      {/* Middle Col (Arrow) */}
      <div className="md:col-span-1 flex justify-start md:justify-end">
        <ArrowRight className="w-6 h-6 text-[#F97316] opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
      </div>

      {/* Right Col */}
      <div className="md:col-span-7 pl-0 md:pl-8 border-l-0 md:border-l border-white/10 min-h-[100px] flex items-center">
        <p className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight leading-snug text-slate-100">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
