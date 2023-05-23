import { Box, Link, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

export default function Contact() {
  return (
    <Box
      id="contact"
      display="flex"
      component="section"
      justifyContent="center"
      margin="24px 100px"
      gap={14}
    >
      <Link href="mailto:hello@rickmole.dev">
        <EmailIcon />
      </Link>
      <Link href="https://www.linkedin.com/in/rick-mole/" target="_blank">
        <LinkedInIcon />
      </Link>
      <Link href="https://github.com/Rmole57" target="_blank">
        <GitHubIcon />
      </Link>
    </Box>
  );
}
