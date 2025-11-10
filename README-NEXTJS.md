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
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # 首頁
│   └── globals.css        # 全域樣式
├── components/            # React 元件
│   ├── layout/           # Layout 元件
│   │   ├── Navbar.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── BackToTop.tsx
│   ├── map/              # 地圖元件
│   │   └── Map.tsx
│   └── search/           # 搜尋元件
│       └── SearchBar.tsx
├── data/                 # 資料層（待實作）
├── hooks/                # Custom hooks
│   └── useDebounce.ts
├── lib/                  # 工具函式
│   └── utils.ts
├── types/                # TypeScript 型別定義
│   └── index.ts
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
- [x] 專案基礎設定
  - [x] Next.js 16 + TypeScript
  - [x] Tailwind CSS 配置
  - [x] Biome 程式碼品質工具
  - [x] Git 分支策略
- [x] 基礎目錄結構
- [x] 核心元件骨架
  - [x] Navbar
  - [x] ThemeToggle
  - [x] BackToTop
  - [x] SearchBar (基礎)
  - [x] Map (Placeholder)
- [x] TypeScript 型別定義
- [x] Custom Hooks (useDebounce)

### 🚧 進行中
- [ ] 安裝依賴套件

### ⏳ 待完成
- [ ] 資料遷移
  - [ ] 從 public/app.js 提取餐廳資料
  - [ ] 轉換為 TypeScript 格式
  - [ ] 建立資料查詢函式
- [ ] Google Maps 整合
  - [ ] 安裝 @vis.gl/react-google-maps
  - [ ] 實作 Map component
  - [ ] 實作 MapMarker component
  - [ ] 實作 InfoWindow
  - [ ] Geolocation 功能
- [ ] 搜尋功能
  - [ ] 實作搜尋邏輯
  - [ ] Autocomplete UI
  - [ ] 搜尋結果與地圖整合
- [ ] 多層級選單
  - [ ] 食物類別分類
  - [ ] Dropdown UI
- [ ] 圖片優化
  - [ ] 遷移圖片到 public/images
  - [ ] 使用 Next.js Image component
- [ ] SEO 優化
- [ ] 效能優化
- [ ] 測試與部署

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

1. **安裝依賴**
   ```bash
   cp package-nextjs.json package.json
   pnpm install
   ```

2. **設定環境變數**
   - 申請 Google Maps API key
   - 複製 `.env.local.example` 為 `.env.local`
   - 填入 API keys

3. **開始資料遷移**
   - 查看 `MIGRATION_PLAN.md` 的第二階段

## 🤝 貢獻

這是個人專案，目前不開放外部貢獻。

## 📄 授權

Private Project

---

**專案狀態**: 🚧 開發中 (第一階段：專案初始化)
**最後更新**: 2025-11-10
