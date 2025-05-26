import { Item, ItemCategory } from './types';

// Assuming a placeholder exchange rate for example data, e.g., 1 USD = 1000 ARS
const initialItemsData: Item[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'The ultimate iPhone. A17 Pro chip. Customizable Action button.',
    priceARS: 999000,
    priceUSD: 999,
    stock: 25,
    category: ItemCategory.iOS,
    imageUrl: 'https://picsum.photos/seed/iphone15pro/600/400',
  },
  {
    id: '2',
    name: 'iPad Air (M2)',
    description: 'Serious performance in a thin and light design. Stunning Liquid Retina display.',
    priceARS: 599000,
    priceUSD: 599,
    stock: 15,
    category: ItemCategory.iOS,
    imageUrl: 'https://picsum.photos/seed/ipadair/600/400',
  },
  {
    id: '3',
    name: 'Apple Watch Series 9',
    description: 'Smarter, brighter, mightier. New S9 SiP. Double tap gesture.',
    priceARS: 399000,
    priceUSD: 399,
    stock: 30,
    category: ItemCategory.iOS,
    imageUrl: 'https://picsum.photos/seed/applewatch9/600/400',
  },
  {
    id: '4',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Galaxy AI is here. Note Assist. Circle to Search with Google.',
    priceARS: 1199000,
    priceUSD: 1199,
    stock: 18,
    category: ItemCategory.Android,
    imageUrl: 'https://picsum.photos/seed/galaxys24/600/400',
  },
  {
    id: '5',
    name: 'Google Pixel 8 Pro',
    description: 'The best of Google, with an amazing camera and helpful AI.',
    priceARS: 899000,
    priceUSD: 899,
    stock: 22,
    category: ItemCategory.Android,
    imageUrl: 'https://picsum.photos/seed/pixel8pro/600/400',
  },
  {
    id: '6',
    name: 'OnePlus 12',
    description: 'Flagship performance with smooth display and fast charging.',
    priceARS: 799000,
    priceUSD: 799,
    stock: 12,
    category: ItemCategory.Android,
    imageUrl: 'https://picsum.photos/seed/oneplus12/600/400',
  },
];

export default initialItemsData;