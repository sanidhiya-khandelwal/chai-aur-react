import UserContextProvider from './context/UserContextProvider'
import './App.css'

function App() {

  return (
    <UserContextProvider>
      <h1>Learn useContext with mini project</h1>
    </UserContextProvider>
  )
}

export default App
