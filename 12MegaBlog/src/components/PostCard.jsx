import React from 'react'
import appwriteService from "../appwrite/config" //state m yh(getFilePreview) available nhi h toh hume yh appwrte/config se leni pd rhi h..abhi kya hoga na ki humari srvice ek query lga degi since humare  pass state m yh sb available nhi h..hoti toh hum redux use krte or values laate 
import { Link } from 'react-router-dom' //card p click krne k kaam aaegi

// post card ko display krwane k liye aapko kuch props pass krne padenge jo aapko appwrite se mil jaega query lgane k bd
function PostCard({ $id, title, featuredImage }) { //$id yh appwrite m aise hi chalta h vrna error aa jaega
    return (
        <Link to={`/post/${$id}`}> {/* link ki khaas baat hi yhi h ki aapko pura url nhi dena pdta aap jha pr ho aap vha se aage jaa skte ho so we gave /post/${$id} abhi humne router define nhi kra but hum usey bnaenge hi aisa ki go to post/$id*/}
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(featuredImage)} //"src" k andr string daalna h vo m direct nhi daal skta...toh curly braces {} k andr kuch tarika dhundna padega jiski help se hum image ka preview le paaye...getFilePreview naame ka ek method h config.js m..jo expect krta h ek file id(we gave "featuredImage") and returns back an "url" ...featuredImage ko hum DB m as "id" hi store krwa rhe h..purey "post" ki id toh "$id" h and image ki jo "id" h vo h "featuredImage" 
                        alt={title}
                        className='rounded-xl'
                    />
                    <h2 className='text-xl font-bold'>{title}</h2>
                </div>
            </div>
        </Link>
    )
}

export default PostCard