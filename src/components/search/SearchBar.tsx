'use client';

import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebounce } from '@/hooks/useDebounce';
import { searchRestaurants } from '@/lib/restaurantUtils';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = debouncedQuery ? searchRestaurants(debouncedQuery) : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show dropdown when have results
  useEffect(() => {
    if (debouncedQuery && results.length > 0) {
      setIsOpen(true);
    }
  }, [debouncedQuery, results.length]);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder="搜尋美食餐廳..."
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
        />
      </div>

      {/* Search results dropdown */}
      {isOpen && debouncedQuery && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {results.length > 0 ? (
            <ul className="max-h-96 overflow-y-auto">
              {results.slice(0, 10).map((restaurant) => (
                <li key={restaurant.id}>
                  <button
                    type="button"
                    onClick={() => {
                      console.log('Selected:', restaurant.name);
                      setQuery('');
                      setIsOpen(false);
                    }}
                    className="w-full border-b border-gray-100 px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {restaurant.name}
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="inline-block rounded bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                            {restaurant.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-2xl">🍽️</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
              找不到符合的餐廳
            </div>
          )}

          {results.length > 10 && (
            <div className="border-t border-gray-200 p-2 text-center text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
              還有 {results.length - 10} 個結果未顯示
            </div>
          )}
        </div>
      )}
    </div>
  );
}
