import { createContext, useContext } from "react";

// context created with some default value 
export const ThemeContext = createContext({ //passing object with some values 
    themeMode: 'light', //default theme
    darkTheme: () => { },
    lightTheme: () => { },
})

//Storing provider in a variable
export const ThemeProvider = ThemeContext.Provider;

//Creating a Hook which returns a useContext

export default function useTheme() {
    return useContext(ThemeContext) //it has access to all values present in ThemeContext i.e themeMode,darkTheme,lightTheme
}

/**
 *   Now no need to import two things((ThemeContext,useContext)) in files where we need context 
 *   Only import "ThemeProvider" where u need to wrap ur App
 *   Only import "useTheme" where u need to use the Context in 08miniproj we imported two files (ThemeContext,useContext) now only 1 iport is sufficient
 * */