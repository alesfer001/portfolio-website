import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Rocket } from 'lucide-react';
import { trackProjectInterest } from '../utils/analytics';
import { SectionHeading } from './common';
import { useCursor } from './cursor';

const projects = [
  {
    title: 'eMenuChoice Platform',
    tagline: 'Senior living dining management',
    description: 'Comprehensive dining services management platform for senior living communities. Features multi-system integrations with Eldermark, PCC, and DiningRD.',
    technologies: ['PHP 8.4', 'CodeIgniter', 'React', 'MariaDB', 'Docker'],
    date: 'Jan 2025 - Present',
    status: 'Current',
    highlight: 'Multi-system integration & automation',
    image: '/projects/emenuchoice.png',
    metrics: [
      { value: '3+', label: 'Integrations' },
      { value: '100%', label: 'Automation' },
    ],
    featured: true,
  },
  {
    title: 'BricoPrive E-commerce',
    tagline: 'Legacy system optimization',
    description: 'E-commerce platform maintenance for Uneed client. Successfully increased BAPI usage from 30% to 90%.',
    technologies: ['PHP', 'Prestashop', 'Python', 'NodeJS', 'Datadog'],
    date: 'Apr 2022 - May 2024',
    status: 'Completed',
    highlight: 'BAPI usage: 30% → 90%',
    image: '/projects/bricoprive.avif',
    metrics: [
      { value: '+60%', label: 'API Usage' },
      { value: '2yrs', label: 'Duration' },
    ],
  },
  {
    title: 'Alephium DEX',
    tagline: 'Blockchain DeFi platform',
    description: 'Decentralized exchange on Alephium blockchain with swap optimization and liquidity pools.',
    technologies: ['Ralph/Rust', 'React', 'TypeScript', 'Smart Contracts'],
    date: 'Mar 2023 - Present',
    status: 'On Hold',
    highlight: 'Innovative blockchain technology',
    image: '/projects/alephium-dex.png',
    metrics: [
      { value: 'DeFi', label: 'Domain' },
      { value: 'L1', label: 'Blockchain' },
    ],
  },
  {
    title: 'EnjoyMonCSE',
    tagline: 'Works council management',
    description: 'Comprehensive works councils management platform with eCommerce integration and mobile app.',
    technologies: ['PHP', 'Laravel', 'VueJS', 'OAuth2', 'Cordova'],
    date: 'Jul 2019 - Nov 2021',
    status: 'Completed',
    highlight: 'Full-stack solution with mobile',
    image: '/projects/enjoymoncse.png',
    metrics: [
      { value: 'Mobile', label: 'Platform' },
      { value: 'B2B', label: 'Type' },
    ],
  },
];

const statusColors = {
  Current: 'bg-green-500/20 text-green-400 border-green-500/30',
  Completed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  'On Hold': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

// Featured Project Card (Large)
const FeaturedProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setCursorVariant } = useCursor();

  const handleClick = () => {
    trackProjectInterest(project.title, 'contact_click');
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
      className="relative col-span-12 lg:col-span-8 row-span-2 rounded-3xl overflow-hidden cursor-pointer group"
      onClick={handleClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {project.image ? (
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent-1/20 to-accent-2/20" />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full min-h-[400px] lg:min-h-[500px] p-8 flex flex-col justify-end">
        {/* Status Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`self-start px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]} mb-4`}
        >
          {project.status}
        </motion.span>

        {/* Title */}
        <h3 className="font-display text-3xl lg:text-4xl font-bold mb-2">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-gray-400 mb-4">{project.tagline}</p>

        {/* Metrics - reveal on hover */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
          className="flex gap-8 mb-6 overflow-hidden"
        >
          {project.metrics?.map((metric, i) => (
            <div key={i}>
              <div className="text-2xl font-bold gradient-text">{metric.value}</div>
              <div className="text-sm text-gray-500">{metric.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Highlight */}
        {project.highlight && (
          <div className="flex items-center gap-2 text-accent-2 text-sm font-medium mb-4">
            <Rocket size={16} />
            {project.highlight}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 5).map((tech, i) => (
            <span key={i} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex items-center gap-2 text-white group/cta"
          animate={{ x: isHovered ? 5 : 0 }}
        >
          <span className="font-medium">View Project</span>
          <ArrowUpRight
            size={18}
            className="transition-transform group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Standard Project Card
const ProjectCard = ({ project, index }) => {
  const { setCursorVariant } = useCursor();

  const handleClick = () => {
    trackProjectInterest(project.title, 'contact_click');
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={handleClick}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
      className="col-span-12 lg:col-span-4 card p-6 cursor-pointer group"
    >
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
      <p className="text-sm text-gray-400 mb-4">{project.tagline}</p>

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
      <div className="flex flex-wrap gap-1.5">
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

      {/* Arrow indicator */}
      <div className="mt-4 flex justify-end">
        <ArrowUpRight
          size={18}
          className="text-gray-600 group-hover:text-accent-1 transition-colors"
        />
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding bg-surface-secondary">
      <div className="container-custom">
        <SectionHeading
          subtitle="Real projects showcasing 6+ years of full-stack expertise"
          gradientWord="Projects"
        >
          Featured Projects
        </SectionHeading>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {/* Featured Project - Large */}
          {featuredProject && <FeaturedProjectCard project={featuredProject} />}

          {/* Other Projects - Stack on right */}
          {otherProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
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
            Discuss Your Project
            <ArrowUpRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
