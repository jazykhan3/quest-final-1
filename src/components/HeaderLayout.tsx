import React from 'react'
import Image from 'next/image'

const HeaderLayout = () => {
  return (
    
    <div className='flex flex-col items-center w-full max-w-5xl mx-auto md:flex-row md:gap-4 md:justify-center'>
        <div className='relative w-full md:w-1/4 h-[350px]'>
        <a href="/"><Image src={'/images/logo.svg'} alt='logo' fill={true} style={{objectFit:'contain'}} priority/></a>

        </div>
        <h1 className='text-[#730A0A] text-4xl font-bold font-serif text-center'>Welcome to <span className='block text-5xl'>Quest Night!</span>
        <span className='text-[#730A0A] text-xs font-style: italic font-sans place-self-end ml-72 '>powered by H.o.L.i.S.</span></h1>
        
    </div>
  )
}

export default HeaderLayout;