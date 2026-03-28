import { Box, Link, LinkBaseProps } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { motion } from 'framer-motion';
import { FC } from 'react';

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
      <ContactLink href="mailto:hello@rickmole.dev">
        <EmailIcon />
      </ContactLink>
      <ContactLink
        href="https://www.linkedin.com/in/rick-mole/"
        target="_blank"
      >
        <LinkedInIcon />
      </ContactLink>
      <ContactLink href="https://github.com/Rmole57" target="_blank">
        <GitHubIcon />
      </ContactLink>
    </Box>
  );
}

interface ContactLinkProps extends LinkBaseProps {
  children: React.ReactNode;
}

const ContactLink: FC<ContactLinkProps> = ({ href, children }) => {
  return (
    <motion.div whileHover={{ scale: 1.5 }}>
      <Link href={href}>{children}</Link>
    </motion.div>
  );
};
