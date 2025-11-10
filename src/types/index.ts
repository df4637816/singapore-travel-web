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
