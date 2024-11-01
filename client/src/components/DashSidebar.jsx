import React from 'react';
import {HiArrowSmRight, HiUser} from 'react-icons/hi';
import {Sidebar} from 'flowbite-react';
import { Link, useLocation,useSearchParams} from 'react-router-dom';
import { useState , useEffect} from 'react';

export default function DashSidebar() {
    const location = useLocation();
  const [searchParams,setSearchParams] = useSearchParams();
  const [tab,setTab] = useState("");
  useEffect(()=>{
    const tabFromUrl = searchParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search])
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active = {tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'>
                    Profile
                </Sidebar.Item></Link>
                <Sidebar.Item active icon={HiArrowSmRight} className='cursor-pointer'>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
