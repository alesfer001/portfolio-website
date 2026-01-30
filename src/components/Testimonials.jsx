import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { SectionHeading } from './common';
import PropTypes from 'prop-types';

const testimonials = [
  {
    quote:
      "An <highlight>undeniable asset</highlight> for autonomous teams. His <highlight>rapid understanding</highlight> of complex issues consistently led to <highlight>proactive solutions</highlight>.",
    author: 'Guillaume Jariot',
    company: 'BricoPrive',
    role: 'Head of Development',
    rating: 5,
  },
  {
    quote:
      "<highlight>Impressive mastery</highlight> of technical challenges. He optimized features through <highlight>innovative solutions</highlight>, notably an intelligent router for pool exchanges.",
    author: 'Semlali M.',
    company: 'Shin',
    role: 'Senior Full Stack Developer',
    rating: 5,
  },
  {
    quote:
      "Delivered a <highlight>complete management solution</highlight> with custom features. Integrated <highlight>multiple payment systems</highlight> and Algolia search with <highlight>scalable architecture</highlight>.",
    author: 'Neven C.',
    company: 'EnjoyMonCSE',
    role: 'Laravel VueJS Developer',
    rating: 5,
  },
  {
    quote:
      "<highlight>Effortlessly juggled</highlight> PHP, NodeJS, and Python. Acquired new skills at an <highlight>impressive pace</highlight> and consistently explored new tools.",
    author: 'Guillaume Jariot',
    company: 'BricoPrive',
    role: 'Head of Development',
    rating: 5,
  },
  {
    quote:
      "<highlight>Mastered smart contracts</highlight> in Ralph, TypeScript backend, and React frontend. Created <highlight>intuitive interfaces</highlight> for swap and liquidity operations.",
    author: 'Semlali M.',
    company: 'Shin',
    role: 'Senior Full Stack Developer',
    rating: 5,
  },
  {
    quote:
      "<highlight>Key player</highlight> in critical projects with innovative solutions. Delivered <highlight>hybrid mobile apps on time</highlight> with Agile Scrum methodology.",
    author: 'Neven C.',
    company: 'EnjoyMonCSE',
    role: 'Laravel VueJS Developer',
    rating: 5,
  },
  {
    quote:
      "An <highlight>indispensable team member</highlight>. Balances <highlight>multiple complex tasks</highlight> while staying focused on <highlight>optimal performance</highlight>.",
    author: 'Semlali M.',
    company: 'Shin',
    role: 'Senior Full Stack Developer',
    rating: 5,
  },
  {
    quote:
      "Took <highlight>full technical ownership</highlight> with NodeJS and React. <highlight>Anticipated user needs</highlight> with practical features. Working with him was a <highlight>real pleasure</highlight>.",
    author: 'Saad Iguider',
    company: 'MealPlanner',
    role: 'Lead Tech',
    rating: 5,
  },
  {
    quote:
      "<highlight>Exceptionally easy to work with</highlight>. Demonstrates <highlight>great adaptability</highlight> and seamlessly adjusts to organizational changes while bringing expertise.",
    author: 'Guillaume Jariot',
    company: 'BricoPrive',
    role: 'Head of Development',
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial }) => {
  // Parse quote to highlight specific words
  const renderQuote = (quote) => {
    const parts = quote.split(/(<highlight>.*?<\/highlight>)/g);
    return parts.map((part, index) => {
      if (part.startsWith('<highlight>')) {
        const text = part.replace(/<\/?highlight>/g, '');
        return (
          <span key={index} className="text-white font-medium">
            {text}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

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
          {renderQuote(testimonial.quote)}
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

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    quote: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
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
