import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
  const root = document.documentElement;

  if (darkMode) {
    root.classList.add("dark");
    document.body.style.backgroundColor = "#020617";
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.remove("dark");
    document.body.style.backgroundColor = "#F8FAFC";
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}