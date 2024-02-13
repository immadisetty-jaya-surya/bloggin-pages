import React from 'react'
import Container from './Container'
import Logo from './Logo'
import Link from 'next/link'
import { BsGithub, BsInstagram, BsLinkedin} from 'react-icons/bs'

const Footer = () => {
  return (
    <Container className='p-10 bg-black text-gray-100 flex items-center justify-between'>
        <Logo title ='bloggs' className='text-white'/>
        <div className='text-gray-300 hidden md:inline-flex items-center gap-7'>
            <Link href={'https://github.com/immadisetty-jaya-surya'} target='blank'>
                <BsGithub className='text-2xl hover:text-white duration-200' />
            </Link>
            <Link href={'https://www.linkedin.com/in/jaya-surya-immadisetty-9b1037228/'} target='blank'>
                <BsLinkedin className='text-2xl hover:text-blue-900 duration-200' />
            </Link>
            <Link href={'https://www.instagram.com/j._sury.a/'} target='blank'>
                <BsInstagram className='text-2xl hover:text-pink-800 duration-200' />
            </Link>
        </div>
    </Container>
  )
}

export default Footer