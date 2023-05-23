import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import tapestryImage from '../../public/tapestry-ui.png';
import hightouchSiteImage from '../../public/hightouch-ui.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
          <Box display="flex" key={`project-${idx}-${title}`} gap={10} mt={-6}>
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
              <Link
                display="flex"
                href={ctaLink}
                underline="none"
                target="_blank"
                sx={{ alignItems: 'center' }}
              >
                <Typography variant="ctaLink">{ctaText}</Typography>
                <ArrowForwardIcon fontSize="small" sx={{ ml: '2px' }} />
              </Link>
            </Box>
            <Image src={imageSrc} alt={imageAlt} width={700} height={360} />
          </Box>
        );
      })}
    </Box>
  );
}
