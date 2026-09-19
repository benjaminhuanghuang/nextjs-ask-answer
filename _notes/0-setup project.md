# Setup project

```sh
npx create-next-app@latest
use recommended defaults
```

## ESlint & Pettier

Install VS code extension: ESLint, Prettier ESLint, Prettier

```sh
npm install eslint-config-standard --legacy-peer-deps
```

```js
const eslintConfig = defineConfig([]);
```

Add settings for Pettier in .vscode/setting.json

## Tailwind

globals.css

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
```

usage

```tsx
<h1 className="h1-bold">Welcome</h1>
<h1 className="h1-bold font-space-grotesk"> Welcome </h1>
```

## Assets

public\icon
public\images
