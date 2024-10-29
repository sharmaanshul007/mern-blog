import { Footer, FooterDivider } from 'flowbite-react'
import React from 'react'
import {BsFacebook, BsTwitter, BsInstagram, BsGoogle} from 'react-icons/bs'
import { Link } from 'react-router-dom'
export default function FooterComp() {
    return (<div className=' border border-t-8 border-teal-500 mt-4 p-3 rounded-lg'>
        <div>
            <div className='w-full max-w-7xl mx-auto'>
                
                    <div>
                        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                         <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 rounded-md text-white'>Tech</span> Blog
                        </Link>
                    </div>
                    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 sm:mt-4 sm:gap-6 mt-3 lg:ml-28'>
                        <div className='flex flex-col items-start'>
                        <Footer.Title title='About'/>
                            <Footer.LinkGroup className='flex flex-col items-start'>
                                <Footer.Link href='https://100jsprojects.com'>100 JS Projects</Footer.Link>
                                <Footer.Link href='/about'>About</Footer.Link>
                            </Footer.LinkGroup></div>
                        <div className='flex flex-col items-start'>
                        <Footer.Title title='Follow Us'/>
                            <Footer.LinkGroup className='flex flex-col items-start'>
                                <Footer.Link href='https://100jsprojects.com'>Github</Footer.Link>
                                <Footer.Link href='/about'>Discord</Footer.Link>
                            </Footer.LinkGroup></div>
                        <div className='flex flex-col items-start'>
                        <Footer.Title title='Legal'/>
                            <Footer.LinkGroup className='flex flex-col items-start'>
                                <Footer.Link href='https://100jsprojects.com'>Privacy Policy</Footer.Link>
                                <Footer.Link href='/about'>Terms and conditions</Footer.Link>
                            </Footer.LinkGroup></div>
                    </div>
                    <FooterDivider></FooterDivider>
                    <div>
                        <Footer.Copyright href='#' by='Tech Blog' year={new Date().getFullYear()}/>
                    </div>
                    <div className='flex flex-row gap-6 mt-4 sm:mt-0 justify-center'>
                        <Footer.Icon href='#' icon={BsFacebook}/>
                        <Footer.Icon href='#' icon={BsInstagram}/>
                        <Footer.Icon href='#' icon={BsTwitter}/>
                        <Footer.Icon href='#' icon={BsGoogle}/>
                    </div>
            </div>
        </div>
    </div>)
}
