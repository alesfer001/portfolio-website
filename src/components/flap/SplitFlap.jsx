import { useEffect, useRef, useState, memo } from 'react';
import PropTypes from 'prop-types';

/*
 * Split-flap display.
 *
 * Each cell steps through the charset one glyph at a time until it lands on its
 * target, with a leaf that physically falls across the seam on every step. One
 * rAF loop drives every cell on the page, never a timer per cell.
 */

// Solari-ish ordering: blank first, then letters, digits, punctuation.
export const CHARSET = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:/&+-·';

const STEP_MS = 62;
const CASCADE_MS = 34;

const normalise = (text) => text.toUpperCase().split('');

const Cell = memo(({ char, step }) => (
  <span className="flap-cell" aria-hidden="true">
    {/* Revealed top half: the glyph now showing */}
    <span className="flap-half flap-half--top">
      <span className="flap-glyph">{char}</span>
    </span>
    {/* Bottom half */}
    <span className="flap-half flap-half--bottom">
      <span className="flap-glyph">{char}</span>
    </span>
    {/* The falling leaf, re-keyed each step so the animation restarts */}
    {step > 0 && (
      <span key={step} className="flap-leaf">
        <span className="flap-glyph">{char}</span>
      </span>
    )}
  </span>
));
Cell.displayName = 'FlapCell';
Cell.propTypes = {
  char: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
};

const SplitFlap = ({
  text = '',
  active = true,
  className = '',
  charset = CHARSET,
  stepMs = STEP_MS,
  cascadeMs = CASCADE_MS,
  /** Extra full revolutions before landing, so short hops still feel mechanical */
  minSteps = 6,
  as: Tag = 'span',
}) => {
  const target = normalise(text);
  const [cells, setCells] = useState(() => target.map(() => ({ index: 0, step: 0 })));
  const frame = useRef();
  const state = useRef({ cells: [], startedAt: 0, done: true });

  useEffect(() => {
    const targetIndexes = target.map((ch) => {
      const i = charset.indexOf(ch);
      return i === -1 ? 0 : i;
    });

    if (!active) {
      // Park on the resolved text, used for reduced motion and pre-trigger state.
      setCells(targetIndexes.map((index) => ({ index, step: 0 })));
      return undefined;
    }

    state.current = {
      cells: targetIndexes.map((targetIndex, i) => ({
        targetIndex,
        // Start far enough back that every cell visibly travels.
        index: (targetIndex - (minSteps + (i % 5))) % charset.length,
        step: 0,
        lastStepAt: 0,
        arrived: false,
      })),
      startedAt: 0,
      done: false,
    };

    // Normalise negative modulo
    state.current.cells.forEach((c) => {
      if (c.index < 0) c.index += charset.length;
    });

    const tick = (now) => {
      const s = state.current;
      if (!s.startedAt) s.startedAt = now;
      const elapsed = now - s.startedAt;
      let changed = false;
      let allArrived = true;

      s.cells.forEach((cell, i) => {
        if (cell.arrived) return;
        allArrived = false;
        const delay = i * cascadeMs;
        if (elapsed < delay) return;

        // Time-based, not frame-based: if frames were dropped (throttled tab,
        // slow device) the cell catches up instead of crawling.
        if (!cell.lastStepAt) cell.lastStepAt = s.startedAt + delay;
        const due = Math.floor((now - cell.lastStepAt) / stepMs);
        if (due < 1) return;

        const remaining = (cell.targetIndex - cell.index + charset.length) % charset.length;
        const advance = Math.min(due, remaining || charset.length);

        cell.index = (cell.index + advance) % charset.length;
        cell.step += advance;
        cell.lastStepAt += advance * stepMs;
        changed = true;
        if (cell.index === cell.targetIndex) cell.arrived = true;
      });

      if (changed) {
        setCells(s.cells.map((c) => ({ index: c.index, step: c.step })));
      }

      if (!allArrived) {
        frame.current = requestAnimationFrame(tick);
      } else {
        s.done = true;
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, active, charset, stepMs, cascadeMs, minSteps]);

  // Group cells into words so the row only ever wraps at a space. Without this
  // each module is its own flex item and long headlines break mid-word.
  const groups = [];
  target.forEach((ch, i) => {
    if (ch === ' ') {
      groups.push({ gap: true, key: `gap-${i}` });
      return;
    }
    const last = groups[groups.length - 1];
    if (last && !last.gap) last.indices.push(i);
    else groups.push({ gap: false, key: `word-${i}`, indices: [i] });
  });

  return (
    <Tag className={`flap-row ${className}`} role="text" aria-label={text}>
      {groups.map((group) =>
        group.gap ? (
          <span key={group.key} className="flap-gap" aria-hidden="true" />
        ) : (
          <span key={group.key} className="flap-word">
            {group.indices.map((i) => (
              <Cell key={i} char={charset[cells[i]?.index] ?? ' '} step={cells[i]?.step ?? 0} />
            ))}
          </span>
        )
      )}
    </Tag>
  );
};

SplitFlap.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool,
  className: PropTypes.string,
  charset: PropTypes.string,
  stepMs: PropTypes.number,
  cascadeMs: PropTypes.number,
  minSteps: PropTypes.number,
  as: PropTypes.elementType,
};

export default SplitFlap;
