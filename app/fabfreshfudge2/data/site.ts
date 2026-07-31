// Central site constants — real details pulled from the live Fab Fresh Fudge site.
export const SITE = {
  name: 'Fab Fresh Fudge',
  legalName: 'Fabulous Fudge',
  tagline: 'Small-batch fudge from the foot of Mt. Shasta',
  region: 'Northern California',
  owners: 'Bryan & Becca Ragle',
  email: 'fabfreshfudge@gmail.com',
  // Their existing Square store — checkout hands off here.
  shopUrl: 'https://www.fabfreshfudge.com/shop/online-menu/F5G33UOSJ7XSMR4WAFNYEWH7',
  fudgeUrl: 'https://www.fabfreshfudge.com/shop/fudge/MOELG2EIX2FKSAGEHIOKLQBC',
  facebook: 'https://www.facebook.com/fabfreshfudge/',
  instagram: 'https://www.instagram.com/fabfreshfudge/',
  // UNCONFIRMED: this window appears nowhere on the Ragles' live site, contact page,
  // or socials. Plausible for fudge, but confirm with the client before launch.
  shippingNote: 'We ship October through April only. Fresh fudge and summer heat are not friends.',
  // UNCONFIRMED: their About page says Fabulous Fudge is "business #4 for the Ragles"
  // but publishes no founding date. Confirm the year before launch.
  est: '2022',
} as const

export type NavItem = { label: string; short: string; href: string; index: string }

// Numbered like a menu. `short` is used in the narrow vertical rail.
export const NAV: NavItem[] = [
  { label: 'The Board', short: 'Board', href: '#board', index: '01' },
  { label: 'Build a Box', short: 'Build', href: '#build', index: '02' },
  { label: 'Our Story', short: 'Story', href: '#story', index: '03' },
  { label: 'On the Road', short: 'Road', href: '#visit', index: '04' },
  { label: 'Gifts & Wholesale', short: 'Gifts', href: '#gifts', index: '05' },
]
