import React, { useId } from 'react' //useId hum "htmlFor" jo "label" m h , vhi pr lga denge & vhi input field pr bhi, yha hum "select" m denge vo "id"

function Select({
    options = [], //options dena zaruri h nhi toh select kisey krwaoge dropdown k andr & options se ek array  hi milta h usually and by default hi humne ek empty array le liya
    label,//input field type h toh label dena chahiye, accessibility achhi hoti h
    className = "", //u can also give like this "className"
    ...props
}, ref) { //"ref" for "reference" and forwardRef m niche wrap kra h export krte vkt..yh bhi ek tarika h
    const id = useId();
    return (
        <div className='w-full'>
            {/* label */}
            {label && <label htmlFor={id} className=''></label>} {/**label exist kri h toh hi display hoga and label m humne kuch pass nhi kra kuki kuch h hi nhi dikhane ka but still behind the scene label m "id" rhegi & html ka structure nhi bigdega  */}
            {/* select */}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >

                {/* ho skta h "options" m koi value hi na ho and when u loop in such condition then 100% it will crash so we will LOOP OPTIONALLY .? means if value is there thn loop else don't        */}
                {
                    options?.map((option) => (
                        <option key={option} value={option}> {/* key me index deskte the but option bhi toh uniqu hi h so we gave "key" as "option" and value={option} yh imp h yh option vhi h jo array ki value h */}
                            {option}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default React.forwardRef(Select);