import { useContext } from "react";
import useTheme from "../contexts/theme";

export default function ThemeBtn() {

    const { themeMode, lightTheme, darkTheme } = useTheme();
    function onChangeBtn(e) {
        const darkModeStatus = e.currentTarget.checked;
        if (darkModeStatus) {
            darkTheme()
        } else {
            lightTheme()
        }
    }

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox" //since this is a checkbox there is a state checked,unchecked, we gave checked here
                value=""
                className="sr-only peer"
                onChange={onChangeBtn}
                checked={themeMode === "dark"} //When it is checked the status is "dark"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Toggle Theme</span>
        </label>
    );
}

/*
    * How our card component knows presence of which theme on change in button
    * onChangeBtn function has done this due to presence of states
    * states are linked with theme.js and them.js has all values "themeMode, lightTheme, darkTheme"
    * And in App.jsx we have useEffect where dependency is on "themeMode" that means if there us chnage in themeMode then useEffect will run
    * And everywhere change will take place including Card.jsx
    * We made functipnlaity with Button and contextApi did chnages to all including Card.jsx
    * darkMode: "class" Add this in tailwind.config.js this is the functionlaity which comes from tailwind to html
    * See from 8:26:00  code and react part 1   
* */