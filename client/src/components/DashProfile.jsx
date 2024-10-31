import { Button, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';
export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user);
    const [imageFile,setImageFile] = useState(null);
    const [imageFileUrl,setImageFileUrl] = useState(null);
    const handleInput = (e) => {
        const file = e.target.files[0];
        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }
    const uploadImage = async(req,res) => {
        
    }
    useEffect(() => {
        if(imageFile){
            uploadImage();
        }
    },[imageFile]);
  return (
    <div className='max-w-full w-full mx-auto p-3 mt-5 items-center'>
      <h1 className='text-center mb-5 font-semibold text-3xl '>Profile</h1>
      <form className='flex flex-col gap-7 items-center'>
        <input type='file' accept='image/*' onClick={handleInput}></input>
        <div className='w-36 h-36 rounded-full shadow-md overflow-hidden self-center'>
            <img src={imageFileUrl || currentUser.profilePicture} alt='User Image' className='w-full h-full rounded-full border-8 object-cover'
            ></img>
        </div>
        <TextInput type='text' placeholder='username' defaultValue={currentUser.username} className='w-[60%]'></TextInput>
        <TextInput type='text' placeholder='Email' defaultValue={currentUser.email} className='w-[60%]'></TextInput>
        <TextInput type='text' placeholder='password' defaultValue='************' className='w-[60%]'></TextInput>
        <Button type='submit' gradientDuoTone='purpleToBlue'className='w-[60%]' outline>Update</Button>
      </form>
      <div className='flex justify-between w-[60%] mx-auto text-xl mt-8'>
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
