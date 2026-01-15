import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { SectionHeading } from './common';

// Placeholder testimonials - replace with real ones
const testimonials = [
  {
    quote:
      "Ayoub transformed our legacy e-commerce platform and increased our API adoption from 30% to 90%. His technical expertise and communication were outstanding throughout the project.",
    author: 'Project Manager',
    company: 'BricoPrive',
    role: 'E-commerce Platform',
    rating: 5,
  },
  {
    quote:
      "Exceptional full-stack developer who delivered our dining management platform with seamless multi-system integrations. Highly recommended for complex enterprise projects.",
    author: 'Technical Lead',
    company: 'eMenuChoice',
    role: 'Healthcare Tech',
    rating: 5,
  },
  {
    quote:
      "Ayoub built our complete works council management solution including mobile apps. His ability to handle both backend architecture and frontend development is impressive.",
    author: 'Product Owner',
    company: 'EnjoyMonCSE',
    role: 'B2B SaaS Platform',
    rating: 5,
  },
  {
    quote:
      "Working with Ayoub on our blockchain DEX project showcased his ability to quickly adapt to new technologies. His smart contract work was clean and well-documented.",
    author: 'Founder',
    company: 'Alephium DEX',
    role: 'DeFi Project',
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="flex-shrink-0 w-[350px] md:w-[400px] mx-3">
      <div className="h-full card p-6 flex flex-col">
        {/* Quote Icon */}
        <Quote className="w-8 h-8 text-accent-1 mb-4 opacity-50" />

        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} size={14} className="fill-accent-2 text-accent-2" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
          "{testimonial.quote}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          {/* Avatar placeholder */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-1/30 to-accent-2/30 flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {testimonial.author.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium text-white text-sm">{testimonial.author}</p>
            <p className="text-xs text-gray-500">
              {testimonial.role} · {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const containerRef = useRef(null);
  const scrollPosRef = useRef(0);
  const isPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  // Keep ref in sync with state
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Auto-scroll effect - runs once, uses refs to persist state
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId;
    const speed = 0.5; // pixels per frame

    const scroll = () => {
      if (!isPausedRef.current) {
        scrollPosRef.current += speed;
        // Reset position when we've scrolled through half the content
        if (scrollPosRef.current >= container.scrollWidth / 2) {
          scrollPosRef.current = 0;
        }
        container.scrollLeft = scrollPosRef.current;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Double the testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-custom mb-12">
        <SectionHeading
          subtitle="What clients and collaborators say about working with me"
          gradientWord="Say"
        >
          What Clients Say
        </SectionHeading>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-bg-primary)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-bg-primary)] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container */}
        <motion.div
          ref={containerRef}
          className="flex overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>

      {/* Pause indicator */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPaused ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-xs text-gray-600">
          {isPaused ? 'Paused' : 'Hover to pause'}
        </span>
      </motion.div>
    </section>
  );
};

export default Testimonials;
