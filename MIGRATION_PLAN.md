# Next.js 16 + Tailwind CSS 重構規劃

## 專案概述

將現有的新加坡美食推薦地圖從 Webpack + Bootstrap 5 架構遷移至 Next.js 16 + Tailwind CSS 現代化架構。

---

## 📋 目標

### 技術升級
- ✅ 從 Webpack 5 遷移至 Next.js 16 App Router
- ✅ 從 Bootstrap 5 遷移至 Tailwind CSS v4
- ✅ 引入 TypeScript 強型別支援
- ✅ 改善資料架構（解決雙重維護問題）
- ✅ 提升 SEO 和效能

### 功能保留
- ✅ Google Maps 互動式地圖與餐廳標記
- ✅ 搜尋功能（autocomplete with debounce）
- ✅ 多層級導航選單（按美食類別分類）
- ✅ Dark/Light 主題切換
- ✅ 回到頂部按鈕
- ✅ 圖片 lazy loading

---

## 🏗️ 技術堆疊

### Core Framework
```json
{
  "next": "^15.1.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.7.0"
}
```

### Styling
```json
{
  "tailwindcss": "^4.0.0",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.4.49"
}
```

### UI Components & Utilities
```json
{
  "@headlessui/react": "^2.2.0",
  "@heroicons/react": "^2.2.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.0"
}
```

### Maps & Geolocation
```json
{
  "@vis.gl/react-google-maps": "^1.4.0"
}
```

### Theme Management
```json
{
  "next-themes": "^0.4.4"
}
```

### State Management & Data Fetching
```json
{
  "@tanstack/react-query": "^5.62.11",
  "zustand": "^5.0.2"
}
```

### Development Tools
```json
{
  "@biomejs/biome": "^2.3.2",
  "prettier": "^3.4.2",
  "prettier-plugin-tailwindcss": "^0.6.9"
}
```

---

## 📁 專案結構

```
singapore-travel-web/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with providers
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Tailwind directives
│   │   └── api/                      # API routes (optional)
│   │       └── restaurants/
│   │           └── route.ts
│   │
│   ├── components/                   # React components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── BackToTop.tsx
│   │   ├── map/
│   │   │   ├── Map.tsx               # Main map component
│   │   │   ├── MapMarker.tsx
│   │   │   └── LocationButton.tsx
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   └── SearchAutocomplete.tsx
│   │   └── ui/                       # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Dropdown.tsx
│   │       └── Card.tsx
│   │
│   ├── data/                         # Data layer
│   │   ├── restaurants.ts            # Restaurant data (TypeScript)
│   │   └── types.ts                  # Type definitions
│   │
│   ├── lib/                          # Utilities
│   │   ├── utils.ts                  # General utilities (cn, debounce)
│   │   └── constants.ts              # App constants
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useDebounce.ts
│   │   ├── useGeolocation.ts
│   │   └── useRestaurantSearch.ts
│   │
│   └── stores/                       # Zustand stores (if needed)
│       └── mapStore.ts
│
├── public/                           # Static assets
│   ├── images/
│   │   └── restaurants/
│   └── icons/
│
├── tailwind.config.ts                # Tailwind configuration
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── biome.json                        # Biome configuration
└── package.json
```

---

## 🗄️ 資料架構重構

### 問題：目前的雙重維護
目前餐廳資料分散在：
1. `public/index.html` - Bootstrap dropdown 選單
2. `public/app.js` - GeoJSON Feature Collection

### 解決方案：統一資料來源

#### 方案 A：TypeScript 資料檔（推薦用於初期）

**src/data/types.ts**
```typescript
export type FoodCategory =
  | '肉骨茶'
  | '雲吞'
  | '點心'
  | '早午餐'
  | '海鮮'
  | '叻沙'
  | '剪刀剪'
  | '麵食'
  | '印度料理'
  | '咖啡'
  | '速食'
  | '其他';

export interface Restaurant {
  id: string;
  name: string;
  nameEn?: string;
  category: FoodCategory;
  coordinates: {
    lat: number;
    lng: number;
  };
  address?: string;
  description?: string;
  images?: string[];
  rating?: number;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  openingHours?: string;
  phone?: string;
  website?: string;
  tags?: string[];
}

export interface RestaurantCategory {
  id: string;
  name: FoodCategory;
  slug: string;
  description?: string;
  icon?: string;
}
```

**src/data/restaurants.ts**
```typescript
import { Restaurant, RestaurantCategory } from './types';

export const categories: RestaurantCategory[] = [
  { id: '1', name: '肉骨茶', slug: 'bak-kut-teh' },
  { id: '2', name: '雲吞', slug: 'wonton' },
  { id: '3', name: '點心', slug: 'dim-sum' },
  { id: '4', name: '早午餐', slug: 'breakfast' },
  { id: '5', name: '海鮮', slug: 'seafood' },
  { id: '6', name: '叻沙', slug: 'laksa' },
  // ... more categories
];

export const restaurants: Restaurant[] = [
  {
    id: 'arabica-capita-spring',
    name: '% Arabica Singapore CapitaSpring',
    category: '咖啡',
    coordinates: { lat: 1.285088744981146, lng: 103.85029936819264 },
    address: 'CapitaSpring, Singapore',
    images: ['/images/restaurants/arabica-capita-spring.jpg'],
    tags: ['specialty-coffee', 'minimalist'],
  },
  {
    id: 'rui-chun',
    name: '瑞春',
    category: '宵夜',
    coordinates: { lat: 1.3083143605652174, lng: 103.85702521237086 },
  },
  // ... migrate all 60+ restaurants from app.js
];

// Helper function to convert to GeoJSON format if needed
export const toGeoJSON = (restaurants: Restaurant[]) => ({
  type: 'FeatureCollection' as const,
  features: restaurants.map((restaurant) => ({
    type: 'Feature' as const,
    id: restaurant.id,
    properties: {
      name: restaurant.name,
      type: restaurant.category,
    },
    geometry: {
      type: 'Point' as const,
      coordinates: [restaurant.coordinates.lng, restaurant.coordinates.lat],
    },
  })),
});

// Helper to group by category
export const getRestaurantsByCategory = (category: FoodCategory) =>
  restaurants.filter((r) => r.category === category);

// Helper for search
export const searchRestaurants = (query: string) =>
  restaurants.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );
```

#### 方案 B：JSON 檔案（易於非技術人員編輯）

**src/data/restaurants.json**
```json
[
  {
    "id": "arabica-capita-spring",
    "name": "% Arabica Singapore CapitaSpring",
    "category": "咖啡",
    "coordinates": {
      "lat": 1.285088744981146,
      "lng": 103.85029936819264
    }
  }
]
```

#### 方案 C：Database + API（未來擴展）

當餐廳數量增加或需要動態更新時：
- Supabase / PostgreSQL
- Prisma ORM
- Next.js API Routes

---

## 🎨 元件設計

### 1. Navbar Component

**src/components/layout/Navbar.tsx**
```typescript
'use client';

import { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from '../search/SearchBar';
import { categories, getRestaurantsByCategory } from '@/data/restaurants';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo.jpg"
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-xl font-bold">新加坡美食地圖</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Multi-level Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-1">
                美食資訊
              </Menu.Button>
              <Menu.Items className="absolute mt-2 w-56 rounded-md bg-white shadow-lg">
                {categories.map((category) => (
                  <NestedDropdown key={category.id} category={category} />
                ))}
              </Menu.Items>
            </Menu>

            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Search Bar */}
        {isSearchOpen && <SearchBar />}
      </div>
    </nav>
  );
}
```

### 2. Google Maps Component

**src/components/map/Map.tsx**
```typescript
'use client';

import { useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { restaurants } from '@/data/restaurants';
import { MapMarker } from './MapMarker';
import { LocationButton } from './LocationButton';

const SINGAPORE_CENTER = { lat: 1.3521, lng: 103.8198 };

export function GoogleMap() {
  const [center, setCenter] = useState(SINGAPORE_CENTER);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
          setCenter(pos);
        },
        () => {
          console.log('Geolocation not available');
        }
      );
    }
  }, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="relative h-[600px] w-full">
        <Map
          center={center}
          zoom={15}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
          className="h-full w-full"
        >
          {/* User location marker */}
          {userLocation && (
            <AdvancedMarker position={userLocation}>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
                📍
              </div>
            </AdvancedMarker>
          )}

          {/* Restaurant markers */}
          {restaurants.map((restaurant) => (
            <MapMarker key={restaurant.id} restaurant={restaurant} />
          ))}
        </Map>

        <LocationButton onClick={() => userLocation && setCenter(userLocation)} />
      </div>
    </APIProvider>
  );
}
```

### 3. Theme Toggle Component

**src/components/layout/ThemeToggle.tsx**
```typescript
'use client';

import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
}
```

### 4. Search Component with Debounce

**src/hooks/useDebounce.ts**
```typescript
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number = 800): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

**src/components/search/SearchBar.tsx**
```typescript
'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebounce } from '@/hooks/useDebounce';
import { searchRestaurants } from '@/data/restaurants';
import { SearchAutocomplete } from './SearchAutocomplete';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 800);
  const results = debouncedQuery ? searchRestaurants(debouncedQuery) : [];

  return (
    <div className="relative">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋美食..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
        />
      </div>

      {results.length > 0 && (
        <SearchAutocomplete results={results} onSelect={() => setQuery('')} />
      )}
    </div>
  );
}
```

---

## 🎯 遷移步驟

### 第一階段：專案初始化（1-2 天）

#### Step 1: 建立 Next.js 16 專案
```bash
# 在新目錄建立專案
npx create-next-app@latest singapore-travel-web-nextjs --typescript --tailwind --app --use-pnpm

# 進入專案目錄
cd singapore-travel-web-nextjs

# 安裝額外依賴
pnpm add @vis.gl/react-google-maps next-themes @headlessui/react @heroicons/react zustand clsx tailwind-merge

# 安裝開發工具
pnpm add -D @biomejs/biome prettier prettier-plugin-tailwindcss
```

#### Step 2: 設定 Tailwind CSS
**tailwind.config.ts**
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

#### Step 3: 設定環境變數
**.env.local**
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
NEXT_PUBLIC_GOOGLE_MAPS_ID=your_map_id_here
```

#### Step 4: 設定 Biome
**biome.json**
```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": [
      "node_modules",
      ".next",
      "out",
      "dist"
    ]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "always"
    }
  }
}
```

### 第二階段：資料遷移（2-3 天）

#### Task 1: 遷移餐廳資料
1. 建立 `src/data/types.ts`
2. 建立 `src/data/restaurants.ts`
3. 從 `public/app.js` 複製所有 GeoJSON 資料
4. 轉換為 TypeScript 格式
5. 為每個餐廳添加唯一 `id`
6. 驗證資料完整性

#### Task 2: 建立資料查詢函式
```typescript
// src/lib/restaurantUtils.ts
import { restaurants, categories } from '@/data/restaurants';
import type { FoodCategory } from '@/data/types';

export function getRestaurantsByCategory(category: FoodCategory) {
  return restaurants.filter((r) => r.category === category);
}

export function searchRestaurants(query: string) {
  const lowercaseQuery = query.toLowerCase();
  return restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(lowercaseQuery) ||
      r.category.includes(lowercaseQuery)
  );
}

export function getRestaurantById(id: string) {
  return restaurants.find((r) => r.id === id);
}
```

### 第三階段：核心功能實作（5-7 天）

#### Day 1-2: Layout & Navigation
- [x] 建立 Root Layout with providers
- [x] 實作 Navbar component
- [x] 實作多層級 dropdown menu
- [x] 實作 ThemeToggle
- [x] 實作 BackToTop button

#### Day 3-4: Google Maps Integration
- [x] 整合 @vis.gl/react-google-maps
- [x] 實作 Map component
- [x] 實作 MapMarker component
- [x] 實作 LocationButton
- [x] 實作 InfoWindow with restaurant details
- [x] 處理 geolocation

#### Day 5-6: Search Functionality
- [x] 實作 SearchBar component
- [x] 實作 useDebounce hook
- [x] 實作 SearchAutocomplete component
- [x] 整合搜尋結果與地圖標記

#### Day 7: Image Optimization
- [x] 遷移圖片到 `public/images/`
- [x] 使用 Next.js `<Image>` component
- [x] 設定圖片優化配置

### 第四階段：優化與測試（3-4 天）

#### Performance Optimization
```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
```

#### SEO Configuration
**src/app/layout.tsx**
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '新加坡美食推薦地圖 | Singapore Food Guide',
  description: '探索新加坡最佳美食地點，包括肉骨茶、海南雞飯、叻沙等道地美食',
  keywords: ['新加坡美食', 'Singapore Food', '肉骨茶', 'Laksa', '海南雞飯'],
  openGraph: {
    title: '新加坡美食推薦地圖',
    description: '探索新加坡最佳美食地點',
    type: 'website',
    locale: 'zh_TW',
  },
};
```

---

## 🚀 額外改進建議

### 1. TypeScript 強型別
- 所有 component 使用 TypeScript
- 定義完整的 interface 和 type
- 啟用 strict mode

### 2. 響應式設計
- 使用 Tailwind 的 responsive utilities
- Mobile-first approach
- 測試 tablet/mobile 體驗

### 3. 效能優化
- 使用 Next.js `<Image>` component
- 實作 dynamic imports for heavy components
- 使用 React.memo 優化重渲染
- 實作 virtual scrolling for long lists

### 4. SEO 增強
- 使用 Next.js Metadata API
- 添加 structured data (JSON-LD)
- 實作 sitemap.xml
- 優化 Open Graph tags

### 5. Progressive Web App (PWA)
```bash
pnpm add next-pwa
```

**next.config.ts**
```typescript
import withPWA from 'next-pwa';

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})({
  // ... existing config
});
```

### 6. Analytics
```bash
pnpm add @vercel/analytics
```

### 7. Error Handling
- 建立 `error.tsx` for error boundaries
- 建立 `not-found.tsx` for 404 pages
- 實作 toast notifications

### 8. Accessibility (a11y)
- 使用 semantic HTML
- 添加 ARIA labels
- 確保 keyboard navigation
- 測試 screen reader compatibility

### 9. Testing
```bash
pnpm add -D @testing-library/react @testing-library/jest-dom vitest
```

建立測試檔案：
- Component tests
- Hook tests
- Utility function tests

### 10. CI/CD
建立 `.github/workflows/ci.yml`：
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm build
```

---

## 📦 Migration Checklist

### 專案設定
- [ ] 建立 Next.js 16 專案
- [ ] 設定 Tailwind CSS
- [ ] 設定 TypeScript
- [ ] 設定 Biome
- [ ] 設定環境變數
- [ ] 設定 Git repository

### 資料遷移
- [ ] 建立 type definitions
- [ ] 遷移餐廳資料到 TypeScript
- [ ] 建立資料查詢函式
- [ ] 驗證資料完整性

### 元件實作
- [ ] Layout components (Navbar, Footer)
- [ ] Theme toggle
- [ ] Google Maps integration
- [ ] Map markers with info windows
- [ ] Search bar with autocomplete
- [ ] Multi-level dropdown menu
- [ ] Back to top button
- [ ] Mobile menu

### 功能測試
- [ ] 地圖顯示正常
- [ ] 標記點擊顯示資訊
- [ ] 搜尋功能正常
- [ ] Theme 切換正常
- [ ] Geolocation 功能正常
- [ ] Mobile responsive 正常

### 優化
- [ ] 圖片優化
- [ ] SEO metadata
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Cross-browser testing

### 部署
- [ ] 設定 Vercel/Netlify
- [ ] 環境變數設定
- [ ] Domain 設定
- [ ] Analytics 整合

---

## 🎓 學習資源

### Next.js 16
- [Next.js Official Docs](https://nextjs.org/docs)
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)

### Tailwind CSS
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Headless UI](https://headlessui.com/)

### Google Maps
- [@vis.gl/react-google-maps](https://visgl.github.io/react-google-maps/)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

## 📊 估計時程

| 階段 | 工作內容 | 時間 |
|------|---------|------|
| 1 | 專案初始化與設定 | 1-2 天 |
| 2 | 資料架構遷移 | 2-3 天 |
| 3 | 核心功能實作 | 5-7 天 |
| 4 | 優化與測試 | 3-4 天 |
| 5 | 部署與文件 | 1-2 天 |
| **總計** | | **12-18 天** |

---

## ⚠️ 注意事項

1. **Google Maps API Key**: 確保申請並設定正確的 API key 和 Map ID
2. **資料備份**: 遷移前備份所有現有資料
3. **漸進式遷移**: 可以考慮先在新專案實作部分功能，測試無誤後再全面遷移
4. **環境變數**: 不要將 API keys 提交到 Git
5. **圖片優化**: 壓縮圖片以提升載入速度
6. **瀏覽器相容性**: 測試主流瀏覽器（Chrome, Safari, Firefox, Edge）
7. **行動裝置**: 特別注意行動裝置體驗

---

## 🔄 Git Workflow

### Branch Strategy
```bash
# 建立開發分支
git checkout -b feature/nextjs-migration

# 各功能子分支
git checkout -b feature/data-migration
git checkout -b feature/map-component
git checkout -b feature/search-functionality
```

### Commit Convention
使用 Conventional Commits：
```bash
feat: add Google Maps integration
fix: resolve search debounce issue
refactor: migrate restaurant data to TypeScript
docs: update migration plan
style: format code with Biome
```

---

## 📝 後續維護

### 更新 CLAUDE.md
遷移完成後，更新專案指南：
- 新增 Next.js 16 開發指令
- 更新專案結構說明
- 更新技術堆疊
- 新增 TypeScript 相關說明
- 更新資料管理方式

### 文件維護
- 保持 README.md 更新
- 撰寫 API 文件（如果有後端）
- 維護元件使用範例
- 記錄常見問題 (FAQ)

---

## 🎉 預期成果

遷移完成後，你將擁有：

✅ 現代化的 Next.js 16 架構
✅ 優雅的 Tailwind CSS 設計系統
✅ 完整的 TypeScript 型別支援
✅ 統一的資料管理系統
✅ 更好的 SEO 和效能
✅ 易於維護和擴展的程式碼結構
✅ 完整的開發工具鏈

準備好開始了嗎？讓我們開始第一階段的專案初始化！
