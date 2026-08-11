import { SplitFlap, useInViewOnce } from './flap';

/*
 * EQUIPMENT, what's on board.
 *
 * Deliberately not the same cut as About's disciplines: this is the exhaustive
 * inventory, ending in the scrolling information strip every board has.
 */

const equipment = [
  {
    group: 'Backend',
    primary: ['PHP', 'Laravel', 'Symfony', 'CodeIgniter'],
    secondary: ['NodeJS', 'Express', 'Hono', 'Python'],
  },
  {
    group: 'Frontend',
    primary: ['React', 'VueJS', 'TypeScript'],
    secondary: ['React Native', 'Next.js', 'Tailwind', 'JavaScript', 'HTML/CSS'],
  },
  {
    group: 'Data',
    primary: ['MySQL', 'MariaDB', 'PostgreSQL'],
    secondary: ['MongoDB', 'Redis', 'SQLite', 'Drizzle', 'Neon'],
  },
  {
    group: 'Chain',
    primary: ['Ralph / Rust', 'Smart contracts'],
    secondary: ['Alephium', 'CKB Script', 'Web3', 'DeFi'],
  },
  {
    group: 'Ops',
    primary: ['Docker', 'Git', 'CI/CD'],
    secondary: ['Linux', 'Nginx', 'Vercel', 'AWS', 'Datadog'],
  },
  {
    group: 'Interfaces',
    primary: ['REST', 'OAuth2', 'SSE'],
    secondary: ['GraphQL', 'Webhooks', 'Stripe', 'Twilio', 'Algolia'],
  },
];

const strip = [
  'PHP',
  'LARAVEL',
  'REACT',
  'TYPESCRIPT',
  'NODE',
  'PYTHON',
  'RUST',
  'DOCKER',
  'POSTGRES',
  'REACT NATIVE',
  'SMART CONTRACTS',
  'VUEJS',
  'SYMFONY',
  'REDIS',
  'STRIPE',
  'PRESTASHOP',
  'AIRFLOW',
  'CORDOVA',
  'GRAPHQL',
  'VITE',
];

const Skills = () => {
  const [ref, seen] = useInViewOnce();

  return (
    <section id="skills" ref={ref} className="py-24 sm:py-32">
      <div className="bleed">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule-strong pb-6">
          <SplitFlap
            text="EQUIPMENT"
            active={seen}
            className="text-[9vw] leading-none sm:text-[6vw] lg:text-[4.6vw]"
          />
          <p className="mono-label max-w-[28ch] leading-relaxed">
            Everything currently on board
            <br />
            Bold = daily driver
          </p>
        </div>
      </div>

      <div className="mt-px border-t border-rule">
        {equipment.map((e) => (
          <div
            key={e.group}
            className="grid grid-cols-1 gap-3 border-b border-rule px-4 py-6 transition-colors hover:bg-[var(--housing)] sm:px-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:items-baseline lg:gap-8 lg:px-12"
          >
            <span className="font-display text-xl font-extrabold tracking-tight text-bone">
              {e.group}
            </span>

            <span className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              {e.primary.map((p) => (
                <span
                  key={p}
                  className="font-mono-data text-sm font-bold uppercase tracking-wider text-amber"
                >
                  {p}
                </span>
              ))}
              {e.secondary.map((s) => (
                <span
                  key={s}
                  className="font-mono-data text-xs uppercase tracking-wider text-ash-dim"
                >
                  {s}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>

      {/* Information strip, the scrolling line every board has */}
      <div className="marquee mt-16 border-y border-rule bg-[var(--housing)] py-4">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <span key={copy} className="marquee-run" aria-hidden={copy === 1}>
              {strip.map((s) => (
                <span key={s} className="mono-data mx-6 text-xs tracking-[0.24em] text-ash">
                  {s}
                  <span className="ml-6 text-amber">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
