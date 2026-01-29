'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import type { ItineraryDay, ItineraryItem } from '@/types'
import { ItineraryInput } from '@/components/itinerary/ItineraryInput'
import { ItineraryDayList } from '@/components/itinerary/ItineraryDayList'

const STORAGE_KEY = 'singapore-travel-itinerary'

function loadItineraryFromStorage(): ItineraryDay[] {
  if (typeof window === 'undefined') {
    return [
      {
        id: `day-${Date.now()}`,
        dayNumber: 1,
        items: [],
      },
    ]
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // 验证数据结构
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (error) {
    console.error('Failed to load itinerary from storage:', error)
  }

  // 默认返回第一天
  return [
    {
      id: `day-${Date.now()}`,
      dayNumber: 1,
      items: [],
    },
  ]
}

function saveItineraryToStorage(days: ItineraryDay[]) {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(days))
  } catch (error) {
    console.error('Failed to save itinerary to storage:', error)
  }
}

export default function ItineraryPage() {
  const [days, setDays] = useState<ItineraryDay[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const loadedDays = loadItineraryFromStorage()
    setDays(loadedDays)
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever days change
  useEffect(() => {
    if (isLoaded) {
      saveItineraryToStorage(days)
    }
  }, [days, isLoaded])

  const handleAddItem = (name: string, dayId: string, restaurantId?: string) => {
    setDays((prevDays) =>
      prevDays.map((day) => {
        if (day.id === dayId) {
          const newItem: ItineraryItem = {
            id: `item-${Date.now()}-${Math.random()}`,
            name,
            type: restaurantId ? 'restaurant' : 'custom',
            restaurantId,
          }
          return {
            ...day,
            items: [...day.items, newItem],
          }
        }
        return day
      }),
    )
  }

  const handleDeleteItem = (dayId: string, itemId: string) => {
    setDays((prevDays) =>
      prevDays.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            items: day.items.filter((item) => item.id !== itemId),
          }
        }
        return day
      }),
    )
  }

  const handleDeleteDay = (dayId: string) => {
    if (days.length <= 1) return

    setDays((prevDays) => {
      const filtered = prevDays.filter((day) => day.id !== dayId)
      // Renumber days
      return filtered.map((day, index) => ({
        ...day,
        dayNumber: index + 1,
      }))
    })
  }

  const handleAddDay = () => {
    setDays((prevDays) => [
      ...prevDays,
      {
        id: `day-${Date.now()}-${Math.random()}`,
        dayNumber: prevDays.length + 1,
        items: [],
      },
    ])
  }

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
              <p className="text-gray-600 dark:text-gray-400">載入中...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">行程規劃</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            搜尋餐廳或輸入地點，安排您的旅遊行程
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Section - Left on desktop, top on mobile */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">添加地點</h2>
            <ItineraryInput days={days} onAddItem={handleAddItem} />
          </div>

          {/* Itinerary Display Section - Right on desktop, bottom on mobile */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <ItineraryDayList
              days={days}
              onDeleteItem={handleDeleteItem}
              onDeleteDay={handleDeleteDay}
              onAddDay={handleAddDay}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
