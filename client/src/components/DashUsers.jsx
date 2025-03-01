import React from 'react';
import {Button, Modal, Table} from 'flowbite-react';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import {FaCheck, FaTimes} from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
export default function DashUsers() {
  const [users,setUsers] = useState([]);
  const {currentUser} = useSelector((state)=>state.user);
  const [showModal,setShowModal] = useState(false);
  const [userIdToDelete,setUserIdToDelete] = useState(null);
  const [showMore,setShowMore] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);
  

  const handleReadMore = async() => {
    try{
      const index = users.length;
      const res = await fetch(`/api/user/getusers?startIndex=${index}}`);
      const data = await res.json();
      console.log(data.posts);
      if(res.ok){
        setUsers((prev)=>[...prev,...data.users]);
        if(data.users.length < 9){
          setShowMore(false);
        }   
      }
    }catch(error){
      console.log(error);
    }
  } 
  
  const handleDeleteUser = async() => {
    try{
      const res = await fetch(`/api/user/delete/${userIdToDelete}`,
        {
          method:'DELETE',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({userIdToDelete}),
        }
      );
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }
      if(res.ok){
        setUsers((prev)=>prev.filter((user)=>user._id !== userIdToDelete));
        setShowModal(false);
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className=' table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && users.length > 0 ? (<>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>
                Date Created
              </Table.HeadCell>
              <Table.HeadCell>
                Username
              </Table.HeadCell>
              <Table.HeadCell>
                Gmail
              </Table.HeadCell>
              <Table.HeadCell>
                Admin
              </Table.HeadCell>
              <Table.HeadCell>
                Delete
              </Table.HeadCell>
            </Table.Head>
            {
            users.map((user)=>{
                return <Table.Body key={user._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-700'>
                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell className='font-medium text-gray-900 dark:text-white'>
                      {user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.isAdmin === true ? (<FaCheck className='text-green-500'></FaCheck>) : (<FaTimes className='text-red-500'></FaTimes>)}</Table.Cell>
                    <Table.Cell >
                      <span className='font-medium hover:underline text-red-500' onClick={()=>{
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}>Delete</span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              })
            }
          </Table>
          {
            showMore && (<Button type='button' onClick={handleReadMore}>
              Read More
            </Button>)  
          }
        </>) : ( <p>No users exists</p>)
      }
      
         
          <Modal show={showModal} popup size='md' onClose={()=>setShowModal(false)}>
            <Modal.Header/>
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'></HiOutlineExclamationCircle>
                <h3 className='mt-5 text-lg text-gray-500 dark:text-gray-200'>Are you sure, you want to delete your account?</h3>
                <div className='flex flex-row justify-center gap-4'>
                  <Button color='failure' onClick={handleDeleteUser}>Yes, I'm sure</Button>
                  <Button color='gray' onClick={()=>{setShowModal(false)}}>No, cancel</Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
      
    </div>
  )
}
