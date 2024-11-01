import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { updateStart,updateFailure,updateSuccess } from '../redux/user';
export default function DashProfile() {
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user);
    const [imageFile,setImageFile] = useState(null);
    const [imageFileUrl,setImageFileUrl] = useState(null);
    const [formData,setFormData] = useState({});
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserFailure,setUpdateUserFailure] = useState(null);

    const handleInput = (e) => {
        const file = e.target.files[0];
        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }
    const handleChange = (event) => {
      const id = event.target.id;
      const val = event.target.value;
      
      setFormData((formData)=>{
        return {...formData,[id]:val}
      })
    }
    console.log(formData);
    
    const handleSubmit = async(e) => {
      e.preventDefault();
      if(Object.keys(formData).length === 0){
        return ;
      }
      try{
        dispatch(updateStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`,{
          method:'PUT',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(formData)
        });
        console.log("hey data");
        const data =await res.json();
        if(!res.ok){
          console.log("failure");
          dispatch(updateFailure(data.message));
        }
        else{
          console.log("haa pay");
          setUpdateUserSuccess("User details have been updated successfully");
          dispatch(updateSuccess(data)); 
        }
      }catch(error){
        setUpdateUserFailure("User details cannot be updated successfully");
        dispatch(updateFailure(error));
      }
    }


    const uploadImage = async() => {
        
    }
    useEffect(() => {
        if(imageFile){
            uploadImage();
        }
    },[imageFile]);
  return (
    <div className='max-w-full w-full mx-auto p-3 mt-5 items-center'>
      <h1 className='text-center mb-5 font-semibold text-3xl '>Profile</h1>
      <form className='flex flex-col gap-7 items-center' onSubmit={handleSubmit}>
        <input type='file' accept='image/*' onClick={handleInput}></input>
        <div className='w-36 h-36 rounded-full shadow-md overflow-hidden self-center'>
            <img src={imageFileUrl || currentUser.profilePicture} alt='User Image' className='w-full h-full rounded-full border-8 object-cover'
            ></img>
        </div>
        <TextInput type='text' placeholder='username' id='username' defaultValue={currentUser.username} className='w-[60%]' onChange={handleChange}></TextInput>
        <TextInput type='text' placeholder='Email' id='email' defaultValue={currentUser.email} className='w-[60%]' onChange={handleChange}></TextInput>
        <TextInput type='text' placeholder='password' id='password' defaultValue='************' className='w-[60%]' onChange={handleChange}></TextInput>
        <Button type='submit' gradientDuoTone='purpleToBlue'className='w-[60%]' outline>Update</Button>
      </form>
      <div className='flex justify-between w-[60%] mx-auto text-xl mt-8'>
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign Out</span>
      </div>
      {
        updateUserSuccess && (<Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>)
      }
    </div>
  )
}
