'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

/* ── Light-leak configuration ── */
const LEAKS = [
  { width: 600, height: 280, color: 'var(--watchtower)', blur: 120, startX: 0.75, startY: 0.2, speed: 0.6 },
  { width: 500, height: 220, color: 'var(--default-co)', blur: 110, startX: 0.15, startY: 0.75, speed: 0.5 },
  { width: 420, height: 200, color: 'var(--tapestry)',   blur: 100, startX: 0.45, startY: 0.45, speed: 0.7 },
  { width: 350, height: 160, color: '#e8926880',         blur: 90,  startX: 0.6,  startY: 0.7,  speed: 0.55 },
];

/** Generates a random drift target relative to an origin point */
function randomTarget(originX: number, originY: number, range: number) {
  return {
    x: originX + (Math.random() - 0.5) * range,
    y: originY + (Math.random() - 0.5) * range,
  };
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leakRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const stateRef = useRef<{
    positions: { x: number; y: number }[];
    targets: { x: number; y: number }[];
    origins: { x: number; y: number }[];
    rotations: number[];
    rafId: number;
  } | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    mouseRef.current.x = (e.clientX - rect.left) / rect.width;
    mouseRef.current.y = (e.clientY - rect.top) / rect.height;
    mouseRef.current.active = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const origins = LEAKS.map((l) => ({ x: l.startX, y: l.startY }));
    const positions = origins.map((o) => ({ ...o }));
    const targets = origins.map((o) => randomTarget(o.x, o.y, 0.3));
    const rotations = LEAKS.map(() => Math.random() * 30 - 15);

    stateRef.current = { positions, targets, origins, rotations, rafId: 0 };

    function tick() {
      const state = stateRef.current!;
      const mouse = mouseRef.current;

      for (let i = 0; i < LEAKS.length; i++) {
        const pos = state.positions[i];
        const leak = LEAKS[i];

        if (mouse.active) {
          // Lerp toward cursor with per-leak speed variation
          const lerpFactor = 0.02 + leak.speed * 0.03;
          // Each leak offsets slightly from cursor so they don't stack
          const offsetX = (i - LEAKS.length / 2) * 0.08;
          const offsetY = (i % 2 === 0 ? -1 : 1) * 0.06;
          pos.x += (mouse.x + offsetX - pos.x) * lerpFactor;
          pos.y += (mouse.y + offsetY - pos.y) * lerpFactor;
        } else {
          // Drift toward random target
          const target = state.targets[i];
          const driftLerp = 0.003 * leak.speed;
          pos.x += (target.x - pos.x) * driftLerp;
          pos.y += (target.y - pos.y) * driftLerp;

          // Pick a new target when close enough
          const dx = target.x - pos.x;
          const dy = target.y - pos.y;
          if (dx * dx + dy * dy < 0.0004) {
            state.targets[i] = randomTarget(state.origins[i].x, state.origins[i].y, 0.35);
          }
        }

        // Slowly rotate for organic feel
        state.rotations[i] += (mouse.active ? 0.15 : 0.05) * (i % 2 === 0 ? 1 : -1);

        const el = leakRefs.current[i];
        if (el) {
          const px = pos.x * 100;
          const py = pos.y * 100;
          el.style.transform = `translate(-50%, -50%) rotate(${state.rotations[i]}deg)`;
          el.style.left = `${px}%`;
          el.style.top = `${py}%`;
        }
      }

      state.rafId = requestAnimationFrame(tick);
    }

    stateRef.current.rafId = requestAnimationFrame(tick);

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(stateRef.current!.rafId);
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <section ref={sectionRef} id="hero" className="section section--dark hero">
      {LEAKS.map((leak, i) => (
        <div
          key={i}
          ref={(el) => { leakRefs.current[i] = el; }}
          className="hero__leak"
          style={{
            width: leak.width,
            height: leak.height,
            background: `radial-gradient(ellipse at center, ${leak.color}, transparent 70%)`,
            filter: `blur(${leak.blur}px)`,
            left: `${leak.startX * 100}%`,
            top: `${leak.startY * 100}%`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1 className="hero__name">Rick Molé</h1>
      </motion.div>

      <motion.p
        className="hero__role"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        Frontend Engineer
      </motion.p>

      <motion.p
        className="hero__tagline"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        Building complex product interfaces, developer tooling, and
        AI&#8209;powered workflows that turn data insights into automated
        action.
      </motion.p>

      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span>Scroll</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M8 3v10M3 9l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  );
}
