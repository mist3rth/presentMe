import React from 'react';

interface ButtonMagneticProps {
  href: string;
  targetId?: string;
  children: React.ReactNode;
  className?: string;
}

export const ButtonMagnetic: React.FC<ButtonMagneticProps> = ({ href, targetId, children, className = '' }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (targetId) {
      e.preventDefault();
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`group relative w-full sm:w-60 h-16 rounded-none border border-white/20 bg-black text-white hover:text-black hover:border-white overflow-hidden transition-colors duration-500 cursor-pointer active:scale-95 flex items-center justify-center font-mono text-xs uppercase tracking-widest text-center shadow-2xl shadow-black/50 ${className}`}
    >
      <span className="relative z-10 transition-transform duration-500 group-hover:scale-105">
        {children}
      </span>
      {/* Magnetic fill effect */}
      <div className="absolute inset-0 bg-white scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out z-0" />
    </a>
  );
};
