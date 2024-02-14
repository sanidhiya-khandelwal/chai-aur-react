import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux' //to check in store whether the user is logged in or not
import { useNavigate } from 'react-router-dom' //navigation forcefully krwana ho toh, we also have useNavigator
function Header() {
    const authStatus = useSelector((state) => state.auth.status) //state se jakr "status" lkr aaega user ka ki vo loggd in h ya nhi, useSelector k andr ek call back hota h jise "state" ki access hoti h and yh "status" humne inital state me define kra h in authSlice.js

    const navigate = useNavigate();
    /**
     * whenever we create navigation bar we create an array and loop under it
     * Inside array we create objects consisting of...
     * Benefit-> if new values are given then we need to again create a button so btter
     * we'll add that inside array and loop we will take care of it    
     */
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]

    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    {/* logo */}
                    <div className="mr-4">
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>
                    {/* nav items */}
                    <ul className='flex ml-auto'>
                        {
                            navItems.map((item) =>
                                item.active ? ( //first check ki user logged in h ya nhi if true then diplay nav else we show null
                                    <li key={item.name}> {/*key vhi use kro jis component ko br br call kr rhe ho yha item.name unique h but hr case m y unique nhi hota for this project we will give every name as unique name */}
                                        <button
                                            onClick={() => navigate(item.slug)} //onclick krkr naviagte call kra jise ek parameter dena pdta h and that parametr is url we could have used link as well in place of navigate
                                            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                        >{item.name}</button>
                                    </li>
                                ) : null
                            )}
                        {/* Conditonal rendering of logout button */}
                        {
                            authStatus && ( //authstatus true h toh hi logoutBtn show hoga else nhi hoga show
                                <li>
                                    <LogoutBtn />
                                </li>
                            )
                        }
                    </ul>

                </nav>
            </Container>
        </header>
    )
}

export default Header