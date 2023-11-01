import {MoonIcon, SunIcon} from "@heroicons/react/24/outline";
import {useContext} from "react";
import AppSettingsContext from "../../context/AppSettings";

export function DarkMode() {
    const { darkMode, toggleDarkMode } = useContext(AppSettingsContext);

    return (
        <button onClick={toggleDarkMode}>
            {
                darkMode
                    ? <MoonIcon className="h-6 w-6 stroke-white" />
                    : <SunIcon className="h-6 w-6 stroke-gray-700" />
            }
        </button>
    )
}