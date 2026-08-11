import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { trackProjectInterest } from '../utils/analytics';
import { useCursor } from './cursor';
import { SplitFlap, useInViewOnce } from './flap';

/*
 * DEPARTURES, the full board.
 *
 * Every row is a service: where it goes, what it carries, whether it is still
 * running. Selecting a row opens the full-bleed case panel beneath it.
 */

const projects = [
  {
    code: 'EMC',
    title: 'EMENUCHOICE',
    service: 'DINING OPS',
    status: 'BOARDING',
    lamp: 'on',
    year: '2025',
    kind: 'CLIENT',
    tagline: 'Dining management for senior living communities',
    description:
      'Dining services platform for senior living communities, integrating with Eldermark, PointClickCare and DiningRD so kitchens, care records and resident preferences stay in sync. Serving communities including The Chateau, Girardeau, Ebenezer and Mother of Mercy.',
    technologies: ['PHP 8.4', 'CodeIgniter', 'React', 'MariaDB', 'Docker'],
    metrics: [
      { value: '800+', label: 'communities' },
      { value: '155K+', label: 'residents' },
      { value: '20+', label: 'integrations' },
    ],
    image: '/projects/emenuchoice.png',
  },
  {
    code: 'KTA',
    title: 'KATA',
    service: 'AI COACHING',
    status: 'BOARDING',
    lamp: 'on',
    year: '2025',
    kind: 'PRODUCT',
    tagline: 'A coaching platform with two apps on top',
    description:
      'A shared backend and SDK powering two React Native apps. The platform runs a Hono API on Vercel with JWT auth, Drizzle over Neon Postgres, and an AI coach that streams over SSE using the user’s own history as context. Kata Meals tracks nutrition and daily meal loops; Kata Fitness tracks workouts against an 873-exercise library. Both consume the same @kata/sdk.',
    technologies: ['Hono', 'React Native', 'Expo', 'Drizzle', 'Neon', 'TypeScript', 'SSE'],
    metrics: [
      { value: '3', label: 'services' },
      { value: '860+', label: 'commits' },
      { value: '873', label: 'exercises' },
    ],
    image: '/projects/kata-meals.png',
    imageAlt: 'Kata Meals daily plan running on device',
    secondaryImage: '/projects/kata-fitness.png',
    secondaryImageAlt: 'Kata Fitness exercise library with muscle and equipment filters',
    portrait: true,
  },
  {
    code: 'CKB',
    title: 'CKB KICKSTARTER',
    service: 'ON-CHAIN',
    status: 'ON TIME',
    lamp: 'on',
    year: '2025',
    kind: 'PRODUCT',
    tagline: 'Trustless crowdfunding on Nervos CKB',
    description:
      'Crowdfunding where the escrow is the chain itself. Five contract families (campaign, campaign lock, pledge, pledge lock and receipt) enforce the funding rules, so releasing funds to a creator or refunding backers is permissionless: anyone can trigger it and no operator can withhold it. Off-chain, an indexer and transaction builder feed the frontend. Live on testnet.',
    technologies: ['Rust', 'CKB Script', 'TypeScript', 'Next.js', 'SQLite'],
    metrics: [
      { value: '5', label: 'contract families' },
      { value: '186', label: 'commits' },
      { value: 'v1.1', label: 'hardened' },
    ],
    image: '/projects/ckb-kickstarter.jpg',
    imageAlt: 'CKB Kickstarter campaign board running against testnet',
    link: 'https://decentralized-kickstarter-kappa.vercel.app/',
  },
  {
    code: 'TDS',
    title: 'TRADESYNC',
    service: 'FIELD DISPATCH',
    status: 'ARRIVED',
    lamp: 'off',
    year: '2025',
    kind: 'PRODUCT',
    tagline: 'Offline-first job dispatch for solo trades',
    description:
      'Scheduling, dispatch and invoicing for one to three person trades: plumbers, electricians, HVAC. Crews work offline in the field and sync when they reconnect; jobs carry photos and status transitions, and completed work turns into a Stripe invoice delivered by SMS. Role-based access separates owners from crew, and phone numbers normalise to E.164 on the way in.',
    technologies: ['Node', 'Express', 'Supabase', 'Expo', 'Next.js', 'Stripe', 'Twilio'],
    metrics: [
      { value: 'OFFLINE', label: 'first' },
      { value: '5', label: 'phases shipped' },
      { value: 'E2E', label: 'payments' },
    ],
    image: '/projects/tradesync-blurred.png',
    imageAlt: 'TradeSync job board showing jobs across paid, invoiced and arrived states',
    secondaryImage: '/projects/tradesync-invoices.png',
    secondaryImageAlt: 'TradeSync invoices with outstanding and collected balances',
    portrait: true,
  },
  {
    code: 'PWT',
    title: 'PLAYWALKTHROUGH',
    service: 'OFFLINE VOICE',
    status: 'ON TIME',
    lamp: 'on',
    year: '2026',
    kind: 'PRODUCT',
    tagline: 'A walkthrough you drive with your voice',
    description:
      'Reads a game walkthrough one step at a time and moves only when told to. It never guesses where you are, you are the position tracker. Fully offline at play time: local text-to-speech, local wake word, local speech recognition. No LLM, no screen capture, no network. A Python daemon holds the state machine and a React frontend mirrors it over a websocket.',
    technologies: ['Python', 'Kokoro TTS', 'openWakeWord', 'React', 'WebSocket'],
    metrics: [
      { value: '100%', label: 'offline' },
      { value: '1518', label: 'steps loaded' },
      { value: '0', label: 'network calls' },
    ],
    image: '/projects/playwalkthrough.jpg',
    imageAlt: 'PlayWalkthrough showing the current step and voice state',
  },
  {
    code: 'BBK',
    title: 'BUDGETBANKIN',
    service: 'PERSONAL FINANCE',
    status: 'ON TIME',
    lamp: 'on',
    year: '2026',
    kind: 'PRODUCT',
    tagline: 'Bank statements in, spending clarity out',
    description:
      'Personal finance tracking built around importing real bank exports. CSV statements are parsed and auto-categorised by user-defined rules, then split across needs, enjoyment and savings with per-category budgets, estimation for recurring charges, and month-over-month charts.',
    technologies: ['Next.js 16', 'React 19', 'Drizzle', 'SQLite', 'Recharts', 'Radix'],
    metrics: [
      { value: 'CSV', label: 'import' },
      { value: 'RULES', label: 'auto-categorise' },
      { value: '3', label: 'budget groups' },
    ],
    image: '/projects/budgetbankin.jpg',
    imageAlt: 'BudgetBankin dashboard with spend by group and category breakdown',
  },
  {
    code: 'FRT',
    title: 'FRET',
    service: 'AUDIO AI',
    status: 'ARRIVED',
    lamp: 'off',
    year: '2026',
    kind: 'PRODUCT',
    tagline: 'AI feedback on your playing, in seconds',
    description:
      'Built for the Gemini 3 Hackathon. Record yourself playing guitar, piano or singing and get specific, actionable feedback on strengths, weaknesses and practice exercises, using Gemini 3’s multimodal audio understanding. No login, no signup.',
    technologies: ['React 19', 'Tailwind v4', 'Web Audio API', 'Gemini 3'],
    metrics: [
      { value: '3', label: 'instruments' },
      { value: '10S TO 3M', label: 'clip range' },
    ],
    image: '/projects/fret.png',
    link: 'https://fret-three.vercel.app',
  },
  {
    code: 'BRP',
    title: 'BRICOPRIVE',
    service: 'E-COMMERCE',
    status: 'ARRIVED',
    lamp: 'off',
    year: '2022',
    kind: 'CLIENT',
    tagline: 'Legacy e-commerce, made to behave',
    description:
      'Maintenance and optimisation of a high-volume Prestashop platform for Uneed. Raised BAPI usage from 30% to 90%, tripling API throughput. The site won the Palmarès France Capital “Meilleurs Sites de Commerce En Ligne 2023”.',
    technologies: ['PHP', 'Prestashop', 'Python', 'NodeJS', 'Datadog'],
    metrics: [
      { value: '500K+', label: 'products' },
      { value: '3×', label: 'API throughput' },
      { value: '2023', label: 'award' },
    ],
    image: '/projects/bricoprive.avif',
  },
  {
    code: 'SHN',
    title: 'SHIN',
    service: 'ALEPHIUM DEX',
    status: 'DELAYED',
    lamp: 'amber',
    year: '2023',
    kind: 'PRODUCT',
    tagline: 'DEX on Alephium with an optimised router',
    description:
      'Decentralised exchange on the Alephium blockchain. The router finds efficient paths across multiple pools so swaps execute at the best available price.',
    technologies: ['Ralph', 'Rust', 'React', 'TypeScript'],
    metrics: [
      { value: 'MULTI-POOL', label: 'routing' },
      { value: 'ON-CHAIN', label: 'settlement' },
    ],
    image: '/projects/alephium-dex.png',
    link: 'https://shin-nine.vercel.app/',
  },
  {
    code: 'EMC',
    title: 'ENJOYMONCSE',
    service: 'WORKS COUNCILS',
    status: 'ARRIVED',
    lamp: 'off',
    year: '2019',
    kind: 'CLIENT',
    tagline: 'Works council platform for enterprise',
    description:
      'Works councils management platform with eCommerce and a companion mobile app, used by AGCO, Auchan, Safran, McDonald’s, Eiffage, Hasbro, Valeo, Boulanger and Leroy Merlin.',
    technologies: ['PHP', 'Laravel', 'VueJS', 'OAuth2', 'Cordova'],
    metrics: [
      { value: '150+', label: 'enterprise clients' },
      { value: '500K+', label: 'employees' },
    ],
    image: '/projects/enjoymoncse.png',
  },
  {
    code: 'MPL',
    title: 'MEALPLANNER',
    service: 'MOBILE',
    status: 'ARRIVED',
    lamp: 'off',
    year: '2025',
    kind: 'PRODUCT',
    tagline: 'A week of meals in one tap',
    description:
      'React Native app that generates a seven-day meal plan from your saved recipes, with meal locking during regeneration, progress tracking, and export/import for backups.',
    technologies: ['React Native', 'TypeScript', 'AsyncStorage'],
    metrics: [
      { value: '7-DAY', label: 'plans' },
      { value: 'IOS+ANDROID', label: 'platforms' },
    ],
    image: '/projects/mealplanner.jpeg',
    link: 'https://github.com/alesfer001/MealPlanner',
  },
];

const lampClass = { on: 'lamp--on', amber: 'lamp--amber', off: 'lamp--off' };

const CasePanel = ({ project, onClose }) => {
  const handleContact = () => {
    trackProjectInterest(project.title, 'contact_click');
    onClose();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div className="grid gap-10 border-b border-rule bg-[var(--housing)] px-4 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:px-12">
        <div>
          <div className="flex items-center gap-4">
            <span className="mono-label">{project.kind}</span>
            <span className="mono-label">Service {project.code}</span>
          </div>

          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-ash">
            {project.description}
          </p>

          <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="font-mono-data text-2xl font-bold tabular-nums text-amber">
                  {m.value}
                </dt>
                <dd className="mono-label mt-1.5">{m.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Visit <ArrowUpRight size={15} />
              </a>
            )}
            <button onClick={handleContact} className="btn-secondary">
              Ask about this
            </button>
            <button
              onClick={onClose}
              aria-label="Close panel"
              className="mono-label inline-flex items-center gap-1.5 px-3 py-3 transition-colors hover:text-amber"
            >
              <X size={14} /> Close
            </button>
          </div>
        </div>

        {project.image && (
          <div className={project.portrait ? 'flex justify-end gap-4' : 'flex justify-end'}>
            <figure
              className={`overflow-hidden border border-rule bg-[var(--void)] ${
                project.portrait ? 'max-h-[30rem]' : 'max-w-full'
              }`}
            >
              <img
                src={project.image}
                alt={project.imageAlt || `${project.title} interface`}
                loading="lazy"
                className={project.portrait ? 'h-full w-auto object-contain' : 'h-auto w-full'}
              />
            </figure>
            {project.secondaryImage && (
              <figure className="hidden max-h-[30rem] overflow-hidden border border-rule bg-[var(--void)] sm:block">
                <img
                  src={project.secondaryImage}
                  alt={project.secondaryImageAlt}
                  loading="lazy"
                  className="h-full w-auto object-contain"
                />
              </figure>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const projectShape = PropTypes.shape({
  code: PropTypes.string,
  title: PropTypes.string.isRequired,
  service: PropTypes.string,
  status: PropTypes.string,
  lamp: PropTypes.oneOf(['on', 'amber', 'off']),
  year: PropTypes.string,
  kind: PropTypes.string,
  tagline: PropTypes.string,
  description: PropTypes.string,
  technologies: PropTypes.arrayOf(PropTypes.string),
  metrics: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ),
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  secondaryImage: PropTypes.string,
  secondaryImageAlt: PropTypes.string,
  portrait: PropTypes.bool,
  link: PropTypes.string,
});

CasePanel.propTypes = {
  project: projectShape.isRequired,
  onClose: PropTypes.func.isRequired,
};

const DepartureRow = ({ project, isOpen, onToggle, flip, index }) => {
  const { setCursorVariant } = useCursor();

  return (
    <div className={isOpen ? 'bg-[var(--housing)]' : ''}>
      <button
        type="button"
        onClick={() => onToggle(project.title)}
        aria-expanded={isOpen}
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
        className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 border-b border-rule px-4 py-5 text-left transition-colors hover:bg-[var(--housing)] sm:px-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.5fr)_9rem_5rem] lg:px-12"
      >
        <span className="min-w-0">
          <SplitFlap
            text={project.title}
            active={flip}
            cascadeMs={22}
            minSteps={4}
            className="text-[4.6vw] leading-none sm:text-[2.4vw] lg:text-[1.9vw]"
          />
          <span className="mt-2 block text-sm text-ash lg:hidden">{project.tagline}</span>
        </span>

        <span className="mono-data hidden text-xs tracking-wider text-ash lg:block">
          {project.service}
        </span>

        <span className="mono-data hidden items-center gap-2 text-xs tracking-wider text-ash lg:flex">
          <span className={`lamp ${lampClass[project.lamp]}`} />
          {project.status}
        </span>

        <span className="mono-data text-right text-xs tabular-nums text-ash-dim">
          {String(index + 1).padStart(2, '0')} / {project.year}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && <CasePanel project={project} onClose={() => onToggle(project.title)} />}
      </AnimatePresence>
    </div>
  );
};

DepartureRow.propTypes = {
  project: projectShape.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  flip: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

const Projects = () => {
  const [openRow, setOpenRow] = useState(null);
  const [boardRef, boardSeen] = useInViewOnce();

  const handleToggle = (title) => setOpenRow((cur) => (cur === title ? null : title));
  const running = projects.filter((p) => p.lamp !== 'off').length;

  return (
    <section id="projects" ref={boardRef} className="relative py-24 sm:py-32">
      {/* Masthead */}
      <div className="bleed">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule-strong pb-6">
          <SplitFlap
            text="DEPARTURES"
            active={boardSeen}
            className="text-[9vw] leading-none sm:text-[6vw] lg:text-[4.6vw]"
          />
          <p className="mono-label max-w-[30ch] leading-relaxed">
            {projects.length} services · {running} still running
            <br />
            Select a row to open it
          </p>
        </div>

        {/* Column captions */}
        <div className="mono-label grid grid-cols-[1fr_auto] gap-4 py-3 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.5fr)_9rem_5rem]">
          <span>Destination</span>
          <span className="hidden lg:block">Service</span>
          <span className="hidden lg:block">Status</span>
          <span className="text-right">No / Year</span>
        </div>
      </div>

      {/* Rows run edge to edge */}
      <div className="border-t border-rule">
        {projects.map((project, i) => (
          <DepartureRow
            key={project.title}
            project={project}
            index={i}
            flip={boardSeen}
            isOpen={openRow === project.title}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
