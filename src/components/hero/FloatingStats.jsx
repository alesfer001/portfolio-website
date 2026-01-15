import { motion } from 'framer-motion';

const stats = [
  { value: '6+', label: 'Years Experience' },
  { value: '15+', label: 'Projects Delivered' },
  { value: '5+', label: 'Tech Stacks' },
];

/**
 * FloatingStats - Animated statistics cards for the hero section
 */
const FloatingStats = () => {
  return (
    <div className="flex flex-col gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.8 + index * 0.15,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          whileHover={{
            scale: 1.05,
            x: -10,
          }}
          className="glass rounded-2xl px-6 py-4 cursor-default group"
        >
          <motion.div
            className="text-3xl sm:text-4xl font-display font-bold gradient-text"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              delay: 1 + index * 0.15,
            }}
          >
            {stat.value}
          </motion.div>
          <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingStats;
