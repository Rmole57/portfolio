'use client';

import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { WorkSection, type WorkSectionProps } from './components/WorkSection';
import { ContactSection } from './components/ContactSection';
import { useHashUpdate } from './utils/useHashUpdate';

const WORK_EXPERIENCE: WorkSectionProps[] = [
  {
    id: 'watchtower',
    company: 'WatchtowerAI',
    role: 'Founding Engineer',
    period: 'Jul 2025 — Present',
    description:
      'WatchtowerAI is an AI-powered observability platform for data teams. It identifies inefficiencies and failures across data systems — from broken pipelines to schema drift — and uses AI to automatically generate remediation code. As the founding engineer, I built the product from the ground up: the frontend architecture, an AI chat interface, a graph-based data lineage explorer powered by React Flow, and end-to-end remediation workflows that let users generate, review, and merge fixes directly from the platform.',
    accentColor: '#34d399',
    url: 'https://getwatchtower.ai/',
    urlLabel: 'Visit WatchtowerAI',
    variant: 'dark',
    logoSrc: '/logos/watchtower.png',
    align: 'left',
  },
  {
    id: 'default',
    company: 'Default',
    role: 'Frontend Tech Lead',
    period: 'Dec 2023 — Jul 2025',
    description:
      "Default is an inbound sales automation platform built for modern go-to-market teams. Its core product — Workflow Builder — enables teams to design complex multi-step processes that automate lead routing, qualification, and scheduling across their entire sales stack. As Frontend Tech Lead, I owned the Workflow Builder's frontend architecture, built full-stack observability tooling for workflow execution, and shipped an AI-powered routing system for automatic lead triage.",
    accentColor: '#5757F8',
    url: 'https://www.default.com/',
    urlLabel: 'Visit Default',
    variant: 'light',
    logoSrc: '/logos/default.svg',
    align: 'right',
  },
  {
    id: 'hightouch',
    company: 'Hightouch',
    role: 'Software Engineer',
    period: 'Oct 2021 — May 2023',
    description:
      'Hightouch pioneered the Reverse ETL category, enabling companies to sync data directly from their warehouse into the SaaS tools they use every day. The platform powers data activation for hundreds of companies, making it possible for marketing, sales, and support teams to operationalize their data without writing code. I worked across the product building production integrations, contributing to Customer Studio — a visual audience builder — and developing a reusable, config-driven component system.',
    accentColor: '#40DE9E',
    url: 'https://hightouch.com/',
    urlLabel: 'Visit Hightouch',
    variant: 'dark',
    logoSrc: '/logos/hightouch.svg',
    logoInvert: true,
    align: 'left',
  },
  {
    id: 'tapestry',
    company: 'Tapestry',
    role: 'Co-Creator & Software Engineer',
    period: 'May 2021 — Oct 2021',
    description:
      'Tapestry is an open-source framework for deploying end-to-end data pipelines on AWS. It automates the entire provisioning process — from data ingestion through activation — so developers can go from zero to a fully operational pipeline with minimal manual configuration. I co-created Tapestry alongside a small team, designing the configuration-driven orchestration system and co-authoring the technical case study on its architecture and design decisions.',
    accentColor: '#9579FD',
    url: 'https://tapestry-pipeline.github.io/',
    urlLabel: 'Read the case study',
    variant: 'light',
    logoSrc: '/logos/tapestry.svg',
    align: 'right',
  },
];

export default function Home() {
  useHashUpdate();

  return (
    <>
      <HeaderNav />
      <HeroSection />
      <AboutSection />
      {WORK_EXPERIENCE.map((work) => (
        <WorkSection key={work.id} {...work} />
      ))}
      <ContactSection />
    </>
  );
}
