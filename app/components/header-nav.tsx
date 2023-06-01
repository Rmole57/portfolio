'use client';

import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';

type NavItem = {
  label: string;
  href: string;
  download?: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
  {
    label: 'Resume',
    href: 'rick-mole-resume.pdf',
    download: 'rick-mole-resume.pdf',
  },
];

export default function HeaderNav() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
        <Tabs value={value} onChange={handleChange}>
          {NAV_ITEMS.map((navItem, idx) => (
            <Tab component="a" key={`${navItem.label}-${idx}`} {...navItem} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
