'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from '../search/SearchBar';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10">
              <Image
                src="/images/logo.jpg"
                alt="Logo"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-xl font-bold">新加坡美食地圖</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <a href="#map" className="hover:text-primary-600 dark:hover:text-primary-400">
              地圖
            </a>
            <a href="#about" className="hover:text-primary-600 dark:hover:text-primary-400">
              關於
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
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

        {/* Search Bar */}
        <div className="pb-4">
          <SearchBar />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 py-4 dark:border-gray-800 md:hidden">
            <div className="flex flex-col space-y-4">
              <a
                href="#map"
                className="hover:text-primary-600 dark:hover:text-primary-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                地圖
              </a>
              <a
                href="#about"
                className="hover:text-primary-600 dark:hover:text-primary-400"
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
