import React, {useState} from "react";

const AppSettingsContext = React.createContext({
    darkMode: null,
    toggleDarkMode: (_) => {}
});

const AppSettingsProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));
    function toggleDarkMode() {
        localStorage.theme = !darkMode ? "dark" : "default";
        setDarkMode(!darkMode);
    }
    return (
        <AppSettingsContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </AppSettingsContext.Provider>
    )
};

export { AppSettingsProvider };
export default AppSettingsContext;