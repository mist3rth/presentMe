import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqData: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqData }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section 
      id="faq" 
      className="relative z-30 w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 border-t border-white/5 scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none uppercase">
            Des Questions ?
          </h2>
          <p className="text-sm text-slate-400 font-light mt-2">
            Vous ne trouvez pas la réponse à votre question ?{" "}
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#F97316] hover:underline font-medium"
            >
              Contactez-moi
            </a>
          </p>
        </div>

        <div className="lg:col-span-7 flex flex-col divide-y divide-white/10">
          {faqData.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-6 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                  className="w-full flex justify-between items-center text-left gap-4 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] rounded-md p-1 -m-1"
                >
                  <span className={`text-base sm:text-lg font-medium transition-colors duration-200 group-hover:text-[#F97316] ${
                    isOpen ? "text-[#F97316]" : "text-white"
                  }`}>
                    {item.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 group-hover:text-[#F97316] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-[#F97316]" : ""
                    }`}
                  />
                </button>
                
                <motion.div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                    marginTop: isOpen ? 16 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
