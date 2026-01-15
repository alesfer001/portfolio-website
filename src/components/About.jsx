import { motion } from 'framer-motion';
import { Code, Globe, Zap, Users } from 'lucide-react';
import { SectionHeading } from './common';
import { useCursor } from './cursor';

const highlights = [
  {
    icon: Code,
    title: 'Full-Stack Expert',
    description: 'End-to-end development from database to UI',
    stat: '6+ years',
    statLabel: 'Experience',
  },
  {
    icon: Globe,
    title: 'Remote Ready',
    description: 'Seamless async collaboration across timezones',
    stat: '100%',
    statLabel: 'Remote Work',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Agile approach with rapid iteration cycles',
    stat: '15+',
    statLabel: 'Projects',
  },
  {
    icon: Users,
    title: 'Team Player',
    description: 'Clear communication, thorough documentation',
    stat: '5+',
    statLabel: 'Tech Stacks',
  },
];

const About = () => {
  const { setCursorVariant } = useCursor();

  return (
    <section id="about" className="section-padding bg-surface-secondary">
      <div className="container-custom">
        <SectionHeading gradientWord="Me" align="center">
          About Me
        </SectionHeading>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-32">
              {/* Role Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-gray-300">Available for Freelance</span>
              </motion.div>

              <h3 className="font-display text-3xl font-bold mb-6">
                Turning complex problems into{' '}
                <span className="gradient-text">elegant solutions</span>
              </h3>

              <p className="text-gray-400 leading-relaxed mb-6">
                With over 6 years of experience, I specialize in building robust, scalable
                applications using PHP, NodeJS, VueJS, React, and Python. My autonomous approach
                and innovative mindset make me an ideal partner for challenging projects.
              </p>

              <p className="text-gray-400 leading-relaxed mb-8">
                Based in Bordeaux, France, I work with clients worldwide to deliver high-quality
                solutions that drive real business results. From enterprise platforms to innovative
                startups, I bring the same level of dedication and technical excellence.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {['PHP', 'NodeJS', 'VueJS', 'React', 'Python', 'Docker'].map((tech, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="px-3 py-1 rounded-full text-sm bg-accent-1/10 text-accent-1 border border-accent-1/20"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Highlight Cards */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="group"
                >
                  <div className="card h-full p-6 relative overflow-hidden">
                    {/* Background glow on hover */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-accent-1/20 to-accent-2/20 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

                    <div className="relative">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-1/20 to-accent-2/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <highlight.icon className="w-6 h-6 text-accent-1" />
                      </div>

                      {/* Title */}
                      <h4 className="font-display text-lg font-bold mb-2">
                        {highlight.title}
                      </h4>

                      {/* Description */}
                      <p className="text-gray-500 text-sm mb-4">
                        {highlight.description}
                      </p>

                      {/* Stat */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold gradient-text">
                          {highlight.stat}
                        </span>
                        <span className="text-xs text-gray-600">{highlight.statLabel}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4"
            >
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Based in</p>
                    <p className="font-display font-bold text-lg">Bordeaux, France</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Timezone</p>
                    <p className="font-mono text-accent-1">CET (UTC+1)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Working with</p>
                    <p className="text-gray-300">Clients Worldwide</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
