import React from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import tapestryImage from '../../public/tapestry-ui.png';
import hightouchSiteImage from '../../public/hightouch-ui.png';
import { motion } from 'framer-motion';

export type LargeProject = {
  title: string;
  description: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  ctaText: string;
  ctaLink: string;
};

const PROJECTS: LargeProject[] = [
  {
    title: 'Hightouch',
    description:
      'Hightouch is the leading Reverse ETL platform. Hightouch empowers data and marketing teams to seamlessly build pipelines between data warehouses and SaaS tools within minutes.',
    imageSrc: hightouchSiteImage,
    imageAlt: 'Hightouch website and application',
    ctaText: 'Visit the website',
    ctaLink: 'https://hightouch.com/',
  },
  {
    title: 'Tapestry',
    description:
      'Tapestry is an open-source data pipeline orchestration tool that automates the entire deployment of an end-to-end data pipeline, including both data ingestion and activation components hosted on AWS. With Tapestry, your data pipeline will be automatically deployed and ready to ingest data from all of your third-party SaaS tools, store and transform that data in your data warehouse, and sync that data back into your tools for immediate use.',
    imageSrc: tapestryImage,
    imageAlt: 'Image of Tapestry application on a laptop',
    ctaText: 'Read the case study',
    ctaLink: 'https://tapestry-pipeline.github.io/',
  },
];

export default function RecentWork() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
    >
      <Box
        id="work"
        display="flex"
        component="section"
        flexDirection="column"
        margin="56px 100px"
      >
        <Typography variant="h2">Recent work</Typography>
        {PROJECTS.map((project, idx) => {
          const { title, description, imageSrc, imageAlt, ctaText, ctaLink } =
            project;

          return (
            <Box
              display="flex"
              key={`project-${idx}-${title}`}
              gap={10}
              mt={-6}
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                justifyContent="center"
              >
                <Typography variant="h3">{title}</Typography>
                <Typography variant="body2" whiteSpace="pre-wrap">
                  {description}
                </Typography>
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                    originX: 0,
                  }}
                  style={{ width: 'fit-content' }}
                >
                  <Button
                    variant="outlined"
                    href={ctaLink}
                    target="_blank"
                    sx={{ borderRadius: '4px', width: 'fit-content' }}
                  >
                    <Typography variant="ctaButton">{ctaText}</Typography>
                  </Button>
                </motion.div>
              </Box>
              <Image src={imageSrc} alt={imageAlt} width={700} height={360} />
            </Box>
          );
        })}
      </Box>
    </motion.div>
  );
}
