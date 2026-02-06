import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { SectionHeading } from './common';
import PropTypes from 'prop-types';

const experiences = [
  {
    period: '2025 - Present',
    title: 'Senior Full-Stack Developer',
    company: 'eMenuChoice',
    location: 'Remote',
    description:
      'Leading development of dining services management platform for senior living communities. Implementing multi-system integrations and automated workflows.',
    technologies: ['PHP 8.4', 'CodeIgniter', 'React', 'MariaDB', 'Docker'],
    type: 'current',
  },
  {
    period: '2025',
    title: 'Full-Stack Developer',
    company: 'MealPlanner',
    location: 'Remote',
    description:
      'Developed personal meal planning application with automatic meal plan generation and customization. Led full technical implementation.',
    technologies: ['ReactNative'],
    type: 'side-project',
  },
  {
    period: '2023 - 2024',
    title: 'Blockchain Developer',
    company: 'Shin (Alephium DEX)',
    location: 'Remote',
    description:
      'Built decentralized exchange on Alephium blockchain. Developed smart contracts, intelligent routing system, and intuitive swap interface.',
    technologies: ['Ralph', 'TypeScript', 'React', 'Smart Contracts'],
    type: 'side-project',
  },
  {
    period: '2022 - 2024',
    title: 'Full-Stack Developer',
    company: 'BricoPrive (via Uneed)',
    location: 'Bordeaux, France',
    description:
      'E-commerce platform maintenance and evolution. Successfully increased BAPI usage from 30% to 90% through legacy system optimization.',
    technologies: ['PHP', 'Prestashop', 'Python', 'NodeJS', 'Datadog'],
    type: 'past',
  },
  {
    period: '2019 - 2021',
    title: 'Full-Stack Developer',
    company: 'EnjoyMonCSE',
    location: 'Bordeaux, France',
    description:
      'Built comprehensive works councils management platform with eCommerce integration and cross-platform mobile application.',
    technologies: ['PHP', 'Laravel', 'VueJS', 'OAuth2', 'Cordova'],
    type: 'past',
  },
  {
    period: '2018 - 2019',
    title: 'Master in Computer Science',
    company: 'Université de Bordeaux',
    location: 'Bordeaux, France',
    description:
      'Advanced studies in software engineering, algorithms, and distributed systems.',
    technologies: ['Algorithms', 'Distributed Systems', 'Software Engineering'],
    type: 'education',
  },
];

const TimelineItem = ({ experience, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 mb-3 lg:mb-6 pl-8 lg:pl-0 ${
        isLeft ? '' : 'lg:direction-rtl'
      }`}
    >
      {/* Timeline Dot - Mobile (left) */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 + 0.2 }}
        className={`absolute w-3 h-3 rounded-full z-10 lg:hidden left-[3px] top-8 ${
          experience.type === 'side-project' ? 'bg-accent-3' : 'bg-accent-1'
        }`}
      >
        {experience.type === 'current' && (
          <span className="absolute inset-0 rounded-full bg-accent-1 animate-ping opacity-50" />
        )}
      </motion.div>

      {/* Timeline Dot - Desktop (center) */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 + 0.2 }}
        className={`absolute w-4 h-4 rounded-full border-4 border-[var(--color-bg-primary)] z-10 hidden lg:block ${
          experience.type === 'side-project' ? 'bg-accent-3' : 'bg-accent-1'
        } ${
          isLeft
            ? 'left-[calc(50%-15px)]'
            : 'left-[calc(50%+0px)]'
        }`}
      >
        {experience.type === 'current' && (
          <span className="absolute inset-0 rounded-full bg-accent-1 animate-ping opacity-50" />
        )}
      </motion.div>

      {/* Content Card */}
      <div
        className={`${
          isLeft ? 'lg:text-right lg:pr-12' : 'lg:col-start-2 lg:pl-12 lg:direction-ltr'
        }`}
      >
        <div className="card p-6 inline-block w-full">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-accent-1 bg-accent-1/10">
              {experience.period}
            </span>
            {experience.type === 'side-project' && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-accent-3 bg-accent-3/15">
                Side Project
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display text-xl font-bold mb-1">
            {experience.title}
          </h3>

          {/* Company & Location */}
          <p className="text-accent-2 text-sm mb-2">
            {experience.company}
            <span className="text-gray-600"> · {experience.location}</span>
          </p>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            {experience.description}
          </p>

          {/* Technologies */}
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'lg:justify-end' : ''}`}>
            {experience.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Empty space for alternating layout */}
      <div className="hidden lg:block" />
    </motion.div>
  );
};

TimelineItem.propTypes = {
  experience: PropTypes.shape({
    period: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.oneOf(['current', 'past', 'education', 'side-project']).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const Timeline = () => {
  return (
    <section className="section-padding bg-surface-secondary">
      <div className="container-custom">
        <SectionHeading
          subtitle="My professional path from education to senior developer"
          gradientWord="Journey"
        >
          My Journey
        </SectionHeading>

        <div className="relative">
          {/* Desktop Line (center) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-1 via-accent-2 to-accent-3 hidden lg:block" />

          {/* Timeline Items */}
          {experiences.map((experience, index) => (
            <TimelineItem key={index} experience={experience} index={index} />
          ))}
        </div>

        {/* Journey Start Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-full glass">
            <Briefcase size={16} className="text-accent-1" />
            <span className="text-sm text-gray-400">6+ years of experience</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
