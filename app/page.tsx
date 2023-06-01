'use client';

import {
  HeaderNav,
  Hero,
  About,
  RecentWork,
  OtherProjects,
  Contact,
} from './components';
import { ThemeProvider, createTheme, Divider } from '@mui/material';
import { siteTheme } from './site-theme';

const CustomDivider = () => <Divider light sx={{ mx: '15%' }} />;

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
