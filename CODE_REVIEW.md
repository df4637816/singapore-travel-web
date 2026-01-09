# Code Review: Theme Toggle & Color Palette Implementation

**Review Date:** 2024  
**Files Reviewed:**
- `src/app/globals.css`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/ThemeToggle.tsx`
- `src/components/navigation/CategoryDropdown.tsx`

---

## 🔴 Critical Issues (Must Fix)

### 1. **Performance: Unnecessary Re-renders in CategoryDropdown**

**File:** `src/components/navigation/CategoryDropdown.tsx`

**Issue:** `getCategoriesWithCounts()` is called on every render, and category filtering logic runs on every render without memoization.

**Current Code:**
```14:38:src/components/navigation/CategoryDropdown.tsx
export function CategoryDropdown({ onCategorySelect, selectedCategory }: CategoryDropdownProps) {
  const categoriesWithCounts = getCategoriesWithCounts();

  // Group categories by type for better organization
  const popularCategories = categoriesWithCounts.filter((cat) =>
    ['肉骨茶', '海南雞飯', '叻沙', '海鮮', '早午餐', '咖啡'].includes(cat.name),
  );
  // ... more filtering logic
}
```

**Fix:**
```typescript
import { useMemo } from 'react';

export function CategoryDropdown({ onCategorySelect, selectedCategory }: CategoryDropdownProps) {
  const categoriesWithCounts = useMemo(() => getCategoriesWithCounts(), []);

  const popularCategories = useMemo(
    () => categoriesWithCounts.filter((cat) =>
      ['肉骨茶', '海南雞飯', '叻沙', '海鮮', '早午餐', '咖啡'].includes(cat.name),
    ),
    [categoriesWithCounts],
  );
  
  // Apply useMemo to all category groupings...
}
```

---

### 2. **Unused Import**

**File:** `src/components/navigation/CategoryDropdown.tsx:5`

**Issue:** `categories` is imported but never used.

**Fix:**
```typescript
import { getCategoriesWithCounts } from '@/data/categories';
// Remove: import { categories, getCategoriesWithCounts } from '@/data/categories';
```

---

## ⚠️ Warnings (Should Fix)

### 3. **Color Palette: Duplicate Values & Inconsistent Mapping**

**File:** `src/app/globals.css`

**Issues:**
1. Light mode: `primary-100` and `primary-200` both use `#90CAF9` (duplicate)
2. Light mode: `primary-400` and `primary-500` both use `#42A5F5` (duplicate)
3. Light mode: `primary-800`, `primary-900`, `primary-950` all use `#1565C0` (duplicate)
4. Dark mode: Multiple duplicates causing loss of color scale granularity

**Expected Mapping (based on requirements):**
- Light mode:
  - `primary-50`: `#E3F2FD` (lightest) ✓
  - `primary-100`: `#90CAF9`
  - `primary-200`: Could use `#BBDEFB` (intermediate)
  - `primary-300`: `#64B5F6`
  - `primary-400`: `#42A5F5`
  - `primary-500`: `#42A5F5` (base primary) ✓
  - `primary-600`: `#1E88E5` ✓
  - `primary-700`: `#1565C0` (darkest) ✓
  - `primary-800-950`: Should provide gradient

- Dark mode:
  - `primary-950`: `#0D47A1` (darkest)
  - `primary-900`: `#0D47A1`
  - `primary-800`: `#1976D2`
  - `primary-700`: `#1976D2`
  - `primary-600`: `#2196F3`
  - `primary-500`: `#2196F3` (branding/active) ✓
  - `primary-400`: `#64B5F6` ✓
  - `primary-300`: `#90CAF9` ✓
  - `primary-100-50`: Should provide gradient

**Recommended Fix:**
```css
@theme {
  /* Light mode primary colors */
  --color-primary-50: #E3F2FD;   /* lightest */
  --color-primary-100: #BBDEFB;  /* intermediate light */
  --color-primary-200: #90CAF9;  /* light */
  --color-primary-300: #64B5F6;  /* medium-light */
  --color-primary-400: #42A5F5;  /* medium */
  --color-primary-500: #42A5F5;  /* base primary */
  --color-primary-600: #1E88E5;  /* medium-dark */
  --color-primary-700: #1565C0;  /* dark */
  --color-primary-800: #0D47A1;  /* darker */
  --color-primary-900: #0D47A1;  /* darkest */
  --color-primary-950: #0D47A1;  /* darkest */
}

.dark {
  /* Dark mode primary colors */
  --color-primary-50: #90CAF9;   /* lightest */
  --color-primary-100: #90CAF9;  /* lightest */
  --color-primary-200: #64B5F6;  /* light */
  --color-primary-300: #64B5F6;  /* medium-light */
  --color-primary-400: #64B5F6;  /* medium */
  --color-primary-500: #2196F3;  /* branding/active */
  --color-primary-600: #2196F3;  /* active */
  --color-primary-700: #1976D2;  /* medium-dark */
  --color-primary-800: #1976D2;  /* dark */
  --color-primary-900: #0D47A1;  /* darker */
  --color-primary-950: #0D47A1;  /* darkest */
}
```

---

### 4. **ThemeToggle: Inconsistent Color Usage**

**File:** `src/components/layout/ThemeToggle.tsx:16`

**Issue:** Loading placeholder uses gray colors instead of primary colors for consistency.

**Current:**
```typescript
if (!mounted) {
  return <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />;
}
```

**Fix:**
```typescript
if (!mounted) {
  return <div className="h-9 w-9 animate-pulse rounded-full bg-primary-100 dark:bg-primary-900" />;
}
```

---

### 5. **Navbar: Logo Ring Color Not Theme-Aware**

**File:** `src/components/layout/Navbar.tsx:25`

**Issue:** Logo ring uses `primary-500` for both light and dark modes. Should adapt to theme.

**Current:**
```typescript
<div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary-500 dark:ring-primary-500">
```

**Fix:**
```typescript
<div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary-600 dark:ring-primary-500">
```

---

## 💡 Suggestions (Consider Improving)

### 6. **CategoryDropdown: Extract Category Groups Logic**

**File:** `src/components/navigation/CategoryDropdown.tsx`

**Suggestion:** Extract category grouping logic into a custom hook or utility function for better maintainability and testability.

**Example:**
```typescript
// hooks/useCategoryGroups.ts
export function useCategoryGroups() {
  const categoriesWithCounts = useMemo(() => getCategoriesWithCounts(), []);
  
  return useMemo(() => {
    const popular = categoriesWithCounts.filter((cat) =>
      ['肉骨茶', '海南雞飯', '叻沙', '海鮮', '早午餐', '咖啡'].includes(cat.name),
    );
    // ... other groups
    return { popular, noodlesAndRice, snacksAndDesserts, internationalCuisine, otherCategories };
  }, [categoriesWithCounts]);
}
```

---

### 7. **Accessibility: Focus States**

**Suggestion:** Ensure all interactive elements have visible focus states. Consider adding focus-visible styles:

```typescript
className="... focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
```

---

### 8. **Navbar: Use Next.js Link for Internal Navigation**

**File:** `src/components/layout/Navbar.tsx:43-48`

**Suggestion:** Replace anchor tags with Next.js `Link` component for client-side navigation (if these are internal routes):

```typescript
import Link from 'next/link';

<Link href="#map" className="...">
  地圖
</Link>
```

---

### 9. **Type Safety: Theme Type**

**File:** `src/components/layout/ThemeToggle.tsx:22`

**Suggestion:** Add type safety for theme values:

```typescript
const toggleTheme = () => {
  setTheme(theme === 'dark' ? 'light' : 'dark');
};
```

Consider creating a type:
```typescript
type Theme = 'light' | 'dark';
```

---

## ✅ Positive Observations

1. **Good Practices:**
   - Proper use of `suppressHydrationWarning` for theme provider
   - Consistent use of `aria-label` for accessibility
   - Good separation of concerns (ThemeToggle as separate component)
   - Proper TypeScript typing for component props

2. **Accessibility:**
   - All interactive elements have proper `aria-label` attributes
   - Semantic HTML structure is maintained

3. **Code Organization:**
   - Clean component structure
   - Proper imports and exports
   - Good use of Tailwind CSS utility classes

---

## Summary

**Priority Actions:**
1. 🔴 Fix performance issue in CategoryDropdown (useMemo)
2. 🔴 Remove unused import
3. ⚠️ Fix color palette duplicates and improve gradient
4. ⚠️ Make ThemeToggle loading state consistent
5. ⚠️ Make Navbar logo ring theme-aware

**Overall Assessment:** Good implementation with minor performance and consistency improvements needed. The color palette implementation works but could benefit from a more granular gradient scale.
