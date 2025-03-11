import { createContext, useState, useContext } from "react";

// Create a Language Context
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Default: English

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "ta" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook to use Language Context
export const useLanguage = () => useContext(LanguageContext);
