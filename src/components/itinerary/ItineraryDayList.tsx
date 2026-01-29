'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import type { ItineraryDay } from '@/types'
import { ItineraryDayCard } from './ItineraryDayCard'

interface ItineraryDayListProps {
  days: ItineraryDay[]
  onDeleteItem: (dayId: string, itemId: string) => void
  onDeleteDay: (dayId: string) => void
  onAddDay: () => void
}

export function ItineraryDayList({
  days,
  onDeleteItem,
  onDeleteDay,
  onAddDay,
}: ItineraryDayListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">行程安排</h2>
        <button
          type="button"
          onClick={onAddDay}
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          <PlusIcon className="h-4 w-4" />
          添加天數
        </button>
      </div>

      {days.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">還沒有安排行程，開始添加地點吧！</p>
        </div>
      ) : (
        <div className="space-y-4">
          {days.map((day) => (
            <ItineraryDayCard
              key={day.id}
              day={day}
              onDeleteItem={onDeleteItem}
              onDeleteDay={onDeleteDay}
              canDeleteDay={days.length > 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
