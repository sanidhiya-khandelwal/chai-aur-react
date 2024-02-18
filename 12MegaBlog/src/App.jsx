import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  /**
   *  step1  created a state "loading" for loading why ?  coz jb aap applicaiton se data fetch krenge toh 
      appwrite humare ghr pr ya local system m toh rkha nhi h ki immdiately saara kaam hojaga..thoda
      time toh lgega respons aane k liye Toh jb bhi DB SE KUCH PUCHNA HO YA NETWORK SE KUCH PUCHNA HO
      TOH K LOADING STATE BNANA ACCHHA HOTA H kuki iske basis pr hum conditional rendering kr skte h
      if-else lga kr,,agr true h toh loading ka icon dikhaenge and nhi toh hum kuch data dikhaenge & 
      usually iss state ko initallly hum "true" rkhte h coz humara flow aisa h-> app load hua toh vo
      "load" ho rha h and parallely useEffect data chck kr rha h ya kuch bhi kr rha h and useeffect 
      m hi hum "loading" state ko false krdenge once work is done     
   */
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch() //step 2 ..kuch dispatch krn k liye mtlb currentUser ko laana ya kuch bhi krne k liye.."state" chnage krna h toh "dispatch" toh lgega 

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => { //yh bhi ek call back hota h "userData" normal ek variable name hi h 
        if (userData) { //useData h toh hum dispatch krenge i,e login function ko userData send krenge
          dispatch(login({ userData })) //ek obejct pass kra h jiska naam h "userData", Aise name dene (means aise dene ki zaruart nhi h {user:userData})ki zarurat nhi h humne handle hi aise kra h login k andr k userData yha doge bina naam k toh bhi koi issue nhi h
        }
        else {
          dispatch(logout()) //or agr nhi h userData toh hum state toh update kr hi denge by dispatching logout()
        }
      })
      .finally(() => setLoading(false)) //finally toh hr br chalega hi & hum yha bhi call abck pass krkr setLoading(false) pass krkr, hum apni loading state ko update krdenge
  }, [])
  // conditional rendering kri
  return !loading ?
    (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header />
          <main> {/*"Outlet" react router ka part h y*/}
            TODO: <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    )
    : null

}

export default App
