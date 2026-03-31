'use client';

import React, { useSyncExternalStore } from 'react';
import { useWheelScrollSpy } from '../utils/useWheelScrollSpy';

const noop = () => () => {};
const getTrue = () => true;
const getFalse = () => false;

export type NavItem = {
  hash?: string;
  label: string;
  href: string;
  download?: string;
};

const NAV_ITEMS: NavItem[] = [
  { hash: 'about', label: 'About', href: '#about' },
  { hash: 'work', label: 'Work', href: '#watchtower' },
  { hash: 'contact', label: 'Contact', href: '#contact' },
  {
    label: 'Resume',
    href: 'rick-mole-resume.pdf',
    download: 'rick-mole-resume.pdf',
  },
];

// All section IDs that the scroll spy should track
const SCROLL_SPY_ITEMS = [
  { hash: 'about' },
  { hash: 'watchtower' },
  { hash: 'default' },
  { hash: 'hightouch' },
  { hash: 'tapestry' },
  { hash: 'contact' },
];

// Map work section hashes to the "work" nav item
const WORK_SECTIONS = new Set(['watchtower', 'default', 'hightouch', 'tapestry']);

/** Splits text into per-character rolling spans with stagger CSS vars */
function RollingText({ text }: { text: string }) {
  const chars = text.split('');
  const total = chars.length - 1;

  return (
    <>
      {chars.map((char, i) => (
        <span
          key={i}
          className="roll"
          style={{ '--i': i, '--total': total } as React.CSSProperties}
        >
          <span className="roll__char" data-char={char === ' ' ? '\u00A0' : char}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </>
  );
}

export function HeaderNav() {
  const mounted = useSyncExternalStore(noop, getTrue, getFalse);
  const active = useWheelScrollSpy({ items: SCROLL_SPY_ITEMS });

  if (!mounted) return null;

  // Map the active section to the corresponding nav item
  const activeNavHash = active && WORK_SECTIONS.has(active) ? 'work' : active;

  return (
    <nav className="nav">
      <a href="#" className="nav__logo">
        <RollingText text="Rick Molé" />
      </a>
      <ul className="nav__links">
        {NAV_ITEMS.map((item) => {
          const isActive = item.hash && activeNavHash === item.hash;
          const isResume = item.download;

          return (
            <li key={item.label}>
              <a
                href={item.href}
                download={item.download}
                className={`nav__link ${isActive ? 'nav__link--active' : ''} ${
                  isResume ? 'nav__link--resume' : ''
                }`}
              >
                {isResume ? (
                  <span>{item.label}</span>
                ) : (
                  <RollingText text={item.label} />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
