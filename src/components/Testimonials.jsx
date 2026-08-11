import PropTypes from 'prop-types';
import { Quote, Star } from 'lucide-react';
import { SplitFlap, useInViewOnce } from './flap';

/*
 * REFERENCES.
 *
 * Kept as a continuously scrolling wall, because the volume is the point.
 * Driven by a CSS animation rather than a rAF loop so it keeps time on a
 * throttled or backgrounded tab, and pauses on hover.
 */

const testimonials = [
  {
    quote:
      'An <highlight>undeniable asset</highlight> for autonomous teams. His <highlight>rapid understanding</highlight> of complex issues consistently led to <highlight>proactive solutions</highlight>.',
    author: 'Guillaume Jariot',
    company: 'BricoPrivé',
    role: 'Head of Development',
    rating: 5,
  },
  {
    quote:
      '<highlight>Impressive mastery</highlight> of technical challenges. He optimised features through <highlight>innovative solutions</highlight>, notably an intelligent router for pool exchanges.',
    author: 'Semlali M.',
    company: 'Shin',
    role: 'Senior Full Stack Developer',
    rating: 5,
  },
  {
    quote:
      'Delivered a <highlight>complete management solution</highlight> with custom features. Integrated <highlight>multiple payment systems</highlight> and Algolia search with <highlight>scalable architecture</highlight>.',
    author: 'Neven C.',
    company: 'EnjoyMonCSE',
    role: 'Laravel VueJS Developer',
    rating: 5,
  },
  {
    quote:
      '<highlight>Effortlessly juggled</highlight> PHP, NodeJS and Python. Acquired new skills at an <highlight>impressive pace</highlight> and consistently explored new tools.',
    author: 'Guillaume Jariot',
    company: 'BricoPrivé',
    role: 'Head of Development',
    rating: 5,
  },
  {
    quote:
      '<highlight>Mastered smart contracts</highlight> in Ralph, TypeScript backend, and React frontend. Created <highlight>intuitive interfaces</highlight> for swap and liquidity operations.',
    author: 'Semlali M.',
    company: 'Shin',
    role: 'Senior Full Stack Developer',
    rating: 5,
  },
  {
    quote:
      '<highlight>Key player</highlight> in critical projects with innovative solutions. Delivered <highlight>hybrid mobile apps on time</highlight> with Agile Scrum methodology.',
    author: 'Neven C.',
    company: 'EnjoyMonCSE',
    role: 'Laravel VueJS Developer',
    rating: 5,
  },
  {
    quote:
      'An <highlight>indispensable team member</highlight>. Balances <highlight>multiple complex tasks</highlight> while staying focused on <highlight>optimal performance</highlight>.',
    author: 'Semlali M.',
    company: 'Shin',
    role: 'Senior Full Stack Developer',
    rating: 5,
  },
  {
    quote:
      'Took <highlight>full technical ownership</highlight> with NodeJS and React. <highlight>Anticipated user needs</highlight> with practical features. Working with him was a <highlight>real pleasure</highlight>.',
    author: 'Saad Iguider',
    company: 'MealPlanner',
    role: 'Lead Tech',
    rating: 5,
  },
  {
    quote:
      '<highlight>Exceptionally easy to work with</highlight>. Demonstrates <highlight>great adaptability</highlight> and seamlessly adjusts to organizational changes while bringing expertise.',
    author: 'Guillaume Jariot',
    company: 'BricoPrivé',
    role: 'Head of Development',
    rating: 5,
  },
];

const renderQuote = (quote) =>
  quote.split(/(<highlight>.*?<\/highlight>)/g).map((part, i) => {
    if (part.startsWith('<highlight>')) {
      return (
        <span key={i} className="font-medium text-bone">
          {part.replace(/<\/?highlight>/g, '')}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });

const TestimonialCard = ({ testimonial }) => (
  /* whitespace-normal: the marquee track sets nowrap for the Skills strip */
  <figure className="mx-3 flex w-[330px] flex-none flex-col whitespace-normal border border-rule bg-[var(--housing)] p-6 md:w-[380px]">
    <Quote className="mb-4 h-6 w-6 text-amber" aria-hidden="true" />

    <div className="mb-4 flex gap-1" aria-label={`${testimonial.rating} out of 5`}>
      {Array.from({ length: testimonial.rating }).map((_, i) => (
        <Star key={i} size={12} className="fill-amber text-amber" aria-hidden="true" />
      ))}
    </div>

    <blockquote className="mb-6 flex-grow text-sm leading-relaxed text-ash">
      {renderQuote(testimonial.quote)}
    </blockquote>

    <figcaption className="flex items-center gap-3 border-t border-rule pt-4">
      <span className="flex h-9 w-9 flex-none items-center justify-center bg-[var(--flap)] font-mono-data text-sm font-bold text-amber">
        {testimonial.author.charAt(0)}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-bone">{testimonial.author}</span>
        <span className="mono-label mt-0.5 block truncate">
          {testimonial.role} · {testimonial.company}
        </span>
      </span>
    </figcaption>
  </figure>
);

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
  const [ref, seen] = useInViewOnce();

  return (
    <section id="references" ref={ref} className="overflow-hidden py-24 sm:py-32">
      <div className="bleed">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule-strong pb-6">
          <SplitFlap
            text="REFERENCES"
            active={seen}
            className="text-[9vw] leading-none sm:text-[6vw] lg:text-[4.6vw]"
          />
          <p className="mono-label max-w-[30ch] leading-relaxed">
            {testimonials.length} references from colleagues and clients
            <br />
            Hover to pause
          </p>
        </div>
      </div>

      <div className="marquee marquee--pausable relative mt-12">
        {/* Fades so cards enter and leave the board rather than being cut off */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--void)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--void)] to-transparent" />

        <div className="marquee-track marquee-track--slow">
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-run" aria-hidden={copy === 1}>
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={`${copy}-${i}`} testimonial={testimonial} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
