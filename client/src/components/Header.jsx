import {AiOutlineSearch} from 'react-icons/ai'
import {  Avatar, Button, ButtonGroup, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {FaMoon,FaSun} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice.js'
export default function Header() {
  const location = useLocation();
  const pathName = location.pathname;
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);
  const {currentUser} = useSelector((state) => state.user);
  function handleThemeChange(){
    console.log(theme);
    dispatch(toggleTheme());
    
  }
  return (
        <Navbar className="flex w-full justify-around items-center mt-4">
        
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
                <Button className='w-12 h-10 sm:inline hidden' onClick={handleThemeChange}>
                  {
                    theme === "light" ? (<FaSun></FaSun>) : (<FaMoon></FaMoon> ) 
                  }
                  
                </Button>
                {
                  currentUser ? (<Dropdown arrowIcon= {false} inline  label = {
                    <Avatar alt='user' img={currentUser.profilePicture} rounded></Avatar>
                  } >
                    <Dropdown.Header>
                      <span className='block text-sm'>@{currentUser.username}</span>
                      <span className='truncate text-sm font-medium'>{currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                      <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider></Dropdown.Divider>
                    <Dropdown.Item>Sign Out</Dropdown.Item>
                  </Dropdown>) : 
                  (<Link to='/'>
                    <Button gradientDuoTone='purpleToBlue' className='text-sm sm:text-xl'>Sign In</Button>
                    </Link>)
                }
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
