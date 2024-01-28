import { useState } from 'react'
import './App.css'

// function App() {

//   let count = 1;
//   const increament = () => {
//     count++;
//     console.log(count);
//   }
//   const decreament = () => {
//     count--;
//     console.log(count);
//   }
//   return (
//     <>
//       <h1>This is count {count}</h1>
//       <button
//         onClick={increament}
//       >
//         Increament counter
//       </button>
//       <br />
//       <button
//         onClick={decreament}
//       >Decreament counter</button>
//     </>
//   )
// }

function App() {
  const [count, setCount] = useState(0);

  function increament() {
    if (count < 5)
      setCount(count + 1);

  }
  function decreament() {
    if (count > 0)
      setCount(count - 1);
  }

  return (
    <>
      <h1>This is useState Count {count}</h1>
      <button
        onClick={increament}
      >
        Increament counter
      </button>

      <br />

      <button
        onClick={decreament}
      >
        Decreament counter
      </button>
    </>
  )
}


export default App
