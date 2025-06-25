import { createContext, useState, useEffect,  useContext} from 'react';
import {  } from 'react'

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState( () => localStorage.getItem('theme') || 'system');

    useEffect(() => {
        const root = document.documentElement;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const applyTheme = () => {
            // If the dark true.
            const isDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches);
            // root.classList.toggle('dark', isDark);
            if (isDark) {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
              }
        };

        applyTheme();
        localStorage.setItem('theme', theme);

        // Apply system changes.
        if (theme === 'system') {
            mediaQuery.addEventListener('change', applyTheme);
            return () => mediaQuery.removeEventListener('change', applyTheme);
        }

    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
