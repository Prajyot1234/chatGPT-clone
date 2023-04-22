'use client'
import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react"
import Image from "next/image"

// loader
import { CirclesWithBar } from "react-loader-spinner";


function Login() {

  const [loading, setloading] = useState(false);

  //year
  const d = new Date();
  let year = d.getFullYear();

  if(loading){
    return (
      <CirclesWithBar
        height="50"
        width="50"
        color="#0BA37F "
        wrapperClass="w-screen h-screen flex justify-center place-items-center"
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel='circles-with-bar-loading'
      />
    )
  }

  // login with google
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      setloading(true);
      await signIn('google');
      setTimeout(() => {
        setloading(false);
      }, 2000);
    } catch (error) {
      setloading(false);
    }
  };

  return (
      <div className="flex font-mono flex-col h-screen">
        <div className="flex-1 flex justify-center place-items-center">
          <div>
            <Image
              src="chatgpt-icon.svg"
              className="m-auto h-[300px] w-[300px] lg:h-48 lg:w-48"
              height={150}
              width={150}
              alt={`chatGPT logo`}
            />
            <button className="flex border mx-auto p-2 px-6 rounded-lg mt-6 lg:mt-4" 
                onClick={handleSubmit}
              >
              <Image src='google-icon.svg' className="my-auto mr-2" width={15} height={15} alt='google' /> Sign with Google
            </button>
          </div>
        </div>
        <div>
        <div className='mt-2 text-center'>
            <h1 className='text-3xl'>Prajyot<span className='text-chatGPT'>.</span></h1>
            <div className='mt-3 flex w-screen'>
              <div className='flex justify-center mx-auto text-center'>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/prajyot-burbure-6b8643190/">
                  <h2 className='text-cente uppercase cursor-pointer font-bold hover:text-chatGPT duration-1000'>linkedin</h2>
                </a>
                <a target="_blank" rel="noreferrer" href="https://github.com/Prajyot1234">
                  <h2 className='text-center uppercase cursor-pointer font-bold hover:text-chatGPT duration-1000 ml-2 lg:ml-8'>github</h2>
                </a>
                <a target="_blank" rel="noreferrer" href="https://leetcode.com/Prajyotb9/">
                  <h2 className='text-center uppercase cursor-pointer font-bold hover:text-chatGPT duration-1000 ml-2 lg:ml-8'>leetcode</h2>
                </a>
                <a target="_blank" rel="noreferrer" href="https://instagram.com/_prajyot___?igshid=ZDdkNTZiNTM=">
                  <h2 className='text-center uppercase cursor-pointer font-bold hover:text-chatGPT duration-1000 ml-2 lg:ml-8'>instagram</h2>
                </a>
              </div>
            </div>
            <div className='mt-3 mb-5 w-[96%] mx-auto lg:mb-8'>
              <p className="justify-center">Copyright © {year} All rights reserved | This website is made with <HeartIcon className="w-6 h-6 inline-block lg:mx-1" />  by Prajyot<span className='text-chatGPT inline-block'>.</span></p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login

/**
 * 
 */