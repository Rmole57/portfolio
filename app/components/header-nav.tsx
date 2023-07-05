'use client';

import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import useWheelScrollSpy from '../utils/useWheelScrollSpy';
import _findIndex from 'lodash/findIndex';

export type NavItem = {
  hash?: string;
  label: string;
  href: string;
  download?: string;
};

const NAV_ITEMS: NavItem[] = [
  { hash: 'about', label: 'About', href: '#about' },
  { hash: 'work', label: 'Work', href: '#work' },
  { hash: 'projects', label: 'Projects', href: '#projects' },
  { hash: 'contact', label: 'Contact', href: '#contact' },
  {
    label: 'Resume',
    href: 'rick-mole-resume.pdf',
    download: 'rick-mole-resume.pdf',
  },
];

export default function HeaderNav() {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const active = useWheelScrollSpy({
    items: NAV_ITEMS.filter((item) => item.hash),
  });

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveIndex(newValue);
  };

  useEffect(() => {
    setActiveIndex(active ? _findIndex(NAV_ITEMS, ['hash', active]) : 0);
  }, [active]);

  return (
    <Box
      component="nav"
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        backgroundColor: '#fff',
      }}
      height="48px"
      position="sticky"
      top={0}
      zIndex={1}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', px: '100px' }}
      >
        <Typography
          href="#"
          component="a"
          variant="button"
          display="flex"
          alignItems="center"
          color="#666666"
          style={{ textDecoration: 'none' }}
        >
          Rick Molé
        </Typography>
        <Tabs value={activeIndex} onChange={handleChange}>
          {NAV_ITEMS.map((navItem, idx) => (
            <Tab component="a" key={`${navItem.label}-${idx}`} {...navItem} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
