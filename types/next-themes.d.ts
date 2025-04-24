import { ReactNode } from "react";

export interface ThemeProviderProps {
  children: ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  enableColorScheme?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
  value?: {
    dark?: string;
    light?: string;
    system?: string;
  };
}

export interface UseThemeProps {
  themes?: string[];
  forcedTheme?: string;
  enableSystem?: boolean;
  defaultTheme?: string;
  attribute?: string;
  value?: {
    dark?: string;
    light?: string;
    system?: string;
  };
}

export interface ThemeProviderState {
  theme: string;
  setTheme: (theme: string) => void;
  resolvedTheme?: string;
  themes: string[];
  systemTheme?: "dark" | "light";
}

// These are re-exported for compatibility with module augmentation
export { useTheme, ThemeProvider } from "next-themes";
