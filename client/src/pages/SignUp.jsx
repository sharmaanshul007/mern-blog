import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
export default function SignUp() {
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
          <form className='flex flex-col gap-5'>
            <div>
              <Label value = 'Your Username'></Label>
              <TextInput
              type='text'
              placeholder='Enter Your Username'
              id='username'></TextInput>
            </div>
            <div>
              <Label value = 'Your Email'></Label>
              <TextInput
              type='text'
              placeholder='name@company.com'
              id='email'></TextInput>
            </div>
            <div>
              <Label value = 'Your Password'></Label>
              <TextInput
              type='text'
              placeholder='Enter Your Password'
              id='password'></TextInput>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Sign Up
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?
            </span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
