'use client';

import { Box, Typography } from '@mui/material';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';

export default function Hero() {
  return (
    <Box
      id="hero"
      margin="56px 100px"
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Typography variant="h1">
        Hi, I&apos;m Rick
        <WavingHandOutlinedIcon
          fontSize="inherit"
          sx={{ ml: 2, color: '#23C0AD' }}
        />
      </Typography>
      <Typography variant="body1">
        I used to tell stories through film, now I tell them through code. And
        I&apos;d love to help you tell yours.
      </Typography>
    </Box>
  );
}
