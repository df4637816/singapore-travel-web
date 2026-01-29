# 新加坡美食推薦地圖 - Next.js 16 版本

這是新加坡美食推薦地圖的 Next.js 16 重構版本，使用 TypeScript + Tailwind CSS 打造。

## 🚀 快速開始

### 1. 安裝依賴

```bash
# 複製 package-nextjs.json 為 package.json
cp package-nextjs.json package.json

# 使用 pnpm 安裝依賴
pnpm install
```

### 2. 設定環境變數

```bash
# 複製環境變數範例檔案
cp .env.local.example .env.local

# 編輯 .env.local 並填入你的 Google Maps API key
```

需要設定的環境變數：

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps JavaScript API key
- `NEXT_PUBLIC_GOOGLE_MAPS_ID`: Google Maps ID (用於 Advanced Markers)

### 3. 啟動開發伺服器

```bash
pnpm dev
```

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

## 📁 專案結構

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with ThemeProvider
│   ├── page.tsx           # 首頁
│   └── globals.css        # 全域樣式與主題顏色
├── components/            # React 元件
│   ├── layout/           # Layout 元件
│   │   ├── Navbar.tsx     # 導航欄（含分類下拉選單）
│   │   ├── ThemeToggle.tsx # 明暗模式切換
│   │   └── BackToTop.tsx  # 回到頂部按鈕
│   ├── map/              # 地圖元件
│   │   ├── Map.tsx        # Google Maps 主元件
│   │   └── LocationButton.tsx # 定位按鈕
│   ├── navigation/        # 導航元件
│   │   └── CategoryDropdown.tsx # 分類下拉選單
│   ├── search/           # 搜尋元件
│   │   └── SearchBar.tsx # 搜尋欄（含自動完成）
│   ├── food-intro/       # 美食介紹元件
│   │   ├── FoodIntroSection.tsx
│   │   ├── FoodIntroCard.tsx
│   │   ├── CachedFoodIntroCard.tsx
│   │   └── PriceRangeBadge.tsx
│   └── ui/               # UI 元件（預留）
├── data/                 # 資料層
│   ├── restaurants.ts    # 餐廳資料（62 間餐廳）
│   ├── categories.ts     # 分類資料
│   └── foodIntroductions.ts # 美食介紹資料
├── hooks/                # Custom hooks
│   ├── useDebounce.ts    # 防抖動 Hook
│   └── useFoodIntro.ts   # 美食介紹 Hook
├── lib/                  # 工具函式
│   ├── restaurantUtils.ts # 餐廳查詢工具
│   └── utils.ts          # 通用工具
├── types/                # TypeScript 型別定義
│   └── index.ts          # 所有型別定義
└── stores/               # Zustand stores（未來使用）
```

## 🛠️ 可用指令

### 開發

```bash
pnpm dev          # 啟動開發伺服器
pnpm build        # 建置生產版本
pnpm start        # 啟動生產伺服器
```

### 程式碼品質

```bash
pnpm lint         # 執行 Biome linter
pnpm format       # 格式化程式碼（Biome）
pnpm type-check   # TypeScript 型別檢查
```

## 📋 開發進度

### ✅ 已完成

#### 專案基礎設定

- [x] Next.js 16 + TypeScript 5.7
- [x] Tailwind CSS v4 配置
- [x] Biome 程式碼品質工具
- [x] 環境變數設定
- [x] Git 分支策略

#### 資料遷移

- [x] 從 `public/app.js` 提取餐廳資料
- [x] 轉換為 TypeScript 格式 (`src/data/restaurants.ts`)
- [x] 建立分類資料 (`src/data/categories.ts`)
- [x] 建立美食介紹資料 (`src/data/foodIntroductions.ts`)
- [x] 建立資料查詢工具函式 (`src/lib/restaurantUtils.ts`)
- [x] 驗證資料完整性（62 間餐廳）

#### 核心元件

- [x] **Layout 元件**
  - [x] Navbar（響應式導航欄）
  - [x] ThemeToggle（明暗模式切換）
  - [x] BackToTop（回到頂部按鈕）
- [x] **地圖功能**
  - [x] Google Maps 整合 (`@vis.gl/react-google-maps`)
  - [x] Map 主元件（支援標記、資訊視窗）
  - [x] AdvancedMarker 標記
  - [x] InfoWindow 餐廳詳情
  - [x] LocationButton 定位功能
  - [x] Geolocation 處理
  - [x] 地圖與分類篩選整合
- [x] **搜尋功能**
  - [x] SearchBar 元件
  - [x] useDebounce Hook
  - [x] 搜尋自動完成 UI
  - [x] 搜尋結果與地圖標記同步
- [x] **導航選單**
  - [x] CategoryDropdown 多層級下拉選單
  - [x] 食物類別分類
  - [x] 分類篩選功能
- [x] **美食介紹**
  - [x] FoodIntroSection 元件
  - [x] FoodIntroCard 卡片元件
  - [x] PriceRangeBadge 價格標籤
  - [x] useFoodIntro Hook

#### 主題系統

- [x] 明暗模式切換（next-themes）
- [x] 自訂 Primary 顏色調色板
  - [x] 淺色模式顏色配置
  - [x] 深色模式顏色配置
- [x] 主題切換按鈕整合到導航欄

#### TypeScript 型別定義

- [x] Restaurant 介面
- [x] RestaurantCategory 介面
- [x] FoodCategory 型別
- [x] Coordinates 介面
- [x] GeoJSON 相關型別
- [x] FoodCategoryIntro 介面

#### Custom Hooks

- [x] useDebounce（防抖動）
- [x] useFoodIntro（美食介紹資料）

### ⏳ 待完成

#### 功能增強

- [x] **行程規劃功能**
  - [x] 創建 `/itinerary` 頁面
  - [x] 實作行程輸入與管理
  - [x] 按天組織行程項目
  - [x] 整合餐廳搜尋到行程規劃
  - [x] 行程資料持久化（localStorage）
  - 狀態：✅ 已完成

- [ ] **關於頁面**
  - [ ] 創建 `/about` 頁面
  - [ ] 添加專案介紹內容
  - [ ] 開發者資訊
  - 狀態：導航連結已添加，頁面待實作

- [ ] **餐廳詳情頁面**
  - [ ] 創建動態路由 `/restaurants/[id]`
  - [ ] 顯示餐廳完整資訊
  - [ ] 圖片展示
  - [ ] 地圖定位
  - [ ] 相關餐廳推薦

- [ ] **圖片畫廊**
  - [ ] 餐廳圖片集合展示
  - [ ] 燈箱效果（Lightbox）
  - [ ] 圖片分類與篩選

#### 優化項目

- [ ] 圖片優化
  - [ ] 遷移圖片到 `public/images/`
  - [ ] 使用 Next.js Image component 優化
  - [ ] Lazy loading 實作
- [ ] SEO 優化
  - [ ] Metadata 完善
  - [ ] Open Graph 標籤
  - [ ] 結構化資料（Schema.org）
- [ ] 效能優化
  - [ ] Code splitting
  - [ ] 圖片壓縮與優化
  - [ ] Bundle size 分析
- [ ] 無障礙性（A11y）
  - [ ] ARIA 標籤完善
  - [ ] 鍵盤導航支援
  - [ ] 螢幕閱讀器測試

#### 測試與部署

- [ ] 單元測試
- [ ] 整合測試
- [ ] E2E 測試
- [ ] 跨瀏覽器測試
- [ ] 部署配置

## 🎨 技術堆疊

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS v4
- **UI Components**: Headless UI, Heroicons
- **Maps**: @vis.gl/react-google-maps
- **Theme**: next-themes
- **State Management**: Zustand (計畫中)
- **Code Quality**: Biome, Prettier

## 📖 開發指南

### 命名規範

- 元件檔案：PascalCase (例如 `Navbar.tsx`)
- Hook 檔案：camelCase with `use` prefix (例如 `useDebounce.ts`)
- 工具函式：camelCase (例如 `utils.ts`)
- 型別定義：PascalCase (例如 `Restaurant`)

### Git Commit 規範

使用 Conventional Commits：

- `feat:` 新功能
- `fix:` 錯誤修復
- `refactor:` 重構
- `docs:` 文件更新
- `style:` 程式碼格式
- `test:` 測試相關
- `chore:` 雜項

範例：

```bash
git commit -m "feat: add Google Maps integration"
git commit -m "fix: resolve search debounce issue"
```

### 程式碼風格

- 使用 Biome 進行 linting 和格式化
- 使用 Prettier 處理 Tailwind CSS class 排序
- 遵循 TypeScript strict mode
- 使用函式元件和 Hooks

## 🔗 相關文件

- [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) - 完整遷移計畫
- [.context/migration-context.md](./.context/migration-context.md) - 專案上下文管理
- [CLAUDE.md](./CLAUDE.md) - Claude Code 專案指南

## 📝 下一步

### 短期目標

1. **圖片優化**
   - 遷移圖片到 `public/images/` 目錄
   - 使用 Next.js Image component 取代 `<img>` 標籤
   - 實作圖片 lazy loading

2. **SEO 優化**
   - 完善各頁面的 Metadata
   - 添加 Open Graph 和 Twitter Card 標籤
   - 實作結構化資料（Schema.org）

3. **效能優化**
   - 分析並優化 Bundle size
   - 實作 Code splitting
   - 優化圖片載入策略

### 中期目標

1. **功能擴展**
   - 實作行程規劃功能
   - 添加餐廳詳情頁面
   - 實作收藏功能

2. **測試**
   - 建立單元測試
   - 實作 E2E 測試
   - 跨瀏覽器相容性測試

3. **部署**
   - 設定 CI/CD 流程
   - 部署到生產環境
   - 設定監控與分析

## 🤝 貢獻

這是個人專案，目前不開放外部貢獻。

## 📄 授權

Private Project

## 🎯 主要功能

### 已實現功能

- ✅ **互動式地圖**：使用 Google Maps 顯示 62 間新加坡餐廳位置
- ✅ **分類篩選**：按美食類別（肉骨茶、雲吞、點心等）篩選餐廳
- ✅ **搜尋功能**：即時搜尋餐廳名稱，支援自動完成
- ✅ **明暗模式**：完整的主題切換系統，自訂顏色調色板
- ✅ **響應式設計**：支援桌面端和行動裝置
- ✅ **美食介紹**：詳細的美食類別介紹與推薦餐廳
- ✅ **定位功能**：一鍵回到使用者當前位置

### 技術亮點

- 🚀 Next.js 16 App Router（最新架構）
- 🎨 Tailwind CSS v4（現代化樣式系統）
- 📱 完全響應式設計
- 🌓 完整的明暗模式支援
- 🔍 即時搜尋與自動完成
- 🗺️ Google Maps 整合（Advanced Markers）
- 📊 TypeScript 完整型別支援

---

**專案狀態**: ✅ 核心功能已完成，持續優化中
**最後更新**: 2025-01-XX
