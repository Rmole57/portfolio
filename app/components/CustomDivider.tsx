import { motion } from 'framer-motion';
import { Box } from '@mui/material';

export default function CustomDivider() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 2, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay: 2, duration: 0.02 },
      },
    },
  };

  return (
    <Box display="flex" justifyContent="center" height="1px">
      <motion.svg
        initial="hidden"
        animate="visible"
        width="100%"
        style={{ margin: '0 20%' }}
      >
        <motion.line
          x1="0"
          x2="100%"
          stroke="#E0E0E0"
          strokeWidth={2}
          variants={draw}
        />
      </motion.svg>
    </Box>
  );
}
