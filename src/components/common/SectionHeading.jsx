import { motion } from 'framer-motion';
import GradientText from './GradientText';

/**
 * SectionHeading - Consistent section title component
 */
const SectionHeading = ({
  children,
  subtitle,
  gradientWord,
  align = 'center',
  className = '',
}) => {
  const alignClasses = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  };

  // Split children to find and highlight the gradient word
  const renderTitle = () => {
    if (!gradientWord) {
      return children;
    }

    const text = typeof children === 'string' ? children : '';
    const parts = text.split(new RegExp(`(${gradientWord})`, 'i'));

    return parts.map((part, index) =>
      part.toLowerCase() === gradientWord.toLowerCase() ? (
        <GradientText key={index}>{part}</GradientText>
      ) : (
        part
      )
    );
  };

  return (
    <div className={`mb-12 lg:mb-16 ${alignClasses[align]} ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
      >
        {renderTitle()}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
