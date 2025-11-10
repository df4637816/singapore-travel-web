'use client';

import { useState } from 'react';

// Placeholder component - will be replaced with actual Google Maps integration
export function GoogleMap() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="relative h-[600px] w-full bg-gray-100 dark:bg-gray-800">
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-2xl font-bold text-gray-700 dark:text-gray-300">
            Google Maps
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            地圖功能將在安裝依賴後實作
          </p>
          <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
            需要安裝 @vis.gl/react-google-maps 和設定 API key
          </p>
        </div>
      </div>
    </div>
  );
}
