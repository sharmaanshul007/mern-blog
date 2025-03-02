import { current } from '@reduxjs/toolkit';
import React from 'react';
import { Alert, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Textarea, TextInput } from 'flowbite-react';
export default function CommentSection({postId}) {
  const {currentUser} = useSelector(state => state.user);
  const [comment,setComment] = useState('');
  const [commentError,setError] = useState('');
  const handleSubmit = async(e) => {
    try{
      e.preventDefault();
      if(comment.length > 200){
        return ;
      }
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
    }catch(error){
      setError(error);
      console.log(error);
      console.log('Failed to post comment');
    }
  }
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
                  <Button outline gradientDuoTune='purpleToBlue' type='submit'>Submit</Button>
                  
                </div>
                {commentError && <Alert color='failure'>{commentError}
                </Alert>}
            </form>
        )
      }
      
    </div>
  )
}
