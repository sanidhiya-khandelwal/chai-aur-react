import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react'

const App = () => {

  const [length, setLength] = useState(8);
  const [number, setNumberAllowed] = useState(false);
  const [specialCharacter, setSpecialCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //use callback
  const passwordGenerator = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number)
      str += '0123456789';

    if (specialCharacter)
      str += '`~@#!$%^&*()[]{}/*/_+-=';

    for (let i = 0; i < length; i++) {
      let char = Math.floor((Math.random() * str.length) + 1);
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, number, specialCharacter]);

  //use effect
  useEffect(() => passwordGenerator(), [length, number, specialCharacter]);

  //use ref
  const passwordRef = useRef(null);

  // copy to clipboard
  function copyPasswordToClipboard() {
    //for highlighting the selected text
    passwordRef.current?.select();
    //for copying the complete password
    window.navigator.clipboard.writeText(password);
  }



  return (
    <>
      <div className='w-full h-screen bg-black'>
        <div className='w-3/6  bg-slate-600 flex flex-col justify-center m-auto text-white p-5'>
          <h1 className='text-4xl text-yellow-300 m-auto'>Password Generator</h1>
          <div className='w-auto ml-15 flex justify-center gap-5 mt-5 mb-5'>
            <input
              type="text"
              className='rounded w-2/3 py-1 px-3 text-2xl text-orange-400'
              placeholder='password'
              readOnly
              value={password}
              ref={passwordRef}
            />
            <button
              className='bg-violet-800 cursor-pointer w-auto py-1 px-5 rounded'
              onClick={copyPasswordToClipboard}
            >
              Copy
            </button>
          </div>
          <div className='flex justify-center gap-4 text-orange-400 text-xl'>
            <div className='flex gap-4'>
              <input
                type="range"
                min={2}
                max={20}
                value={length}
                onChange={(e) => { setLength(e.target.value) }}
                className='cursor-pointer'
              />
              <label>
                Length : {length}
              </label>
            </div>
            <div className='flex gap-2 align-middle'>
              <input
                type="checkbox"
                defaultChecked={number}
                className='w-4 cursor-pointer'
                onChange={() => setNumberAllowed(prev => !prev)}
              />
              <label>Numbers</label>
            </div>
            <div className='flex gap-2 align-middle'>
              <input
                type="checkbox"
                defaultChecked={specialCharacter}
                className='w-4 cursor-pointer'
                onChange={() => setSpecialCharacterAllowed(prev => !prev)}
              />
              <label>Special Characters</label>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App