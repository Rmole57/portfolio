'use client';

import Image from 'next/image';
import profilePic from '../../public/rick-mole.jpg';
import { motion } from 'motion/react';

const TECH_STACK = [
  'TypeScript',
  'React',
  'Next.js',
  'Redux',
  'React Flow',
  'Node.js',
  'tRPC',
  'GraphQL',
  'PostgreSQL',
  'AWS',
  'Docker',
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
};

export function AboutSection() {
  return (
    <section id="about" className="section section--light about">
      <div className="section__inner">
        <div className="about__grid">
          <motion.div
            className="about__photo-wrapper"
            {...fadeUp}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={profilePic}
              alt="Rick Molé"
              width={300}
              height={380}
              className="about__photo"
              priority
            />
          </motion.div>

          <div className="about__content">
            <motion.span
              className="about__label"
              {...fadeUp}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              About
            </motion.span>

            <motion.h2
              className="about__heading"
              {...fadeUp}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              Formerly behind
              <br />
              the camera. Now
              <br />
              behind the code.
            </motion.h2>

            <motion.p
              className="about__bio"
              {...fadeUp}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              I started my career in film &mdash; framing shots, cutting
              sequences, and obsessing over how stories feel when they land.
              Somewhere along the way I realized the same instincts that made a
              scene work also made an interface work: pacing, clarity, knowing
              what to leave out. So I made the jump. Today I&apos;m a senior
              frontend engineer in New York building complex product interfaces,
              from 0&#8209;to&#8209;1 architecture at production scale. The
              medium changed, but the craft didn&apos;t.
            </motion.p>

            <motion.div
              className="about__tech"
              {...fadeUp}
              transition={{
                duration: 0.7,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {TECH_STACK.map((tech) => (
                <span key={tech} className="about__tech-pill">
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
