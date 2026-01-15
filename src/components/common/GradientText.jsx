import { motion } from 'framer-motion';

/**
 * GradientText - Renders text with animated gradient effect
 */
const GradientText = ({
  children,
  className = '',
  animate = false,
  as: Component = 'span'
}) => {
  const baseClasses = 'gradient-text';

  if (animate) {
    return (
      <motion.span
        className={`${baseClasses} ${className}`}
        style={{
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <Component className={`${baseClasses} ${className}`}>
      {children}
    </Component>
  );
};

export default GradientText;
