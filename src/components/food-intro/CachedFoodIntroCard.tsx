'use client';

import { cache } from 'react';
import type { FoodCategoryIntro } from '@/types';
import { FoodIntroCard } from './FoodIntroCard';

/**
 * Cached version of getFoodIntroData
 * This ensures the same data request is deduplicated across the component tree
 */
const getFoodIntroData = cache((introduction: FoodCategoryIntro) => {
  return introduction;
});

interface CachedFoodIntroCardProps {
  introduction: FoodCategoryIntro;
  onClose?: () => void;
  restaurantCount?: number;
}

/**
 * Cached wrapper for FoodIntroCard
 * Uses React cache to prevent unnecessary re-renders and data fetching
 */
export function CachedFoodIntroCard({
  introduction,
  onClose,
  restaurantCount,
}: CachedFoodIntroCardProps) {
  const cachedIntroduction = getFoodIntroData(introduction);

  return (
    <FoodIntroCard
      introduction={cachedIntroduction}
      onClose={onClose}
      restaurantCount={restaurantCount}
    />
  );
}
