import { motion } from 'framer-motion';
import { Code, Globe, GraduationCap, Languages } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Code size={24} />,
      title: 'Full-Stack Development',
      description: 'Expert in both frontend and backend technologies'
    },
    {
      icon: <Globe size={24} />,
      title: 'Modern Web Apps',
      description: 'Building responsive, performant web applications'
    },
    {
      icon: <GraduationCap size={24} />,
      title: 'Education',
      description: 'Master in Computer Science, Université de Bordeaux (2018-2019)'
    },
    {
      icon: <Languages size={24} />,
      title: 'Languages',
      description: 'French (Bilingual), English (Bilingual), Arabic (Native)'
    }
  ];

  return (
    <section id="about" className="section-padding bg-gray-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Experienced full-stack developer specializing in PHP, NodeJS, VueJS, and Python. 
            Focused on delivering exceptional freelance solutions with innovative technical expertise.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">
              Freelance Full-Stack Developer
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              With over 5 years of experience in web development, I bring versatile expertise 
              in PHP, NodeJS, VueJS, and Python to create robust, scalable applications. 
              My autonomous approach and innovative mindset make me an ideal partner for your freelance projects.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Based in Bordeaux, France, I&apos;m passionate about delivering high-quality solutions 
              that drive business success. From complex web applications to innovative digital solutions, 
              I ensure every project meets the highest standards of excellence.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-gray-700 text-primary px-3 py-1 rounded-full text-sm">
                Available for Freelance
              </span>
              <span className="bg-gray-700 text-green-400 px-3 py-1 rounded-full text-sm">
                Remote Work
              </span>
              <span className="bg-gray-700 text-blue-400 px-3 py-1 rounded-full text-sm">
                Bordeaux, France
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-primary transition-all duration-300"
              >
                <div className="text-primary mb-4">
                  {highlight.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">
                  {highlight.title}
                </h4>
                <p className="text-gray-300 text-sm">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;