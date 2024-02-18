import React, { useState } from 'react' //useState for storing and showing error messages if present
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            /**
             * create account..then get account of user created and then update state using redux
             */
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name "
                            {
                            ...register("name", {
                                required: true,
                            })
                            }
                        />

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

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,

                            })}
                        />
                        <Button
                            type='submit' //y dena compulsory h tbhi form submit hoga
                            className='w-full'
                        >
                            Create Account
                        </Button>


                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
