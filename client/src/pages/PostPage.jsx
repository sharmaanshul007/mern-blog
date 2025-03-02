import { Spinner } from 'flowbite-react';
import React from 'react'
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
export default function PostPage() {
    const {postSlug} = useParams();
    const [post,setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);
    useEffect(()=>{
        const getPost = async() =>{
            try{
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                
                const data = await res.json();
                if(!res.ok){
                    setLoading(false);
                    setError(true);
                    console.log(data.message);
                }
                else{
                    setError(false);
                    setLoading(false);
                    setPost(data.posts[0]);
                }
            }
            catch(error){
                setLoading(false);
                setError(true);
            }
        }
        getPost();
    },[postSlug]);
    if(loading) return <div className='flex justify-center items-center min-h-screen'><Spinner size='xl' ></Spinner></div>
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl  '>{post && post.title}</h1>
        <Link className='self-center mt-3' to={`/search?tag=${post && post.category}`}>
            <Button color='gray' pill >{post && post.category}</Button>
        </Link>
        <div className='flex justify-between p-3 border-b border-slate-300 mx-auto w-full mx-w-2xl text-xl'>
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className='italic'>{post && (post.content.length/1000).toFixed(0) } mins read</span>
        </div>
        <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html:post && post.content}}></div>
        <div className='max-w-4xl mx-auto w-full '>
            <CallToAction/>
        </div>
        <CommentSection postId={post._id}></CommentSection>
    </main>
  )
}
