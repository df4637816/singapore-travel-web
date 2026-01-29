'use client'

import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type { ItineraryDay } from '@/types'

interface ItineraryDayCardProps {
  day: ItineraryDay
  onDeleteItem: (dayId: string, itemId: string) => void
  onDeleteDay: (dayId: string) => void
  canDeleteDay: boolean
}

export function ItineraryDayCard({
  day,
  onDeleteItem,
  onDeleteDay,
  canDeleteDay,
}: ItineraryDayCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          第 {day.dayNumber} 天
        </h3>
        {canDeleteDay && (
          <button
            type="button"
            onClick={() => onDeleteDay(day.id)}
            className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            aria-label={`刪除第 ${day.dayNumber} 天`}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {day.items.length === 0 ? (
        <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
          還沒有安排行程
        </div>
      ) : (
        <ul className="space-y-2">
          {day.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
            >
              <div className="flex items-center gap-3">
                {item.type === 'restaurant' ? (
                  <span className="text-xl">🍽️</span>
                ) : (
                  <span className="text-xl">📍</span>
                )}
                <span className="font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
                {item.type === 'restaurant' && (
                  <span className="rounded bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                    餐廳
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => onDeleteItem(day.id, item.id)}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-red-600 dark:hover:bg-gray-600 dark:hover:text-red-400"
                aria-label={`刪除 ${item.name}`}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
