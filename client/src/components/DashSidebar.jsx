import React from 'react';
import {HiAnnotation, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi';
import {Sidebar} from 'flowbite-react';
import { Link, useLocation,useSearchParams} from 'react-router-dom';
import { useState , useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../redux/user';
import { useSelector } from 'react-redux';
export default function DashSidebar() {
  const location = useLocation();
  const [searchParams,setSearchParams] = useSearchParams();
  const [tab,setTab] = useState("");
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user);
  useEffect(()=>{
    const tabFromUrl = searchParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]);
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
  return (
    <Sidebar className='w-full mt-1 md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item as='div' active = {tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? ( 'Admin' ) : ('User' )} labelColor='dark'>
                    Profile
                </Sidebar.Item></Link>
                { currentUser.isAdmin &&
                  <Link to='/dashboard?tab=dashboard'>
                  <Sidebar.Item as='div' active = {tab === 'dashboard'} icon={HiUser}  labelColor='dark'>
                      Dashboard
                  </Sidebar.Item></Link>
                }
                
                {
                  currentUser.isAdmin && (<Link to={'/dashboard?tab=posts'}><Sidebar.Item as='div' active = {tab === 'posts'} icon={HiDocumentText}>
                    Posts
                </Sidebar.Item></Link>)
                }
                
                
                
                
                {
                  currentUser.isAdmin && (<Link to={'/dashboard?tab=users'}><Sidebar.Item as='div' active = {tab === 'users'} icon={HiOutlineUserGroup}>
                    Users
                  </Sidebar.Item></Link>)
                }
                
                
                {
                  currentUser.isAdmin && (<Link to={'/dashboard?tab=comments'}><Sidebar.Item as='div' active = {tab === 'comments'} icon={HiAnnotation}>
                    Comments
                  </Sidebar.Item></Link>)
                }
                
                <Sidebar.Item active icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                    Sign Out
                </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
