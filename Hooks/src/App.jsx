import './App.css'

function App() {

  let count = 1;
  const increament = () => {
    count++;
    console.log(count);
  }
  const decreament = () => {
    count--;
    console.log(count);
  }
  return (
    <>
      <h1>This is count {count}</h1>
      <button
        onClick={increament}
      >
        Increament counter
      </button>
      <br />
      <button
        onClick={decreament}
      >Decreament counter</button>
    </>
  )
}

export default App
