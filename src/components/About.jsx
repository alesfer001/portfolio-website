import { motion } from 'framer-motion';
import { Code, Database, Globe, Smartphone } from 'lucide-react';

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
      icon: <Database size={24} />,
      title: 'Database Design',
      description: 'Efficient database architecture and optimization'
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Mobile-First',
      description: 'Creating seamless experiences across all devices'
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
            About <span className="text-arsenal-red">Me</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Passionate full-stack developer with expertise in modern web technologies. 
            I create scalable, user-friendly applications that drive business growth.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-arsenal-red">
              Senior Full-Stack Developer
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              With over 5 years of experience in web development, I specialize in creating 
              robust, scalable applications using cutting-edge technologies. My expertise 
              spans across frontend frameworks, backend systems, and cloud infrastructure.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              I'm passionate about clean code, user experience, and continuous learning. 
              Whether it's a complex enterprise application or a sleek startup MVP, 
              I deliver solutions that exceed expectations.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-gray-700 text-arsenal-red px-3 py-1 rounded-full text-sm">
                Available for Freelance
              </span>
              <span className="bg-gray-700 text-green-400 px-3 py-1 rounded-full text-sm">
                Remote Work
              </span>
              <span className="bg-gray-700 text-blue-400 px-3 py-1 rounded-full text-sm">
                Full-time Opportunities
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
                className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-arsenal-red transition-all duration-300"
              >
                <div className="text-arsenal-red mb-4">
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