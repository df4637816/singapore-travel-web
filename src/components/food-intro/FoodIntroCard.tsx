import Image from 'next/image';
import { XMarkIcon, ClockIcon, SparklesIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import type { FoodCategoryIntro } from '@/types';
import { PriceRangeBadge } from './PriceRangeBadge';

interface FoodIntroCardProps {
  introduction: FoodCategoryIntro;
  onClose?: () => void;
  restaurantCount?: number;
}

export function FoodIntroCard({ introduction, onClose, restaurantCount }: FoodIntroCardProps) {
  const scrollToMap = () => {
    const mapElement = document.querySelector('#map-section');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800">
      {/* Close Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-900/90 dark:hover:bg-gray-800"
          aria-label="Close introduction"
        >
          <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      )}

      {/* Image Section */}
      {introduction.image && (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
          <Image
            src={introduction.image}
            alt={`${introduction.name} - ${introduction.nameEn || 'Singapore Food'}`}
            fill
            className="object-contain bg-gray-100 dark:bg-gray-900"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            loading="lazy"
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
            <h2 className="mb-2 text-3xl font-bold drop-shadow-lg md:text-4xl">{introduction.name}</h2>
            {introduction.nameEn && (
              <p className="text-lg drop-shadow-md">{introduction.nameEn}</p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <PriceRangeBadge range={introduction.priceRange.typical} className="bg-white/20 text-white backdrop-blur-sm" />
              {introduction.bestTime && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur-sm">
                  <ClockIcon className="h-4 w-4" />
                  {introduction.bestTime}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header Section (fallback if no image) */}
      {!introduction.image && (
        <div className="bg-linear-to-r from-primary-500 to-primary-600 px-6 py-8 text-white md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold md:text-4xl">{introduction.name}</h2>
              {introduction.nameEn && (
                <p className="text-lg text-primary-100">{introduction.nameEn}</p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <PriceRangeBadge range={introduction.priceRange.typical} className="bg-white/20 text-white" />
              {introduction.bestTime && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
                  <ClockIcon className="h-4 w-4" />
                  {introduction.bestTime}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="space-y-6 p-6 md:p-8">
        {/* Price Range Detail */}
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">價格區間</span>
            <div className="flex items-center gap-2">
              <PriceRangeBadge range={introduction.priceRange.min} />
              <span className="text-gray-400">~</span>
              <PriceRangeBadge range={introduction.priceRange.max} />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {introduction.priceRange.description}
          </p>
        </div>

        {/* Description */}
        <div>
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg">
            {introduction.description}
          </p>
        </div>

        {/* Highlights */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
            <SparklesIcon className="h-6 w-6 text-primary-500" />
            特色重點
          </h3>
          <ul className="space-y-2">
            {introduction.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Dishes */}
        {introduction.popularDishes && introduction.popularDishes.length > 0 && (
          <div>
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
              熱門菜色
            </h3>
            <div className="flex flex-wrap gap-2">
              {introduction.popularDishes.map((dish, index) => (
                <span
                  key={index}
                  className="inline-block rounded-full bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                >
                  {dish}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        {introduction.tips && introduction.tips.length > 0 && (
          <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-yellow-900 dark:text-yellow-100">
              <LightBulbIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              美食小貼士
            </h3>
            <ul className="space-y-2">
              {introduction.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-600 dark:bg-yellow-400" />
                  <span className="text-sm text-yellow-900 dark:text-yellow-100">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Restaurant Count & Link */}
        {restaurantCount !== undefined && restaurantCount > 0 && (
          <div className="flex items-center justify-between rounded-lg bg-primary-50 p-4 dark:bg-primary-900/20">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">推薦餐廳</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {restaurantCount} 間
              </p>
            </div>
            <button
              type="button"
              onClick={scrollToMap}
              className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
            >
              查看地圖
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
