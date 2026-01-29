import { useMemo } from 'react';
import type { RestaurantCategory, FoodCategoryIntro } from '@/types';
import { getFoodIntroByName, getFoodIntroByCategory } from '@/data/foodIntroductions';
import { restaurants } from '@/data/restaurants';

/**
 * Custom hook to get food introduction for a category
 */
export function useFoodIntro(category?: RestaurantCategory | null) {
  const foodIntro = useMemo(() => {
    if (!category) return null;
    return getFoodIntroByName(category.name);
  }, [category]);

  const restaurantCount = useMemo(() => {
    if (!category) return 0;
    return restaurants.filter((r) => r.category === category.name).length;
  }, [category]);

  return {
    foodIntro,
    restaurantCount,
    hasIntro: !!foodIntro,
  };
}

/**
 * Custom hook to get food introduction by category ID
 */
export function useFoodIntroById(categoryId?: string | null) {
  const foodIntro = useMemo(() => {
    if (!categoryId) return null;
    return getFoodIntroByCategory(categoryId);
  }, [categoryId]);

  return {
    foodIntro,
    hasIntro: !!foodIntro,
  };
}
