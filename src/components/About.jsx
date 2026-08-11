/*
 * SERVICE INFORMATION.
 *
 * The board's announcement panel, the one full-bleed amber inversion on the
 * page. Black type on amber, no cards, no icons.
 */

const facts = [
  { label: 'Based', value: 'Bordeaux, France' },
  { label: 'Timezone', value: 'CET · UTC+1' },
  { label: 'Working', value: 'Remote, worldwide' },
  { label: 'Languages', value: 'FR · EN · AR' },
  { label: 'Status', value: 'Available' },
];

const disciplines = [
  { name: 'Backend', detail: 'PHP · Laravel · Symfony · CodeIgniter · Node · Hono · Python' },
  { name: 'Frontend', detail: 'React · React Native · Vue · TypeScript · Next.js · Tailwind' },
  { name: 'Data', detail: 'MariaDB · MySQL · Postgres · Neon · SQLite · Drizzle · Redis' },
  { name: 'Chain', detail: 'Ralph · Rust · CKB Script · smart contracts · DeFi routing' },
  { name: 'Ops', detail: 'Docker · Vercel · Datadog · CI · Airflow' },
];

const About = () => {
  return (
    <section
      id="about"
      data-cursor="invert"
      className="panel-amber relative overflow-hidden"
    >
      <div className="bleed py-24 sm:py-32">
        {/* Announcement */}
        <div className="border-b border-[rgba(10,10,11,0.22)] pb-6">
          <span className="mono-label">Service information</span>
        </div>

        <h2
          className="mt-10 max-w-[18ch] font-display text-[11vw] font-extrabold leading-[0.9] tracking-[-0.04em] sm:text-[7.5vw] lg:text-[5.6vw]"
        >
          Six years keeping other people’s systems honest.
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="max-w-[58ch] space-y-5 text-base leading-relaxed text-[rgba(10,10,11,0.78)] sm:text-lg">
            <p>
              I work at the join between a business rule and the database row that has to survive
              it. Most of what I build is unglamorous and load-bearing: integrations that reconcile
              three systems that disagree, sync that assumes the network will drop, escrow that
              nobody, including me, can override.
            </p>
            <p>
              Backend-heavy by instinct, full-stack because shipping requires it. I have spent as
              much time repairing legacy platforms as greenfielding new ones, and I have opinions
              about both. Autonomous by default: I am usually the person deciding what to build
              next, not waiting to be told.
            </p>
          </div>

          {/* Disciplines as board rows */}
          <div>
            {disciplines.map((d) => (
              <div
                key={d.name}
                className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-[rgba(10,10,11,0.18)] py-4"
              >
                <span className="font-mono-data text-xs font-bold uppercase tracking-widest">
                  {d.name}
                </span>
                <span className="font-mono-data text-xs leading-relaxed text-[rgba(10,10,11,0.68)]">
                  {d.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fact strip */}
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[rgba(10,10,11,0.22)] pt-8 sm:grid-cols-3 lg:grid-cols-5">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="mono-label">{f.label}</dt>
              <dd className="mt-2 font-display text-lg font-bold tracking-tight">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default About;
