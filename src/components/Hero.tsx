import React from 'react'
import banner from '../images/bannerImg.jpg'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='w-full max-h-screen relative'>
        <Image src={banner} alt='banner' className='w-full max-h-screen object-contain' priority />
        <div className='absolute top-0 w-full h-full bg-black/30 text-gray-100 flex flex-col items-center justify-center'>
            <h2 className='text-7xl lg:text-[150px] font-bold'>Jaya Surya</h2>
            <p className='text-xl md:text-2xl lg:text-5xl font-semibold'>Web-Developer</p>
        </div>
    </div>
  )
}

export default Hero