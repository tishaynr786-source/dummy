import { Product, Blog, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p_b3',
    name: 'B3 Signature Imperial Handbag',
    price: 3499,
    originalPrice: 4999,
    category: 'Handbags',
    description: 'Our ultimate luxury statement piece. Hand-crafted in bespoke boutique batches featuring our signature custom-cast 24K gold-plated "B3" monogram emblem directly on the front flap.',
    details: [
      'Custom-molded polished 24K gold-plated "B3" brand metallic emblem closure',
      'Ultra-fine Italian micro-grain vegan leather with premium water-guard coating',
      'Plush burgundy velour lined dual-cabin interior with multi-functional dividers',
      'Elegant structured hand-rolled top handles and detachable custom buckle strap',
      'Individually numbered metal plate certifying hand-crafted authentic origins',
      'Dimensions: 11" x 8.5" x 4.8"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&auto=format&fit=crop',
    colors: ['Ruby Red', 'Sand Gold', 'Empress Black'],
    tags: ['B3 Custom Crest', 'Exclusive Spec', '24K Gold Logo'],
    rating: 5.0,
    reviewCount: 204,
    isPopular: true
  },
  {
    id: 'p1',
    name: 'Blackberry Classic Leather Handbag',
    price: 2499,
    originalPrice: 3499,
    category: 'Handbags',
    description: 'A timeless silhouette engineered with structured vegan leather. Features a spacious dual-compartment interior and gold-toned zipper hardware.',
    details: [
      'Premium vegan leather exterior',
      'Soft microfiber interior lining',
      'Dual top carrying handles & detachable shoulder strap',
      'Inside secure zipper pocket & phone sleeve',
      'Dimensions: 12" x 9.5" x 5.5"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
    colors: ['Jet Black', 'Deep Espresso', 'Classic Beige'],
    tags: ['Best Seller', 'Everyday Use'],
    rating: 4.9,
    reviewCount: 124,
    isPopular: true
  },
  {
    id: 'p2',
    name: 'Velvet Charm Party Clutch',
    price: 1299,
    originalPrice: 1999,
    category: 'Clutches',
    description: 'Turn heads at your next evening affair. A gorgeous velvet exterior paired with an elegant snap clasp and fine metal chain shoulder strap.',
    details: [
      'Ultra-soft luxury velvet wrapping',
      'Polished gold-finish clasp closure',
      'Detachable fine link chain strap (22" drop)',
      'Fits iPhone Pro Max, card holder, and lipstick',
      'Dimensions: 8" x 4.5" x 2"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1566150905458-1bf1fc15a490?q=80&w=600&auto=format&fit=crop',
    colors: ['Wine Red', 'Emerald Green', 'Royal Black'],
    tags: ['New Arrival', 'Evening Wear'],
    rating: 4.7,
    reviewCount: 56,
    isPopular: true
  },
  {
    id: 'p3',
    name: 'Urban Sling Purse',
    price: 999,
    originalPrice: 1499,
    category: 'Sling Bags',
    description: 'Chic, compact, and completely effortless. This sling purse features card slots and back-pockets for busy days and city strolls.',
    details: [
      'Water-resistant synthetic saffiano finish',
      'Adjustable cross-body strip with metal buckles',
      'Magnetic flap closure with key ring clip',
      'Back slot for transit and credit cards',
      'Dimensions: 7.5" x 5.2" x 2.4"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop',
    colors: ['Blush Pink', 'Midnight Blue', 'Jet Black'],
    tags: ['Trending', 'Cruelty Free'],
    rating: 4.6,
    reviewCount: 89,
    isPopular: true
  },
  {
    id: 'p4',
    name: 'Elegant Office Tote Bag',
    price: 2799,
    originalPrice: 3899,
    category: 'Shoulder Bags',
    description: 'Conquer the business day. This professional tote features an insulated laptop divider, tablet sleeve, and pens organizer.',
    details: [
      'Heavy-duty scratch-resistant leatherette',
      'Padded compartment fits up to 13.5" laptops',
      'Reinforced bottom feet for upright stance',
      'External pocket for quick access items',
      'Dimensions: 15" x 11.5" x 6"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
    colors: ['Warm Tan', 'Royal Indigo', 'Luxury Slate'],
    tags: ['Work Essential', 'Spacious'],
    rating: 4.8,
    reviewCount: 142,
    isPopular: true
  },
  {
    id: 'p5',
    name: 'Blackberry Royal Handbag',
    price: 2999,
    originalPrice: 4299,
    category: 'Handbags',
    description: 'Our crown jewel. Crafted from selected textured paneling, this handbag redefines premium structure and luxury aesthetics.',
    details: [
      'Exquisite pebbled textured paneling',
      'Premium metal hardware details',
      'Stuffed comfortable top carrying straps',
      'Middle partition pocket for optimized storage',
      'Dimensions: 13" x 10" x 6"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=600&auto=format&fit=crop',
    colors: ['Crimson Red', 'Classic Brown', 'Ivory Beige'],
    tags: ['Signature Collection', 'Premium Care'],
    rating: 5.0,
    reviewCount: 38,
    isPopular: false
  },
  {
    id: 'p6',
    name: 'Berry Mini Sling Bag',
    price: 1499,
    originalPrice: 2199,
    category: 'Sling Bags',
    description: 'A miniature wonder designed with rounded margins and tactile zip loops. The ultimate casual accessory for weekend picnics.',
    details: [
      'Grained soft touch composite leather',
      'Round-edged lightweight profile',
      'Detachable adjustable soft guitar shoulder strap',
      'Interior card pocket',
      'Dimensions: 6.8" x 6.8" x 3"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=600&auto=format&fit=crop',
    colors: ['Rose Pink', 'Baby Blue', 'Matte Black'],
    tags: ['Casual Chic', 'Millennial Favorite'],
    rating: 4.5,
    reviewCount: 42,
    isPopular: false
  },
  {
    id: 'p7',
    name: 'Diamond Shine Clutch',
    price: 1899,
    originalPrice: 2699,
    category: 'Clutches',
    description: 'Encrusted with luxurious diamond-shimmer crystal grid overlays. Catches the light elegantly at weddings, gala nights, and festivals.',
    details: [
      'Micro-sparkle geometric outer plating',
      'Smooth satin internal lining',
      'Premium push-lock gemstone trigger handle',
      'Includes thin cross-body snake chain',
      'Dimensions: 7.2" x 4" x 1.8"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1524498250077-390f9e378db0?q=80&w=600&auto=format&fit=crop',
    colors: ['Sterling Silver', 'Champagne Gold', 'Sparkle Rose'],
    tags: ['Wedding Choice', 'Ultra Elegant'],
    rating: 4.9,
    reviewCount: 77,
    isPopular: false
  },
  {
    id: 'p8',
    name: 'Classic Women Wallet',
    price: 799,
    originalPrice: 1199,
    category: 'Wallets',
    description: 'Streamlined design with smart internal layout. Holds 8+ cards, coins, receipts, and unfolded cash notes seamlessly.',
    details: [
      'Scratch-proof crossgrain texture',
      'Secure zip-around closure',
      '8 dedicated credit card slots',
      'Central zippered coin divider',
      'Dimensions: 7.8" x 4.2" x 1"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1627124112126-7d4ad155c4a4?q=80&w=600&auto=format&fit=crop',
    colors: ['Lavender Purple', 'Mint Green', 'Classic Black'],
    tags: ['Daily Carry', 'Compact Structure'],
    rating: 4.7,
    reviewCount: 112,
    isPopular: false
  },
  {
    id: 'p9',
    name: 'Luxury Travel Tote',
    price: 3499,
    originalPrice: 4999,
    category: 'Travel Bags',
    description: 'The master of transit. A high-volume travel tote finished with a trolley sleeve segment for easy airport navigation.',
    details: [
      'Water-repellent heavy canvas with leather trims',
      'Rear slide-on sleeve for luggage trolley handles',
      'Bottom expansion zippers for 30% more capacity',
      'Secure wet/oily product internal bag',
      'Dimensions: 18" x 14" x 8.5"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
    colors: ['Charcoal Ash', 'Midnight Blue', 'Desert Sand'],
    tags: ['Travel Mate', 'Max Volume'],
    rating: 4.9,
    reviewCount: 31,
    isPopular: false
  }
];

export const BLOGS: Blog[] = [
  {
    id: 'b1',
    title: 'How to Choose the Perfect Handbag',
    summary: 'Choosing the right handbag is an art form. We break down how to find the optimal size, weight, and style matching your daily routine and beautiful outfits.',
    content: [
      'Choosing the right handbag is more than just grabbing what looks good on a store shelf; it is about lifestyle alignment, comfort, and scaling.',
      '1. Assess Your Workspace & Routine: If you carry a tablet, notebook, or 13" laptop, look for structured shoulder totes with padded dividers (like our Office Tote). A weak bag layout will warp over time and cause shoulder strain.',
      '2. Shape Contrast: Pro styling tip – choose a handbag shape that contrasts with your personal body silhouette. If you are tall and slender, rounded hobo bags/slings offset your height. If you have soft curves, rectangular bags and sharp clutches provide elegant structure.',
      '3. Color Basics: While a classic black handbag is perfect for everyday use, do not sleep on beige, sand, and deep navy. They serve as exceptional neutrals that elevate both summer pastel tones and winter wool trench coats.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=600&auto=format&fit=crop',
    author: 'Elena Hayes',
    date: 'May 28, 2026',
    readTime: '4 min read',
    tags: ['Style Guide', 'Basics']
  },
  {
    id: 'b2',
    title: 'Top Handbag Trends of 2026',
    summary: 'A curated checklist of the primary movements taking over the fashion capitals this year—from clean minimal silhouettes to oversized statement tote bags.',
    content: [
      'Fashion in 2026 is an exciting merger of nostalgia and hyper-practicality. Women are opting for bags that tell a cohesive visual story without screaming for attention.',
      '• Minimalist Designs: The logo-heavy patterns of yesteryears have been replaced by silent luxury—sleek, solid, high-grain panels with minimal metal accents. It is about quiet confidence.',
      '• Pastel Sorbet Colors: Say hello to lavender, sage green, and peach-fuzz pinks. These colors allow neutral ensembles to spring to life instantly.',
      '• Sustainable and Vegan Ethics: Brands prioritizing bio-based leather and recycled satin are winning hearts. It is beautiful, feels ultra-premium, and is 100% cruelty-free.',
      '• Oversized Utilitarian Totes & Pocket Rails: Big bags are officially back! Travel and work schedules require bags that can transition effortlessly from a morning workout to a late-night corporate dinner.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop',
    author: 'Samira Sen',
    date: 'June 02, 2026',
    readTime: '3 min read',
    tags: ['Trends', '2026 Season']
  },
  {
    id: 'b3',
    title: 'How to Maintain Your Bags for Long-Term Beauty',
    summary: 'Protect your favorite investment. Easy, actionable guidelines to store, clean, and preserve vegan leather, velvet, and metallic hardware details.',
    content: [
      'Handbags aren’t just active gear—they are personal style signatures. With proper care, a premium bags lifespan can easily extend to last you a lifetime.',
      '1. Keep Bags Away from Moisture: If caught in the rain, wipe down your bag immediately with a dry microfiber cloth. Never use a hot blow dryer on vegan leather, as extreme heat causes structural stiffness and cracking.',
      '2. Store Them Properly: Avoid hanging your heavy purses on hooks when not in use—this permanently stretches the handles. Instead, stuff them gently with acid-free tissue paper to maintain original shape and store them upright inside protective cotton dust bags.',
      '3. Hardware Polish: Over time, metal zippers and buckles can collect skin oils. Clean these details regularly with a dry, soft cotton swab to prevent oxidization and maintain that gleaming gold shine!'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1598532187889-556fc1838cfc?q=80&w=600&auto=format&fit=crop',
    author: 'Radhika Nair',
    date: 'June 10, 2026',
    readTime: '5 min read',
    tags: ['Care Tips', 'Leather']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Truly beautiful designs and absolute top tier quality. BlackberryBag has quickly become my absolute favorite handbag destination!',
    date: 'June 14, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    productJoined: 'Classic Leather Handbag'
  },
  {
    id: 'r2',
    name: 'Natasha Sen',
    rating: 5,
    comment: 'The Elegant Office Tote Bag is a miracle worker. It easily stores my MacBook, water bottle, and cosmetic organizer. The dual-finish leather looks incredibly professional.',
    date: 'June 08, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?q=80&w=150&auto=format&fit=crop',
    productJoined: 'Elegant Office Tote Bag'
  },
  {
    id: 'r3',
    name: 'Riddhima Kapoor',
    rating: 4,
    comment: 'Gorgeous Diamond Shine Clutch! The silver shine grid looks stunning under party lights and it comes in a very premium box. Fits my phone perfectly.',
    date: 'May 20, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    productJoined: 'Diamond Shine Clutch'
  },
  {
    id: 'r4',
    name: 'Anjali Kohli',
    rating: 5,
    comment: 'Super fast delivery and the packaging was lovely, perfect for gifting. The Berry Mini Sling Bag has soft leather and holds everything for casual outings.',
    date: 'May 12, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    productJoined: 'Berry Mini Sling Bag'
  }
];
