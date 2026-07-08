/**
 * Every word on the site lives here (< 150 words total).
 * Swap strings freely — components render whatever they find.
 *
 * Headline word flags: `u` = the viewport's single green-underlined word,
 * `g` = outlined "ghost" type (transparent fill, gray stroke).
 */

export type HWord = { t: string; u?: boolean; g?: boolean }

export const site = {
  name: 'E71',
  title: 'E71 — Artificial Intelligence',
  description: 'E71 — an artificial intelligence company. Abu Dhabi, UAE.',
  email: 'info@e71.ai',
}

export const nav = {
  links: [
    { label: 'About', href: '#about', accent: true },
    { label: 'Contact', href: '#contact' },
  ],
}

export const hero = {
  label: 'E71 — Artificial Intelligence',
  headline: [
    [{ t: 'Intelligence,' }],
    [{ t: 'engineered in' }],
    [{ t: 'the' }, { t: 'Emirates.', u: true }],
  ] as HWord[][],
  caption: 'Abu Dhabi, UAE',
}

export const marquee = {
  items: [
    'E71',
    'Artificial intelligence',
    'Abu Dhabi · Dubai · Sharjah · Ajman · Umm Al Quwain · Ras Al Khaimah · Fujairah',
  ],
}

// Pinned manifesto — statements swap as you scroll; `key` gets the diagonal wipe.
export const manifesto = {
  label: 'About',
  statements: [
    { pre: 'We build', key: 'sovereign', post: 'intelligence.' },
    { pre: 'Rooted here,', key: 'fluent', post: 'everywhere.' },
    { pre: 'Serious systems,', key: 'quietly', post: 'deployed.' },
    { pre: 'Built to keep', key: 'pace.', post: '' },
  ],
}

export const quote = {
  text: 'I dreamt of our land keeping pace with the growth of the modern world.',
  // Arabic line intentionally absent — supplied text only, never generated.
  arabic: '',
  attribution: '— Sheikh Zayed bin Sultan Al Nahyan',
}

export const contact = {
  label: 'Contact',
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
