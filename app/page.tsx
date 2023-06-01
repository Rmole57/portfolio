'use client';

import {
  HeaderNav,
  Hero,
  About,
  RecentWork,
  OtherProjects,
  Contact,
  CustomDivider,
} from './components';
import { ThemeProvider, createTheme } from '@mui/material';
import { siteTheme } from './site-theme';

export default function Home() {
  // @ts-ignore
  const theme = createTheme(siteTheme);

  return (
    <ThemeProvider theme={theme}>
      <HeaderNav />
      <Hero />
      <CustomDivider />
      <About />
      <CustomDivider />
      <RecentWork />
      <CustomDivider />
      <OtherProjects />
      <CustomDivider />
      <Contact />
    </ThemeProvider>
  );
}
