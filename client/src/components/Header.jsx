import {AiOutlineSearch} from 'react-icons/ai'
import {  Button, ButtonGroup, Navbar, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
export default function Header() {
  const location = useLocation();
  const pathName = location.pathname;
  return (
        <Navbar className="flex w-full justify-around items-center">
        
              {/* Logo */}
              <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 rounded-md text-white'>Tech</span> Blog
              </Link>
              {/* search bar */}
              <form>
                <TextInput
                type='text'
                placeholder='Search...'
                className='hidden lg:inline'>
                </TextInput>
              </form>
              <Button className='w-12 h-10 lg:hidden pill'><AiOutlineSearch></AiOutlineSearch></Button>

              <div className='flex flex-row gap-3 md:order-2'>
                <Button className='w-12 h-10 sm:inline hidden'>
                  <FaMoon></FaMoon>
                </Button>
                <Link to='/'>
                <Button gradientDuoTone='purpleToBlue' className='text-sm sm:text-xl'>Sign In</Button>
                </Link>
                <Navbar.Toggle></Navbar.Toggle>
              </div>
                

            
            <Navbar.Collapse>
                  <Navbar.Link active={pathName=='/'} as={'div'}>
                    <Link to='/'>Home</Link>
                  </Navbar.Link >
                  <Navbar.Link active={pathName=='/projects'} as={'div'}>
                    <Link to='/projects'>Projects</Link>
                  </Navbar.Link>
                  <Navbar.Link active={pathName=='/about'} as={'div'}>
                    <Link to='/about'>About</Link>
                  </Navbar.Link>
                </Navbar.Collapse>
        </Navbar>
  )
}
