import { createContext, useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [defaultSize, setDefaultSize] = useState(16);
  const [offset, setOffset] = useState(0);
  const { width } = useWindowDimensions();

  const checkDefaultSize = () => {
    if (width <= 768) {
      setDefaultSize(14);
    } else {
      setDefaultSize(16);
    }
  }

  const loadTheme = () => {
    const checkIsDarkSchemePreferred = () =>
      window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches ?? false;
    const colorScheme = localStorage.getItem("theme");
    if (colorScheme) {
      setTheme(colorScheme);
    } else {
      if (checkIsDarkSchemePreferred) {
        setTheme("dark");
        localStorage.setItem("theme", "dark")
      } else {
        setTheme("light");
        localStorage.setItem("theme", "light")
      }
    }
  };

  const loadOffset = () => {
    const storageOffset = parseInt(localStorage.getItem("offset"));
    if (storageOffset) {
      setOffset(storageOffset)
    }
  }

  const increaseFontSize = () => {
    setOffset((prev) => prev + 2);
  }

  const decreaseFontSize = () => {
    setOffset((prev) => prev - 2);
  }

  const resetFontSize = () => {
    setOffset(0);
  }

  useEffect(() => {
    loadTheme();
    loadOffset();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    const fontSize = `${defaultSize + offset}px`
    document.documentElement.style.fontSize = fontSize;
    localStorage.setItem("offset", offset);
  }, [offset, defaultSize])

  useEffect(() => {
    checkDefaultSize();
  }, [width])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, increaseFontSize, resetFontSize, decreaseFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};
