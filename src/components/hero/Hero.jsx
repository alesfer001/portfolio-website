import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download, MapPin } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { trackResumeDownload } from '../../utils/analytics';
import { MagneticButton } from '../common';
import { useCursor } from '../cursor';
import HeroTextReveal from './HeroTextReveal';
import FloatingStats from './FloatingStats';

// Lazy load the WebGL canvas for performance
const HeroCanvas = lazy(() => import('./HeroCanvas'));

const Hero = () => {
  const { setCursorVariant } = useCursor();

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

  const socialLinks = [
    {
      icon: Github,
      href: import.meta.env.VITE_GITHUB_URL || 'https://github.com',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com',
      label: 'LinkedIn',
    },
    {
      icon: FaXTwitter,
      href: import.meta.env.VITE_TWITTER_URL || 'https://twitter.com',
      label: 'Twitter',
    },
    {
      icon: Mail,
      href: 'mailto:lesferayoub@gmail.com',
      label: 'Email',
    },
  ];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* WebGL Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-surface-primary" />}>
        <HeroCanvas />
      </Suspense>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[var(--color-bg-primary)] opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container-custom w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            {/* Left Content - Text */}
            <div className="lg:col-span-7 xl:col-span-8">
              {/* Role Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-gray-300">Available for Freelance</span>
                </span>
              </motion.div>

              {/* Main Title */}
              <HeroTextReveal firstName="Ayoub" lastName="Lesfer" />

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-6 text-xl sm:text-2xl text-gray-400 max-w-xl"
              >
                <span className="gradient-text font-semibold">Full-Stack Developer</span> crafting
                performant web experiences with modern technologies.
              </motion.p>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-4 flex items-center gap-2 text-gray-500"
              >
                <MapPin size={16} />
                <span>Bordeaux, France</span>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <MagneticButton
                  onClick={() => scrollToSection('#contact')}
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="btn-primary flex items-center gap-2"
                >
                  Get In Touch
                </MagneticButton>

                <MagneticButton
                  onClick={handleResumeDownload}
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Download size={18} />
                  Download Resume
                </MagneticButton>

                <MagneticButton
                  onClick={() => scrollToSection('#projects')}
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="btn-secondary"
                >
                  View My Work
                </MagneticButton>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="mt-10 flex items-center gap-4"
              >
                <span className="text-sm text-gray-600">Follow me</span>
                <div className="h-px w-8 bg-gray-700" />
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent-1/20 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Content - Stats */}
            <div className="lg:col-span-5 xl:col-span-4 hidden lg:flex justify-end">
              <FloatingStats />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection('#about')}
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-accent-1 transition-colors"
          aria-label="Scroll to about section"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
