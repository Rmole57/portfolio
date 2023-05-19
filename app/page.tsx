'use client';

import {
  HeaderNav,
  Hero,
  About,
  RecentWork,
  OtherProjects,
  Contact,
} from './components';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box>
      <HeaderNav />
      <Hero />
      <About />
      <RecentWork />
      <OtherProjects />
      <Contact />
    </Box>
  );
}
