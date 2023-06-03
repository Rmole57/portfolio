import React from 'react';
import { Box, Grid, Popover, Typography } from '@mui/material';
import Image from 'next/image';
import { LargeProject } from './recent-work';
import reactionImage from '../../public/reaction.png';
import messageBucketImage from '../../public/messagebucket.png';
import dijkstraImage from '../../public/dijkstra.png';
import todoListImage from '../../public/todo-list.png';
import { motion } from 'framer-motion';

type SmallProject = Omit<LargeProject, 'ctaText' | 'ctaLink'> & {
  tech: string;
};

const PROJECTS: SmallProject[] = [
  {
    title: 'Reaction',
    description: 'Kanban-style, list-making application inspired by Trello.',
    imageSrc: reactionImage,
    imageAlt: 'Reaction application',
    tech: 'React Redux, Node.js/Express, MongoDB',
  },
  {
    title: 'MessageBucket',
    description:
      'Database-backed application for receiving and debugging webhooks.',
    imageSrc: messageBucketImage,
    imageAlt: 'MessageBucket application',
    tech: 'Node.js, PostgreSQL',
  },
  {
    title: "Dijkstra's Trip",
    description:
      "Airline routing application leveraging Dijkstra's algorithm to find the shortest path.",
    imageSrc: dijkstraImage,
    imageAlt: "Dijkstra's Trip application",
    tech: 'Node.js, React',
  },
  {
    title: 'TodoList',
    description: 'Application to create and manage todo lists.',
    imageSrc: todoListImage,
    imageAlt: 'TodoList application',
    tech: 'Node.js, Express, Javascript, Handlebars, HTML, CSS',
  },
];

export default function OtherProjects() {
  return (
    <Box
      id="projects"
      component="section"
      display="flex"
      flexDirection="column"
      margin="56px 100px"
      gap={4}
    >
      <Typography variant="h2">Other projects</Typography>
      <Grid container spacing={4}>
        {PROJECTS.map((project, idx) => {
          const { title } = project;

          return (
            <Grid item key={`project-${idx}-${title}`}>
              <Project {...project} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

function Project({ title, description, imageSrc, imageAlt, tech }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    document.addEventListener('scroll', handlePopoverClose);
  }, []);

  const open = Boolean(anchorEl);

  console.log(anchorEl);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.25 }}
      viewport={{ once: true }}
    >
      <Image
        className="project"
        src={imageSrc}
        alt={imageAlt}
        width={340}
        height={220}
        style={{ borderRadius: '4px', boxShadow: '0 0 4px gray' }}
        onMouseOver={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        sx={{
          pointerEvents: 'none',
        }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        disableScrollLock
      >
        <Box
          display="flex"
          flexDirection="column"
          sx={{ padding: '16px', justifyContent: 'space-between' }}
          width={280}
          height={160}
        >
          <Typography className="popover" variant="popoverTitle">
            {title}
          </Typography>
          <Typography className="popover" variant="popoverContent">
            {description}
          </Typography>
          <Typography className="popover" variant="popoverSubContent">
            Built with: {tech}
          </Typography>
        </Box>
      </Popover>
    </motion.div>
  );
}
