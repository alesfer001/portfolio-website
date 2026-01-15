import { motion } from 'framer-motion';
import { SectionHeading } from './common';
import { useCursor } from './cursor';

const skillCategories = [
  {
    title: 'Backend',
    icon: '{}',
    skills: ['PHP', 'Laravel', 'Symfony', 'CodeIgniter', 'NodeJS', 'Python'],
    featured: ['PHP', 'Laravel', 'NodeJS'],
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Frontend',
    icon: '</>',
    skills: ['JavaScript', 'VueJS', 'React', 'TypeScript', 'HTML/CSS', 'Tailwind CSS'],
    featured: ['VueJS', 'React', 'JavaScript'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Database',
    icon: '[]',
    skills: ['MySQL', 'MariaDB', 'MongoDB', 'Redis', 'PostgreSQL'],
    featured: ['MySQL', 'MongoDB'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Blockchain',
    icon: '#',
    skills: ['Ralph/Rust', 'Smart Contracts', 'Alephium', 'Web3', 'DeFi'],
    featured: ['Smart Contracts', 'Alephium'],
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'DevOps',
    icon: '>_',
    skills: ['Docker', 'Git', 'Linux', 'Nginx', 'CI/CD', 'AWS'],
    featured: ['Docker', 'Git'],
    color: 'from-green-500 to-teal-500',
  },
  {
    title: 'APIs & Tools',
    icon: '~',
    skills: ['REST APIs', 'OAuth2', 'Datadog', 'Algolia', 'PayPal', 'Cloudwatch'],
    featured: ['REST APIs', 'OAuth2'],
    color: 'from-pink-500 to-rose-500',
  },
];

const otherTechnologies = [
  'Prestashop',
  'Cordova',
  'Android/iOS',
  'Airflow',
  'Webpack',
  'Vite',
  'Jest',
  'Express',
  'GraphQL',
];

const SkillCard = ({ category, index }) => {
  const { setCursorVariant } = useCursor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
      className="group"
    >
      <div className="card h-full p-6 relative overflow-hidden">
        {/* Background Gradient Orb */}
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${category.color} rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`}
        />

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 relative">
          {/* Icon */}
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}
          >
            <span className="text-white font-mono font-bold text-sm">
              {category.icon}
            </span>
          </div>
          <h3 className="font-display text-lg font-bold">{category.title}</h3>
        </div>

        {/* Featured Skills */}
        <div className="flex flex-wrap gap-2 mb-4 relative">
          {category.featured.map((skill, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/5 text-white border border-white/10 hover:border-accent-1/50 transition-colors"
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* All Skills */}
        <div className="flex flex-wrap gap-1.5 relative">
          {category.skills
            .filter((s) => !category.featured.includes(s))
            .map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full text-xs text-gray-500 bg-white/5"
              >
                {skill}
              </span>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          subtitle="Technologies and tools I use to bring ideas to life"
          gradientWord="Skills"
        >
          My Skills
        </SectionHeading>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Other Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
            Also experienced with
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {otherTechnologies.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="tech-tag"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex justify-center gap-8"
        >
          {[
            { name: 'French', level: 'Native' },
            { name: 'English', level: 'Fluent' },
            { name: 'Arabic', level: 'Native' },
          ].map((lang, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-display font-bold gradient-text">
                {lang.name}
              </div>
              <div className="text-xs text-gray-500">{lang.level}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
