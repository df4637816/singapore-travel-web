'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { GoogleMap } from '@/components/map/Map';
import { BackToTop } from '@/components/layout/BackToTop';
import type { RestaurantCategory } from '@/types';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<RestaurantCategory | null>(null);

  return (
    <main className="min-h-screen">
      <Navbar onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">新加坡美食推薦地圖</h1>
          {selectedCategory && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">當前分類：</span>
              <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                {selectedCategory.name}
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="text-sm text-gray-500 underline hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                清除篩選
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-lg shadow-lg">
          <GoogleMap selectedCategory={selectedCategory} />
        </div>
      </div>

      <BackToTop />
    </main>
  );
}
