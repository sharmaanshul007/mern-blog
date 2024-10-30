import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import OAuth from '../components/OAuth'
export default function SignUp() {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    username:"",
    email:"",
    password:"",
  });
  const [loading,setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null);
  function handleChange(e){
    const {id,value} = e.target;
    setFormData((prev)=>{
      return {...prev,[id] : value.trim()}
    })
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!formData.username || !formData.password || !formData.email){
      return setErrorMessage("All fields are required");
    }
    try{
      setLoading(true);
      setErrorMessage(null);
        const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        return setErrorMessage(data.message);
      }
      navigate('/sign-in');
      setLoading(false);
      setErrorMessage(null);
    }catch(error){
      setLoading(false);
      return setErrorMessage(error.message);
      
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
          This is a Blog's Website designed with love by developers for bloggers
          </p>
        </div>
        {/* right Side */}
        <div className='w-full flex-1'>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div>
              <Label value = 'Your Username'></Label>
              <TextInput
              type='text'
              placeholder='Enter Your Username'
              id='username' onChange={handleChange}></TextInput>
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
              placeholder='Enter Your Password'
              id='password' onChange={handleChange}></TextInput>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (<Spinner size='sm'></Spinner>
                ) : ("Sign Up")
              }
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?
            </span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>
          {
            errorMessage && (<Alert className='mt-5' color='failure'>{errorMessage}</Alert>)
          }
        </div>
      </div>
    </div>
  )
}
