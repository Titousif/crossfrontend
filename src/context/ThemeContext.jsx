import { createContext, useState, useLayoutEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('ross_theme');
    return savedTheme === 'dark';
  });

  useLayoutEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('ross_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('ross_theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((mode) => !mode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
