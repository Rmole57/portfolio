'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import profilePic from '../../public/rick-mole.jpg';

export default function About() {
  return (
    <Box display="flex" margin="56px 100px" gap={6}>
      <Image src={profilePic} alt="Rick Molé" width={500} height={300} />
      <Box>
        <Typography variant="h3">More about me</Typography>
        <Typography variant="body1">
          I&apos;m a software engineer based in New York, NY. I have multiple
          years of experience using a variety of technologies across the
          development stack. As a firm believer in the notion that there is no
          &quot;one size fits all&quot; solution, I enjoy learning and working
          with new technologies to find the best fit for the task at hand.
        </Typography>
      </Box>
    </Box>
  );
}
