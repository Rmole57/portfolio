'use client';

import { useEffect } from 'react';

export function useHashUpdate() {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id && id !== 'hero') {
              history.replaceState(null, '', `#${id}`);
            } else if (id === 'hero') {
              history.replaceState(null, '', window.location.pathname);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
}
