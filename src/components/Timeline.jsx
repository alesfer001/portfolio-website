import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { SectionHeading } from './common';

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
      className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 ${
        isLeft ? '' : 'lg:direction-rtl'
      }`}
    >
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 + 0.2 }}
        className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-1 border-4 border-[var(--color-bg-primary)] z-10 hidden lg:block"
      >
        {/* Pulse effect for current */}
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
          {/* Period Badge */}
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-accent-1 bg-accent-1/10 mb-4">
            {experience.period}
          </span>

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
          {/* Central Line */}
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
