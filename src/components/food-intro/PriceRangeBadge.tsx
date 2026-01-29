import type { PriceRange } from '@/types';

interface PriceRangeBadgeProps {
  range: PriceRange;
  className?: string;
}

const priceRangeConfig = {
  $: {
    color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    label: '$ - 經濟實惠',
  },
  $$: {
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    label: '$$ - 中等價位',
  },
  $$$: {
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    label: '$$$ - 中高價位',
  },
  $$$$: {
    color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    label: '$$$$ - 高檔消費',
  },
};

export function PriceRangeBadge({ range, className = '' }: PriceRangeBadgeProps) {
  const config = priceRangeConfig[range];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${config.color} ${className}`}
      title={config.label}
    >
      {range}
    </span>
  );
}
