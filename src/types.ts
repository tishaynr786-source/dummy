export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'Handbags' | 'Shoulder Bags' | 'Sling Bags' | 'Wallets' | 'Clutches' | 'Travel Bags';
  description: string;
  details: string[];
  imageUrl: string;
  colors: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
}

export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string[];
  imageUrl: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
  productJoined?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export type PageId = 'home' | 'about' | 'products' | 'blog' | 'contact';
