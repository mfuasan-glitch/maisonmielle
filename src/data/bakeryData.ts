import { CookieFlavor, DeliveryZone } from '../types';

export const COOKIE_FLAVORS: CookieFlavor[] = [
  {
    id: 'the-classic',
    name: 'The Classic',
    tagline: 'Golden, buttery classic with generous chocolate chips',
    description: 'our golden, buttery classic loaded with generous chocolate chips. soft in the center with just the right amount of chew.',
    ingredients: ['French Browned Butter', 'Dark Chocolate Chips', 'Organic Flour', 'Muscovado Sugar', 'Sea Salt', 'Farm Fresh Eggs'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    price: 35,
    image: '/assets/aistudio/the-classic.png',
    isOutOfStock: false,
    tastingNotes: ['Nutty browned butter', 'Gooey chocolate center', 'Crisp golden rim'],
    doughColorHex: '#C59A6F',
  },
  {
    id: 'midnight-choco',
    name: 'Midnight Choco',
    tagline: 'Deep, fudgy chocolate cookie packed with chunks',
    description: 'a deep, fudgy chocolate cookie packed with chocolate chunks. rich, gooey, and made for serious chocolate lovers.',
    ingredients: ['Dark Dutch Cocoa', 'Dark Chocolate Chunks', 'Browned Butter', 'Espresso Hint', 'Sea Salt'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    price: 45,
    image: '/assets/aistudio/midnight-choco.png',
    isOutOfStock: false,
    tastingNotes: ['Intense double dark chocolate', 'Deep cocoa aroma', 'Fudgy brownie texture'],
    doughColorHex: '#251919',
  },
  {
    id: 'hershey-melt',
    name: 'Hershey Melt',
    tagline: 'Soft chocolate-chip cookie topped with Hershey’s piece',
    description: 'our soft chocolate-chip cookie topped with a melty Hershey\'s chocolate piece. warm, gooey, and extra chocolatey.',
    ingredients: ['Hershey’s Chocolate Bar', 'Dutch Cocoa', 'Sweet Cream Butter', 'Pure Cane Sugar', 'Farm Eggs'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Soy'],
    price: 49,
    image: '/assets/aistudio/hershey-melt.png',
    isOutOfStock: false,
    tastingNotes: ['Melted Hershey bar crown', 'Double chocolate richness', 'Decadent fudgy chew'],
    doughColorHex: '#4A2A20',
  },
  {
    id: 'ruby-velvet',
    name: 'Ruby Velvet',
    tagline: 'Rich red velvet cookie with white chocolate chunks',
    description: 'a rich red velvet cookie dotted with creamy white chocolate chunks. soft, velvety, and sweet.',
    ingredients: ['Dutch Red Cocoa', 'White Chocolate Chunks', 'Cultured Butter', 'Pure Vanilla Extract', 'Cane Sugar'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    price: 49,
    image: '/assets/aistudio/ruby-velvet.png',
    isOutOfStock: false,
    tastingNotes: ['Silky white chocolate melt', 'Subtle velvety cocoa', 'Fudge-like softness'],
    doughColorHex: '#8B2635',
  },
  {
    id: 'campfire',
    name: 'Campfire',
    tagline: 'Marshmallow & chocolate on a buttery graham base',
    description: 'A golden chocolate-chip cookie with gooey marshmallow and melty chocolate, nestled on a buttery graham cracker base with a toasted finish. Cozy, sweet, and nostalgic.',
    ingredients: ['Toasted Marshmallow', 'Chocolate Chips', 'Graham Biscuit Crust', 'Sweet Cream Butter', 'Pure Vanilla'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Gelatin'],
    price: 69,
    image: '/assets/aistudio/campfire.png',
    isOutOfStock: false,
    tastingNotes: ['Gooey marshmallow pull', 'Warm toasted sugar', 'Melted chocolate pool'],
    doughColorHex: '#B08257',
  },
  {
    id: 'cookie-monster',
    name: 'Cookie Monster (Halloween Special)',
    tagline: 'Spooky blue treat loaded with cookies & chocolate',
    description: 'He\'s cute, he\'s spooky, and he\'s loaded with cookies! Meet our LIMITED EDITION Cookie Monster Halloween treat.',
    ingredients: ['Blue Butterfly Pea/Spirulina Infused Dough', 'Crushed Oreos', 'Dark Chocolate Drops', 'White Chocolate Discs', 'Candy Eyes'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Soy'],
    price: 59,
    image: '/assets/aistudio/cookie-monster.png',
    isOutOfStock: false,
    isLimitedRelease: true,
    badge: 'LIMITED RELEASE',
    tastingNotes: ['Vanilla Oreo crunch', 'Molten chocolate chips', 'Whimsical sweet butter dough'],
    doughColorHex: '#1E40AF',
  },
];

export const BOX_DISCOUNT_THRESHOLD = 5;
export const BOX_DISCOUNT_AMOUNT = 10; // ₱10 OFF when total cookies >= 5
export const BOX_DISCOUNT_HELPER = 'GET ANY 5 COOKIES AND ENJOY ₱10 OFF!';

export const DELIVERY_ZONES: {
  zone: DeliveryZone;
  fee: number;
  eta: string;
  note: string;
  districts: string[];
}[] = [
  {
    zone: 'USA (University of San Agustin)',
    fee: 0,
    eta: 'Delivery/Meet-up: Nov. 5',
    note: 'USA, Molo (Standard) — Free meet-up & drop-off',
    districts: ['USA Main Gate', 'General Luna St.', 'University Promenade'],
  },
  {
    zone: 'Molo',
    fee: 0,
    eta: 'Delivery/Meet-up: Nov. 5',
    note: 'USA, Molo (Standard) — Free meet-up & drop-off',
    districts: ['Molo Plaza', 'Molo Church', 'Avanceña', 'San Pedro'],
  },
  {
    zone: 'Outside Locations (+₱20 / Self-Arranged)',
    fee: 20,
    eta: 'Delivery/Dispatch: Nov. 5',
    note: 'Outside Locations (Add ₱20.00 or self-arranged courier)',
    districts: ['Mandurriao', 'Jaro', 'La Paz', 'Lapuz', 'City Proper', 'Pavia', 'Santa Barbara'],
  },
  {
    zone: 'Direct Pick-Up (DM for Coordinates)',
    fee: 0,
    eta: 'Pickup Window: Nov. 5',
    note: 'Direct Pick-Up: DM for exact location coordinates',
    districts: ['Private Bakery Studio (DM for exact coordinates)'],
  },
];

export const OFFICIAL_PREORDER_WINDOW = {
  announcement: 'PREORDER DATES: OCT. 30 - NOV. 2 | PICKUP/DELIVERY: NOV. 5',
  deliveryOptionsList: 'USA, Molo (Standard) | Outside Locations (Add ₱20.00 or self-arranged courier)',
  pickupNote: 'Direct Pick-Up: DM for exact location coordinates',
  preorderDates: 'Oct. 30 – Nov. 2',
  pickupDeliveryDate: 'Nov. 5',
  status: 'Preorders Open',
};

export const UPCOMING_BATCHES = [
  {
    id: 'batch-official-nov5',
    label: 'Nov. 5 Official Dispatch Batch',
    date: 'Wednesday, Nov. 5',
    status: 'Preorder Window: Oct. 30 – Nov. 2 (Active)',
    isAvailable: true,
  },
];

export const MOCK_MEMBER: any = {
  id: 'MM-88421',
  name: 'Marielle Faith P. Ortencio',
  email: 'marielle@maisonmielle.ph',
  phone: '+63 917 842 9102',
  memberTier: 'Butter & Gold',
  points: 420,
  pointsToNextTier: 80,
  nextTierName: 'Grand Confectioner',
  totalBoxesOrdered: 7,
  joinedDate: 'March 2025',
  availableVouchers: [
    {
      id: 'vouch-1',
      code: 'SOFTMOMENTS10',
      title: '₱10 Off On Any Cookie Order',
      discount: '₱10 Off',
      expiresIn: 'Valid for current preorder batch',
    },
    {
      id: 'vouch-2',
      code: 'FREESHIPUSA',
      title: 'Free Pickup/Delivery for USA & Molo',
      discount: 'Free Drop-off',
      expiresIn: 'Active batch',
    },
  ],
  recentActivity: [
    {
      id: 'act-1',
      date: 'Oct 30',
      description: 'Preordered Box of 6 (Nov. 5 Batch)',
      pointsDelta: +60,
    },
    {
      id: 'act-2',
      date: 'Oct 24',
      description: 'Cookie Club Check-in Bonus',
      pointsDelta: +20,
    },
  ],
};
