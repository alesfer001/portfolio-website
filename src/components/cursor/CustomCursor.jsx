import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useCursor } from './CursorContext';

/**
 * CustomCursor - Animated cursor that morphs based on hover state
 * Only shows on devices with fine pointer (mouse)
 */
const CustomCursor = () => {
  const { cursorVariant, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  // True while the pointer is over a surface that would swallow an amber cursor
  const [onInverted, setOnInverted] = useState(false);

  // No spring on position. Both the ring and the dot read the raw pointer
  // values, so the cursor sits exactly under the hand with nothing trailing.
  // Motion values write straight to the transform without a React render.
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Last known pointer position, so the hit test can re-run on scroll when no
  // mousemove has fired.
  const pointer = useRef({ x: -100, y: -100 });

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

    // Time-throttled rather than rAF-gated: a dropped frame must never be able
    // to leave the hit test permanently switched off.
    let lastHitTest = 0;
    const HIT_TEST_MS = 60;

    // Which surface is under the pointer? The cursor is pointer-events:none,
    // so this reports the page beneath it rather than the cursor itself.
    const runHitTest = () => {
      const now = performance.now();
      if (now - lastHitTest < HIT_TEST_MS) return;
      lastHitTest = now;
      const { x, y } = pointer.current;
      if (x < 0 || y < 0) return;
      const under = document.elementFromPoint(x, y);
      setOnInverted(Boolean(under?.closest('[data-cursor="invert"]')));
    };

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      pointer.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
      runHitTest();
    };

    // Scrolling moves the page under a stationary pointer, so the surface can
    // change without a single mousemove. Re-test on scroll as well.
    const handleScroll = () => runHitTest();

    const hideCursor = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', hideCursor);

    // Add class to body for hiding default cursor
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', hideCursor);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [hasFinePointer, cursorX, cursorY]);

  // Don't render on touch devices
  if (!hasFinePointer) return null;

  // Amber reticle, square like every module on the board. Over an amber
  // surface it flips to the board ground, otherwise it vanishes into it.
  const INK = '10, 10, 11';
  const AMBER = onInverted ? INK : '255, 176, 0';

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
        className="pointer-events-none fixed left-0 top-0 z-[99999] flex items-center justify-center transition-opacity duration-200"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
          // Plain opacity, not whileInView: this element is fixed and never
          // "enters" a scroll viewport, so whileInView could leave it hidden.
          opacity: isVisible ? 1 : 0,
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 400,
          mass: 0.5,
        }}
        initial={false}
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
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
          backgroundColor: `rgba(${AMBER}, 0.9)`,
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
