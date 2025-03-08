import React, { useEffect } from 'react'
import { useState } from 'react';
import {useLocation, useSearchParams} from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';
export default function Dashboard() {
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
    <div className='min-h-screen flex flex-col sm:flex-row'>
      {/* SideBar */}
      <div className=''>
        <DashSidebar></DashSidebar>
      </div>

      <div className='w-full'>
        {
          tab === 'profile' && (<DashProfile></DashProfile>) 
        }
        {
          tab === 'posts' && (<DashPosts></DashPosts>)
        }
        {
          tab === 'users' && (<DashUsers></DashUsers>)
        }
        {
          tab === "comments" && (<DashComments></DashComments>)
        }
        {
          tab === "dashboard" && (<DashboardComp></DashboardComp>)
        }
      </div>
    </div>
  )
}
