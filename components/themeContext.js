import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const themes = {
  light: {
    background: "#ffffff",
    text: "#000000",
    primary: "#2563EB",
  },
  dark: {
    background: "#000000",
    text: "#ffffff",
    primary: "#2563EB",
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, colors: themes[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
