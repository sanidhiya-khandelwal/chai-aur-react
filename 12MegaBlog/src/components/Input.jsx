import React, { useId } from "react";
// useId imp nh h use krna but again good pratice h

/**
 * forwardRef is used when we create one spearate input component but we will 
 * need access of states wherevr we use this input to take input and do something
 * Componnt khi or h and y compnnnt use khi or ho rha h so in order to access states
 *  
 * 
 * Advance React interview question
forwardRef ka example->
we will create one login form
login form k andr alg input fields h & same input field hum username,password,email
sb jagah use krenge toh input compont alg h
login page khi or h
but input ki state ka access toh mujhe form m chhaiye toh hume refernce dena padega form k andr
 */
const Input = React.forwardRef( //forwardRef k andr sb wrap kr diya (pura function) 
    function Input({
        label,
        type = "text",
        className = "",
        ...props
    }, ref) //jo bhi Input ko use krega vo ek "ref" bhi pass krega
    {

        const id = useId()
        return (
            <div className='w-full'>
                {/* LABEL */}
                {
                    label && <label
                        className="inline-block mb-1 pl-1"
                        htmlFor={id} //accessibility purpose k liye, not compulsory to use
                    >
                        {label}
                    </label>
                }
                {/* INPUT */}
                <input
                    type={type}
                    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                    ref={ref} //reference jo user n dia h as an prop vo humne yha pass kr dia h..yhi vo chiz h jo aapko reference degi apne parent componnt k andr & hum yha se stata ka access le lnege..iski wajah se hi hum onclick vgera use kr paeng
                    {...props}
                    id={id} //id jo upr generate hui h vo hum label,input dono m set kr rhe h and ab label p click krog toh input field highlight ho jaega and u can write there
                />
            </div>
        )
    }
)

export default Input;