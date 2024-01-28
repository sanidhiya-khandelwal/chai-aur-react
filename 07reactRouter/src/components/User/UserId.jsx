import React from 'react'
import { useParams } from 'react-router-dom'

const UserId = () => {
    const { userId } = useParams();
    return (
        <div>UserId : {userId}</div>
    )
}

export default UserId