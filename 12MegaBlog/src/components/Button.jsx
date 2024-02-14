import React from "react";

export default function Button({
    children, //children sirf ek naam h isme normally hum button ka naam dete h
    type = "button", //by default hum y value de rhe h ..jb yh call hoga tb hum value chnage bhi kr skte h 
    bgColor = "bg-blue-600", //by default hum y value de rhe h.."same as above"
    textColor = "text-white", //by default hum y value de rhe h.."same as above"
    className = "", //kuch classes agr jb call kre tb vha se de toh uske liye isko empty banaya h and generally we create empty class only
    ...props //kuch or props lene ho toh  we can spread them
}) {
    return (
        // class name ki properties toh className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} m aagyi iske alawa kuch or proprties pass krni ho example placeholder , button m placeholder use nhi hota  but example k liye  aisi kuch propertis agr pass krni ho toh we give ->{...props}`}
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}  {...props}> {/** `` js ka concept h {} brackets k andr likho */}
            {children}
        </button>
    )
}