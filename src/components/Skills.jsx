import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Backend',
      skills: [
        { name: 'PHP', level: 95 },
        { name: 'Laravel', level: 93 },
        { name: 'Symfony', level: 85 },
        { name: 'CodeIgniter', level: 88 },
        { name: 'NodeJS', level: 87 },
        { name: 'Python', level: 82 },
      ]
    },
    {
      title: 'Frontend',
      skills: [
        { name: 'JavaScript', level: 92 },
        { name: 'VueJS', level: 90 },
        { name: 'React', level: 85 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 88 },
      ]
    },
    {
      title: 'Database',
      skills: [
        { name: 'MySQL', level: 95 },
        { name: 'MariaDB', level: 90 },
        { name: 'MongoDB', level: 85 },
      ]
    },
    {
      title: 'Blockchain',
      skills: [
        { name: 'Ralph (Rust)', level: 88 },
        { name: 'Smart Contracts', level: 85 },
        { name: 'Alephium', level: 82 },
      ]
    },
    {
      title: 'DevOps & Tools',
      skills: [
        { name: 'Docker', level: 90 },
        { name: 'Git', level: 95 },
        { name: 'APIs', level: 92 },
        { name: 'OAuth2', level: 88 },
        { name: 'Datadog', level: 85 },
      ]
    },
    {
      title: 'Languages',
      skills: [
        { name: 'French', level: 100 },
        { name: 'English', level: 95 },
        { name: 'Arabic', level: 100 },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="section-padding bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            My <span className="text-arsenal-red">Skills</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of the technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-arsenal-red transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-6 text-arsenal-red">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-arsenal-red to-red-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">
            Other Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Prestashop', 'Cordova', 'Android/iOS', 'PayPal API', 'Algolia',
              'Cloudwatch', 'Airflow', 'Linux', 'Nginx', 'Redis',
              'Webpack', 'Vite', 'Jest', 'OAuth2', 'RESTful APIs'
            ].map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm border border-gray-600 hover:border-arsenal-red hover:text-arsenal-red transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;