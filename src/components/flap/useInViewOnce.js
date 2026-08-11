import { useEffect, useRef, useState } from 'react';

/**
 * Fires once when the element first enters the viewport. Boards flip on
 * arrival, then stay landed.
 */
const useInViewOnce = ({ rootMargin = '-12% 0px -12% 0px' } = {}) => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || seen) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [seen, rootMargin]);

  return [ref, seen];
};

export default useInViewOnce;
