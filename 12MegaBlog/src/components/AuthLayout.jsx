import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
/**
 * file ka name and function name differnt ho skta h
 * We'll conditonally render its children 
 */

export default function Protected({ children, authentication = true }) { //y 2 chiz lenge hum jo bhi ise call krega
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    // phle hum store se puchenge ki user logged in h ya nhi h , directly depend nhi krenge ki user kya pass kr rha h ussey

    const authStatus = useSelector(state => state.auth.status)// humne state se thru redux status nikala usr ka ki vo abhi authenticated h ya nhi

    // useEffect btaga ki hum login p jaana h h ya home page pr ya fr khi or and kis kis field m chnage ho 
    //toh check krna h wapas se check in
    /**
     * authStatus: isme kuch bhi change ho UE chalega kuki m store se puch kr aaya huin and y useSelector iski monitoring krta h
     * navigate: y dhyan rkhta h ki usr khi or toh nhi gya and isme kuch bhi change ho UE chalega
     * authentication: user n kuch authentication bheja ho toh bhi UE chalega
    */
    useEffect(() => {
        // true(yh agr user kuch bhi nhi de rha toh by default humne true rkha h) && false!==true
        //true && true=>true and user will be asked to login 
        if (authentication && authStatus !== authentication) { //user n suppose kra bheja "authentication" ko "true" but hum yha (authStatus !== authentication) check bhi krenge sirf user k khe pr nhi maanenge
            navigate("/login");
        } else if (!authentication && authStatus !== authentication) { //!true && true !==true=> false && false=> redirected to homepage
            navigate("/")
        }
        /**
         * EASY way but don't use
         * if(authStatus===true){
         *  navigate("/login")
         * }else if(authStatus===false){
         *  navigate("/login")
         * }
         */
        setLoader(false) //loader toh false ho hi rha hr case m
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading ...</h1> : <>{children}</>
}