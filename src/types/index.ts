export type PageTab = 'home' | 'about' | 'catalog' | 'builder' | 'order' | 'club' | 'contact' | 'links' | 'images';

export interface CookieFlavor {
  id: string;
  name: string;
  tagline: string;
  description: string;
  ingredients: string[];
  allergens: string[];
  price: number;
  image: string;
  isOutOfStock: boolean;
  tastingNotes: string[];
  doughColorHex: string;
  isLimitedRelease?: boolean;
  badge?: string;
}

export type BoxSize = 5 | 6 | number;

export interface BoxSelection {
  boxId: string;
  size: number;
  flavors: Record<string, number>; // flavorId -> count
  customNote?: string;
  boxPrice: number;
  originalPrice: number;
  discount: number;
}

export type DeliveryZone = 
  | 'USA (University of San Agustin)'
  | 'Molo'
  | 'Outside Locations (+₱20 / Self-Arranged)'
  | 'Direct Pick-Up (DM for Coordinates)';

export interface OrderItem {
  id: string;
  boxSize: BoxSize;
  flavorSummary: string;
  price: number;
  flavors: Record<string, number>;
}

export interface OrderFormData {
  fullName: string;
  contactNumber: string;
  deliveryZone: DeliveryZone;
  specificAddress: string;
  deliveryBatch: string;
  paymentMethod: 'GCash' | 'Maya' | 'Cash on Delivery';
  specialInstructions: string;
}

export interface ConfirmedOrder {
  orderNumber: string;
  date: string;
  items: OrderItem[];
  customer: OrderFormData;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export interface MemberProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberTier: 'Flour & Honey' | 'Butter & Gold' | 'Grand Confectioner';
  points: number;
  pointsToNextTier: number;
  nextTierName: string;
  totalBoxesOrdered: number;
  joinedDate: string;
  availableVouchers: {
    id: string;
    code: string;
    title: string;
    discount: string;
    expiresIn: string;
  }[];
  recentActivity: {
    id: string;
    date: string;
    description: string;
    pointsDelta: number;
  }[];
}
