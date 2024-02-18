import React, { useState, useEffect } from 'react' //useState to write query
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"

function AllPosts() {
    const [posts, setPosts] = useState([]); //saare k ssare post yha hum rkhnge , abhi k liye empty array liya h
    console.log("posts...", posts);
    useEffect(() => {
        /**
            * getPosts([]) k andr humne empty array pass kra, hum chha toh ek query pass kr ste the, abhi koi query nhi h toh empty array pass kra h and ishi k andr hum saari values le lenge
            * succesfull hua toh .then and nhi hua toh .catch 
            * .then((posts)) .....jo result aaya h us "posts" naam de dia h
           */
        //    getPosts jo humne appwrite m lia that  uske parameter m ek query h jiska result ek array m aata h and vo jo return kra h listDocuments uska result ek array m aata h
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {//agr posts aaye h toh setPosts(posts.dcument)....sb posts m store kr lia and ab "posts" m ek array lgaenge 
                setPosts(posts.documents) //posts k andr saare documents hote h..jo save lr liye "posts" state m
            }
        })

    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            {/* <PostCard post={post} /> */}
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts