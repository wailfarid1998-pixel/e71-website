/**
 * Every word on the site lives here (< 200 words total).
 * Edit strings freely — components render whatever they find.
 */

export const site = {
  name: 'E71',
  title: 'E71 — Artificial Intelligence',
  description: 'E71 — an artificial intelligence company. Abu Dhabi, UAE.',
  email: 'info@e71.ai',
}

export const nav = {
  links: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
}

export const hero = {
  eyebrow: 'Artificial intelligence',
  // words rise from masked lines; `u` marks the single green-underlined word
  lines: [
    [{ t: 'Intelligence,' }],
    [{ t: 'engineered in' }],
    [{ t: 'the' }, { t: 'Emirates.', u: true }],
  ],
  location: 'Abu Dhabi, UAE',
  scrollHint: 'Scroll',
}

export const marquee = {
  text: 'E71 — Artificial intelligence — Abu Dhabi · Dubai · Sharjah · Ajman · Umm Al Quwain · Ras Al Khaimah · Fujairah — ',
}

export const capabilities = {
  eyebrow: 'What we build',
  heading: 'Intelligence, applied.',
  panels: [
    {
      num: '01',
      label: 'Automate',
      statement: 'Workflows that run themselves.',
      body: 'Manual processes become autonomous systems — approvals, routing, reporting, done before the morning meeting.',
    },
    {
      num: '02',
      label: 'Analyze',
      statement: 'A thousand pages, in seconds.',
      body: 'Contracts, reports, research, archives — read, understood, and answered instantly.',
    },
    {
      num: '03',
      label: 'Accelerate',
      statement: 'Weeks of work, in minutes.',
      body: 'The slowest step in your operation becomes the fastest.',
    },
    {
      num: '04',
      label: 'Adapt',
      statement: 'Your AI. Your walls. Your data.',
      body: 'Intelligence trained on your operations, deployed inside your infrastructure — private by design, sovereign by default.',
    },
  ],
}

export const manifesto = {
  eyebrow: 'About',
  statements: [
    'We build artificial intelligence for the region — and for the world watching it.',
    'Not tools. Working systems, inside governments and enterprises, from day one.',
    'Built here. Owned here. Reaching everywhere.',
  ],
}

export const quote = {
  // Arabic renders above the English only if supplied — never generated here.
  arabic: '',
  text: 'I dreamt of our land keeping pace with the growth of the modern world.',
  attribution: '— Sheikh Zayed bin Sultan Al Nahyan',
}

export const contact = {
  eyebrow: 'Contact',
  headline: "Let's talk.",
  email: 'info@e71.ai',
}

export const footer = {
  legal: '© E71 2026',
  links: [
    { label: 'LinkedIn', href: '#' },
    { label: 'X', href: '#' },
  ],
}
