/**
 * contianer is just a box in which we give styling properties and whtever values we give usey as it is display krwa dete h
 * container accepts all ur properties as children and "children" is just a name
 * Benefit : if u want ki container ki width 80% chhaiye saare elements k andr thn just make chnage here & kaam ho jaega
 */
import React from 'react'

function container({ children }) {
    return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>; //removed paranthesis since we're just returning one single line

}

export default container