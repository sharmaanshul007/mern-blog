import moment from 'moment';
import React, { useEffect, useState } from 'react'

export default function Comment({comment}) {
    const [user,setUser] = useState({});
    useEffect(()=>{
        const getUser = async() => {
            try{
                const res = await fetch(`/api/user/${comment.userId}`,{
                    method:"GET",
                    headers:{'Content-Type':"application/json"},
                    body:JSON.stringify()
                });
                const data = await res.json();
                if(!res.ok){
                    console.log(data.message);
                    console.log("Error in fetching the info about the user of the comment");
                    return;
                }
                setUser(data);
            }catch(error){
                console.log(error);
                console.log("Failed to get the info about the user ");
            }
        }
        getUser();
    },[comment]);
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex shrink-0 mr-3'><img src={user.profilePicture} className='w-10 h-10 rounded-full bg-gray-200' alt='Not Available'></img></div>
      <div className='flex-1'>
        <div className='flex items-center mb-1 '>
            <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}` : ("anonymous user ")}</span>
            <span className=''>{
                moment(comment.createdAt).fromNow()
            }           
            </span>
        </div>
        <p className='text-gray-500 pb-2 '>{
            comment.content
        }</p>
      </div>
    </div>
  )
}
