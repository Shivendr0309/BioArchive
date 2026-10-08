import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
const THEME_KEY = "bioarchive-theme-v2";

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem(THEME_KEY) === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      document.body.style.backgroundColor = "#070b14";
      localStorage.setItem(THEME_KEY, "dark");
    } else {
      root.classList.remove("dark");
      document.body.style.backgroundColor = "#f5f7fb";
      localStorage.setItem(THEME_KEY, "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
