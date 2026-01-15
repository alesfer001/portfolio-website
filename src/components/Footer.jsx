import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { useCursor } from './cursor';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { setCursorVariant } = useCursor();

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
      label: 'X (Twitter)',
    },
    {
      icon: Mail,
      href: 'mailto:lesferayoub@gmail.com',
      label: 'Email',
    },
  ];

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-surface-secondary border-t border-white/5">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-12 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-5">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block mb-4"
            >
              <span className="font-display text-2xl font-bold">
                <span className="gradient-text">Ayoub</span> Lesfer
              </span>
            </motion.div>
            <p className="text-gray-500 mb-6 max-w-sm">
              Full-Stack Developer crafting performant web experiences.
              Available for freelance projects worldwide.
            </p>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-gray-400">Available for hire</span>
            </div>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <link.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="font-display font-bold mb-4 text-white">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-4">
            <h3 className="font-display font-bold mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>Full-Stack Web Development</li>
              <li>E-commerce Platforms</li>
              <li>Legacy System Migration</li>
              <li>Blockchain & DeFi Apps</li>
              <li>Technical Consulting</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 text-sm">
            © {currentYear} Ayoub Lesfer. Built with React & Framer Motion.
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-gray-400 hover:text-white transition-colors"
          >
            Back to top
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
