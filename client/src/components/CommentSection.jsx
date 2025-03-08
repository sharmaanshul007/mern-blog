import { current } from '@reduxjs/toolkit';
import React from 'react';
import { Alert, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Textarea, TextInput } from 'flowbite-react';
import Comment from './Comment';
export default function CommentSection({postId}) {
  const {currentUser} = useSelector(state => state.user);
  const [comment,setComment] = useState('');
  const [commentError,setError] = useState('');
  const [comments,setComments] = useState([]);
  const handleSubmit = async(e) => {
    try{
      e.preventDefault();
      if(comment.length > 200){
        return ;
      }
      console.log(currentUser._id);
      const res = await fetch('/api/comment/create',{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({comment,userId:currentUser._id,postId})
      });
      const data = await res.json();
      if(!res.ok){
        setError(data.message);
        console.log(data.message);
        return;
      }
      setError('');
      setComment('');
      setComments([data,...comments]);
    }catch(error){
      setError(error);
      console.log(error);
      console.log('Failed to post comment');
    }
  }

  useEffect(()=>{
    const getComments = async() => {
      try{
        const res = await fetch(`/api/comment/getPostComments/${postId}`,{
          method:"GET",
          headers:{'Content-Type':"application/json"},
          body:JSON.stringify()
        });
        const data = await res.json();
        if(!res.ok){
          console.log(data.message);
          return;
        }
        setComments(data);
        
      }catch(error){
        console.log(error);
        console.log("Failed to get the comments from the server");
      }
    }
    getComments();
  },[postId]);
  
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>   
      {
        currentUser ?
        (<div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
            <p>Signed In as:</p>
            <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture}></img>
            <Link className='text-xs text-cyan-600 hover:underline' to={`/dashboard?tab=profile`}>
                @{currentUser.username}
            </Link>
        </div>) :
        (<div className='text-sm text-teal-500 my-5 flex gap-1'>
            You must be log-in To comment
            <Link className='text-blue-500 hover:underline' to='/signin'>Sign-In</Link>
        </div>)
      }
      {
        currentUser && (
            <form className='border border-teal-500 p-3 rounded-md' onSubmit={handleSubmit}>
                    <Textarea 
                      placeholder="Write your comment..." 
                      maxLength="200" 
                      rows="3" 
                      value={comment}  // Controlled Component Fix
                      onChange={(e) => {setComment(e.target.value); e.preventDefault();}}
                    />                
                <div className='flex justify-between items-center mt-5 mb-4'>
                  <p className='text-gray-500 text-xs'>{200 - comment.length} Characters Remaining</p> 
                  <Button outline gradientduotune='purpleToPink' type='submit'>Submit</Button>
                  
                </div>
                {commentError && <Alert color='failure'>{commentError}
                </Alert>}
            </form>
        )

      }
      {
        comments.length === 0 ?(<p className='text-sm my-5'>No Comments yet!</p>) :
        (<><div className='text-sm my-5 flex items-center gap-1'>
          <p>Comments</p>
          <div className='border border-gray-400 py-1 px-2 rounded-sm '>
            <p>{comments.length}</p>

          </div>
        </div>
        {
          comments.map((comment)=> {
            return <Comment comment={comment} key={comment._id}></Comment>
          })
        }
      </>)
      }
    </div>
  )
}
