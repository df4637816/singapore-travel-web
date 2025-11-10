import { restaurants } from '@/data/restaurants';
import type { Restaurant, FoodCategory, GeoJSONFeatureCollection } from '@/types';

/**
 * Get all restaurants
 */
export const getAllRestaurants = (): Restaurant[] => {
  return restaurants;
};

/**
 * Get restaurant by ID
 */
export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find((r) => r.id === id);
};

/**
 * Get restaurants by category
 */
export const getRestaurantsByCategory = (category: FoodCategory): Restaurant[] => {
  return restaurants.filter((r) => r.category === category);
};

/**
 * Search restaurants by name (case-insensitive)
 */
export const searchRestaurants = (query: string): Restaurant[] => {
  if (!query || query.trim() === '') {
    return [];
  }

  const lowercaseQuery = query.toLowerCase().trim();

  return restaurants.filter((r) => {
    const nameMatch = r.name.toLowerCase().includes(lowercaseQuery);
    const categoryMatch = r.category.toLowerCase().includes(lowercaseQuery);
    const nameEnMatch = r.nameEn?.toLowerCase().includes(lowercaseQuery);

    return nameMatch || categoryMatch || nameEnMatch;
  });
};

/**
 * Get restaurants near a location (within radius in km)
 */
export const getRestaurantsNearLocation = (
  lat: number,
  lng: number,
  radiusKm: number = 5,
): Restaurant[] => {
  return restaurants.filter((r) => {
    const distance = calculateDistance(lat, lng, r.coordinates.lat, r.coordinates.lng);
    return distance <= radiusKm;
  });
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 * Returns distance in kilometers
 */
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Convert degrees to radians
 */
const toRad = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

/**
 * Convert restaurants to GeoJSON format for Google Maps
 */
export const toGeoJSON = (restaurantList: Restaurant[] = restaurants): GeoJSONFeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: restaurantList.map((restaurant) => ({
      type: 'Feature',
      id: restaurant.id,
      properties: {
        name: restaurant.name,
        type: restaurant.category,
      },
      geometry: {
        type: 'Point',
        coordinates: [restaurant.coordinates.lng, restaurant.coordinates.lat], // [lng, lat] order
      },
    })),
  };
};

/**
 * Group restaurants by category
 */
export const groupByCategory = (): Record<FoodCategory, Restaurant[]> => {
  const grouped = {} as Record<FoodCategory, Restaurant[]>;

  restaurants.forEach((restaurant) => {
    if (!grouped[restaurant.category]) {
      grouped[restaurant.category] = [];
    }
    grouped[restaurant.category].push(restaurant);
  });

  return grouped;
};

/**
 * Get random restaurants
 */
export const getRandomRestaurants = (count: number = 5): Restaurant[] => {
  const shuffled = [...restaurants].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * Get statistics about restaurants
 */
export const getRestaurantStats = () => {
  const grouped = groupByCategory();

  return {
    total: restaurants.length,
    byCategory: Object.entries(grouped).map(([category, items]) => ({
      category: category as FoodCategory,
      count: items.length,
    })),
    categories: Object.keys(grouped).length,
  };
};
