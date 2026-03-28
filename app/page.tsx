'use client';

import HeaderNav from './components/HeaderNav';
import Hero from './components/Hero';
import About from './components/About';
import RecentWork from './components/RecentWork';
import OtherProjects from './components/OtherProjects';
import Contact from './components/Contact';
import CustomDivider from './components/CustomDivider';
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
