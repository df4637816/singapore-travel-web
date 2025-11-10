# Migration Context - Singapore Food Map to Next.js 16

## 專案狀態

**狀態**: 規劃階段
**建立時間**: 2025-11-10
**最後更新**: 2025-11-10

---

## 🎯 專案目標

### 主要目標
將現有的新加坡美食推薦地圖從 Webpack + Bootstrap 5 遷移到 Next.js 16 + Tailwind CSS

### 成功指標
- ✅ 所有現有功能完整保留
- ✅ 解決資料雙重維護問題（HTML + GeoJSON）
- ✅ 提升效能和 SEO
- ✅ 引入 TypeScript 強型別支援
- ✅ 改善開發體驗和可維護性

---

## 📊 關鍵決策紀錄

### 決策 #1: 技術堆疊選擇
**日期**: 2025-11-10
**決定**: 採用 Next.js 16 App Router + Tailwind CSS v4

**理由**:
- Next.js 16 提供最新的 React 19 支援和 App Router 架構
- Tailwind CSS v4 提供更好的效能和開發體驗
- App Router 提供更好的 SEO 和效能優化能力
- 與現代 React 生態系統完全相容

**影響**:
- 需要重新思考 routing 架構
- 可以利用 Server Components 優化效能
- 需要學習 App Router 新模式

### 決策 #2: 地圖整合方案
**日期**: 2025-11-10
**決定**: 使用 `@vis.gl/react-google-maps`

**理由**:
- 官方推薦的 React 整合方案
- 支援 React 19 和現代 Hooks
- 提供更好的 TypeScript 支援
- 活躍的社群維護

**替代方案考慮**:
- `@react-google-maps/api`: 較舊，更新較慢
- `google-map-react`: 不再積極維護

### 決策 #3: 資料架構解決方案
**日期**: 2025-11-10
**決定**: 採用 TypeScript 資料檔（方案 A）作為初期方案

**理由**:
- 解決雙重維護問題（HTML dropdown + GeoJSON）
- 提供型別安全
- 易於版本控制
- 為未來遷移到資料庫預留彈性

**資料結構**:
```typescript
interface Restaurant {
  id: string;
  name: string;
  category: FoodCategory;
  coordinates: { lat: number; lng: number };
  address?: string;
  description?: string;
  images?: string[];
  // ... 其他欄位
}
```

**未來擴展路徑**:
- 短期: TypeScript 靜態資料
- 中期: JSON 檔案 + API Routes
- 長期: Database (Supabase/PostgreSQL) + Prisma

### 決策 #4: 狀態管理方案
**日期**: 2025-11-10
**決定**: 使用 Zustand（輕量級全域狀態）+ React Query（伺服器狀態）

**理由**:
- Zustand: 簡單、輕量、TypeScript 友善
- React Query: 處理資料快取和同步
- 避免 Redux 的複雜性
- 適合專案規模

**不需要**:
- Redux: 對此專案過於複雜
- Context API: 效能問題（頻繁更新）

### 決策 #5: 主題系統
**日期**: 2025-11-10
**決定**: 使用 `next-themes` + Tailwind dark mode

**理由**:
- next-themes 專為 Next.js 設計
- 無閃爍切換
- 支援 SSR
- 與 Tailwind dark: class 完美整合

### 決策 #6: 開發工具
**日期**: 2025-11-10
**決定**: 保留 Biome，添加 Prettier with Tailwind plugin

**理由**:
- Biome: 快速的 linting 和格式化
- Prettier + tailwindcss plugin: Tailwind class 排序
- 兩者可以共存且互補

---

## 🏗️ 架構設計

### 目錄結構決策
```
src/
├── app/              # Next.js App Router
├── components/       # React 元件
│   ├── layout/      # Layout 相關
│   ├── map/         # 地圖相關
│   ├── search/      # 搜尋相關
│   └── ui/          # 可重用 UI
├── data/            # 資料層
├── hooks/           # Custom hooks
├── lib/             # Utilities
└── stores/          # Zustand stores
```

**理由**:
- 功能導向分組（而非類型導向）
- 清晰的關注點分離
- 易於擴展和維護

### 元件設計原則

1. **Server Components First**
   - 預設使用 Server Components
   - 僅在需要互動時使用 'use client'

2. **元件拆分策略**
   - 每個元件單一職責
   - 可測試性優先
   - 適當的抽象層級

3. **Props 設計**
   - 使用 TypeScript interface
   - 避免 props drilling（使用 context/store）
   - 合理的預設值

---

## 📋 遷移階段與進度

### 第一階段: 專案初始化（預計 1-2 天）
**狀態**: ⏳ 待開始

**任務清單**:
- [ ] 建立 Next.js 16 專案
- [ ] 安裝依賴套件
- [ ] 設定 Tailwind CSS
- [ ] 設定 TypeScript
- [ ] 設定 Biome + Prettier
- [ ] 設定環境變數
- [ ] 建立基礎目錄結構

**輸出**:
- 可運行的 Next.js 專案骨架
- 完整的開發環境配置

### 第二階段: 資料遷移（預計 2-3 天）
**狀態**: ⏳ 待開始

**任務清單**:
- [ ] 定義 TypeScript types/interfaces
- [ ] 從 `public/app.js` 提取所有 GeoJSON 資料
- [ ] 轉換為 TypeScript 格式
- [ ] 建立資料查詢 utilities
- [ ] 驗證資料完整性（60+ 餐廳）

**關鍵考量**:
- 確保所有餐廳都有唯一 ID
- 維護類別分類（肉骨茶、雲吞、點心等）
- 座標格式正確（lng, lat 順序）

**輸出**:
- `src/data/types.ts`
- `src/data/restaurants.ts`
- `src/lib/restaurantUtils.ts`

### 第三階段: 核心功能實作（預計 5-7 天）
**狀態**: ⏳ 待開始

#### 3.1 Layout & Navigation (1-2 天)
- [ ] Root Layout with providers
- [ ] Navbar component
- [ ] 多層級 dropdown menu
- [ ] ThemeToggle component
- [ ] BackToTop button
- [ ] Mobile menu

#### 3.2 Google Maps Integration (2-3 天)
- [ ] Map component with @vis.gl/react-google-maps
- [ ] MapMarker component
- [ ] InfoWindow with restaurant details
- [ ] LocationButton (回到現在位置)
- [ ] Geolocation handling
- [ ] 地圖與搜尋整合

#### 3.3 Search Functionality (1-2 天)
- [ ] SearchBar component
- [ ] useDebounce hook
- [ ] SearchAutocomplete component
- [ ] 搜尋結果高亮
- [ ] 搜尋與地圖標記同步

#### 3.4 Image Optimization (1 天)
- [ ] 遷移圖片到 `public/images/`
- [ ] 使用 Next.js Image component
- [ ] 設定圖片優化配置
- [ ] Lazy loading 實作

### 第四階段: 優化與測試（預計 3-4 天）
**狀態**: ⏳ 待開始

**任務清單**:
- [ ] Performance optimization
- [ ] SEO metadata 設定
- [ ] Accessibility audit
- [ ] 響應式設計測試
- [ ] Cross-browser testing
- [ ] Error handling
- [ ] Loading states

### 第五階段: 部署與文件（預計 1-2 天）
**狀態**: ⏳ 待開始

**任務清單**:
- [ ] 設定 Vercel/Netlify
- [ ] 環境變數配置
- [ ] Domain 設定
- [ ] Analytics 整合
- [ ] 更新 CLAUDE.md
- [ ] 撰寫 README.md
- [ ] 建立部署文件

---

## 🔧 技術細節與模式

### 常用 Hooks

#### useDebounce
```typescript
// src/hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number = 800): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

**使用場景**: 搜尋輸入、表單驗證

#### useGeolocation
```typescript
// src/hooks/useGeolocation.ts
export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => setLocation(position.coords),
      (error) => setError(error.message)
    );
  }, []);

  return { location, error };
}
```

**使用場景**: Map component, LocationButton

### Utility Functions

#### cn (classnames merge)
```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**使用場景**: 動態 Tailwind class 組合

---

## 🚨 已知問題與解決方案

### 問題 #1: Google Maps API Key 管理
**問題**: API key 不應該暴露在客戶端

**解決方案**:
- 使用 `NEXT_PUBLIC_` 前綴（僅客戶端需要）
- 在 Google Cloud Console 設定 HTTP referrer 限制
- 考慮使用 API 路由代理（進階）

### 問題 #2: 地圖初始化閃爍
**問題**: Map component 初次載入可能閃爍

**解決方案**:
- 使用 loading skeleton
- 實作 Suspense boundary
- 預載地圖腳本

### 問題 #3: 搜尋效能
**問題**: 60+ 餐廳線性搜尋可能較慢

**解決方案**:
- 使用 debounce (800ms)
- 考慮使用 Fuse.js（模糊搜尋）
- 未來可考慮 ElasticSearch/Algolia

### 問題 #4: Dark Mode 閃爍
**問題**: SSR 時可能出現 theme 閃爍

**解決方案**:
- 使用 `next-themes` 的 suppressHydrationWarning
- Script 注入處理初始 theme

---

## 📦 依賴套件版本鎖定

### Core Dependencies
```json
{
  "next": "^15.1.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.7.0"
}
```

### UI & Styling
```json
{
  "tailwindcss": "^4.0.0",
  "@headlessui/react": "^2.2.0",
  "@heroicons/react": "^2.2.0",
  "next-themes": "^0.4.4"
}
```

### Maps & Data
```json
{
  "@vis.gl/react-google-maps": "^1.4.0",
  "zustand": "^5.0.2",
  "@tanstack/react-query": "^5.62.11"
}
```

**版本策略**:
- 使用 `^` 允許小版本更新
- 定期檢查安全更新
- 測試後再更新主版本

---

## 🎓 學習資源與參考

### 官方文件
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [@vis.gl/react-google-maps](https://visgl.github.io/react-google-maps/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### 範例專案
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [Tailwind UI Components](https://tailwindui.com/)

### 社群資源
- [Next.js Discord](https://discord.gg/nextjs)
- [Tailwind Discord](https://discord.gg/tailwindcss)

---

## ✅ Checklist 模板

### 每日開發檢查清單
- [ ] Git pull 最新變更
- [ ] 執行 `pnpm install` 檢查依賴
- [ ] 執行 `pnpm lint` 檢查程式碼品質
- [ ] 測試開發伺服器啟動
- [ ] 完成當日任務
- [ ] 執行 `pnpm build` 確保可建置
- [ ] Git commit 變更
- [ ] 更新進度文件

### PR 提交前檢查清單
- [ ] 所有 lint 錯誤已修復
- [ ] TypeScript 無型別錯誤
- [ ] 手動測試所有變更功能
- [ ] 測試響應式設計（mobile/tablet/desktop）
- [ ] 檢查 dark mode 正常運作
- [ ] 效能無明顯退化
- [ ] 撰寫清晰的 commit message
- [ ] 更新相關文件

---

## 📞 需要協助的領域

### 設計決策待確認
1. ❓ 是否需要使用者認證功能？
2. ❓ 是否需要餐廳評分/評論功能？
3. ❓ 是否需要多語言支援（英文/繁中/簡中）？
4. ❓ 是否需要收藏/我的最愛功能？
5. ❓ 是否需要路線規劃功能？

### 技術待確認
1. ❓ Google Maps API quota 限制
2. ❓ 預計流量和效能需求
3. ❓ 是否需要 CDN 配置
4. ❓ 是否需要 Analytics（GA4/Vercel Analytics）

---

## 🔄 持續更新區域

### 最近變更
**2025-11-10**:
- ✅ 完成初步規劃
- ✅ 建立 MIGRATION_PLAN.md
- ✅ 建立 migration-context.md
- ✅ 更新 CLAUDE.md

### 下一步行動
**立即行動** (今天):
1. 確認是否開始執行第一階段
2. 準備開發環境
3. 申請 Google Maps API key（如果需要新的）

**短期行動** (本週):
1. 完成專案初始化
2. 開始資料遷移

**中期行動** (兩週內):
1. 完成核心功能實作
2. 開始測試和優化

---

## 💡 經驗教訓（持續更新）

### 預期會遇到的挑戰
1. **地圖效能**: 60+ 標記可能需要 clustering
2. **搜尋體驗**: 需要良好的 UX 設計
3. **行動裝置**: Touch 互動需特別處理
4. **SEO**: 地圖為客戶端渲染，需額外 SEO 策略

### 最佳實踐
1. 小步快跑，頻繁提交
2. 功能完成即測試，不要累積
3. 保持程式碼可讀性優先
4. 文件與程式碼同步更新

---

## 📝 會議紀錄

### 2025-11-10 - 初步規劃會議
**參與者**: 開發者
**討論主題**: Next.js 16 重構計畫

**決定**:
- 採用 Next.js 16 + Tailwind CSS
- 使用 TypeScript
- 保持所有現有功能
- 改善資料架構

**行動項目**:
- [ ] 準備開發環境
- [ ] 申請必要的 API keys
- [ ] 開始第一階段實作

---

**最後更新**: 2025-11-10
**維護者**: Claude Code
**專案狀態**: 🟡 規劃中
