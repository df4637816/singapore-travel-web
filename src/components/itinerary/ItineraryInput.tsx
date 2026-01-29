'use client'

import { useState, useRef, useEffect } from 'react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useDebounce } from '@/hooks/useDebounce'
import { searchRestaurants } from '@/lib/restaurantUtils'
import type { Restaurant } from '@/types'

interface ItineraryInputProps {
  days: Array<{ id: string; dayNumber: number }>
  onAddItem: (name: string, dayId: string, restaurantId?: string) => void
}

export function ItineraryInput({ days, onAddItem }: ItineraryInputProps) {
  const [query, setQuery] = useState('')
  const [selectedDayId, setSelectedDayId] = useState(days[0]?.id || '')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const debouncedQuery = useDebounce(query, 500)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const results = debouncedQuery ? searchRestaurants(debouncedQuery) : []

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Show dropdown when have results
  useEffect(() => {
    if (debouncedQuery && results.length > 0) {
      setIsOpen(true)
    }
  }, [debouncedQuery, results.length])

  // Update selected day when days change
  useEffect(() => {
    if (days.length > 0 && (!selectedDayId || !days.find((d) => d.id === selectedDayId))) {
      setSelectedDayId(days[0].id)
    }
  }, [days, selectedDayId])

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant)
    setQuery(restaurant.name)
    setIsOpen(false)
  }

  const handleAddItem = () => {
    const name = query.trim()
    if (!name || !selectedDayId) return

    if (selectedRestaurant) {
      onAddItem(name, selectedDayId, selectedRestaurant.id)
    } else {
      onAddItem(name, selectedDayId)
    }

    // Reset form
    setQuery('')
    setSelectedRestaurant(null)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddItem()
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="itinerary-input" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          搜尋餐廳或輸入地點
        </label>
        <div ref={wrapperRef} className="relative">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="itinerary-input"
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setIsOpen(true)
                setSelectedRestaurant(null)
              }}
              onFocus={() => {
                if (results.length > 0) setIsOpen(true)
              }}
              onKeyPress={handleKeyPress}
              placeholder="搜尋餐廳或輸入地點名稱..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </div>

          {/* Search results dropdown */}
          {isOpen && debouncedQuery && results.length > 0 && (
            <div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <ul className="max-h-60 overflow-y-auto">
                {results.slice(0, 10).map((restaurant) => (
                  <li key={restaurant.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectRestaurant(restaurant)}
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
            </div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="day-select" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          選擇天數
        </label>
        <select
          id="day-select"
          value={selectedDayId}
          onChange={(e) => setSelectedDayId(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 px-4 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        >
          {days.map((day) => (
            <option key={day.id} value={day.id}>
              第 {day.dayNumber} 天
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleAddItem}
        disabled={!query.trim() || !selectedDayId}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-gray-400 dark:bg-primary-500 dark:hover:bg-primary-600"
      >
        <PlusIcon className="h-5 w-5" />
        添加到行程
      </button>
    </div>
  )
}
