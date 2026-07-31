import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LinkKineticProps {
  href: string;
  targetId?: string;
  children: React.ReactNode;
  className?: string;
}

export const LinkKinetic: React.FC<LinkKineticProps> = ({ href, targetId, children, className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (targetId) {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate(`/#${targetId}`);
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            if ((window as any).lenis) {
              (window as any).lenis.scrollTo(element);
            } else {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 100);
      } else {
        window.history.pushState(null, '', `#${targetId}`);
        const element = document.getElementById(targetId);
        if (element) {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(element);
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`group text-sm font-semibold text-white/80 hover:text-white transition-colors duration-300 relative py-2 ${className}`}
    >
      <span>{children}</span>
      {/* Kinetic line */}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-white scale-x-100 group-hover:scale-x-110 origin-left transition-all duration-300" />
    </a>
  );
};
