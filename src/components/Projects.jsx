import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, shopping cart, and payment processing.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      date: '2024'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      date: '2024'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Data visualization dashboard with interactive charts, real-time metrics, and comprehensive reporting system for business intelligence.',
      image: '/api/placeholder/600/400',
      technologies: ['Vue.js', 'Python', 'FastAPI', 'Chart.js'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      date: '2023'
    },
    {
      title: 'Social Media App',
      description: 'Social networking platform with user profiles, post sharing, real-time messaging, and content moderation features.',
      image: '/api/placeholder/600/400',
      technologies: ['React Native', 'Firebase', 'Node.js', 'GraphQL'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      date: '2023'
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
            A showcase of my recent work, demonstrating expertise in modern web technologies 
            and problem-solving capabilities.
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
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Project Screenshot</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-arsenal-red bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg" />
              </div>

              {/* Project Details */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-gray-400 text-sm">
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
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-arsenal-red hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-gray-600 hover:border-arsenal-red text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <Github size={18} />
                    Source Code
                  </motion.a>
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
            Want to see more of my work?
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-arsenal-red text-arsenal-red hover:bg-arsenal-red hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            <Github size={20} />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;