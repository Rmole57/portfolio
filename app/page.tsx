'use client';

import { HeaderNav, Hero, About, Projects, Contact } from './components';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box>
      <HeaderNav />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </Box>
  );
}
