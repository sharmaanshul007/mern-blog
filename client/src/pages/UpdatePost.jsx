import React, { useEffect } from 'react'
import { useState } from 'react';
import { Alert, Button, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
export default function UpdatePost() {
  const [formData,setFormData] = useState({});
  const navigate = useNavigate();
  const currentUser = useSelector(state=>state.user);
  const userId = currentUser.currentUser._id;
  const [publishError,setPublishError] = useState(null);
  const {postId} = useParams();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/post/getposts/${postId}`);
        const data = await response.json();
        if (!response.ok) {
          console.log("Error:", data.message);
          setPublishError(data.message);
          return;
        }
        
        
        setPublishError(null);
        
          setFormData(data); 
        
      } catch (error) {
        console.error("Error in fetching post:", error);
        setPublishError("Failed to fetch post");
      }
    };
    
    fetchPost();
  }, [postId]);
  
  
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await fetch(`/api/post/updatepost/${postId}/${userId}}`,{
        method:'PUT',
        credentials:"include",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      if(!res.ok){
        setPublishError(data.message);
        return ;
      }
      console.log(data);
      setPublishError(null);
      navigate(`/post/${data.slug}`);
    }catch(error){
      console.log(error);
      setPublishError("Something went wrong ");
    }
  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update a Post</h1>
      <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-7 sm:flex-row justify-between w-full'>
            <TextInput type='text' placeholder='Title' required id='title' className='flex-1' value={formData.title} onChange={(e)=>{
               setFormData({...formData,[e.target.id]:e.target.value}) ;
            }}>
            </TextInput>
            <Select className='flex-1' value={formData.category} onChange={(e)=> setFormData({...formData,category:e.target.value})}>
                    <option value='uncategorized'>Select a Category</option>
                    <option value='javascript'>JavaScript</option>
                    <option value='reactjs'>React Js</option>
                    <option value='nextjs'>Next Js</option>
            </Select>
            
        </div>
        <ReactQuill theme='snow' className='mb-12 h-72' placeholder='Write you Content here' required value={formData.content} onChange={(value)=>setFormData({...formData,content:value})}></ReactQuill>
        <Button type='submit' gradientDuoTone='purpleToPink'>Update</Button>
        {
          publishError && (<Alert className='mt-5' color='failure'>{publishError}</Alert>)
        }
      </form>
    </div>
  )
}
