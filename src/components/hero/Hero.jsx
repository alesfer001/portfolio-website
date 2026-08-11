import { useEffect, useState } from 'react';
import { ArrowDown, Download } from 'lucide-react';
import { trackResumeDownload } from '../../utils/analytics';
import { useCursor } from '../cursor';
import { SplitFlap } from '../flap';

/*
 * The board on arrival.
 *
 * Nothing here is decoration: the headline flips into place the way a Solari
 * board resolves, and the departures strip below is the real state of the work.
 */

const departures = [
  { name: 'EMENUCHOICE', gate: 'DINING OPS', status: 'BOARDING', year: '2025', lamp: 'on' },
  { name: 'KATA', gate: 'AI COACHING', status: 'BOARDING', year: '2025', lamp: 'on' },
  { name: 'CKB KICKSTARTER', gate: 'ON-CHAIN', status: 'ON TIME', year: '2025', lamp: 'on' },
  { name: 'PLAYWALKTHROUGH', gate: 'OFFLINE VOICE', status: 'ON TIME', year: '2026', lamp: 'on' },
  { name: 'SHIN', gate: 'ALEPHIUM DEX', status: 'DELAYED', year: '2023', lamp: 'amber' },
];

const lampClass = { on: 'lamp--on', amber: 'lamp--amber', off: 'lamp--off' };

const Hero = () => {
  const { setCursorVariant } = useCursor();
  const [stage, setStage] = useState(0);

  // Choreographed arrival: each line of the board resolves in turn.
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 180),
      setTimeout(() => setStage(2), 1100),
      setTimeout(() => setStage(3), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResumeDownload = () => {
    trackResumeDownload();
    window.open(import.meta.env.VITE_RESUME_URL || '/resume.pdf', '_blank');
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-28 sm:pt-32">
      <div className="bleed">
        {/* Board header strip */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-rule pb-4">
          <span className="mono-label">Ayoub Lesfer · Senior full-stack</span>
          <span className="mono-label">Bordeaux, France · CET · Available</span>
        </div>

        {/* The statement, in flaps */}
        <div className="pt-10 sm:pt-14">
          <SplitFlap
            text="I BUILD"
            active={stage >= 1}
            className="text-[13vw] leading-none sm:text-[11vw] lg:text-[9.5vw]"
          />
          <SplitFlap
            text="SYSTEMS THAT"
            active={stage >= 2}
            className="mt-[0.12em] text-[13vw] leading-none sm:text-[11vw] lg:text-[9.5vw]"
          />
          <SplitFlap
            text="KEEP TRACK"
            active={stage >= 3}
            className="mt-[0.12em] text-[13vw] leading-none sm:text-[11vw] lg:text-[9.5vw]"
          />
        </div>

        {/* Reading line + actions */}
        <div className="mt-12 grid gap-8 border-t border-rule pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <p className="max-w-[58ch] text-base leading-relaxed text-ash sm:text-lg">
            Six years of production software: dining operations for hundreds of care communities,
            job dispatch that survives losing signal, crowdfunding escrow enforced on-chain.
            Backend-heavy, full-stack when it needs to be.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToSection('#projects')}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              className="btn-primary"
            >
              Departures
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              className="btn-secondary"
            >
              Contact
            </button>
            <button
              onClick={handleResumeDownload}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              className="mono-data inline-flex items-center gap-2 px-3 py-3 text-xs tracking-widest text-ash transition-colors hover:text-amber"
            >
              <Download size={15} />
              Résumé
            </button>
          </div>
        </div>

        {/* Departures strip */}
        <div className="mt-16 pb-24">
          <div className="mono-label grid grid-cols-[1fr_auto] gap-4 border-b border-rule-strong pb-3 sm:grid-cols-[minmax(0,2.2fr)_minmax(0,1.4fr)_8rem_5rem]">
            <span>Destination</span>
            <span className="hidden sm:block">Service</span>
            <span className="hidden sm:block">Status</span>
            <span className="text-right">Year</span>
          </div>

          {departures.map((d) => (
            <div
              key={d.name}
              className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-rule py-4 sm:grid-cols-[minmax(0,2.2fr)_minmax(0,1.4fr)_8rem_5rem]"
            >
              <SplitFlap
                text={d.name}
                active={stage >= 3}
                cascadeMs={26}
                minSteps={4}
                className="text-[3.4vw] leading-none sm:text-base lg:text-lg"
              />
              <span className="mono-data hidden text-xs text-ash sm:block">{d.gate}</span>
              <span className="mono-data hidden items-center gap-2 text-xs text-ash sm:flex">
                <span className={`lamp ${lampClass[d.lamp]}`} />
                {d.status}
              </span>
              <span className="mono-data text-right text-xs text-ash-dim">{d.year}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scrollToSection('#projects')}
        aria-label="Scroll to work"
        className="mono-label absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 transition-colors hover:text-amber sm:flex"
      >
        Scroll <ArrowDown size={14} />
      </button>
    </section>
  );
};

export default Hero;
