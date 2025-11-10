import type { RestaurantCategory } from '@/types';
import { restaurants } from './restaurants';

/**
 * Food category definitions with metadata
 */
export const categories: RestaurantCategory[] = [
  {
    id: 'bak-kut-teh',
    name: '肉骨茶',
    slug: 'bak-kut-teh',
    description: '新加坡經典肉骨茶',
  },
  {
    id: 'wonton',
    name: '雲吞',
    slug: 'wonton',
    description: '傳統雲吞麵',
  },
  {
    id: 'dim-sum',
    name: '點心',
    slug: 'dim-sum',
    description: '港式點心',
  },
  {
    id: 'breakfast',
    name: '早午餐',
    slug: 'breakfast',
    description: '新加坡傳統早午餐',
  },
  {
    id: 'seafood',
    name: '海鮮',
    slug: 'seafood',
    description: '新鮮海鮮料理',
  },
  {
    id: 'laksa',
    name: '叻沙',
    slug: 'laksa',
    description: '娘惹叻沙',
  },
  {
    id: 'scissor-cut',
    name: '剪刀剪',
    slug: 'scissor-cut',
    description: '剪刀剪咖哩飯',
  },
  {
    id: 'noodles',
    name: '麵食',
    slug: 'noodles',
    description: '各式麵食',
  },
  {
    id: 'indian',
    name: '印度料理',
    slug: 'indian',
    description: '印度美食',
  },
  {
    id: 'coffee',
    name: '咖啡',
    slug: 'coffee',
    description: '精品咖啡',
  },
  {
    id: 'fast-food',
    name: '速食',
    slug: 'fast-food',
    description: '快餐',
  },
  {
    id: 'nasi-lemak',
    name: '椰漿飯',
    slug: 'nasi-lemak',
    description: '馬來椰漿飯',
  },
  {
    id: 'chicken-rice',
    name: '海南雞飯',
    slug: 'chicken-rice',
    description: '新加坡海南雞飯',
  },
  {
    id: 'satay',
    name: '沙嗲',
    slug: 'satay',
    description: '烤肉串',
  },
  {
    id: 'duck-rice',
    name: '鴨肉飯',
    slug: 'duck-rice',
    description: '鴨肉飯',
  },
  {
    id: 'prata',
    name: '印度煎餅',
    slug: 'prata',
    description: '印度煎餅',
  },
  {
    id: 'chilli-crab',
    name: '辣椒螃蟹',
    slug: 'chilli-crab',
    description: '新加坡辣椒螃蟹',
  },
  {
    id: 'douhua',
    name: '豆花',
    slug: 'douhua',
    description: '豆花甜品',
  },
  {
    id: 'supper',
    name: '宵夜',
    slug: 'supper',
    description: '宵夜美食',
  },
  {
    id: 'dinner',
    name: '晚餐',
    slug: 'dinner',
    description: '晚餐選擇',
  },
  {
    id: 'souvenir',
    name: '伴手禮',
    slug: 'souvenir',
    description: '伴手禮',
  },
  {
    id: 'hawker',
    name: '小販中心',
    slug: 'hawker',
    description: '小販中心',
  },
  {
    id: 'sentosa',
    name: '聖淘沙',
    slug: 'sentosa',
    description: '聖淘沙美食',
  },
  {
    id: 'fried-radish-cake',
    name: '炒蘿蔔糕',
    slug: 'fried-radish-cake',
    description: '炒蘿蔔糕',
  },
  {
    id: 'hotel',
    name: 'Hotel',
    slug: 'hotel',
    description: '飯店',
  },
  {
    id: 'other',
    name: '其他',
    slug: 'other',
    description: '其他美食',
  },
];

/**
 * Get category by ID
 */
export const getCategoryById = (id: string): RestaurantCategory | undefined => {
  return categories.find((cat) => cat.id === id);
};

/**
 * Get category by name
 */
export const getCategoryByName = (name: string): RestaurantCategory | undefined => {
  return categories.find((cat) => cat.name === name);
};

/**
 * Get category by slug
 */
export const getCategoryBySlug = (slug: string): RestaurantCategory | undefined => {
  return categories.find((cat) => cat.slug === slug);
};

/**
 * Get categories with restaurant counts
 */
export const getCategoriesWithCounts = (): RestaurantCategory[] => {
  return categories.map((category) => ({
    ...category,
    count: restaurants.filter((r) => r.category === category.name).length,
  }));
};
