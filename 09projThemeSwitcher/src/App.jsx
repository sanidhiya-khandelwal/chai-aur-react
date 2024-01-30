import { useState } from 'react'
import { ThemeProvider } from './contexts/theme'
import { useEffect } from 'react';
import './App.css'
import ThemeBtn from './components/ThemeBtn';
import Card from './components/Card';

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
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
