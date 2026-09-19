# Theme

```sh
npm i next-themes
```

Create context/theme.tsx

Use ThemeProvider in the RootLayout

```tsx
<html lang="en" suppressHydrationWarning>
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </ThemeProvider>
</html>
```

## Theme toggle

components/navigation/navbar/Theme.tsx

```tsx
import { useTheme } from "next-themes";

const { setTheme } = useTheme();

setTheme("system");
```
