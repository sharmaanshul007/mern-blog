import React from 'react'
import { useState } from 'react';
import { Alert, Button, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate} from 'react-router-dom';
export default function CreatePost() {
  const [formData,setFormData] = useState({});
  const navigate = useNavigate();
  const [publishError,setPublishError] = useState(null);
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await fetch('/api/post/create',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      if(!res.ok){
        setPublishError(data.message);
        return ;
      }
      setPublishError(null);
      navigate(`/post/${data.slug}`);
    }catch(error){
      console.log(error);
      setPublishError("Something went wrong ");
    }
  }
  console.log(formData);
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
      <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-7 sm:flex-row justify-between w-full'>
            <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e)=>{
               setFormData({...formData,[e.target.id]:e.target.value});
            }}>
            </TextInput>
            <Select className='flex-1' onChange={(e)=> setFormData({...formData,category:e.target.value})}>
                    <option value='uncategorized'>Select a Category</option>
                    <option value='javascript'>App Development</option>
                    <option value='reactjs'>Artificial Intelligence</option>
                    <option value='nextjs'>Web Development</option>
                    <option value='nextjs'>Cloud Computing</option>
                    <option value='nextjs'>Technology</option>
            </Select>
            
        </div>
        <ReactQuill theme='snow' className='mb-12 h-72' placeholder='Write you Content here' required onChange={(value)=>setFormData({...formData,content:value})}></ReactQuill>
        <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
        {
          publishError && (<Alert className='mt-5' color='failure'>{publishError}</Alert>)
        }
      </form>
    </div>
  )
}
