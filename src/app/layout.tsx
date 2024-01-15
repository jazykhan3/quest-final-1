import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import HeaderLayout from '@/components/HeaderLayout'
import { Toaster } from "@/components/ui/toaster"
import Settings from '@/components/Settings'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quest Night Registration',
  description: 'powered by H.o.L.i.S.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-[100vh]'>

      <body className={` h-[100vh]`}>
        <script src="/mqtt.min.js"></script>

        <div className="contain relative">
        <Settings />

          <div className="parchment"></div>
          <div className='h-full flex flex-col items-center -mt-10'>

            <div className=' w-[100%] max-w-5xl p-1 md:p-2l'>
              <HeaderLayout />
              <div className='-mt-10'>
                {children}
              </div>
              <Toaster />

            </div>
          </div>
        </div>
        <svg>
          <filter id="wavy2">
            <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1"></feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
        </svg>
      </body>
    </html>
  )
}
