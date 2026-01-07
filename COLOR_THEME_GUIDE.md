# Color Theme Guide

## How to Change the Entire Website Color Theme

The entire color palette can be changed in **TWO PLACES** (keep them in sync):

### 1. CSS Variables (for Tailwind classes)
**File**: `src/index.css` (Lines 8-9)

```css
:root {
  --color-primary: #DB0007;       /* ← Main color */
  --color-primary-hover: #B00006; /* ← Darker shade for hover */
}
```

### 2. JavaScript Constant (for Framer Motion animations)
**File**: `src/utils/constants.js` (Line 3)

```javascript
export const PRIMARY_COLOR = '#DB0007';  /* ← Change this hex value */
```

**IMPORTANT**:
- `--color-primary` and `PRIMARY_COLOR` must be identical
- `--color-primary-hover` should be a darker shade (~20% darker)

---

## Quick Color Options

### Current (Arsenal Red)
```css
--color-primary: #DB0007;
--color-primary-hover: #B00006;
```

### Option 1: Modern Blue
```css
--color-primary: #3B82F6;      /* Tailwind blue-500 */
--color-primary-hover: #2563EB; /* Tailwind blue-600 */
```

### Option 2: Elegant Purple
```css
--color-primary: #8B5CF6;      /* Tailwind purple-500 */
--color-primary-hover: #7C3AED; /* Tailwind purple-600 */
```

### Option 3: Professional Teal
```css
--color-primary: #14B8A6;      /* Tailwind teal-500 */
--color-primary-hover: #0D9488; /* Tailwind teal-600 */
```

### Option 4: Warm Orange
```css
--color-primary: #F97316;      /* Tailwind orange-500 */
--color-primary-hover: #EA580C; /* Tailwind orange-600 */
```

### Option 5: Deep Emerald
```css
--color-primary: #10B981;      /* Tailwind emerald-500 */
--color-primary-hover: #059669; /* Tailwind emerald-600 */
```

### Option 6: Softer Red
```css
--color-primary: #EF4444;      /* Tailwind red-500 */
--color-primary-hover: #DC2626; /* Tailwind red-600 */
```

---

## Additional Changes Needed

### Logo Color (Optional)
**File**: `public/logo.svg` (Line 2)

Find `fill="#db0007"` and change to your new color hex value.

---

## Testing Your Changes

1. Change the hex value in `src/index.css`
2. Save the file
3. The dev server will auto-reload
4. Check all pages for consistent color application
5. Optional: Update logo.svg if you want the logo to match

---

## Notes

- All components use `arsenal-red` class which references `--color-primary`
- No need to search/replace in multiple files
- Color is applied to: buttons, links, borders, hover effects, badges, and highlights
