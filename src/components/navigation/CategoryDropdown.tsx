'use client';

import { useMemo } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { getCategoriesWithCounts } from '@/data/categories';
import type { RestaurantCategory } from '@/types';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

interface CategoryDropdownProps {
  onCategorySelect?: (category: RestaurantCategory | null) => void;
  selectedCategory?: RestaurantCategory | null;
}

export function CategoryDropdown({ onCategorySelect, selectedCategory }: CategoryDropdownProps) {
  const categoriesWithCounts = useMemo(() => getCategoriesWithCounts(), []);

  // Group categories by type for better organization
  const popularCategories = useMemo(
    () =>
      categoriesWithCounts.filter((cat) =>
        ['肉骨茶', '海南雞飯', '叻沙', '海鮮', '早午餐', '咖啡'].includes(cat.name),
      ),
    [categoriesWithCounts],
  );

  const noodlesAndRice = useMemo(
    () =>
      categoriesWithCounts.filter((cat) =>
        ['麵食', '雲吞', '鴨肉飯', '剪刀剪', '椰漿飯'].includes(cat.name),
      ),
    [categoriesWithCounts],
  );

  const snacksAndDesserts = useMemo(
    () =>
      categoriesWithCounts.filter((cat) =>
        ['點心', '豆花', '炒蘿蔔糕'].includes(cat.name),
      ),
    [categoriesWithCounts],
  );

  const internationalCuisine = useMemo(
    () =>
      categoriesWithCounts.filter((cat) =>
        ['印度料理', '印度煎餅', '速食'].includes(cat.name),
      ),
    [categoriesWithCounts],
  );

  const otherCategories = useMemo(
    () =>
      categoriesWithCounts.filter(
        (cat) =>
          ![...popularCategories, ...noodlesAndRice, ...snacksAndDesserts, ...internationalCuisine]
            .map((c) => c.name)
            .includes(cat.name),
      ),
    [categoriesWithCounts, popularCategories, noodlesAndRice, snacksAndDesserts, internationalCuisine],
  );

  const handleSelectCategory = (category: RestaurantCategory | null) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-700 dark:hover:bg-gray-700">
        {selectedCategory ? selectedCategory.name : '美食分類'}
        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-72 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-leave:duration-75 data-enter:ease-out data-leave:ease-in dark:bg-gray-800 dark:ring-gray-700"
      >
        <div className="py-1">
          {/* All Restaurants Option */}
          <MenuItem>
            {({ focus }) => (
              <button
                type="button"
                onClick={() => handleSelectCategory(null)}
                className={`${focus ? 'bg-gray-100 dark:bg-gray-700' : ''} ${
                  !selectedCategory ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                } block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">全部餐廳</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {categoriesWithCounts.reduce((sum, cat) => sum + (cat.count || 0), 0)}
                  </span>
                </div>
              </button>
            )}
          </MenuItem>

          <div className="my-1 border-t border-gray-200 dark:border-gray-700" />

          {/* Popular Categories */}
          <div className="px-4 py-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              熱門美食
            </div>
          </div>
          {popularCategories.map((category) => (
            <MenuItem key={category.id}>
              {({ focus }) => (
                <button
                  type="button"
                  onClick={() => handleSelectCategory(category)}
                  className={`${focus ? 'bg-gray-100 dark:bg-gray-700' : ''} ${
                    selectedCategory?.id === category.id
                      ? 'bg-primary-50 dark:bg-primary-900/20'
                      : ''
                  } block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {category.count || 0}
                    </span>
                  </div>
                </button>
              )}
            </MenuItem>
          ))}

          <div className="my-1 border-t border-gray-200 dark:border-gray-700" />

          {/* Noodles & Rice */}
          <div className="px-4 py-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              麵飯類
            </div>
          </div>
          {noodlesAndRice.map((category) => (
            <MenuItem key={category.id}>
              {({ focus }) => (
                <button
                  type="button"
                  onClick={() => handleSelectCategory(category)}
                  className={`${focus ? 'bg-gray-100 dark:bg-gray-700' : ''} ${
                    selectedCategory?.id === category.id
                      ? 'bg-primary-50 dark:bg-primary-900/20'
                      : ''
                  } block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {category.count || 0}
                    </span>
                  </div>
                </button>
              )}
            </MenuItem>
          ))}

          <div className="my-1 border-t border-gray-200 dark:border-gray-700" />

          {/* Snacks & Desserts */}
          <div className="px-4 py-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              點心甜品
            </div>
          </div>
          {snacksAndDesserts.map((category) => (
            <MenuItem key={category.id}>
              {({ focus }) => (
                <button
                  type="button"
                  onClick={() => handleSelectCategory(category)}
                  className={`${focus ? 'bg-gray-100 dark:bg-gray-700' : ''} ${
                    selectedCategory?.id === category.id
                      ? 'bg-primary-50 dark:bg-primary-900/20'
                      : ''
                  } block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {category.count || 0}
                    </span>
                  </div>
                </button>
              )}
            </MenuItem>
          ))}

          <div className="my-1 border-t border-gray-200 dark:border-gray-700" />

          {/* International Cuisine */}
          <div className="px-4 py-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              異國料理
            </div>
          </div>
          {internationalCuisine.map((category) => (
            <MenuItem key={category.id}>
              {({ focus }) => (
                <button
                  type="button"
                  onClick={() => handleSelectCategory(category)}
                  className={`${focus ? 'bg-gray-100 dark:bg-gray-700' : ''} ${
                    selectedCategory?.id === category.id
                      ? 'bg-primary-50 dark:bg-primary-900/20'
                      : ''
                  } block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {category.count || 0}
                    </span>
                  </div>
                </button>
              )}
            </MenuItem>
          ))}

          {otherCategories.length > 0 && (
            <>
              <div className="my-1 border-t border-gray-200 dark:border-gray-700" />

              {/* Other Categories */}
              <div className="px-4 py-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  其他
                </div>
              </div>
              {otherCategories.map((category) => (
                <MenuItem key={category.id}>
                  {({ focus }) => (
                    <button
                      type="button"
                      onClick={() => handleSelectCategory(category)}
                      className={`${focus ? 'bg-gray-100 dark:bg-gray-700' : ''} ${
                        selectedCategory?.id === category.id
                          ? 'bg-primary-50 dark:bg-primary-900/20'
                          : ''
                      } block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {category.count || 0}
                        </span>
                      </div>
                    </button>
                  )}
                </MenuItem>
              ))}
            </>
          )}

          {/* Theme Toggle Section */}
          <div className="my-1 border-t border-gray-200 dark:border-gray-700" />
          <div className="px-4 py-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                主題
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </MenuItems>
    </Menu>
  );
}
