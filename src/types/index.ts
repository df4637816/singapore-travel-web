/**
 * Food category types for Singapore restaurants
 */
export type FoodCategory =
  | '肉骨茶'
  | '雲吞'
  | '點心'
  | '早午餐'
  | '海鮮'
  | '叻沙'
  | '剪刀剪'
  | '麵食'
  | '印度料理'
  | '咖啡'
  | '速食'
  | '椰漿飯'
  | '海南雞飯'
  | '沙嗲'
  | '鴨肉飯'
  | '印度煎餅'
  | '辣椒螃蟹'
  | '豆花'
  | '宵夜'
  | '晚餐'
  | '伴手禮'
  | '小販中心'
  | '聖淘沙'
  | '炒蘿蔔糕'
  | 'Hotel'
  | '其他';

/**
 * Price range indicator
 */
export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

/**
 * Restaurant coordinates
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Restaurant data structure
 */
export interface Restaurant {
  id: string;
  name: string;
  nameEn?: string;
  category: FoodCategory;
  coordinates: Coordinates;
  address?: string;
  description?: string;
  images?: string[];
  rating?: number;
  priceRange?: PriceRange;
  openingHours?: string;
  phone?: string;
  website?: string;
  tags?: string[];
}

/**
 * Restaurant category grouping
 */
export interface RestaurantCategory {
  id: string;
  name: FoodCategory;
  slug: string;
  description?: string;
  icon?: string;
  count?: number;
}

/**
 * GeoJSON Feature for map markers
 */
export interface GeoJSONFeature {
  type: 'Feature';
  id: string;
  properties: {
    name: string;
    type: FoodCategory;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
}

/**
 * GeoJSON Feature Collection
 */
export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

/**
 * Food category group types
 */
export type CategoryGroup =
  | 'noodles'
  | 'rice'
  | 'dim-sum'
  | 'fried'
  | 'seafood'
  | 'beverage'
  | 'dessert'
  | 'breakfast'
  | 'international'
  | 'other';

/**
 * Food category introduction with detailed information
 */
export interface FoodCategoryIntro {
  id: string;
  categoryId: string;
  name: string;
  nameEn?: string;
  description: string;
  highlights: string[];
  priceRange: {
    min: PriceRange;
    max: PriceRange;
    typical: PriceRange;
    description: string;
  };
  image?: string;
  popularDishes?: string[];
  tips?: string[];
  bestTime?: string;
  categoryGroup?: CategoryGroup;
}

/**
 * Itinerary item (restaurant or custom location)
 */
export interface ItineraryItem {
  id: string;
  name: string;
  type: 'restaurant' | 'custom'; // 来自数据库或自由输入
  restaurantId?: string; // 如果是餐厅，保存 ID
}

/**
 * Itinerary day with items
 */
export interface ItineraryDay {
  id: string;
  dayNumber: number;
  items: ItineraryItem[];
}

/**
 * Itinerary state containing all days
 */
export interface ItineraryState {
  days: ItineraryDay[];
}
