import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Github = () => {
    const [data, setData] = useState(0)
    useEffect(() => {
        fetch('https://api.github.com/users/sanidhiya-khandelwal')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data)
            })
    },
        [])
    return (
        <>
            <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers: {data.followers}
            </div>
            <img src={data.avatar_url} alt="Git picture" width={300} />
        </>
    )
}

export default Github
