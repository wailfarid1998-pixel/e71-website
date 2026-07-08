/**
 * All placeholder copy for the E71 marketing site lives here.
 * Swap strings in this file — components render whatever they find.
 */

export const site = {
  name: 'E71',
  tagline: 'Applied Intelligence',
  description:
    'E71 builds the reasoning layer for modern enterprise — agentic AI that understands your operation, acts inside it, and learns from every outcome.',
  about:
    'Named for 1971 — the year a union was founded on ambition. E71 builds sovereign intelligence from Abu Dhabi for the world.',
}

export const nav = {
  links: [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Process', href: '#process' },
    { label: 'Platform', href: '#platform' },
    { label: 'Scale', href: '#scale' },
  ],
  cta: { label: 'Get access', href: '#access' },
}

export const hero = {
  eyebrow: 'E71 — Applied Intelligence',
  // `accent` is the single green keyword for this section
  headline: { pre: 'Machines that', accent: 'reason.', post: 'Systems that deliver.' },
  subheadline:
    'E71 is the thinking layer for modern enterprise — models that read your operation end to end, act inside it with judgement, and compound what they learn.',
  cta: { label: 'Request early access', href: '#access' },
  secondary: { label: 'See the platform', href: '#platform' },
  status: 'Systems operational',
}

export const capabilities = {
  eyebrow: '01 — Capabilities',
  headline: { pre: 'Built for work that', accent: 'matters', post: '' },
  items: [
    {
      icon: 'brain' as const,
      title: 'Deep reasoning',
      body: 'Frontier models tuned for multi-step judgement — planning, verifying, and revising before they ever act on your systems.',
    },
    {
      icon: 'workflow' as const,
      title: 'Agentic workflows',
      body: 'Agents that execute across your tools with full audit trails — every step observable, every action reversible.',
    },
    {
      icon: 'languages' as const,
      title: 'Multilingual by default',
      body: 'Native-grade understanding across Arabic, English and 40+ languages — built for the region, fluent everywhere.',
    },
    {
      icon: 'shield' as const,
      title: 'Sovereign deployment',
      body: 'Run in your cloud, on your terms. Data residency, isolation and compliance are architecture, not afterthoughts.',
    },
  ],
}

export const process = {
  eyebrow: '02 — Process',
  headline: { pre: 'From signal to', accent: 'outcome', post: '' },
  intro: 'One continuous loop, scrubbed by your scroll.',
  steps: [
    {
      index: '01',
      title: 'Ingest',
      body: 'E71 connects to your stack — documents, telemetry, conversations — and builds a live model of how your operation actually runs.',
    },
    {
      index: '02',
      title: 'Reason',
      body: 'The platform plans before it moves: decomposing goals, weighing constraints, and pressure-testing its own conclusions.',
    },
    {
      index: '03',
      title: 'Act',
      body: 'Agents execute inside your tools with scoped permissions — drafting, filing, reconciling, escalating only when confidence drops.',
    },
    {
      index: '04',
      title: 'Learn',
      body: 'Every outcome feeds back into the loop. Accuracy compounds weekly, tuned to your data and nobody else’s.',
    },
  ],
}

export const showcase = {
  eyebrow: '03 — Platform',
  headline: { pre: 'See it', accent: 'think', post: '' },
  subheadline:
    'The E71 Console — one surface to direct agents, inspect their reasoning, and sign off on what ships.',
  console: {
    title: 'e71 / console',
    live: 'Live',
    prompt: 'Reconcile Q3 supplier invoices against contracts and flag exceptions.',
    responseLines: [
      'Scanning 1,284 invoices across 6 entities…',
      'Cross-referencing contract terms — 97.2% auto-matched.',
      '14 exceptions flagged for review. Drafting summary…',
    ],
    steps: [
      { label: 'Connect ERP', state: 'done' as const },
      { label: 'Match line items', state: 'done' as const },
      { label: 'Flag exceptions', state: 'active' as const },
      { label: 'Draft report', state: 'queued' as const },
    ],
    footnote: 'Representative product interface. Figures illustrative.',
  },
}

export const stats = {
  eyebrow: '04 — Scale',
  headline: { pre: 'Serious infrastructure,', accent: 'quiet', post: 'confidence' },
  cells: [
    { value: '99.98%', label: 'Platform uptime, trailing 12 months' },
    { value: '<180ms', label: 'Median first-token latency' },
    { value: '40+', label: 'Languages with native-grade output' },
    { value: '2.1B', label: 'Agent actions executed to date' },
    { value: 'SOC 2', label: 'Type II, ISO 27001, GDPR-ready' },
    {
      value: 'In-region',
      label: 'Sovereign hosting in the UAE, EU and US',
    },
  ],
}

export const finalCta = {
  eyebrow: 'Access',
  headline: { pre: 'Put E71 to', accent: 'work', post: '' },
  body: 'We onboard a limited number of enterprise partners each quarter. Tell us about your operation and we’ll show you what it looks like with a reasoning layer.',
  cta: { label: 'Request early access', href: 'mailto:hello@e71.ai' },
}

export const footer = {
  columns: [
    {
      title: 'Product',
      links: ['Platform', 'Agents', 'Security', 'Pricing'],
    },
    {
      title: 'Company',
      links: ['About', 'Careers', 'Press', 'Contact'],
    },
    {
      title: 'Resources',
      links: ['Research', 'Documentation', 'Status', 'Trust center'],
    },
  ],
  legal: '© 2026 E71 Intelligence. All rights reserved.',
  location: 'Abu Dhabi · London · Singapore',
}
