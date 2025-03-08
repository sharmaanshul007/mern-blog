import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { updateStart,updateFailure,updateSuccess , deleteUserFailure,deleteUserStart,deleteUserSuccess, signInFailure, signInSuccess, signOutSuccess} from '../redux/user';
import {HiOutlineExclamationCircle} from 'react-icons/hi';
export default function DashProfile() {
    const dispatch = useDispatch();
    const [showModal,setShowModal] = useState(false);
    const {currentUser,error} = useSelector(state => state.user);
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
        const data =await res.json();
        if(!res.ok){
          console.log("failure");
          dispatch(updateFailure(data.message));
        }
        else{
          setUpdateUserSuccess("User details have been updated successfully");
          dispatch(updateSuccess(data)); 
        }
      }catch(error){
        setUpdateUserFailure("User details cannot be updated successfully");
        dispatch(updateFailure(error));
      }
    }

    const handleDeleteUser = async() => {
      setShowModal(false);
      try{
        const result = await fetch(`/api/user/delete/${currentUser._id}`,{
          method:'DELETE',
          headers:{'Content-Type':'application/json'},
          
        })
        const data = await result.json();
        if(!result.ok){
          dispatch(deleteUserFailure(data));
        }
        else{
          dispatch(deleteUserSuccess());
        }
      }catch(error){
        dispatch(deleteUserFailure(error));
      }
    }

    const uploadImage = async() => {
        
    }
    const handleSignOut = async() => {
      try{
        const response = await fetch('/api/user/signout',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
        })
        const data = response.json();
        if(!response.ok){
          console.log(data.message);
        }else{
          dispatch(signOutSuccess());
        }
      }catch(err){
        console.log(err);
      }
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
        {
           (
            <Link className='w-full mx-auto' to={'/create-post'}><Button type='button' gradientDuoTone='purpleToBlue' outline className='mx-auto w-[60%]'>Create a Post</Button></Link>
          )
        }
      </form>
      <div className='flex justify-between w-[60%] mx-auto text-xl mt-8'>
        <span className='text-red-500 cursor-pointer' onClick={()=>setShowModal(true)}>Delete Account</span>
        <span className='text-red-500 cursor-pointer' onClick={handleSignOut}>Sign Out</span>
      </div>
      {
        updateUserSuccess && (<Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>)
      }
      {
        error && (<Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>)
      }
      <Modal show={showModal} popup size='md' onClose={()=>setShowModal(false)}>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'></HiOutlineExclamationCircle>
            <h3 className='mt-5 text-lg text-gray-500 dark:text-gray-200'>Are you sure, you want to delete your account?</h3>
            <div className='flex flex-row justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>Yes, I'm sure</Button>
              <Button color='gray' onClick={()=>{setShowModal(false)}}>No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
