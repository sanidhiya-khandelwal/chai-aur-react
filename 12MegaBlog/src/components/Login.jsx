import React, { useState } from 'react'; //useState to display errors
import { Link, useNavigate } from 'react-router-dom'; //"link" to make something clickable and "useNavigate" coz login k bd khi toh lekr jaana hna 
import { login as AuthLogin } from '../store/authSlice'; //login ko alias name de diya and hum yha se "login" reducer use krenge 
import { Button, Input, Logo } from "./index"
import { useDispatch } from 'react-redux';
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /**
        *   register ...form handling krta h
        *   handleSubmit toh ek function h jo bnnana hi pdta h
     */
    const { register, handleSubmit } = useForm(); //step1 of useForm.. yha se humne register, handleSubmit nikale and handleSubmit is an event and yh isliye zaruri h coz jitni bhi input fields aap doge vha pe aap iss register k use kroge toh automatically jo aapne vha values likhi h unka state aapko manage nhi krna h, vha se apne aap valus pick krega and handlSubmit hote time apne aap saari values le lega
    const [error, setError] = useState("") //for showing errors

    const login = async (data) => { //async kuki info submit hogi , wapasa aaegi kaafi kuch ho skta h
        setError("") //stp 1 jb bhi login start kro toh pre-existing error ko empty out krdo..thi is also a practice
        try { //stp 3 trying to send data in next step
            const session = await authService.login(data); //await krna padega kuki upr async lga rkha h..data k andr pura object h toh vo hi jaega and jo bhi response aata h vo aata h ek session toh usey ek variable m store kr lia
            // agr session h toh user logged in and if session nhi h toh user logged in nhi h 
            if (session) {
                console.log("session", session);
                const userData = await authService.getCurrentUser(); //agr usr logged in toh user Data chhaiye h hume vo niklega "getCurrentUser" and it is always "await"
                console.log("login userdata", userData);
                if (userData) {
                    console.log('usr data presnt', userData);
                    console.log(" dispatch(AuthLogin(userData));", dispatch(AuthLogin(userData)));
                    dispatch(AuthLogin(userData));
                }
                //agr user data aaya h toh hume dipatch krna padega and while doing tht login m status... true hojaega and  state.userData m value set ho jaegi
                navigate("/")// or jb session h toh we can use "navigate" to navigate to root page, link use krte toh vo khud s nhi hota redirect , click krna pdta h.. navigate se aap programmatically aap usey khi or bhej skte ho 
            }

        } catch (error) {
            setError(error.message) //stp2 jo bhi error h vo state m set krli h and conditonal rendering krluna ki kb dikhana h kb nhi
        }
    }
    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {/* Dislaying error */}
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'> {/*form jb bhi use hoga toh handleSubmit hi use hoga ..handlSubmit ek mthod h jha aap apna method dete ho ki me iss tarah  form ko handle krunga*/}
                    <div className="space-y-5">
                        <Input //jo component bnaya h vo waala input
                            label='Email:' //label pass kra email ka, vha p value overwrite ho jaegi ab ..with what we have passd from here
                            placeholder="Enter your email" //handle hoga in ..props
                            type="email" //@ vgera handle hojaega
                            // next line is Javascript..and jitne bhi input fields bnaoge chahe "select" ho ya kuch bhi ho..we have to write one syntax that is "{...register}" since we're using useForm(), yh ...(teen dot) likhna zaruri h, nhi toh Agr aap kisi or input m bhi yh "register" use krte ho toh uski value overwrite ho jaegi toh hr br rgister ko spread krna padega and this is compulsory    
                            {...register( //yh register ka syntax h
                                "email", //key bolye h ise...yha hum naam dete h and isko humesha unique rkhna kuki aapka jo final object h, jo ki spread hoga .....vo jo "data" k andr aata h vo ishi basis pr aata h, "const login = async (data) => {}"..yha .....toh naam humesha unique hi dena
                                {
                                    //yh object h jisme hum options pass krte h
                                    required: true,
                                    validate: {
                                        //yha hum pattern match krwa rhe h or matchPattrn m bhi k call back hota h, we need to read documntaion for more options REACT FORM documentaion
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }

                                }

                            )}
                        />
                        {/* password */}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { //yha humn vaidation nhi dia ..it is upto us to give or not 
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className='w-full'
                        >
                            Sign in
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login;

