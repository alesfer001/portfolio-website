import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center section-padding">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            Hi, I&apos;m{' '}
            <span className="text-arsenal-red">Ayoub Lesfer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto"
          >
            Full-Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Full-Stack Developer with over 5 years of experience, expert in PHP, NodeJS, VueJS, and Python. 
            Versatile and autonomous, ready to bring technical skills and innovative mindset to your freelance projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center justify-center gap-2 mb-8 text-gray-400"
          >
            <MapPin size={20} />
            <span className="text-lg">Bordeaux, France</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#contact')}
              className="bg-arsenal-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get In Touch
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#projects')}
              className="border border-gray-600 hover:border-arsenal-red text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View My Work
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex justify-center space-x-6 mb-12"
          >
            <motion.a
              whileHover={{ scale: 1.2, color: '#DB0007' }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-arsenal-red transition-colors"
            >
              <Github size={28} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, color: '#DB0007' }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-arsenal-red transition-colors"
            >
              <Linkedin size={28} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, color: '#DB0007' }}
              href="mailto:lesferayoub@gmail.com"
              className="text-gray-400 hover:text-arsenal-red transition-colors"
            >
              <Mail size={28} />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={() => scrollToSection('#about')}
              className="text-gray-400 hover:text-arsenal-red transition-colors"
            >
              <ArrowDown size={32} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;