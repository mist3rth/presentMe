import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  subtitle: string;
  title: string | React.ReactNode;
  description: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ subtitle, title, description }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-end select-none tracking-tight">
            <span className="text-xl font-black text-[#F97316] leading-none">/</span>
            <span className="text-base font-black text-[#F97316]/80 leading-none">/</span>
            <span className="text-xs font-black text-[#F97316]/50 leading-none">/</span>
          </span>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F97316]">
            {subtitle}
          </span>
        </div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-white"
        >
          {title}
        </motion.h2>
      </div>
      <p className="max-w-md text-sm text-slate-400 leading-relaxed font-light">
        {description}
      </p>
    </div>
  );
};
