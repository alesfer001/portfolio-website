import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from './CursorContext';

/**
 * CustomCursor - Animated cursor that morphs based on hover state
 * Only shows on devices with fine pointer (mouse)
 */
const CustomCursor = () => {
  const { cursorVariant, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for cursor following
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setHasFinePointer(mediaQuery.matches);

    const handleChange = (e) => setHasFinePointer(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const hideCursor = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', hideCursor);

    // Add class to body for hiding default cursor
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', hideCursor);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [hasFinePointer, cursorX, cursorY]);

  // Don't render on touch devices
  if (!hasFinePointer) return null;

  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: 'rgba(139, 92, 246, 0)',
      border: '2px solid rgba(139, 92, 246, 0.6)',
      scale: 1,
    },
    hover: {
      width: 50,
      height: 50,
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      border: '2px solid rgba(99, 102, 241, 0.8)',
      scale: 1,
    },
    button: {
      width: 60,
      height: 60,
      backgroundColor: 'rgba(139, 92, 246, 0.15)',
      border: '2px solid rgba(139, 92, 246, 1)',
      scale: 1,
    },
    text: {
      width: 100,
      height: 100,
      backgroundColor: 'rgba(236, 72, 153, 0.05)',
      border: '1px solid rgba(236, 72, 153, 0.3)',
      scale: 1,
    },
    hidden: {
      width: 0,
      height: 0,
      backgroundColor: 'rgba(139, 92, 246, 0)',
      scale: 0,
    },
  };

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 400,
          mass: 0.5,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: isVisible ? 1 : 0 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-xs font-medium text-white whitespace-nowrap"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Cursor dot (center) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[99999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'rgba(139, 92, 246, 0.8)',
        }}
        animate={{
          scale: cursorVariant === 'default' ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;
