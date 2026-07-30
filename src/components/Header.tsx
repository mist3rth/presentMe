import React, { useState, useEffect } from 'react';
import { Atom, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScrollEvent = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScrollEvent);
    handleScrollEvent();

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  // Close menu on resize to desktop viewport
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const handleResize = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsMenuOpen(false);
      }
    };
    media.addEventListener('change', handleResize);
    return () => media.removeEventListener('change', handleResize);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    window.location.hash = targetId;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[130] transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-[#050302]/85 backdrop-blur-md border-b border-white/10 py-4 shadow-lg shadow-black/20" 
          : "bg-transparent border-b border-transparent py-6"
      }`}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => {
              setIsMenuOpen(false);
              window.location.hash = '';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative w-10 h-10 bg-gradient-to-br from-[#F97316] to-[#c83c3c] rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
              <Atom className="w-6 h-6 text-black animate-spin-slow" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white uppercase">
              THIESSON
            </span>
          </div>

          {/* Navigation Menu (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-white/70 uppercase tracking-[0.15em]">
            <a
              href="#expertises"
              onClick={(e) => handleScroll(e, 'expertises')}
              className="hover:text-white transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-[#F97316] hover:after:w-full after:transition-all after:duration-300"
            >
              Expertises
            </a>
            <a
              href="#methodologie"
              onClick={(e) => handleScroll(e, 'methodologie')}
              className="hover:text-white transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-[#F97316] hover:after:w-full after:transition-all after:duration-300"
            >
              Méthodologie
            </a>
            <a
              href="#projets"
              onClick={(e) => handleScroll(e, 'projets')}
              className="hover:text-white transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-[#F97316] hover:after:w-full after:transition-all after:duration-300"
            >
              Projets
            </a>
            <a
              href="#parcours"
              onClick={(e) => handleScroll(e, 'parcours')}
              className="hover:text-white transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-[#F97316] hover:after:w-full after:transition-all after:duration-300"
            >
              Parcours
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, 'contact')}
              className="hover:text-white transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-[#F97316] hover:after:w-full after:transition-all after:duration-300"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden text-white hover:text-[#F97316] transition-colors p-2 focus:outline-none cursor-pointer z-50"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Spacer to balance logo width and keep nav centered on desktop */}
          <div className="w-32 hidden md:block" />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-x-0 top-0 pt-24 pb-12 bg-[#050302]/95 backdrop-blur-xl z-[120] border-b border-white/10 shadow-2xl flex flex-col md:hidden"
          >
            <nav className="flex flex-col items-center gap-6 text-sm font-bold text-white/70 uppercase tracking-[0.2em] px-6">
              <a
                href="#expertises"
                onClick={(e) => {
                  handleScroll(e, 'expertises');
                  setIsMenuOpen(false);
                }}
                className="w-full py-3 text-center border-b border-white/5 hover:text-[#F97316] hover:border-[#F97316]/20 transition-all duration-300"
              >
                Expertises
              </a>
              <a
                href="#methodologie"
                onClick={(e) => {
                  handleScroll(e, 'methodologie');
                  setIsMenuOpen(false);
                }}
                className="w-full py-3 text-center border-b border-white/5 hover:text-[#F97316] hover:border-[#F97316]/20 transition-all duration-300"
              >
                Méthodologie
              </a>
              <a
                href="#projets"
                onClick={(e) => {
                  handleScroll(e, 'projets');
                  setIsMenuOpen(false);
                }}
                className="w-full py-3 text-center border-b border-white/5 hover:text-[#F97316] hover:border-[#F97316]/20 transition-all duration-300"
              >
                Projets
              </a>
              <a
                href="#parcours"
                onClick={(e) => {
                  handleScroll(e, 'parcours');
                  setIsMenuOpen(false);
                }}
                className="w-full py-3 text-center border-b border-white/5 hover:text-[#F97316] hover:border-[#F97316]/20 transition-all duration-300"
              >
                Parcours
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  handleScroll(e, 'contact');
                  setIsMenuOpen(false);
                }}
                className="w-full py-3 text-center hover:text-[#F97316] transition-all duration-300"
              >
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

