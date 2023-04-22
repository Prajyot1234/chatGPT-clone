'use client'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useState } from 'react';
import Sidebar from './Sidebar';

function NavbarMobile() {
  const [menu,setMenu] = useState(false);
  const OpenMenu = () => setMenu(!menu);
  
  
  return (
    <div className='w-screen lg:hidden'>
        <div className='flex justify-between border-b border-gray-500 p-3'>
            <Bars3Icon onClick={OpenMenu} className='h-6 w-6' />
            <Image
              src="chatgpt-icon.svg"
              height={20}
              width={20}
              alt={`chatGPT logo`}
            />
        </div>
        {
            menu && (
                <div className='fixed !bg-gray-400 border-slate-800 transitionClass top-0 left-0 bottom-0 w-10/12 z-50 list-none flex flex-col text-start transition-transform duration-1000'>
                    <div className="absolute right-[-48px] top-2 border-2 border-black dark:border-white/75 p-2">
                        <XMarkIcon className='w-6 h-6 ' onClick={OpenMenu} />
                    </div>
                    <Sidebar />
                </div>
            )
        }
    </div>
  )
}

export default NavbarMobile