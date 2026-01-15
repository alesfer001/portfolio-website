import { motion } from 'framer-motion';

/**
 * AnimatedCharacter - Single character with 3D reveal animation
 */
const AnimatedCharacter = ({ char, index, isOutlined = false }) => {
  return (
    <motion.span
      className={`inline-block ${isOutlined ? 'text-outline' : ''}`}
      initial={{
        opacity: 0,
        y: 100,
        rotateX: -90,
        filter: 'blur(10px)',
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.05,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      style={{
        transformStyle: 'preserve-3d',
        display: char === ' ' ? 'inline' : 'inline-block',
        minWidth: char === ' ' ? '0.3em' : 'auto',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

/**
 * HeroTextReveal - Cinematic text reveal with character-by-character animation
 */
const HeroTextReveal = ({ firstName = 'Ayoub', lastName = 'Lesfer' }) => {
  const firstNameChars = firstName.split('');
  const lastNameChars = lastName.split('');

  return (
    <div className="overflow-hidden">
      {/* First Name - Solid */}
      <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight">
        <span className="block">
          {firstNameChars.map((char, index) => (
            <AnimatedCharacter key={index} char={char} index={index} />
          ))}
        </span>
        {/* Last Name - Outlined */}
        <span className="block text-gray-300 mt-2">
          {lastNameChars.map((char, index) => (
            <AnimatedCharacter
              key={index}
              char={char}
              index={index + firstNameChars.length}
              isOutlined
            />
          ))}
        </span>
      </h1>
    </div>
  );
};

export default HeroTextReveal;
