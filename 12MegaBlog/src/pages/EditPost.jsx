import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)//u can give empty array as well insteas of array
    const { slug } = useParams();//jb user kisi post p click krega toh hi update kr paega but h needs that slug and vo slug humare url k end m hoga so we use useParams(), yha hum varible  ka naam m "slug" hi de rhe h, we can give any name
    const navigate = useNavigate();
    useEffect(() => {
        if (slug) {//agr slug h toh run next lines
            appwriteService.getPost(slug).then((post) => { //getPost(slug)=> yh expect kr rha h slug(unique id) ko, agr succesfull hua toh .then chalega and then "post" m save hoga  
                if (post) {
                    setPosts(post)
                }
            })
        }
        else {
            navigate('/')
        }
    }, [slug, navigate]) //slug: , navigate m kuch change hoga toh run UE
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost