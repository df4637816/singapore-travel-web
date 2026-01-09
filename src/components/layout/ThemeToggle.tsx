'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full p-2 text-primary-700 transition-colors hover:bg-primary-100 hover:text-primary-600 dark:text-primary-300 dark:hover:bg-primary-900 dark:hover:text-primary-400"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-primary-500" />
      ) : (
        <MoonIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
      )}
    </button>
  );
}
