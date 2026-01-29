'use client';

import { useEffect, useState } from 'react';
import type { RestaurantCategory } from '@/types';
import { getFoodIntroByName } from '@/data/foodIntroductions';
import { restaurants } from '@/data/restaurants';
import { CachedFoodIntroCard } from './CachedFoodIntroCard';

interface FoodIntroSectionProps {
  selectedCategory?: RestaurantCategory | null;
  onCategoryClick?: (category: RestaurantCategory) => void;
}

export function FoodIntroSection({ selectedCategory }: FoodIntroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Get food introduction for selected category
  const foodIntro = selectedCategory ? getFoodIntroByName(selectedCategory.name) : null;

  // Count restaurants in selected category
  const restaurantCount = selectedCategory
    ? restaurants.filter((r) => r.category === selectedCategory.name).length
    : 0;

  // Show/hide animation
  useEffect(() => {
    if (foodIntro) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [foodIntro]);

  // Don't render if no introduction available
  if (!foodIntro || !selectedCategory) {
    return null;
  }

  return (
    <div
      className={`mb-8 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}
    >
      <CachedFoodIntroCard
        introduction={foodIntro}
        onClose={() => setIsVisible(false)}
        restaurantCount={restaurantCount}
      />
    </div>
  );
}
