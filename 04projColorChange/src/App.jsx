import React, { useState } from 'react'

const App = () => {
  const [color, setColor] = useState('yellow');

  return (
    <div
      className='w-full h-screen duration-200 flex flex-wrap justify-center'
      style={{ backgroundColor: color }}
    >
      <div className='fixed bottom-10 bg-neutral-950 px-4 py-1 text-white rounded-xl w-auto flex justify-center gap-5'>
        <button className='bg-red-600 rounded-lg px-2 py-1 w-auto'
          onClick={() => setColor('red')}
        >Red</button>
        <button className='bg-green-600 rounded-lg px-2 py-1 w-auto'
          onClick={() => setColor('green')}
        >Green</button>
        <button className='bg-violet-600 rounded-lg px-2 py-1 w-auto'
          onClick={() => setColor('violet')}>Violet</button>
      </div>

    </div>
  )
}

export default App