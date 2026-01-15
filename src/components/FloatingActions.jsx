import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Mail, Briefcase } from 'lucide-react';
import { trackResumeDownload } from '../utils/analytics';

const FloatingActions = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeDownload = () => {
    trackResumeDownload();
    window.open(import.meta.env.VITE_RESUME_URL || '/resume.pdf', '_blank');
  };

  const buttons = [
    {
      icon: Mail,
      label: 'Get In Touch',
      onClick: () => scrollToSection('#contact'),
      primary: true,
    },
    {
      icon: Download,
      label: 'Download Resume',
      onClick: handleResumeDownload,
      primary: false,
    },
    {
      icon: Briefcase,
      label: 'View My Work',
      onClick: () => scrollToSection('#projects'),
      primary: false,
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed right-6 bottom-6 z-50 flex flex-col gap-3"
        >
          {buttons.map((button, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={button.onClick}
              className={`p-3 rounded-xl shadow-lg transition-all group relative ${
                button.primary
                  ? 'bg-gradient-to-r from-accent-1 to-accent-2 text-white shadow-glow'
                  : 'glass text-gray-300 hover:text-white'
              }`}
              aria-label={button.label}
            >
              <button.icon size={20} />
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none glass text-white">
                {button.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActions;
