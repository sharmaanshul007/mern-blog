import React from 'react';
import {Table} from 'flowbite-react';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
export default function DashPosts() {
  const [userPosts,setUserPosts] = useState([]);
  const {currentUser} = useSelector((state)=>state.user);
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
                return <Table.Body >
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-700'>
                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell className='font-medium text-gray-900 dark:text-white'>
                      <Link to={`/post/${post.slug}`}></Link>
                      {post.title}</Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell >
                      <span className='font-medium hover:underline text-red-500'>Delete</span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post._id}`} className='text-teal-500'>
                        <span>
                          Edit
                        </span></Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              })
            }
          </Table>
          
        </>) : ( <p>You have no posts yet</p>)
      }
    </div>
  )
}
