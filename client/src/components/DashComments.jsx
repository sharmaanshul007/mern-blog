import React from 'react'
import {Button, Modal, Table} from 'flowbite-react';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import {FaCheck, FaTimes} from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
export default function DashComments() {
  const [comments,setComments] = useState([]);
  const {currentUser} = useSelector((state)=>state.user);
  const [showModal,setShowModal] = useState(false);
  const [commentIdToDelete,setCommentIdToDelete] = useState(null);
  const [showMore,setShowMore] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/comment/getcomments');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
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
      const index = comments.length;
      const res = await fetch(`/api/comment/getcomments?startIndex=${index}}`);
      const data = await res.json();
      console.log(data.posts);
      if(res.ok){
        setComments((prev)=>[...prev,...data.comments]);
        if(data.comments.length < 9){
          setShowMore(false);
        }   
      }
    }catch(error){
      console.log(error);
    }
  } 
  
  const handleDeleteComments = async() => {
    setShowModal(false);
    try{
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method:'DELETE',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({commentIdToDelete}),
        }
      );
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }
      if(res.ok){
        setComments((prev)=>prev.filter((comment)=>comment._id !== commentIdToDelete));
        setShowModal(false);
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className=' table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && comments.length > 0 ? (<>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>
                Date Updated
              </Table.HeadCell>
              <Table.HeadCell>
                Comment Content
              </Table.HeadCell>
              <Table.HeadCell>
                Number of Likes
              </Table.HeadCell>
              <Table.HeadCell>
                PostId
              </Table.HeadCell>
              <Table.HeadCell>
                User Id
              </Table.HeadCell>
              <Table.HeadCell>
                Delete
              </Table.HeadCell>
            </Table.Head>
            {
            comments.map((comment)=>{
                return <Table.Body key={comment._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-700'>
                    <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell className='font-medium text-gray-900 dark:text-white'>
                      {comment.content}</Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    <Table.Cell>{comment.postId}</Table.Cell>
                    <Table.Cell >
                      {comment.userId}
                    </Table.Cell>
                    <Table.Cell >
                      {<span className='font-medium hover:underline text-red-500' onClick={()=>{
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}>Delete</span>}
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
        </>) : ( <p>No Comment exists</p>)
      }
      
         
          <Modal show={showModal} popup size='md' onClose={()=>setShowModal(false)}>
            <Modal.Header/>
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'></HiOutlineExclamationCircle>
                <h3 className='mt-5 text-lg text-gray-500 dark:text-gray-200'>Are you sure, you want to delete your comment?</h3>
                <div className='flex flex-row justify-center gap-4'>
                  <Button color='failure' onClick={handleDeleteComments}>Yes, I'm sure</Button>
                  <Button color='gray' onClick={()=>{setShowModal(false)}}>No, cancel</Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
      
    </div>
  )
}
