import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'
function App() {

  return (
    <>
      <h1 className='bg-green-400 p-4 rounded-xl'>Tailwind css</h1>
      <Card buttonName='click me' username='Sanidh' />
      <Card buttonName='visit me' username='Anhai' />
      <Card />
    </>
  )
}

export default App
