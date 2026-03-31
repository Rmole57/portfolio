'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { motion } from 'motion/react';

/* ── Light-leak configuration ──
 *  Two layers:
 *    1. Soft atmospheric washes — large, heavily blurred, colour the scene
 *    2. Bokeh discs — smaller, less blur, with a solid core that drops off
 *       at the edge to mimic real lens bokeh (see reference)
 *
 *  `core` = % of radius that stays solid before fading → creates the
 *  flat-brightness disc visible in anamorphic / vintage lens bokeh.       */
type Leak = {
  width: number;
  height: number;
  color: string;
  blur: number;
  startX: number;
  startY: number;
  speed: number;
  opacity: number;
  core?: number;
  spread?: number;
};

const LEAKS: Leak[] = [
  /* Soft atmospheric washes */
  {
    width: 600,
    height: 280,
    color: 'var(--watchtower)',
    blur: 120,
    startX: 0.75,
    startY: 0.2,
    speed: 0.6,
    opacity: 0.4,
  },
  {
    width: 500,
    height: 220,
    color: 'var(--default-co)',
    blur: 110,
    startX: 0.15,
    startY: 0.75,
    speed: 0.5,
    opacity: 0.4,
  },
  {
    width: 420,
    height: 200,
    color: 'var(--tapestry)',
    blur: 100,
    startX: 0.45,
    startY: 0.45,
    speed: 0.7,
    opacity: 0.4,
  },
  {
    width: 350,
    height: 160,
    color: '#e89268',
    blur: 90,
    startX: 0.6,
    startY: 0.7,
    speed: 0.55,
    opacity: 0.35,
  },

  /* Bokeh discs — defined circles with solid core */
  {
    width: 170,
    height: 170,
    color: 'var(--watchtower)',
    blur: 28,
    startX: 0.65,
    startY: 0.32,
    speed: 0.7,
    opacity: 0.14,
    core: 30,
    spread: 62,
  },
  {
    width: 130,
    height: 130,
    color: 'var(--default-co)',
    blur: 22,
    startX: 0.28,
    startY: 0.6,
    speed: 0.6,
    opacity: 0.12,
    core: 28,
    spread: 58,
  },
  {
    width: 110,
    height: 110,
    color: '#e89268',
    blur: 20,
    startX: 0.82,
    startY: 0.55,
    speed: 0.65,
    opacity: 0.13,
    core: 25,
    spread: 55,
  },
  {
    width: 90,
    height: 90,
    color: 'var(--tapestry)',
    blur: 18,
    startX: 0.4,
    startY: 0.72,
    speed: 0.75,
    opacity: 0.1,
    core: 25,
    spread: 52,
  },
];

/** Generates a random drift target relative to an origin point */
function randomTarget(originX: number, originY: number, range: number) {
  return {
    x: originX + (Math.random() - 0.5) * range,
    y: originY + (Math.random() - 0.5) * range,
  };
}

/** At f=1 (pointer over hero), mimic lens focus: washes sharpen more than bokeh discs */
const FOCUS_BLUR_REDUCE_WASH = 0.44;
const FOCUS_BLUR_REDUCE_BOKEH = 0.26;
const FOCUS_BLEND_SPEED = 0.085;
/** Idle drift: higher = faster lerp toward random targets (original was 0.003 * speed) */
const DRIFT_LERP_PER_SPEED = 0.0095;
/** Degrees per frame @ ~60fps when idle (~0.09 → ~5.4°/s). Hover uses 0.15 (~9°/s). */
const IDLE_ROTATION_STEP = 0.09;

/** Match --nav-height; keep cue hidden before it can overlap fixed nav */
const NAV_CLEARANCE_PX = 72;
/** bottom offset + label + icon — approx. top of scroll cue in viewport */
const SCROLL_CUE_OFFSET_FROM_HERO_BOTTOM = 130;

function scrollCueClearOfNav(heroRect: DOMRect) {
  if (heroRect.bottom <= 0) return false;
  const cueTop = heroRect.bottom - SCROLL_CUE_OFFSET_FROM_HERO_BOTTOM;
  return cueTop >= NAV_CLEARANCE_PX;
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollCueIntroDone = useRef(false);
  const [showScrollCue, setShowScrollCue] = useState(true);
  const leakRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const pointerInHeroRef = useRef(false);
  const focusBlendRef = useRef(0);
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

  const handlePointerEnter = useCallback(() => {
    pointerInHeroRef.current = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    pointerInHeroRef.current = false;
    mouseRef.current.active = false;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScrollOrResize = () => {
      const r = section.getBoundingClientRect();
      setShowScrollCue(scrollCueClearOfNav(r));
    };
    onScrollOrResize();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => {
      scrollCueIntroDone.current = true;
    }, 2600);
    return () => window.clearTimeout(t);
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

      const focusTarget = pointerInHeroRef.current ? 1 : 0;
      focusBlendRef.current +=
        (focusTarget - focusBlendRef.current) * FOCUS_BLEND_SPEED;
      const f = focusBlendRef.current;

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
          const driftLerp = DRIFT_LERP_PER_SPEED * leak.speed;
          pos.x += (target.x - pos.x) * driftLerp;
          pos.y += (target.y - pos.y) * driftLerp;

          // Pick a new target when close enough
          const dx = target.x - pos.x;
          const dy = target.y - pos.y;
          if (dx * dx + dy * dy < 0.0004) {
            state.targets[i] = randomTarget(
              state.origins[i].x,
              state.origins[i].y,
              0.35,
            );
          }
        }

        // Slowly rotate for organic feel
        state.rotations[i] +=
          (mouse.active ? 0.15 : IDLE_ROTATION_STEP) * (i % 2 === 0 ? 1 : -1);

        const el = leakRefs.current[i];
        if (el) {
          const px = pos.x * 100;
          const py = pos.y * 100;
          const isWash = leak.core == null;
          const blurReduce = isWash
            ? FOCUS_BLUR_REDUCE_WASH
            : FOCUS_BLUR_REDUCE_BOKEH;
          const blurPx = Math.max(0, leak.blur * (1 - f * blurReduce));
          el.style.transform = `translate(-50%, -50%) rotate(${state.rotations[i]}deg)`;
          el.style.left = `${px}%`;
          el.style.top = `${py}%`;
          el.style.filter = blurPx > 0 ? `blur(${blurPx}px)` : 'none';
        }
      }

      state.rafId = requestAnimationFrame(tick);
    }

    stateRef.current.rafId = requestAnimationFrame(tick);

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('pointerenter', handlePointerEnter);
    section.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(stateRef.current!.rafId);
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('pointerenter', handlePointerEnter);
      section.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [handleMouseMove, handlePointerEnter, handlePointerLeave]);

  return (
    <section ref={sectionRef} id="hero" className="section section--dark hero">
      {LEAKS.map((leak, i) => {
        const bg =
          leak.core != null
            ? `radial-gradient(circle, ${leak.color} ${leak.core}%, transparent ${leak.spread}%)`
            : `radial-gradient(ellipse at center, ${leak.color}, transparent 70%)`;
        return (
          <div
            key={i}
            ref={(el) => {
              leakRefs.current[i] = el;
            }}
            className="hero__leak"
            style={
              {
                '--leak-o': leak.opacity,
                width: leak.width,
                height: leak.height,
                background: bg,
                filter: `blur(${leak.blur}px)`,
                left: `${leak.startX * 100}%`,
                top: `${leak.startY * 100}%`,
              } as React.CSSProperties
            }
          />
        );
      })}

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
        className={`hero__scroll-indicator ${!showScrollCue ? 'hero__scroll-indicator--hidden' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollCue ? 1 : 0 }}
        transition={{
          duration: showScrollCue ? 0.5 : 0.2,
          delay: showScrollCue && !scrollCueIntroDone.current ? 1.5 : 0,
        }}
        aria-hidden={!showScrollCue}
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
