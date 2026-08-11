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

  // Amber reticle, square like every module on the board.
  const AMBER = '255, 176, 0';

  const variants = {
    default: {
      width: 18,
      height: 18,
      backgroundColor: `rgba(${AMBER}, 0)`,
      border: `1px solid rgba(${AMBER}, 0.7)`,
      scale: 1,
    },
    hover: {
      width: 46,
      height: 46,
      backgroundColor: `rgba(${AMBER}, 0.1)`,
      border: `1px solid rgba(${AMBER}, 0.9)`,
      scale: 1,
    },
    button: {
      width: 58,
      height: 58,
      backgroundColor: `rgba(${AMBER}, 0.18)`,
      border: `1px solid rgba(${AMBER}, 1)`,
      scale: 1,
    },
    text: {
      width: 96,
      height: 96,
      backgroundColor: `rgba(${AMBER}, 0.06)`,
      border: `1px solid rgba(${AMBER}, 0.35)`,
      scale: 1,
    },
    hidden: {
      width: 0,
      height: 0,
      backgroundColor: `rgba(${AMBER}, 0)`,
      scale: 0,
    },
  };

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999] flex items-center justify-center"
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
        className="pointer-events-none fixed left-0 top-0 z-[99999] h-1 w-1"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'rgba(255, 176, 0, 0.9)',
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
