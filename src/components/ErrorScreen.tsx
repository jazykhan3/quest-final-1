'use client'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'


const ErrorScreen = () => {
    const router = useRouter()
  return (
    <div className='w-[100vw] h-[100vh] flex flex-col items-center'>
        <span>Something went wrong!</span>
        <Button onClick={() => {router.push('/')}}>Go to Homepage</Button>
    </div>
  )
}

export default ErrorScreen