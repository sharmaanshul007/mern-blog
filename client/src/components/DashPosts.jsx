import React from 'react';
import {Button, Modal, Table} from 'flowbite-react';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
export default function DashPosts() {
  const [userPosts,setUserPosts] = useState([]);
  const {currentUser} = useSelector((state)=>state.user);
  const [showModal,setShowModal] = useState(false);
  const [PID,setPID] = useState(null);
  const fetchPosts = async() => {
    try{
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
      const data = await res.json();
      if(res.ok){
        setUserPosts(data.posts);
      }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchPosts();
  },[currentUser._id]);
  

  const handleReadMore = async() => {
    try{
      const index = userPosts.length;
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${index}`);
      const data = await res.json();
      console.log(data.posts);
      if(res.ok){
        setUserPosts((prev)=>[...prev,...data.posts]);
      }
      console.log(userPosts.length);
    }catch(error){
      console.log(error);
    }
  } 
  
  const handleDeletePost = async() => {
    setShowModal(false);
    try{
      const res = await fetch(`/api/post/deletepost/${PID}/${currentUser._id}`,{
        method:'DELETE',
        
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }
      else{
        setUserPosts((prev)=>{
          return prev.filter((post)=> post._id !== PID);
        })
      }
    }catch(error){
      console.log(error);
    }
  }


  return (
    <div className=' table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && userPosts.length > 0 ? (<>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>
                Date Updated
              </Table.HeadCell>
              <Table.HeadCell>
                Post Title
              </Table.HeadCell>
              <Table.HeadCell>
                Category
              </Table.HeadCell>
              <Table.HeadCell>
                Delete
              </Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {
            userPosts.map((post)=>{
                return <Table.Body key={post._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-700'>
                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell className='font-medium text-gray-900 dark:text-white'>
                      <Link to={`/post/${post.slug}`}>{post.title}</Link>
                      </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell >
                      <span className='font-medium hover:underline text-red-500' onClick={()=>{
                        setShowModal(true);
                        console.log(post);
                        setPID(post._id);
                      }}>Delete</span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/update-post/${post._id}`} className='text-teal-500'>
                        <span>
                          Edit
                        </span></Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              })
            }
          </Table>
          <Button type='button' onClick={handleReadMore}>
            Read More
          </Button>
        </>) : ( <p>You have no posts yet</p>)
      }
      
         
          <Modal show={showModal} popup size='md' onClose={()=>setShowModal(false)}>
            <Modal.Header/>
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'></HiOutlineExclamationCircle>
                <h3 className='mt-5 text-lg text-gray-500 dark:text-gray-200'>Are you sure, you want to delete your account?</h3>
                <div className='flex flex-row justify-center gap-4'>
                  <Button color='failure' onClick={handleDeletePost}>Yes, I'm sure</Button>
                  <Button color='gray' onClick={()=>{setShowModal(false)}}>No, cancel</Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
      
    </div>
  )
}
