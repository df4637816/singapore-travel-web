# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Singapore food recommendation map web application (新加坡美食推薦地圖) built with vanilla JavaScript, Bootstrap 5, and Webpack. The project showcases Singapore food destinations with an interactive Google Maps integration, search functionality, and dark/light theme toggle.

## Technology Stack

- **Build Tool**: Webpack 5
- **Styling**: Bootstrap 5.3.0, custom CSS with PostCSS
- **JavaScript**: ES6+ with Babel transpilation
- **Map Integration**: Google Maps JavaScript API with GeoJSON data layer

## Development Commands

### Package Manager
This project uses **pnpm** as the package manager (defined in `packageManager` field). Install dependencies with:
```bash
pnpm install
```

### Start Development Server
```bash
npm run dev
# or
pnpm dev
```
Opens webpack-dev-server on port 9000 with hot reload enabled.

### Build for Development
```bash
npm run build
```
Creates unminified development build in `/dist` directory.

### Build for Production
```bash
npm run deploy
```
Creates optimized production build with:
- Minified HTML
- Optimized images (quality: 65-75%)
- Compressed CSS

### Watch Mode
```bash
npm run watch
```
Watches files and rebuilds on changes (development mode).

### Code Quality (Biome)
```bash
npm run format
# or
pnpm format
```
Formats code using Biome formatter.

```bash
npm run lint
# or
pnpm lint
```
Lints code using Biome linter for code quality and error checking.

## Project Structure

### Entry Point
- **src/index.js**: Main entry point that imports styles and app logic
  - Imports `./style.css` (application styles)
  - Imports `../public/app` (main application logic)

### Application Logic
- **public/app.js**: Contains all application functionality:
  - Dark/light theme toggle with Bootstrap data-bs-theme
  - Food item search with debounced autocomplete
  - Lazy loading for images
  - Google Maps initialization with GeoJSON markers
  - "Back to top" button functionality

### HTML Structure
- **public/index.html**: Main HTML template with:
  - Bootstrap navbar with multi-level dropdown menus organized by food categories (肉骨茶, 雲吞, 點心, 早餐, 海鮮, Laksa, etc.)
  - Search autocomplete functionality
  - Google Maps container
  - Theme toggle UI

### Static Assets
- **public/img/**: Food destination images
- **public/css/**: Additional stylesheets
- **src/style.css**: Main application styles

## Architecture Notes

### Google Maps Integration

The map is initialized via `initMap()` function in [public/app.js](public/app.js):
- Uses GeoJSON Feature Collection for restaurant markers
- Each feature has properties: `name`, `type` (food category)
- Geometry contains Point coordinates [longitude, latitude]
- Map includes custom controls (e.g., "return to current location" button)
- Map center positioned at Singapore coordinates

### Search Functionality

Implemented with debounced input handler (800ms delay):
- Searches through dropdown menu items
- Filters by text content matching
- Dynamically creates autocomplete suggestions
- Stores both item name and href link for navigation

### Theme System

Uses Bootstrap 5.3's built-in dark mode:
- Toggles `data-bs-theme` attribute on body element between "light" and "dark"
- Custom toggle button with Remix Icons (ri-sun-fill / ri-moon-line)

### Image Optimization

Webpack configuration handles images:
- Development: No image optimization (disabled for faster builds)
- Production: Aggressive optimization via image-webpack-loader
  - JPEG quality: 65%
  - PNG quality: 65-90%
  - WebP conversion: quality 75%

## Webpack Configuration Notes

- **Output**: JavaScript bundles to `dist/js/[name].js`, CSS to `dist/css/main.css`
- **Dev Server**: Serves from `/public` directory on port 9000
- **HTML**: Generated from template at `/public/index.html` via HtmlWebpackPlugin
- **CSS**: Extracted to separate file via MiniCssExtractPlugin, processed with PostCSS preset-env
- **Babel**: Transpiles ES6+ to ES5 for browser compatibility

## Important Code Patterns

### Debounce Function
A custom debounce implementation in [public/app.js](public/app.js:48-58) is used for search input to reduce API calls and improve performance.

### Lazy Loading
Images are set to lazy load on page load via `loading="lazy"` attribute to improve initial page performance.

### Data Synchronization (CRITICAL)
**Food destinations are hard-coded in TWO places and MUST be kept synchronized:**

1. **HTML dropdown menus** in [public/index.html](public/index.html) - for navigation UI
2. **GeoJSON Feature Collection** in [public/app.js](public/app.js:133-764) - for map markers

**When adding/updating/removing locations:**
- Update the corresponding dropdown menu item in HTML with matching name and anchor link
- Add/modify/remove the GeoJSON feature object with correct coordinates and properties
- Ensure `name` property matches between both locations
- Keep `type` (food category) consistent for filtering

**Example structure:**
```javascript
// In public/app.js GeoJSON
{
  "type": "Feature",
  "properties": {
    "name": "Restaurant Name",
    "type": "Food Category"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [longitude, latitude]  // Note: [lng, lat] order
  }
}
```

## Git Workflow 規範
- 頻繁提交：每次完成一組功能後必須 commit
- 提交訊息請涵蓋變更的全部範圍，並保持訊息簡潔
- 開始實作新功能時建立並切換到新的 Git 分支（例如，使用 git worktree 或直接創建分支）
- 永遠 *不要* 推送到 main 分支（main 或 master），避免干擾 prod 環境

## 語言
- 對話總是用繁體中文回覆、唯有專有技術名詞以英文呈現（例如 P-value）
- 程式碼內容（包括 string）以及註解總是以英文撰寫

## 程式碼審查
請審查所有暫存的變更，檢查：
- 是否符合專案程式碼風格標準
- 評估其潛在的安全漏洞、依賴關係問題、和錯誤的權限配置
- 是否有效能問題
- 專注檢查 $ARGUMENTS 中指定的特定檔案或模組
以 Markdown 表格形式輸出結果

## 程式碼偏好
- 依照 Biome 來審查程式碼結構及錯誤寫法
- 使用 `npm run lint` 或 `pnpm lint` 檢查程式碼品質
- 使用 `npm run format` 或 `pnpm format` 格式化程式碼