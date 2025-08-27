import { motion } from 'framer-motion';
import { MessageCircle, Eye, Calendar, Star } from 'lucide-react';
import { trackProjectInterest } from '../utils/analytics';

const Projects = () => {
  const projects = [
    {
      title: 'eMenuChoice Platform',
      description: 'Comprehensive dining services management platform for senior living communities. Features multi-system integrations with Eldermark, PCC, and DiningRD, automated workflows, nutrition tracking, orders, reservations, and dietary management.',
      technologies: ['PHP 8.4', 'CodeIgniter v2.1.3', 'React 16.13.1', 'MariaDB', 'Docker'],
      featured: true,
      date: 'Jan 2025 - Present',
      status: 'Current',
      highlight: 'Multi-system integration & automation'
    },
    {
      title: 'BricoPrive E-commerce',
      description: 'E-commerce platform maintenance and evolution for Uneed client. Successfully increased BAPI usage from 30% to 90% through legacy system optimization, API development, and performance enhancements.',
      technologies: ['PHP', 'Prestashop', 'Python', 'NodeJS', 'React', 'Datadog'],
      featured: true,
      date: 'Apr 2022 - May 2024',
      status: 'Completed',
      highlight: 'BAPI usage increased from 30% to 90%'
    },
    {
      title: 'Alephium DEX',
      description: 'Decentralized exchange platform built on Alephium blockchain. Features swap optimization, liquidity pools management, and smart contract router implementation for seamless DeFi operations.',
      technologies: ['Ralph (Rust)', 'React', 'TypeScript', 'Express', 'Smart Contracts'],
      featured: true,
      date: 'Mar 2023 - Present',
      status: 'Ongoing',
      highlight: 'Innovative blockchain technology'
    },
    {
      title: 'EnjoyMonCSE Management Solutions',
      description: 'Comprehensive works councils management platform with eCommerce integration. Built custom CMS, private employee stores, and deployed mobile application using Cordova for cross-platform compatibility.',
      technologies: ['PHP', 'Laravel', 'VueJS', 'Prestashop', 'OAuth2', 'Algolia', 'Cordova'],
      featured: false,
      date: 'Jul 2019 - Nov 2021',
      status: 'Completed',
      highlight: 'Full-stack solution with mobile deployment'
    },
    {
      title: 'Dynamic Blog Platform',
      description: 'Modern content management system with advanced SEO optimization, real-time editing capabilities, custom theme engine, and comprehensive analytics dashboard for content creators.',
      technologies: ['React', 'NodeJS', 'MongoDB', 'Express', 'SEO Tools'],
      featured: false,
      date: '2023',
      status: 'Completed',
      highlight: 'Real-time editing & SEO optimization'
    },
    {
      title: 'Meals Mobile App',
      description: 'Cross-platform meal planning application with comprehensive nutrition tracking, recipe management, shopping list generation, and offline functionality for seamless user experience.',
      technologies: ['Cordova', 'AngularJS', 'SQLite', 'CSS3', 'JavaScript'],
      featured: false,
      date: '2022',
      status: 'Completed',
      highlight: 'Cross-platform nutrition tracking'
    },
    {
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website showcasing professional expertise and projects. Built with cutting-edge technologies, featuring smooth animations, dark theme, and optimized for freelance client acquisition.',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Lucide Icons'],
      featured: false,
      date: 'Jan 2025',
      status: 'Current',
      highlight: 'Professional freelance showcase'
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
            Featured <span className="text-arsenal-red">Projects</span>
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
              className={`grid ${
                project.featured ? 'lg:grid-cols-2' : 'md:grid-cols-1'
              } gap-8 bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-arsenal-red transition-all duration-300`}
            >
              {/* Project Image */}
              <div className="relative group">
                <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex flex-col items-center justify-center">
                    <div className="text-4xl mb-3">
                      {project.featured ? '⭐' : '📱'}
                    </div>
                    <span className="text-gray-400 text-lg font-semibold">{project.title}</span>
                    {project.status && (
                      <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Current' ? 'bg-green-600 text-white' :
                        project.status === 'Ongoing' ? 'bg-blue-600 text-white' :
                        'bg-gray-600 text-gray-300'
                      }`}>
                        {project.status}
                      </span>
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-arsenal-red bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg" />
              </div>

              {/* Project Details */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {project.title}
                        {project.featured && <Star size={20} className="inline ml-2 text-arsenal-red" />}
                      </h3>
                      {project.highlight && (
                        <p className="text-arsenal-red text-sm font-semibold mb-2">
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
                        className="bg-gray-700 text-arsenal-red px-3 py-1 rounded-full text-sm border border-gray-600"
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
                    className="flex items-center gap-2 bg-arsenal-red hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <MessageCircle size={18} />
                    Contact for Details
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      trackProjectInterest(project.title, 'learn_more_click');
                      const element = document.querySelector('#about');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex items-center gap-2 border border-gray-600 hover:border-arsenal-red text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <Eye size={18} />
                    Learn More
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
            className="inline-flex items-center gap-2 border border-arsenal-red text-arsenal-red hover:bg-arsenal-red hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
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