'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import profilePic from '../../public/rick-mole.jpg';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <Box
      id="about"
      component="section"
      display="flex"
      margin="56px 100px"
      gap={6}
    >
      <Image
        src={profilePic}
        alt="Rick Molé"
        width={500}
        height={300}
        style={{
          borderRadius: '4px',
          boxShadow: '0 0 4px gray',
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h2">About me</Typography>
          <Typography variant="body2">
            I&apos;m a full stack software engineer based in New York, NY. I
            have multiple years of experience using a variety of technologies
            across the development stack. As a firm believer in the notion that
            there is no &quot;one size fits all&quot; solution, I enjoy learning
            and working with new technologies to find the best fit for the task
            at hand.
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
}
