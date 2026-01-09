'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from '../search/SearchBar';
import { CategoryDropdown } from '../navigation/CategoryDropdown';
import type { RestaurantCategory } from '@/types';

interface NavbarProps {
  onCategorySelect?: (category: RestaurantCategory | null) => void;
  selectedCategory?: RestaurantCategory | null;
}

export function Navbar({ onCategorySelect, selectedCategory }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-primary-50 shadow-md dark:bg-primary-950">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary-500 dark:ring-primary-500">
              <Image
                src="/img/大哥.jpg"
                alt="新加坡美食地圖 Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-xl font-bold text-primary-700 dark:text-primary-300">新加坡美食地圖</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <CategoryDropdown
              onCategorySelect={onCategorySelect}
              selectedCategory={selectedCategory}
            />
            <a href="#map" className="text-primary-700 transition-colors hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400">
              地圖
            </a>
            <a href="#about" className="text-primary-700 transition-colors hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400">
              關於
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-lg p-2 text-primary-700 transition-colors hover:bg-primary-100 hover:text-primary-600 dark:text-primary-300 dark:hover:bg-primary-900 dark:hover:text-primary-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Search Bar and Category Filter */}
        <div className="flex flex-col gap-3 pb-4 md:flex-row md:items-center">
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="md:hidden">
            <CategoryDropdown
              onCategorySelect={onCategorySelect}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-primary-200 py-4 dark:border-primary-800 md:hidden">
            <div className="flex flex-col space-y-4">
              <a
                href="#map"
                className="text-primary-700 transition-colors hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                地圖
              </a>
              <a
                href="#about"
                className="text-primary-700 transition-colors hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                關於
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
