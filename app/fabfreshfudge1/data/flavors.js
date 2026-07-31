// Flavor catalog — names, descriptions, and photos pulled from the client's
// live Square store (fabfreshfudge.com) on 2026-06-10. Prices are placeholders
// pending the client's current price list.

export const SQUARE_PRICE = 7.95
export const BOX_PRICE = 42
export const BOX_SIZE = 6

export const CATEGORIES = [
  { key: 'all', label: 'All flavors' },
  { key: 'chocolate', label: 'Chocolate' },
  { key: 'nutty', label: 'Nutty' },
  { key: 'fruity', label: 'Fruity & citrus' },
  { key: 'coffee', label: 'Coffee & caramel' },
  { key: 'mint', label: 'Mint' },
  { key: 'vanilla', label: 'Vanilla & toffee' },
]

export const FLAVORS = [
  {
    id: 'dark-chocolate-raspberry',
    name: 'Dark Chocolate Raspberry',
    desc: 'Our dark chocolate fudge layered with raspberry cream fudge. Already a fan favorite, and one of our best.',
    img: '/fabfreshfudge1/images/flavors/dark-chocolate-raspberry.jpeg',
    cats: ['chocolate', 'fruity'],
    popular: true,
  },
  {
    id: 'salted-caramel',
    name: 'Salted Caramel',
    desc: 'Vanilla fudge with melted caramel hand-mixed in, finished with just a pinch of salt.',
    img: '/fabfreshfudge1/images/flavors/salted-caramel.jpeg',
    cats: ['coffee', 'vanilla'],
    popular: true,
  },
  {
    id: 'peanut-butter-chocolate',
    name: 'Peanut Butter Chocolate',
    desc: "Layers of real-peanut-butter fudge and our classic chocolate. Reese's ain't got nothing on us.",
    img: '/fabfreshfudge1/images/flavors/peanut-butter-chocolate.jpeg',
    cats: ['chocolate', 'nutty'],
    popular: true,
  },
  {
    id: 'smores',
    name: "S'mores",
    desc: 'Marshmallow fudge, graham cracker middle, chocolate fudge on top, sprinkled with mini marshmallows.',
    img: '/fabfreshfudge1/images/flavors/smores.jpeg',
    cats: ['chocolate'],
    popular: true,
    note: 'Contains gluten',
  },
  {
    id: 'dark-chocolate',
    name: 'Dark Chocolate',
    desc: 'A fan favorite. Not too dark, just right.',
    img: '/fabfreshfudge1/images/flavors/dark-chocolate.jpeg',
    cats: ['chocolate'],
    popular: true,
  },
  {
    id: 'vanilla-toffee',
    name: 'Vanilla Toffee',
    desc: '"Aunt Carol\'s favorite, and she\'s not even a fudge person." Creamy vanilla loaded with toffee.',
    img: '/fabfreshfudge1/images/flavors/vanilla-toffee.jpeg',
    cats: ['vanilla'],
    popular: true,
  },
  {
    id: 'mint-chocolate',
    name: 'Mint Chocolate',
    desc: 'Like an Andes mint, but richer and creamier. Bold enough that it ships in its own box.',
    img: '/fabfreshfudge1/images/flavors/mint-chocolate.jpeg',
    cats: ['mint', 'chocolate'],
    popular: true,
    note: 'Ships separately',
  },
  {
    id: 'chocolate',
    name: 'Classic Chocolate',
    desc: 'Our delicious, creamy chocolate fudge. The square every fudge lover starts with.',
    img: '/fabfreshfudge1/images/flavors/chocolate.jpeg',
    cats: ['chocolate'],
    popular: true,
  },
  {
    id: 'butterfinger',
    name: 'Butterfinger',
    desc: 'Brand new: vanilla fudge with Butterfinger bits, a layer of chocolate fudge, and more bits on top.',
    img: null,
    cats: ['chocolate', 'nutty'],
    isNew: true,
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    desc: 'A blend of our real-coffee chocolate fudge and caramel fudge. For the espresso-bar crowd.',
    img: '/fabfreshfudge1/images/flavors/caramel-macchiato.jpeg',
    cats: ['coffee'],
  },
  {
    id: 'chocolate-walnut',
    name: 'Chocolate Nut',
    desc: 'Creamy chocolate fudge with walnuts mixed in by hand and placed on top as a garnish.',
    img: '/fabfreshfudge1/images/flavors/chocolate-walnut.jpeg',
    cats: ['chocolate', 'nutty'],
  },
  {
    id: 'chocolate-toffee',
    name: 'Chocolate Toffee',
    desc: 'Creamy chocolate fudge with Skor bits mixed in, then garnished on top.',
    img: '/fabfreshfudge1/images/flavors/chocolate-toffee.jpeg',
    cats: ['chocolate', 'vanilla'],
  },
  {
    id: 'coffee-cream',
    name: 'Coffee & Cream',
    desc: 'Our creamy chocolate fudge with real coffee mixed in. Yum, if you like coffee, that is.',
    img: '/fabfreshfudge1/images/flavors/coffee-cream.jpeg',
    cats: ['coffee'],
  },
  {
    id: 'cookies-cream',
    name: 'Cookies & Cream',
    desc: 'Creamy vanilla fudge with Oreo bits hand-mixed in.',
    img: '/fabfreshfudge1/images/flavors/cookies-cream.jpeg',
    cats: ['vanilla'],
    note: 'Contains gluten',
  },
  {
    id: 'lemon-cream',
    name: 'Lemon Cream',
    desc: 'A great balance of tart and sweet in a delicate lemon cream fudge.',
    img: '/fabfreshfudge1/images/flavors/lemon-cream.jpeg',
    cats: ['fruity'],
  },
  {
    id: 'lemon-dark-chocolate',
    name: 'Lemon & Dark Chocolate',
    desc: 'Sweet-and-tart lemon cream layered with our classic creamy chocolate.',
    img: '/fabfreshfudge1/images/flavors/lemon-dark-chocolate.jpeg',
    cats: ['fruity', 'chocolate'],
  },
  {
    id: 'mint-mocha',
    name: 'Mint Mocha',
    desc: 'Andes-mint cool with a touch of chocolate-coffee fudge. Contains coffee.',
    img: '/fabfreshfudge1/images/flavors/mint-mocha.jpeg',
    cats: ['mint', 'coffee'],
    note: 'Ships separately',
  },
  {
    id: 'peanut-butter',
    name: 'Peanut Butter',
    desc: 'Real creamy peanut butter, nothing fake. Smooth, rich, and dangerous to leave unattended.',
    img: '/fabfreshfudge1/images/flavors/peanut-butter.jpeg',
    cats: ['nutty'],
  },
  {
    id: 'penuchi-pecan',
    name: 'Penuchi & Pecan',
    desc: 'Brown-sugar fudge with pecans hand-mixed in and on top. Tastes like a maple donut.',
    img: '/fabfreshfudge1/images/flavors/penuchi-pecan.jpeg',
    cats: ['nutty'],
  },
  {
    id: 'rocky-road',
    name: 'Rocky Road',
    desc: 'Creamy chocolate fudge with walnuts and mini marshmallows hand-mixed in.',
    img: '/fabfreshfudge1/images/flavors/rocky-road.jpeg',
    cats: ['chocolate', 'nutty'],
  },
]

export const flavorById = (id) => FLAVORS.find((f) => f.id === id)
