# Style and font

## Tailwind

## Font

Add font file to app/fonts

layout.tsx

```tsx
const inter = localFont({})
// className actually applies the font; variable applies nothing, it just stores the font name in a CSS variable.
<html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}></html>
```

global.css

```css
--font-inter: var(--font-inter);
--font-space-grotesk: var(--font-space-grotesk);

/*Font size*/
--text-display: 1.875rem; /* 30px */
--text-display--line-height: 1.4; /* 42/30 */
--text-display--letter-spacing: -0.03em;
--text-display--font-weight: 700;

--text-heading: 1.5rem; /* 24px */
--text-heading--line-height: 1.3; /* 31.2/24 ← 那个小数的来历 */
--text-heading--font-weight: 700;
```

usage

```tsx
<h1 className="text-heading">Welcome</h1>
<h1 className="text-heading font-space-grotesk"> Welcome </h1>
```
