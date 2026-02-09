import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Calendar, Rocket, ExternalLink } from 'lucide-react';
import { trackProjectInterest } from '../utils/analytics';
import { SectionHeading } from './common';
import { useCursor } from './cursor';

const projects = [
  {
    title: 'eMenuChoice Platform',
    tagline: 'Senior living dining management',
    description: 'Comprehensive dining services management platform for senior living communities. Features multi-system integrations with Eldermark, PCC, and DiningRD. Serving facilities including The Chateau, Girardeau, Ebenezer, and Mother of Mercy.',
    technologies: ['PHP 8.4', 'CodeIgniter', 'React', 'MariaDB', 'Docker'],
    date: 'Jan 2025 - Present',
    status: 'Current',
    highlight: 'Multi-system integration & automation',
    image: '/projects/emenuchoice.png',
    metrics: [
      { value: '800+', label: 'Communities' },
      { value: '155K+', label: 'Residents' },
      { value: '20+', label: 'System Integrations' },
    ],
    featured: true,
  },
  {
    title: 'Fret',
    tagline: 'AI-powered music practice assistant',
    description: 'Built for the Gemini 3 Hackathon. Record yourself playing guitar, piano, or singing and get instant AI feedback on what to improve. Uses Gemini 3\'s multimodal audio understanding to analyze practice sessions and provide specific, actionable feedback — like having a coach in the room.',
    technologies: ['React 19', 'Tailwind CSS v4', 'Framer Motion', 'Web Audio API', 'Gemini 3'],
    date: '2026',
    status: 'Completed',
    highlight: 'Gemini 3 Hackathon entry',
    image: '/projects/fret.png',
    link: 'https://fret-three.vercel.app',
    metrics: [
      { value: '3', label: 'Instruments' },
      { value: 'Gemini 3', label: 'AI Engine' },
    ],
  },
  {
    title: 'BricoPrive E-commerce',
    tagline: 'Legacy system optimization',
    description: 'E-commerce platform maintenance for Uneed client. Successfully increased BAPI usage from 30% to 90%. Awarded Palmarès France Capital "Meilleurs Sites de Commerce En Ligne 2023".',
    technologies: ['PHP', 'Prestashop', 'Python', 'NodeJS', 'Datadog'],
    date: 'Apr 2022 - May 2024',
    status: 'Completed',
    highlight: 'API usage: 30% → 90% (+200%)',
    image: '/projects/bricoprive.avif',
    metrics: [
      { value: '500K+', label: 'Products' },
      { value: '3x', label: 'API Performance' },
      { value: '2023', label: 'Award Winner' },
    ],
  },
  {
    title: 'Shin',
    tagline: 'Alephium DEX - Blockchain DeFi platform',
    description: 'Decentralized exchange on Alephium blockchain with optimized router for efficient multi-pool swaps. Built advanced routing algorithms for best price execution.',
    technologies: ['Ralph/Rust', 'React', 'TypeScript', 'Smart Contracts'],
    date: 'Mar 2023 - Present',
    status: 'On Hold',
    highlight: 'Optimized swap routing',
    image: '/projects/alephium-dex.png',
    link: 'https://shin-nine.vercel.app/',
    metrics: [
      { value: 'Smart', label: 'Router' },
      { value: 'Multi-Pool', label: 'Swaps' },
    ],
  },
  {
    title: 'MealPlanner',
    tagline: 'Smart meal planning mobile app',
    description: 'React Native mobile application for streamlined weekly meal planning. Features one-tap 7-day meal plan generation with smart randomization, meal locking during regeneration, progress tracking, and data export/import for backups.',
    technologies: ['React Native', 'TypeScript', 'React Navigation', 'AsyncStorage'],
    date: '2025',
    status: 'Completed',
    highlight: 'One-tap weekly meal generation',
    image: '/projects/mealplanner.jpeg',
    link: 'https://github.com/alesfer001/MealPlanner',
    metrics: [
      { value: '7-Day', label: 'Meal Plans' },
      { value: 'iOS+Android', label: 'Platforms' },
    ],
  },
  {
    title: 'EnjoyMonCSE',
    tagline: 'Works council management',
    description: 'Enterprise works councils management platform with eCommerce integration and mobile app. Trusted by major corporations including AGCO, Auchan, Safran, McDonald\'s, Eiffage, Hasbro, Valeo, Boulanger, and Leroy Merlin.',
    technologies: ['PHP', 'Laravel', 'VueJS', 'OAuth2', 'Cordova'],
    date: 'Jul 2019 - Nov 2021',
    status: 'Completed',
    highlight: 'Enterprise-grade B2B solution',
    image: '/projects/enjoymoncse.png',
    metrics: [
      { value: '150+', label: 'Enterprise Clients' },
      { value: '500K+', label: 'Employees' },
      { value: 'iOS+Android', label: 'Mobile' },
    ],
  },
];

const statusColors = {
  Current: 'bg-green-500/20 text-green-400 border-green-500/30',
  Completed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  'On Hold': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

// Featured Project Card (Large)
const FeaturedProjectCard = ({ project, onToggleExpand }) => {
  const { setCursorVariant } = useCursor();

  const handleCardClick = (e) => {
    e.stopPropagation();
    onToggleExpand(project.title);
  };

  const handleContactClick = (e) => {
    e.stopPropagation();
    trackProjectInterest(project.title, 'contact_click');
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
      className="col-span-12 lg:col-span-8 card overflow-hidden cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Project Image */}
      {project.image && (
        <div className="relative h-56 lg:h-72 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-secondary)] to-transparent" />
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}
          >
            {project.status}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={12} />
            {project.date}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-3xl lg:text-4xl font-bold mb-2">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-gray-400 mb-4">
          {project.tagline}
        </p>

        {/* Metrics */}
        <div className="flex gap-8 mb-6">
          {project.metrics?.map((metric, i) => (
            <div key={i}>
              <div className="text-2xl font-bold gradient-text">{metric.value}</div>
              <div className="text-sm text-gray-500">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Highlight */}
        {project.highlight && (
          <div className="flex items-center gap-2 text-accent-2 text-sm font-medium mb-4">
            <Rocket size={16} />
            {project.highlight}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, i) => (
            <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-gray-400">
              {tech}
            </span>
          ))}
        </div>

        {/* Contact Button */}
        <div className="flex justify-end">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            onClick={handleContactClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={18} />
            <span className="font-medium text-sm">Contact</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Standard Project Card
const ProjectCard = ({ project, index, onToggleExpand }) => {
  const { setCursorVariant } = useCursor();

  const handleCardClick = (e) => {
    e.stopPropagation();
    onToggleExpand(project.title);
  };

  const handleContactClick = (e) => {
    e.stopPropagation();
    trackProjectInterest(project.title, 'contact_click');
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={handleCardClick}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
      className="col-span-12 lg:col-span-4 card overflow-hidden cursor-pointer group"
    >
      {/* Project Image */}
      {project.image && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-secondary)] to-transparent" />
        </div>
      )}

      <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}
        >
          {project.status}
        </span>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar size={12} />
          {project.date.split(' - ')[0]}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-bold mb-2 group-hover:gradient-text transition-all">
        {project.title}
      </h3>

      {/* Tagline */}
      <p className="text-sm text-gray-400 mb-4">
        {project.tagline}
      </p>

      {/* Highlight */}
      {project.highlight && (
        <div className="flex items-center gap-2 text-accent-2 text-xs font-medium mb-4">
          <Rocket size={14} />
          {project.highlight}
        </div>
      )}

      {/* Metrics */}
      <div className="flex gap-6 mb-4">
        {project.metrics?.map((metric, i) => (
          <div key={i}>
            <div className="text-lg font-bold text-accent-1">{metric.value}</div>
            <div className="text-xs text-gray-500">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.slice(0, 3).map((tech, i) => (
          <span
            key={i}
            className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-gray-400"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 3 && (
          <span className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-gray-500">
            +{project.technologies.length - 3}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex justify-end gap-2">
        {project.link && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-1/10 text-accent-1 hover:bg-accent-1/20"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={16} />
            <span className="text-xs font-medium">View</span>
          </motion.a>
        )}
        <motion.button
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
          onClick={handleContactClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={16} />
          <span className="text-xs font-medium">Contact</span>
        </motion.button>
      </div>
      </div>
    </motion.div>
  );
};

// Expanded Project Card (Clone overlay)
const ExpandedProjectCard = ({ project, onClose }) => {
  const { setCursorVariant } = useCursor();
  const isFeatured = project.featured;

  const handleContactClick = (e) => {
    e.stopPropagation();
    trackProjectInterest(project.title, 'contact_click');
    onClose();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
        className={`relative w-full ${
          isFeatured ? 'max-w-[1000px]' : 'max-w-[700px]'
        } max-h-[85vh] overflow-y-auto rounded-3xl bg-[var(--color-bg-secondary)] border border-white/10 shadow-2xl`}
      >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
      >
        <span className="text-white text-2xl font-bold leading-none">&times;</span>
      </button>

      {/* Project Image */}
      {project.image && (
        <div className={`relative ${isFeatured ? 'h-64 lg:h-80' : 'h-48'} overflow-hidden rounded-t-3xl`}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-secondary)] to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative p-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}
          >
            {project.status}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={12} />
            {project.date}
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-display font-bold mb-4 ${isFeatured ? 'text-3xl lg:text-4xl' : 'text-2xl'}`}>
          {project.title}
        </h3>

        {/* Full Description */}
        <p className={`text-gray-300 leading-relaxed mb-6 ${isFeatured ? 'text-base lg:text-lg' : 'text-sm'}`}>
          {project.description}
        </p>

        {/* Metrics */}
        <div className={`flex ${isFeatured ? 'gap-8' : 'gap-6'} mb-6`}>
          {project.metrics?.map((metric, i) => (
            <div key={i}>
              <div className={`font-bold ${isFeatured ? 'text-2xl gradient-text' : 'text-lg text-accent-1'}`}>
                {metric.value}
              </div>
              <div className={`text-gray-500 ${isFeatured ? 'text-sm' : 'text-xs'}`}>{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Highlight */}
        {project.highlight && (
          <div className={`flex items-center gap-2 text-accent-2 font-medium mb-4 ${isFeatured ? 'text-sm' : 'text-xs'}`}>
            <Rocket size={isFeatured ? 16 : 14} />
            {project.highlight}
          </div>
        )}

        {/* Full Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className={`rounded-full bg-white/5 text-gray-400 ${isFeatured ? 'tech-tag' : 'px-2 py-0.5 text-xs'}`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-2/20 text-accent-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={18} />
              <span className="font-medium text-sm">View Live</span>
            </motion.a>
          )}
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-1/20 text-accent-1"
            onClick={handleContactClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={18} className="fill-accent-1/30" />
            <span className="font-medium text-sm">Contact About This Project</span>
          </motion.button>
        </div>
      </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const featuredProject = projects.find((p) => p.featured);
  const expandedProject = expandedCard ? projects.find((p) => p.title === expandedCard) : null;
  const otherProjects = projects.filter((p) => !p.featured);

  const handleToggleExpand = (projectTitle) => {
    setExpandedCard(expandedCard === projectTitle ? null : projectTitle);
  };

  // Body scroll lock when card is expanded
  useEffect(() => {
    if (expandedCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [expandedCard]);

  return (
    <section id="projects" className="section-padding bg-surface-secondary relative">
      {/* Overlay and expanded card when a card is clicked */}
      <AnimatePresence>
        {expandedCard && expandedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              onClick={() => setExpandedCard(null)}
            />
            <ExpandedProjectCard
              project={expandedProject}
              onClose={() => setExpandedCard(null)}
            />
          </>
        )}
      </AnimatePresence>

      <div className="container-custom relative">
        <SectionHeading
          subtitle="Real projects showcasing 6+ years of full-stack expertise"
          gradientWord="Projects"
        >
          Featured Projects
        </SectionHeading>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {/* Featured Project - Large */}
          {featuredProject && (
            <FeaturedProjectCard
              project={featuredProject}
              onToggleExpand={handleToggleExpand}
            />
          )}

          {/* Other Projects - Stack on right */}
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onToggleExpand={handleToggleExpand}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 mb-6">
            Interested in working together on your next project?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <MessageCircle size={18} />
            Discuss Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
