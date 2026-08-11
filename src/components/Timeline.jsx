import { SplitFlap, useInViewOnce } from './flap';

/*
 * SERVICE HISTORY, the arrivals board.
 *
 * Reverse-chronological rows, densest thing on the page. No alternating
 * zigzag: a career is a list, and a list should read like one.
 */

const history = [
  {
    from: '2025',
    to: 'NOW',
    role: 'Senior Full-Stack Developer',
    org: 'eMenuChoice',
    place: 'Remote',
    note: 'Leading the dining services platform for senior living communities, with multi-system integrations and automated workflows.',
    stack: ['PHP 8.4', 'CodeIgniter', 'React', 'MariaDB', 'Docker'],
    lamp: 'on',
  },
  {
    from: '2025',
    to: 'NOW',
    role: 'Founder / Engineer',
    org: 'Kata',
    place: 'Side project',
    note: 'Built the platform, SDK and both client apps: auth, sync, and an AI coach streaming over SSE.',
    stack: ['Hono', 'React Native', 'Drizzle', 'Neon'],
    lamp: 'on',
  },
  {
    from: '2022',
    to: '2024',
    role: 'Full-Stack Developer',
    org: 'BricoPrivé (via Uneed)',
    place: 'Bordeaux, France',
    note: 'E-commerce maintenance and evolution. Raised BAPI usage from 30% to 90% by untangling the legacy path.',
    stack: ['PHP', 'Prestashop', 'Python', 'NodeJS', 'Datadog'],
    lamp: 'off',
  },
  {
    from: '2023',
    to: '2024',
    role: 'Blockchain Developer',
    org: 'Shin (Alephium DEX)',
    place: 'Side project',
    note: 'Smart contracts, multi-pool routing and the swap interface.',
    stack: ['Ralph', 'TypeScript', 'React'],
    lamp: 'amber',
  },
  {
    from: '2019',
    to: '2021',
    role: 'Full-Stack Developer',
    org: 'EnjoyMonCSE',
    place: 'Bordeaux, France',
    note: 'Works councils platform with eCommerce and a cross-platform mobile app, for enterprise clients.',
    stack: ['PHP', 'Laravel', 'VueJS', 'OAuth2', 'Cordova'],
    lamp: 'off',
  },
  {
    from: '2018',
    to: '2019',
    role: 'MSc Computer Science',
    org: 'Université de Bordeaux',
    place: 'Bordeaux, France',
    note: 'Software engineering, algorithms and distributed systems.',
    stack: ['Algorithms', 'Distributed Systems'],
    lamp: 'off',
  },
];

const lampClass = { on: 'lamp--on', amber: 'lamp--amber', off: 'lamp--off' };

const Timeline = () => {
  const [ref, seen] = useInViewOnce();

  return (
    <section id="history" ref={ref} className="py-24 sm:py-32">
      <div className="bleed">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule-strong pb-6">
          <SplitFlap
            text="ARRIVALS"
            active={seen}
            className="text-[9vw] leading-none sm:text-[6vw] lg:text-[4.6vw]"
          />
          <p className="mono-label max-w-[28ch] leading-relaxed">
            Where the six years went
            <br />
            Most recent first
          </p>
        </div>

        <div className="mono-label grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 py-3 lg:grid-cols-[7rem_minmax(0,1.6fr)_minmax(0,2fr)_9rem]">
          <span>Period</span>
          <span>Role</span>
          <span className="hidden lg:block">Detail</span>
          <span className="hidden text-right lg:block">Stack</span>
        </div>
      </div>

      <div className="border-t border-rule">
        {history.map((h) => (
          <div
            key={`${h.org}-${h.from}`}
            className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 border-b border-rule px-4 py-6 transition-colors hover:bg-[var(--housing)] sm:px-8 lg:grid-cols-[7rem_minmax(0,1.6fr)_minmax(0,2fr)_9rem] lg:px-12"
          >
            {/* Period */}
            <span className="font-mono-data text-xs tabular-nums text-ash-dim">
              {h.from}
              <span className="block text-ash">{h.to}</span>
            </span>

            {/* Role + org */}
            <span className="min-w-0">
              <span className="flex items-center gap-2">
                <span className={`lamp ${lampClass[h.lamp]}`} />
                <span className="font-display text-lg font-bold leading-tight tracking-tight text-bone">
                  {h.org}
                </span>
              </span>
              <span className="mt-1.5 block font-mono-data text-xs uppercase tracking-wider text-amber">
                {h.role}
              </span>
              <span className="mono-label mt-1 block normal-case tracking-normal">{h.place}</span>
              {/* Detail folds under on mobile */}
              <span className="mt-3 block text-sm leading-relaxed text-ash lg:hidden">{h.note}</span>
            </span>

            {/* Detail */}
            <span className="hidden max-w-[52ch] text-sm leading-relaxed text-ash lg:block">
              {h.note}
            </span>

            {/* Stack */}
            <span className="hidden justify-end gap-1 lg:flex lg:flex-wrap lg:content-start">
              {h.stack.map((s) => (
                <span key={s} className="tech-tag">
                  {s}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
