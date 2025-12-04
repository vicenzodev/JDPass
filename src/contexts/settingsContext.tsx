"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "system";
type FontSize = 1 | 2 | 3;

interface SettingsContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [fontSize, setFontSizeState] = useState<FontSize>(2);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("app-theme") as Theme;
    const storedFont = localStorage.getItem("app-font-size");

    if (storedTheme) setThemeState(storedTheme);
    if (storedFont) setFontSizeState(Number(storedFont) as FontSize);
    
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemTheme) {
        root.classList.add("dark");
      }
    } else if (theme === "dark") {
      root.classList.add("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    root.setAttribute("data-font-size", String(fontSize));
    
    localStorage.setItem("app-font-size", String(fontSize));
  }, [fontSize, mounted]);
  
  const setTheme = (t: Theme) => setThemeState(t);
  const setFontSize = (f: FontSize) => setFontSizeState(f);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <SettingsContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings deve ser usado dentro de um SettingsProvider");
  return context;
};