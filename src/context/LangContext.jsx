import { createContext, useContext, useState, useEffect } from "react";

// English + Kannada dictionary (example)
const dictionary = {
  en: {
    employeePanel: "Employee Panel",
    employerPanel: "Employer Panel",
    dashboard: "Dashboard",
    profile: "Profile",
    jobs: "Jobs",
    jobsPosted: "Jobs Posted",
    messages: "Messages",
    wallet: "Wallet",
    settings: "Settings",
    postJob: "Post Job",
    logout: "Logout",
    apply: "Apply",
    language: "Language",
    hire: "Hire",
  },
  kn: {
    employeePanel: "ಉದ್ಯೋಗಿ ಫಲಕ",
    employerPanel: "ನಿಯೋಜಕ ಫಲಕ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    profile: "ಪ್ರೊಫೈಲ್",
    jobs: "ಕೆಲಸಗಳು",
    jobsPosted: "ಪ್ರಕಟಿಸಿದ ಕೆಲಸಗಳು",
    messages: "ಸಂದೇಶಗಳು",
    wallet: "ಹಣಕಾಸು",
    settings: "ಸೆಟ್ಟಿಂಗ್ಗಳು",
    postJob: "ಕೆಲಸ ಪ್ರಕಟಿಸಿ",
    logout: "ಲಾಗ್ ಔಟ್",
    apply: "ಅಪ್ಲೈ",
    language: "ಭಾಷೆ",
    hire: "ಹುದ್ದೆಗೆ",
  },
};

// Create context
const LangContext = createContext();

// Custom hook
export const useLang = () => useContext(LangContext);

// Provider
export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored) setLang(stored);
  }, []);

  const toggleLang = () => {
    const next = lang === "en" ? "kn" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const t = (key) => dictionary[lang][key] || key;

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
};
