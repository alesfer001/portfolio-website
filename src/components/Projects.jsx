import { motion } from 'framer-motion';
import { MessageCircle, Calendar } from 'lucide-react';
import { trackProjectInterest } from '../utils/analytics';

const Projects = () => {
  const projects = [
    {
      title: 'eMenuChoice Platform',
      description: 'Comprehensive dining services management platform for senior living communities. Features multi-system integrations with Eldermark, PCC, and DiningRD, automated workflows, nutrition tracking, orders, reservations, and dietary management.',
      technologies: ['PHP 8.4', 'CodeIgniter v2.1.3', 'React 16.13.1', 'MariaDB', 'Docker'],
      date: 'Jan 2025 - Present',
      status: 'Current',
      highlight: 'Multi-system integration & automation',
      image: '/projects/emenuchoice.png'
    },
    {
      title: 'BricoPrive E-commerce',
      description: 'E-commerce platform maintenance and evolution for Uneed client. Successfully increased BAPI usage from 30% to 90% through legacy system optimization, API development, and performance enhancements.',
      technologies: ['PHP', 'Prestashop', 'Python', 'NodeJS', 'React', 'Datadog'],
      date: 'Apr 2022 - May 2024',
      status: 'Completed',
      highlight: 'BAPI usage increased from 30% to 90%',
      image: '/projects/bricoprive.avif'
    },
    {
      title: 'Alephium DEX',
      description: 'Decentralized exchange platform built on Alephium blockchain. Features swap optimization, liquidity pools management, and smart contract router implementation for seamless DeFi operations.',
      technologies: ['Ralph (Rust)', 'React', 'TypeScript', 'Express', 'Smart Contracts'],
      date: 'Mar 2023 - Present',
      status: 'On Hold',
      highlight: 'Innovative blockchain technology',
      image: '/projects/alephium-dex.png'
    },
    {
      title: 'EnjoyMonCSE Management Solutions',
      description: 'Comprehensive works councils management platform with eCommerce integration. Built custom CMS, private employee stores, and deployed mobile application using Cordova for cross-platform compatibility.',
      technologies: ['PHP', 'Laravel', 'VueJS', 'Prestashop', 'OAuth2', 'Algolia', 'Cordova'],
      date: 'Jul 2019 - Nov 2021',
      status: 'Completed',
      highlight: 'Full-stack solution with mobile deployment',
      image: '/projects/enjoymoncse.png'
    }
  ];

  return (
    <section id="projects" className="section-padding bg-gray-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Real projects showcasing 5+ years of full-stack development expertise,
            from enterprise platforms to innovative blockchain solutions.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-8 bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-primary transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative group">
                <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover"
                        onLoad={() => console.log(`✅ Image loaded: ${project.image}`)}
                        onError={(e) => {
                          console.error(`❌ Image failed to load: ${project.image}`);
                          // Fallback to placeholder if image fails to load
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex flex-col items-center justify-center">
                              <div class="text-4xl mb-3">${project.featured ? '⭐' : '📱'}</div>
                              <span class="text-gray-400 text-lg font-semibold">${project.title}</span>
                            </div>
                          `;
                        }}
                      />
                      {/* Hover overlay - only render when image exists */}
                      <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex flex-col items-center justify-center">
                      <div className="text-4xl mb-3">
                        {project.featured ? '⭐' : '📱'}
                      </div>
                      <span className="text-gray-400 text-lg font-semibold">{project.title}</span>
                    </div>
                  )}
                </div>
                {/* Status badge - outside the aspect-video container */}
                {project.status && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Current' ? 'bg-green-600 text-white' :
                      project.status === 'Ongoing' ? 'bg-blue-600 text-white' :
                      project.status === 'On Hold' ? 'bg-yellow-600 text-white' :
                      'bg-gray-600 text-gray-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      {project.highlight && (
                        <p className="text-primary text-sm font-semibold mb-2">
                          🚀 {project.highlight}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm whitespace-nowrap ml-4">
                      <Calendar size={16} className="mr-1" />
                      {project.date}
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-700 text-primary px-3 py-1 rounded-full text-sm border border-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      trackProjectInterest(project.title, 'contact_click');
                      const element = document.querySelector('#contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <MessageCircle size={18} />
                    Discuss This Project
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">
            Interested in working together on your next project?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            <MessageCircle size={20} />
            Discuss Your Freelance Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
