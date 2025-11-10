'use client';

import { useState, useCallback, useMemo } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { restaurants } from '@/data/restaurants';
import type { Restaurant, RestaurantCategory } from '@/types';
import { LocationButton } from './LocationButton';

const SINGAPORE_CENTER = { lat: 1.3521, lng: 103.8198 };
const DEFAULT_ZOOM = 12;

interface GoogleMapProps {
  selectedCategory?: RestaurantCategory | null;
}

export function GoogleMap({ selectedCategory }: GoogleMapProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState(SINGAPORE_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  // Filter restaurants by selected category
  const filteredRestaurants = useMemo(() => {
    if (!selectedCategory) {
      return restaurants;
    }
    return restaurants.filter((r) => r.category === selectedCategory.name);
  }, [selectedCategory]);

  // Get user's current location
  const handleGetUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
          setMapCenter(pos);
          setZoom(15);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('無法取得您的位置');
        },
      );
    } else {
      alert('您的瀏覽器不支援定位功能');
    }
  }, []);

  // API key check
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID;

  if (!apiKey) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <div className="mb-4 text-2xl font-bold text-gray-700 dark:text-gray-300">
            Google Maps 未配置
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            請在 .env.local 設定 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          </p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="relative h-[600px] w-full">
        <Map
          mapId={mapId || 'singapore-food-map'}
          defaultCenter={SINGAPORE_CENTER}
          center={mapCenter}
          defaultZoom={DEFAULT_ZOOM}
          zoom={zoom}
          gestureHandling="greedy"
          disableDefaultUI={false}
          className="h-full w-full"
          onCenterChanged={(e) => {
            if (e.detail.center) {
              setMapCenter(e.detail.center);
            }
          }}
          onZoomChanged={(e) => {
            if (e.detail.zoom) {
              setZoom(e.detail.zoom);
            }
          }}
        >
          {/* User location marker */}
          {userLocation && (
            <AdvancedMarker position={userLocation}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
                <span className="text-lg">📍</span>
              </div>
            </AdvancedMarker>
          )}

          {/* Restaurant markers */}
          {filteredRestaurants.map((restaurant) => (
            <AdvancedMarker
              key={restaurant.id}
              position={restaurant.coordinates}
              onClick={() => setSelectedRestaurant(restaurant)}
            >
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-transform hover:scale-110">
                <span className="text-xl">🍽️</span>
              </div>
            </AdvancedMarker>
          ))}

          {/* Info window for selected restaurant */}
          {selectedRestaurant && (
            <InfoWindow
              position={selectedRestaurant.coordinates}
              onCloseClick={() => setSelectedRestaurant(null)}
            >
              <div className="p-2">
                <h3 className="mb-1 font-bold text-gray-900">{selectedRestaurant.name}</h3>
                <p className="text-sm text-gray-600">
                  <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                    {selectedRestaurant.category}
                  </span>
                </p>
                {selectedRestaurant.address && (
                  <p className="mt-1 text-xs text-gray-500">{selectedRestaurant.address}</p>
                )}
              </div>
            </InfoWindow>
          )}
        </Map>

        {/* Location button */}
        <LocationButton onClick={handleGetUserLocation} />
      </div>
    </APIProvider>
  );
}
