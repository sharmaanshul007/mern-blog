import {  Select, Sidebar, TextInput } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import { Button } from 'flowbite-react';
import PostCard from '../components/PostCard';
export default function Search() {
    const [sideBarData,setSideBarData] = useState({
        searchTerm:'',
        sort:'desc',
        category:'uncategorized',
    });
    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [showMore,setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.id  ===  'searchTerm'){
            setSideBarData({...sideBarData, searchTerm : e.target.value})
        }
        if(e.target.id === 'sort'){
            const order = e.target.value || 'desc';
            setSideBarData({...sideBarData,sort:order});
        }
        if(e.target.id === 'category'){
            const newCategory = e.target.value || 'uncategorized';
            setSideBarData({
                ...sideBarData,category:newCategory
            })
        }
    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
            setSideBarData({
                ...sideBarData,
                searchTerm:searchTermFromUrl,
                sort:sortFromUrl,
                category:categoryFromUrl,
            });
        }

        const fetchPosts = async() => {
            setLoading(true);
            try{    
                const searchQuery = urlParams.toString();
                const res = await fetch(`/api/post/getPosts?${searchQuery}`,{
                    method:"GET",
                    headers:{'Content-Type':"application/json"},
                    body:JSON.stringify(),
                });
                const data = await res.json();
                if(!res.ok){
                    setLoading(false)
                    console.log(data.message);
                    return;
                }
                setPosts(data.posts);
                setLoading(false);
                if(data.posts.length === 9){
                    setShowMore(true);
                }
                else{
                    setShowMore(false);
                }
            }catch(error){
                console.log(error);
                console.log("Error in fetching the posts inside the Search.jsx");
            }
        }
        fetchPosts();

    },[location.search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchUrl = new URLSearchParams(location.search);
        searchUrl.set('category',sideBarData.category);
        searchUrl.set('searchTerm',sideBarData.searchTerm);
        searchUrl.set('sort',sideBarData.sort);
        
        const searchQuery = searchUrl.toString();

        navigate(`/search?${searchQuery}`);

    }
    const handleShowMore = async() => {
        try{
            const urlParams = new URLSearchParams(location.search)
            const startIndex = posts.length || 0;
            const searchQuery = urlParams.toString() + `&startIndex=${startIndex}`;
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            const data = await res.json();
            console.log(data);
            if(res.ok){
                setPosts([...posts,...(data.posts)]);
            }
            else{
                console.log(res.message);
                console.log("Cannot fetch posts from the backend in the search.jsx");
            }
            if(data.posts.length < 9){
                setShowMore(false);
            }
        }catch(error){
            console.log(error);
            console.log("Problem in fetching the data from the backend for the posts");
        }
    }

  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500 '>
            <form className='flex flex-col gap-8 ' onSubmit={handleSubmit}>
                <div className='flex items-center gap-2 '>
                    <label className='whitespace-nowrap font-semibold '>Search Term:</label>
                    <TextInput placeholder='Search...'
                    id='searchTerm'
                    type='text'
                    value={sideBarData.searchTerm}
                    onChange={handleChange}></TextInput>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold '>Sort:</label>
                    <Select onChange={handleChange}value={sideBarData.sort} id='sort'>
                        <option value='desc'>Latest</option>
                        <option value='asc'>Oldest</option>
                    </Select>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold '>Category:</label>
                    <Select onChange={handleChange} value={sideBarData.category}  id='category'>
                        <option value='uncategorized'>Uncategorized</option>
                        <option value='reactjs'>React.js</option>
                        <option value='nextjs'>Next.js</option>
                        <option value='javascirpt'>Javascript</option>
                    </Select>
                </div>
                <Button type='submit' outline gradientDuoTone='purpleToPink'>Submit </Button>
            </form>
        </div>
        <div className='w-full flex flex-col items-center'>
            <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>Post Results </h1>
            <div className='p-7 flex-wrap gap-4 flex items-center justify-center'>
                {
                    !loading && posts.length === 0 && <p className='text-xl text-gray-500'>
                        No Posts Found!
                    </p>
                }
                {
                    loading && (
                        <div className='flex justify-center items-center w-full h-[80%]'><Spinner size='xl' ></Spinner></div>
                    )
                }
                {
                    !loading &&  posts && posts.map((post)=>(
                        <PostCard post={post} key = {post._id}></PostCard>
                    )
                    
                )
                
                }
                
            </div>
            {
                    !loading && showMore &&
                    (<Button className='w-[340px] hover:underline text-lg ' onClick={handleShowMore}>Show More</Button>)
        }
        </div>
        
    </div>
  )
}
