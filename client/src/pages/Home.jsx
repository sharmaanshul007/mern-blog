import React, { useEffect, useState } from 'react'
import CallToAction from '../components/CallToAction'
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
export default function Home() {
  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async()=>{
      try{
        const result = await fetch(`/api/post/getPosts?limit=10`);
        const data = await result.json();
        if(!result.ok){
          console.log(data.message);
          return ;
        }
        setPosts(data.posts);
      }catch(error){
        console.log(error);
        console.log("Error in getting the posts at the home page");
      }
    }
    fetchPosts();
  },[]);

  return (
    <div>
        <div className='flex flex-col gap-6 px-3 p-28 max-w-6xl mx-auto lg:p-28 '>
          <h1 className='text-3xl font-bold'>Welcome to Tech Blogs</h1>
          <p className='text-gray-500 text-cs sm:text-sm'>
            Here you will find a variety of articles and tutorials on topics such as web development, software engineering and programming languages.
          </p>
          <Link to='/search' className="text-xs sm:text-sm text-teal-500 font-bold hover:underline">View all posts</Link>
        </div>
        <div className='p-3 bg-amber-100 dark:bg-slate-700 '>
          <CallToAction></CallToAction>
        </div>
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6 '>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4 items-center justify-center'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
