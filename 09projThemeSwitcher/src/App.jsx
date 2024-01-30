import { useState } from 'react'
import { ThemeProvider } from './contexts/theme'
import { useEffect } from 'react';
import './App.css'

function App() {
  const [themeMode, setThemeMode] = useState('light');

  /**
   * darkTheme(),lightTheme() function is defined here as in theme.js we had declared and not defined there 
   * Now it is defined there as well as soon as we defined here, this is how react behaves
   */
  const darkTheme = () => {
    setThemeMode('dark')
  }

  const lightTheme = () => {
    setThemeMode('light')
  }

  /**
   * Actually how theme is switched is DEFINED in useEffect
   * We remove light and dark classes whatever is present in HTML tag for tailwind if both them remove both else whatevr is present
   * Then Add themeMode selected by user
   * The dependency here is themeMode so gave that
   */
  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])
  return (
    // providing values to wrapped up components 
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>

    </ThemeProvider>
  )
}

export default App
