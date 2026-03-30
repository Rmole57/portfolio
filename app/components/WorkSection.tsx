'use client';

import { motion, type Variants } from 'motion/react';

export interface WorkSectionProps {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  accentColor: string;
  url: string;
  urlLabel: string;
  variant: 'light' | 'dark';
  logoSrc: string;
  logoInvert?: boolean;
  align?: 'left' | 'right';
}

/* Shared easing */
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* Shared viewport config — track on parent elements only */
const VP = { once: true, margin: '-8%' as const };

/** Characters rise up from behind a clip mask */
const riseVariants = {
  parent: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.04, delayChildren: 0.1 },
    },
  } satisfies Variants,
  child: {
    hidden: { y: '110%' },
    visible: {
      y: '0%',
      transition: { duration: 0.6, ease: EASE_OUT_EXPO },
    },
  } satisfies Variants,
};

/* Simple fade-up used for body content */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VP,
  transition: { delay, duration: 0.65, ease: EASE_SMOOTH },
});

export function WorkSection({
  id,
  company,
  role,
  period,
  description,
  accentColor,
  url,
  urlLabel,
  variant,
  logoSrc,
  logoInvert,
  align = 'left',
}: WorkSectionProps) {
  const isDark = variant === 'dark';
  const isRight = align === 'right';
  const alignClass = isRight ? 'work__inner--right' : 'work__inner--left';
  const originSide = isRight ? 'right' : 'left';

  return (
    <section
      id={id}
      className={`section ${isDark ? 'section--dark' : 'section--light'} work`}
    >
      <div
        className={`work__orb ${isRight ? 'work__orb--left' : 'work__orb--right'}`}
        style={{ background: accentColor }}
      />

      <div className={`work__inner ${alignClass}`}>
        <motion.div {...fadeUp(0)}>
          <WorkLogo src={logoSrc} alt={company} invert={logoInvert} />
        </motion.div>

        <AnimatedTitle
          text={company}
          variants={riseVariants}
          isDark={isDark}
        />

        <motion.div
          className="work__accent-line"
          style={{ background: accentColor, transformOrigin: originSide }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VP}
          transition={{ delay: 0.45, duration: 0.8, ease: EASE_OUT_EXPO }}
        />

        <motion.div {...fadeUp(0.55)}>
          <WorkMeta role={role} period={period} variant={variant} />
        </motion.div>

        <motion.p
          className={`work__description work__description--${isDark ? 'dark' : 'light'}`}
          {...fadeUp(0.7)}
        >
          {description}
        </motion.p>

        <motion.div {...fadeUp(0.85)}>
          <WorkLink url={url} label={urlLabel} variant={variant} />
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedTitle({
  text,
  variants,
  isDark,
}: {
  text: string;
  variants: { parent: Variants; child: Variants };
  isDark: boolean;
}) {
  const chars = text.split('');

  return (
    <motion.h2
      className="work__company"
      style={{
        color: isDark ? 'var(--text-on-dark)' : 'var(--text-primary)',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={VP}
      variants={variants.parent}
    >
      {chars.map((char, i) => (
        <span key={`${char}-${i}`} className="rise-clip">
          <motion.span className="rise-char" variants={variants.child}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

function WorkLogo({
  src,
  alt,
  invert,
}: {
  src: string;
  alt: string;
  invert?: boolean;
}) {
  return (
    <div className="work__logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${alt} logo`}
        className="work__logo-img"
        style={invert ? { filter: 'brightness(0) invert(1)' } : undefined}
      />
    </div>
  );
}

function WorkMeta({
  role,
  period,
  variant,
}: {
  role: string;
  period: string;
  variant: 'light' | 'dark';
}) {
  const isDark = variant === 'dark';
  return (
    <div className="work__meta">
      <span
        className="work__role"
        style={{ color: isDark ? 'var(--text-on-dark)' : 'var(--text-primary)' }}
      >
        {role}
      </span>
      <span className={`work__separator work__separator--${isDark ? 'dark' : 'light'}`} />
      <span
        className="work__period"
        style={{
          color: isDark ? 'var(--text-on-dark-secondary)' : 'var(--text-secondary)',
        }}
      >
        {period}
      </span>
    </div>
  );
}

function WorkLink({
  url,
  label,
  variant,
}: {
  url: string;
  label: string;
  variant: 'light' | 'dark';
}) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`work__link work__link--${variant === 'dark' ? 'dark' : 'light'}`}
      whileHover={{ y: -2 }}
    >
      {label}
      <span className="work__link-arrow">&rarr;</span>
    </motion.a>
  );
}
