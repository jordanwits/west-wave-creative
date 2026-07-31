// Flavor catalog — real names, descriptions, and photos from the Ragles' live
// Square store (fabfreshfudge.com). Photos live in /public/flavors.

export type FlavorCategory =
  | 'Chocolate'
  | 'Nutty'
  | 'Coffee & Caramel'
  | 'Fruity & Citrus'
  | 'Mint'
  | 'Vanilla & Toffee'

export interface Flavor {
  id: string
  name: string
  desc: string
  category: FlavorCategory
  /** path under /public/flavors — most flavors have a real photo */
  photo?: string
  /** swatch fallback (OKLCH) for the rare flavor without a photo yet */
  color: string
  popular?: boolean
  isNew?: boolean
  /** short caveat, e.g. allergen or shipping note */
  note?: string
}

// A build-your-own box is six of the Ragles' standard 1/4 lb squares. Their store
// prices squares at $7.00 each and runs a "BUY 5, GET 6th FREE!" offer on nearly
// every flavor, so a full six-flavor box comes to $35, not 6 x $7.
export const BOX = {
  title: 'The Six-Pack Box',
  maxFlavors: 6,
  perSquare: 7,
  price: 35,
  pieceNote: 'six 1/4 lb squares, hand-cut',
  promoNote: 'Buy five squares, the sixth is on us',
} as const

// Ordered for the menu — categories print top to bottom in this sequence.
export const CATEGORIES: FlavorCategory[] = [
  'Chocolate',
  'Nutty',
  'Coffee & Caramel',
  'Vanilla & Toffee',
  'Fruity & Citrus',
  'Mint',
]

export const FLAVORS: Flavor[] = [
  {
    id: 'dark-chocolate-raspberry',
    name: 'Dark Chocolate Raspberry',
    desc: 'Dark chocolate fudge layered with raspberry cream. Already a fan favorite, and one of our best.',
    category: 'Chocolate',
    photo: '/fabfreshfudge2/flavors/dark-chocolate-raspberry.jpeg',
    color: 'oklch(0.36 0.09 16)',
    popular: true,
  },
  {
    id: 'salted-caramel',
    name: 'Salted Caramel',
    desc: 'Vanilla fudge with melted caramel hand-mixed in, finished with just a pinch of salt.',
    category: 'Coffee & Caramel',
    photo: '/fabfreshfudge2/flavors/salted-caramel.jpeg',
    color: 'oklch(0.62 0.12 65)',
    popular: true,
  },
  {
    id: 'peanut-butter-chocolate',
    name: 'Peanut Butter Chocolate',
    desc: "Layers of real-peanut-butter fudge and our classic chocolate. Reese's ain't got nothing on us.",
    category: 'Nutty',
    photo: '/fabfreshfudge2/flavors/peanut-butter-chocolate.jpeg',
    color: 'oklch(0.5 0.08 60)',
    popular: true,
  },
  {
    id: 'smores',
    name: "S'mores",
    desc: 'Marshmallow fudge, a graham-cracker middle, chocolate fudge on top, scattered with mini marshmallows.',
    category: 'Chocolate',
    photo: '/fabfreshfudge2/flavors/smores.jpeg',
    color: 'oklch(0.45 0.06 55)',
    popular: true,
    note: 'Contains gluten',
  },
  {
    id: 'dark-chocolate',
    name: 'Dark Chocolate',
    desc: 'A fan favorite. Not too dark, just right.',
    category: 'Chocolate',
    photo: '/fabfreshfudge2/flavors/dark-chocolate.jpeg',
    color: 'oklch(0.3 0.05 45)',
    popular: true,
  },
  {
    id: 'vanilla-toffee',
    name: 'Vanilla Toffee',
    desc: '“Aunt Carol’s favorite, and she’s not even a fudge person.” Creamy vanilla loaded with toffee.',
    category: 'Vanilla & Toffee',
    photo: '/fabfreshfudge2/flavors/vanilla-toffee.jpeg',
    color: 'oklch(0.82 0.06 80)',
    popular: true,
  },
  {
    id: 'mint-chocolate',
    name: 'Mint Chocolate',
    desc: 'Like an Andes mint, but richer and creamier. Bold enough that it ships in its own box.',
    category: 'Mint',
    photo: '/fabfreshfudge2/flavors/mint-chocolate.jpeg',
    color: 'oklch(0.7 0.08 165)',
    popular: true,
    note: 'Ships separately',
  },
  {
    id: 'chocolate',
    name: 'Classic Chocolate',
    desc: 'Our delicious, creamy chocolate fudge. The square every fudge lover starts with.',
    category: 'Chocolate',
    photo: '/fabfreshfudge2/flavors/chocolate.jpeg',
    color: 'oklch(0.36 0.05 50)',
    popular: true,
  },
  {
    id: 'butterfinger',
    name: 'Butterfinger',
    desc: 'Brand new: vanilla fudge with Butterfinger bits, a layer of chocolate fudge, and more bits on top.',
    category: 'Nutty',
    color: 'oklch(0.72 0.12 70)',
    isNew: true,
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    desc: 'A blend of our real-coffee chocolate fudge and caramel fudge. For the espresso-bar crowd.',
    category: 'Coffee & Caramel',
    photo: '/fabfreshfudge2/flavors/caramel-macchiato.jpeg',
    color: 'oklch(0.5 0.07 55)',
  },
  {
    id: 'chocolate-walnut',
    name: 'Chocolate Nut',
    desc: 'Creamy chocolate fudge with walnuts mixed in by hand and placed on top as a garnish.',
    category: 'Nutty',
    photo: '/fabfreshfudge2/flavors/chocolate-walnut.jpeg',
    color: 'oklch(0.4 0.05 52)',
  },
  {
    id: 'chocolate-toffee',
    name: 'Chocolate Toffee',
    desc: 'Creamy chocolate fudge with Skor bits mixed in, then garnished on top.',
    category: 'Chocolate',
    photo: '/fabfreshfudge2/flavors/chocolate-toffee.jpeg',
    color: 'oklch(0.42 0.06 52)',
  },
  {
    id: 'coffee-cream',
    name: 'Coffee & Cream',
    desc: 'Our creamy chocolate fudge with real coffee mixed in. Yum, if you like coffee, that is.',
    category: 'Coffee & Caramel',
    photo: '/fabfreshfudge2/flavors/coffee-cream.jpeg',
    color: 'oklch(0.4 0.05 50)',
  },
  {
    id: 'cookies-cream',
    name: 'Cookies & Cream',
    desc: 'Creamy vanilla fudge with Oreo bits hand-mixed in.',
    category: 'Vanilla & Toffee',
    photo: '/fabfreshfudge2/flavors/cookies-cream.jpeg',
    color: 'oklch(0.7 0.02 250)',
    note: 'Contains gluten',
  },
  {
    id: 'lemon-cream',
    name: 'Lemon Cream',
    desc: 'A great balance of tart and sweet in a delicate lemon-cream fudge.',
    category: 'Fruity & Citrus',
    photo: '/fabfreshfudge2/flavors/lemon-cream.jpeg',
    color: 'oklch(0.86 0.1 95)',
  },
  {
    id: 'lemon-dark-chocolate',
    name: 'Lemon & Dark Chocolate',
    desc: 'Sweet-and-tart lemon cream layered with our classic creamy chocolate.',
    category: 'Fruity & Citrus',
    photo: '/fabfreshfudge2/flavors/lemon-dark-chocolate.jpeg',
    color: 'oklch(0.6 0.1 90)',
  },
  {
    id: 'mint-mocha',
    name: 'Mint Mocha',
    desc: 'Andes-mint cool with a touch of chocolate-coffee fudge. Contains coffee.',
    category: 'Mint',
    photo: '/fabfreshfudge2/flavors/mint-mocha.jpeg',
    color: 'oklch(0.55 0.06 160)',
    note: 'Ships separately',
  },
  {
    id: 'peanut-butter',
    name: 'Peanut Butter',
    desc: 'Real creamy peanut butter, nothing fake. Smooth, rich, and dangerous to leave unattended.',
    category: 'Nutty',
    photo: '/fabfreshfudge2/flavors/peanut-butter.jpeg',
    color: 'oklch(0.66 0.1 70)',
  },
  {
    id: 'penuchi-pecan',
    name: 'Penuchi & Pecan',
    desc: 'Brown-sugar fudge with pecans hand-mixed in and on top. Tastes like a maple donut.',
    category: 'Nutty',
    photo: '/fabfreshfudge2/flavors/penuchi-pecan.jpeg',
    color: 'oklch(0.6 0.08 65)',
  },
  {
    id: 'rocky-road',
    name: 'Rocky Road',
    desc: 'Creamy chocolate fudge with walnuts and mini marshmallows hand-mixed in.',
    category: 'Chocolate',
    photo: '/fabfreshfudge2/flavors/rocky-road.jpeg',
    color: 'oklch(0.38 0.05 50)',
  },
]

export const POPULAR = FLAVORS.filter((f) => f.popular)
export const flavorById = (id: string) => FLAVORS.find((f) => f.id === id)
