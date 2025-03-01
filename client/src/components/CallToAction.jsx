import React from 'react'
import { Button } from 'flowbite-react'
export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col items-center p-5 m-3'>
            <h2 className='text-2xl mb-2'>Want to learn more about javascript</h2>
            <p className='text-gray-500  mb-2'>
                Checkout these resources with 100 Javascript projects
            </p>
            <Button gradientDuoTone='purpleToBlue' className='rounded-tl=xl rounded-bl-none w-[80%]'><a href="https://www.google.com" target='_blank' rel='noopener noreferrer'>100 Javascript Projects</a></Button>
        </div>
        <div className='flex-1 items-center justify-center p-2'>
            <img className='mx-auto '  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuQB9xyADKbBEpEkfje1aqsTf9zM6W8TsCnsZxAFPHLj9xXusy_9BmU4o&s'></img>
        </div>
    </div>
  )
}
