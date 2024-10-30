import React from 'react'
import {Button} from 'flowbite-react';
import {AiFillGoogleCircle} from 'react-icons/ai';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux/user'
import { useNavigate } from 'react-router-dom';
export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async() => {
        
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt:"select_account"});
        try{
            const result = await signInWithPopup(auth,provider);
            const final = await fetch('/api/auth/google',{
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    googlePhotoUrl:result.user.photoURL,
                })
            })
            const resp = await final.json();
            
            dispatch(signInSuccess(resp));
            navigate('/');
            
        }catch(error){
            console.log("Error in google sign-in");
            console.log(error);
        }
    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>Continue With Google
    </Button>
  )
}
