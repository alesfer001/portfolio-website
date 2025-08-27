import { useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, {
    threshold: options.threshold || 0.1,
    margin: options.margin || "0px 0px -100px 0px",
    once: options.once !== false
  });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!options.once) {
      controls.start('hidden');
    }
  }, [isInView, controls, options.once]);

  return { ref, controls, isInView };
};

export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 50,
    transition: { duration: 0.6 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.25, 0.25, 0.75]
    }
  }
};

export const fadeInLeft = {
  hidden: { 
    opacity: 0, 
    x: -50,
    transition: { duration: 0.6 }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.25, 0.25, 0.75]
    }
  }
};

export const fadeInRight = {
  hidden: { 
    opacity: 0, 
    x: 50,
    transition: { duration: 0.6 }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.25, 0.25, 0.75]
    }
  }
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const scaleIn = {
  hidden: { 
    scale: 0.8, 
    opacity: 0,
    transition: { duration: 0.6 }
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.25, 0.25, 0.75]
    }
  }
};

export const slideInFromBottom = {
  hidden: { 
    y: 100, 
    opacity: 0,
    transition: { duration: 0.8 }
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.25, 0.25, 0.75]
    }
  }
};

export const bounceIn = {
  hidden: { 
    scale: 0.3, 
    opacity: 0,
    transition: { duration: 0.6 }
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring",
      damping: 10,
      stiffness: 100,
      duration: 0.8
    }
  }
};