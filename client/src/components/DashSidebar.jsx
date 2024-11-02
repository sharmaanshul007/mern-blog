import React from 'react';
import {HiArrowSmRight, HiUser} from 'react-icons/hi';
import {Sidebar} from 'flowbite-react';
import { Link, useLocation,useSearchParams} from 'react-router-dom';
import { useState , useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../redux/user';
export default function DashSidebar() {
    const location = useLocation();
  const [searchParams,setSearchParams] = useSearchParams();
  const [tab,setTab] = useState("");
  const dispatch = useDispatch();
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
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active = {tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'>
                    Profile
                </Sidebar.Item></Link>
                <Sidebar.Item active icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
