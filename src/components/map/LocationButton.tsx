'use client';

import { MapPinIcon } from '@heroicons/react/24/outline';

interface LocationButtonProps {
  onClick: () => void;
}

export function LocationButton({ onClick }: LocationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute bottom-24 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
      aria-label="回到目前位置"
      title="回到目前位置"
    >
      <MapPinIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    </button>
  );
}
