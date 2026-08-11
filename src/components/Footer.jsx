import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { useCursor } from './cursor';

const socialLinks = [
  { icon: Github, href: import.meta.env.VITE_GITHUB_URL || 'https://github.com', label: 'GitHub' },
  {
    icon: Linkedin,
    href: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com',
    label: 'LinkedIn',
  },
  { icon: FaXTwitter, href: import.meta.env.VITE_TWITTER_URL || 'https://twitter.com', label: 'X' },
  { icon: Mail, href: 'mailto:lesferayoub@gmail.com', label: 'Email' },
];

const navLinks = [
  { name: 'Departures', href: '#projects' },
  { name: 'Arrivals', href: '#history' },
  { name: 'Service info', href: '#about' },
  { name: 'Equipment', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const services = [
  'Full-stack web development',
  'E-commerce platforms',
  'Legacy system migration',
  'Blockchain & DeFi',
  'Technical consulting',
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { setCursorVariant } = useCursor();

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-rule-strong">
      <div className="bleed py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* Station identity */}
          <div>
            <span className="font-display text-2xl font-extrabold tracking-tight">
              <span className="text-amber">Ayoub</span> Lesfer
            </span>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ash">
              Senior full-stack developer in Bordeaux. Backend-heavy, full-stack when it needs to
              be. Available for freelance work worldwide.
            </p>
            <div className="mono-data mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-ash">
              <span className="lamp lamp--on" />
              Available for hire
            </div>
            <div className="mt-6 flex gap-1">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="flex h-9 w-9 items-center justify-center text-ash transition-colors hover:text-amber"
                >
                  <link.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Board index */}
          <nav aria-label="Footer">
            <h2 className="mono-label">Board</h2>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="font-mono-data text-xs uppercase tracking-widest text-ash transition-colors hover:text-amber"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h2 className="mono-label">Services</h2>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s} className="font-mono-data text-xs uppercase tracking-widest text-ash">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center">
          <p className="mono-label">
            © {currentYear} Ayoub Lesfer · Bordeaux, France · All services subject to availability
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
            className="mono-label inline-flex items-center gap-2 transition-colors hover:text-amber"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
