import React, { useEffect } from 'react'
import { useState } from 'react';
import {useLocation, useSearchParams} from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
export default function Dashboard() {
  const location = useLocation();
  const [searchParams,setSearchParams] = useSearchParams();
  const [tab,setTab] = useState("");
  useEffect(()=>{
    const tabFromUrl = searchParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
    console.log(tabFromUrl);
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
      </div>
    </div>
  )
}
