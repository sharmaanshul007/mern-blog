import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure,signInStart,signInSuccess,signInStop } from '../redux/user'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'
export default function SignIn() {
  const navigate = useNavigate();
  const {loading,error:errorMessage} = useSelector(state => state.user);
  const [formData,setFormData] = useState({
    email:"",
    password:"",
  });
  const dispatch = useDispatch();
  function handleChange(e){
    const {id,value} = e.target;
    setFormData((prev)=>{
      return {...prev,[id] : value.trim()}
    })
  }
  dispatch(signInStop());
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if( !formData.password || !formData.email){
      dispatch(signInFailure("All fields are required"));
      return ;
    }
    try{
      dispatch(signInStart());
        const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
        return ;
      }
      
      dispatch(signInSuccess(data));
      navigate('/');
    }catch(error){
      dispatch(signInFailure(error.message));
      return;
    }
  }

  return (
    <div className='min-h-screen mt-28'>
      <div className=' p-1 w-4xl flex flex-col md:flex-row items-center'>
        {/* left Side */}
        <div className='flex gap-4 m-6 md:gap-8 flex-col flex-1'>
          <Link to='/' className='  text-2xl md:text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 rounded-md text-white'>Tech</span> Blog
          </Link>
          <p>
            You can Sign-In with your email and password
          </p>
        </div>
        {/* right Side */}
        <div className='w-full flex-1'>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div>
            </div>
            <div>
              <Label value = 'Your Email'></Label>
              <TextInput
              type='email'
              placeholder='name@company.com'
              id='email' onChange={handleChange}></TextInput>
            </div>
            <div>
              <Label value = 'Your Password'></Label>
              <TextInput
              type='password'
              placeholder='*************'
              id='password' onChange={handleChange}></TextInput>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (<Spinner size='sm'></Spinner>
                ) : ("Sign In")
              }
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Do not Have an account?
            </span>
            <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
            
          </div>
          {
            errorMessage && (<Alert className='mt-5' color='failure'><>{errorMessage}</></Alert>)
          }
        </div>
      </div>
    </div>
  )
}
