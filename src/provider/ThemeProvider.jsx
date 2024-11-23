import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getSavedTheme());

  function saveTheme(theme) {
    setTheme(theme);
    localStorage.setItem("todo-app-theme", theme);
  }

  function toggleTheme(theme) {
    let newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("todo-app-theme", newTheme);
  }

  function getSavedTheme() {
    let savedTheme = localStorage.getItem("todo-app-theme");
    if (savedTheme) {
      return savedTheme;
    }
    let { matches: isDarkPreferred } = window.matchMedia(
      "(prefers-color-scheme:dark)"
    );
    return isDarkPreferred ? "dark" : "light";
  }

  useEffect(() => {
    (function () {
      let savedTheme = localStorage.getItem("todo-app-theme");
      if (savedTheme) {
        saveTheme(savedTheme);
        return savedTheme;
      }
      let { matches: isDarkPreferred } = window.matchMedia(
        "(prefers-color-scheme:dark)"
      );
      saveTheme(isDarkPreferred ? "dark" : "light");
    })();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
