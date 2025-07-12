
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  healthScore: number; // 1-5
  ecoScore: number; // 1-5
  availability: boolean;
  rating: number;
  reviews: number;
  brand: string;
  tags: string[];
  alternatives?: string[];
  nutrients?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Whole Wheat Bread',
    category: 'Bakery',
    price: 3.99,
    originalPrice: 4.49,
    description: 'Fresh organic whole wheat bread made with premium ingredients',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
    healthScore: 4,
    ecoScore: 5,
    availability: true,
    rating: 4.5,
    reviews: 234,
    brand: 'Nature\'s Best',
    tags: ['organic', 'whole grain', 'healthy'],
    alternatives: ['2', '3'],
    nutrients: { calories: 80, protein: 4, carbs: 15, fat: 1 }
  },
  {
    id: '2',
    name: 'White Sandwich Bread',
    category: 'Bakery',
    price: 2.49,
    description: 'Classic white sandwich bread, soft and fresh',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&h=300&fit=crop',
    healthScore: 2,
    ecoScore: 3,
    availability: true,
    rating: 4.0,
    reviews: 156,
    brand: 'Daily Fresh',
    tags: ['affordable', 'classic'],
    alternatives: ['1', '3'],
    nutrients: { calories: 90, protein: 3, carbs: 18, fat: 1 }
  },
  {
    id: '3',
    name: 'Multigrain Artisan Bread',
    category: 'Bakery',
    price: 5.99,
    description: 'Premium multigrain artisan bread with seeds and nuts',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=300&fit=crop',
    healthScore: 5,
    ecoScore: 4,
    availability: true,
    rating: 4.8,
    reviews: 89,
    brand: 'Artisan Choice',
    tags: ['premium', 'multigrain', 'artisan'],
    alternatives: ['1', '2'],
    nutrients: { calories: 85, protein: 5, carbs: 14, fat: 2 }
  },
  {
    id: '4',
    name: 'Fresh Organic Bananas',
    category: 'Produce',
    price: 1.99,
    description: 'Sweet, ripe organic bananas - perfect for snacking',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop',
    healthScore: 5,
    ecoScore: 4,
    availability: true,
    rating: 4.6,
    reviews: 445,
    brand: 'Farm Fresh',
    tags: ['organic', 'healthy', 'fruit'],
    alternatives: ['5', '6'],
    nutrients: { calories: 105, protein: 1, carbs: 27, fat: 0 }
  },
  {
    id: '5',
    name: 'Red Delicious Apples',
    category: 'Produce',
    price: 3.49,
    description: 'Crisp and sweet red delicious apples, locally grown',
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=300&h=300&fit=crop',
    healthScore: 5,
    ecoScore: 5,
    availability: true,
    rating: 4.4,
    reviews: 223,
    brand: 'Local Harvest',
    tags: ['local', 'fresh', 'fruit'],
    alternatives: ['4', '6'],
    nutrients: { calories: 95, protein: 0, carbs: 25, fat: 0 }
  },
  {
    id: '6',
    name: 'Mixed Berry Pack',
    category: 'Produce',
    price: 6.99,
    description: 'Fresh mixed berries - strawberries, blueberries, and raspberries',
    image: 'https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?w=300&h=300&fit=crop',
    healthScore: 5,
    ecoScore: 4,
    availability: true,
    rating: 4.7,
    reviews: 167,
    brand: 'Berry Best',
    tags: ['fresh', 'antioxidants', 'premium'],
    alternatives: ['4', '5'],
    nutrients: { calories: 60, protein: 1, carbs: 14, fat: 0 }
  },
  {
    id: '7',
    name: 'Greek Yogurt - Vanilla',
    category: 'Dairy',
    price: 4.99,
    description: 'Creamy Greek yogurt with natural vanilla flavor',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop',
    healthScore: 4,
    ecoScore: 3,
    availability: true,
    rating: 4.3,
    reviews: 312,
    brand: 'Greek Goddess',
    tags: ['protein', 'healthy', 'probiotics'],
    alternatives: ['8', '9'],
    nutrients: { calories: 130, protein: 15, carbs: 6, fat: 6 }
  },
  {
    id: '8',
    name: 'Almond Milk - Unsweetened',
    category: 'Dairy Alternatives',
    price: 3.79,
    description: 'Fresh almond milk, unsweetened and organic',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop',
    healthScore: 4,
    ecoScore: 5,
    availability: true,
    rating: 4.2,
    reviews: 198,
    brand: 'Nutty Nature',
    tags: ['vegan', 'organic', 'dairy-free'],
    alternatives: ['7', '9'],
    nutrients: { calories: 30, protein: 1, carbs: 1, fat: 3 }
  },
  {
    id: '9',
    name: 'Whole Milk - Organic',
    category: 'Dairy',
    price: 4.29,
    description: 'Rich, creamy organic whole milk from grass-fed cows',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop',
    healthScore: 3,
    ecoScore: 4,
    availability: true,
    rating: 4.5,
    reviews: 276,
    brand: 'Meadow Fresh',
    tags: ['organic', 'grass-fed', 'creamy'],
    alternatives: ['7', '8'],
    nutrients: { calories: 150, protein: 8, carbs: 12, fat: 8 }
  },
  {
    id: '10',
    name: 'Wild Caught Salmon Fillet',
    category: 'Seafood',
    price: 12.99,
    description: 'Premium wild-caught Atlantic salmon, fresh and sustainable',
    image: 'https://images.unsplash.com/photo-1544943854-a7e68a0d6e66?w=300&h=300&fit=crop',
    healthScore: 5,
    ecoScore: 5,
    availability: true,
    rating: 4.8,
    reviews: 134,
    brand: 'Ocean\'s Best',
    tags: ['wild-caught', 'omega-3', 'premium'],
    alternatives: ['11', '12'],
    nutrients: { calories: 206, protein: 22, carbs: 0, fat: 12 }
  },
  {
    id: '11',
    name: 'Organic Chicken Breast',
    category: 'Meat',
    price: 8.99,
    description: 'Free-range organic chicken breast, tender and juicy',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop',
    healthScore: 4,
    ecoScore: 4,
    availability: true,
    rating: 4.4,
    reviews: 187,
    brand: 'Farm Pride',
    tags: ['organic', 'free-range', 'lean protein'],
    alternatives: ['10', '12'],
    nutrients: { calories: 165, protein: 31, carbs: 0, fat: 4 }
  },
  {
    id: '12',
    name: 'Plant-Based Protein Burger',
    category: 'Plant-Based',
    price: 7.99,
    description: 'Delicious plant-based protein burger, tastes like the real thing',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300&h=300&fit=crop',
    healthScore: 4,
    ecoScore: 5,
    availability: true,
    rating: 4.1,
    reviews: 298,
    brand: 'Green Future',
    tags: ['plant-based', 'sustainable', 'protein'],
    alternatives: ['10', '11'],
    nutrients: { calories: 240, protein: 20, carbs: 8, fat: 14 }
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const categories = [...new Set(products.map(product => product.category))];
