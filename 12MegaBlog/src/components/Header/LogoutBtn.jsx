import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch();
    /**
     * jese hi button pr click ho toh logoutHandler call hoga
     * "authService" object use krkr hum "logout" call krwa rhe h
     * abhi saare "authService" k functions hume ek promise return krte h toh we can use
     * .then(), .catch() and in .then() we can use a call back where we are updating the state
     * with the help of "dispatch" function and it is just updating the state & th logout that
     * we're calling is a reducer
     */
    const logoutHandler = async () => {
        await authService.logout().then(() => { //authService.logout() it returns a promise so we can use .then also we can us after .catch() as well like this ...  .then().catch()
            dispatch(logout())
        })
    }
    return (
        <button
            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
        >LogoutBtn</button>
    )
}

export default LogoutBtn