'use client'

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";


const ThemeButton =  dynamic(
  () => import('./ThemeButton'),
  { ssr: false }
)

function Settings() {
  // router
  const router = useRouter();

  return (
    <div className="mb-4">
        <div className="w-[96%] border-t mx-auto border-gray-500 my-3"></div>
        <div>
          <ThemeButton />
        </div>
        <div>
            <button
              onClick={() =>{
                router.push('/')
                setTimeout(() => {
                  signOut();
                }, 2000);
              }}
              className="w-full px-2">
                <div className="flex rounded-lg p-2 mx-auto w-full hover:bg-darkTheme/70 transition-all duration-300">
                  <ArrowRightOnRectangleIcon className="w-6 h-6 mr-2" />
                  Log out
                </div>
            </button>
        </div>
    </div>
  )
}

export default Settings