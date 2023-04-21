'use client';

// icons
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { PaperAirplaneIcon, SunIcon } from "@heroicons/react/24/solid"
import { BoltIcon } from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import { FormEvent, useEffect, useRef, useState } from "react"
import { addDoc, collection, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import toast from "react-hot-toast";
import { useCollection } from "react-firebase-hooks/firestore";
import Messages from '@/components/Messages';

type Props = {
    params : {
       id : string
    }
}

function page( { params : { id } }: Props ) {

  // model to make request to OPEN-AI
  const model: string = "text-davinci-003";
 
  // input
  const [input, setinput] = useState("");

  // next-auth
  const { data: session } = useSession();

  const [ messages ] = useCollection(
    session && query(
      collection(db, "users", session?.user?.email!, "chats", id!, "messages"),
      orderBy("createdAt", "asc"),
    )
  )    

  //sending chat to chatGPT for logic
  const sendMessage = async (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputMessage = input.trim();

    const message : Message = {
      text : inputMessage,
      createdAt : serverTimestamp(),
      user : {
        _id : session?.user?.email!,
        name : session?.user?.name!,
        avatar : session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      }
    }

    const messagedocRef = collection(db,'users',session?.user?.email!,'chats',id!,'messages')
    toast.promise(
      addDoc(messagedocRef,message)
        .then(() => {
            console.log("Entire Document has been added successfully.")
        })
        .catch(error => {
            console.log(error);
        }),
        {
          loading: 'sending...',
          success: <b className="text-sm">chat sent!</b>,
          error: <b className="text-sm">Could not send.</b>,
        }
      );   
      
    setinput("");


    await toast.promise(
      fetch('/api/askQuestion',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          prompt : inputMessage, id , model , session
        })
      }),
      {
        loading: 'ChatGPT is thinking...',
        success: <b className="text-sm">generated answer!</b>,
        error: <b className="text-sm">Could not able to generate.</b>,
      }
    )
  }

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div>
      <div className="font-mono h-screen flex flex-col">
        <div className="flex-[0.85] overflow-scroll">
          <div>
          { messages?.docs.length  ? (<div className='h-full overflow-scroll '>
               { 
                  messages?.docs?.map( msg => {
                    let message : Message = {
                        text : msg.data().text,
                        createdAt : msg.data().createdAt,
                        user : msg.data().user
                    }
                    console.log()
                    return <Messages key={message?.id} {...message}  />
                  })
               }
              <div ref={messagesEndRef} />
          </div> )
          : ( 
              <div className="font-mono h-screen overflow-scroll bg-white dark:bg-darkTheme dark:text-white">
                <div className="flex flex-col overflow-scroll justify-center place-items-center h-fit lg:h-screen ">
                  <h1 className="text-center text-4xl mt-2 lg:text-4xl">
                    ChatGPT-Clone
                  </h1>
                  <div className="flex my-2 flex-col mt-8 lg:flex-row lg:mt-15">
                    <div className="grid mx-auto grid-cols-1 gap-4 w-11/12 lg:w-8/12 lg:grid-cols-3">
                      <div>
                        <div className="text-center mb-4">
                          <SunIcon className="h-6 w-6 mx-auto mb-2" />
                          <h2 className="font-bold">Examples</h2>
                        </div>
                        <div>
                          <p onClick={()=>{
                            setinput("Explain quantum computing in simple terms");
                          }} className="infoText inline-block hover:cursor-pointer hover:bg-[#d2d2d7] hover:dark:bg-[#202123] transition-all duration-300">&quot;Explain quantum computing in simple terms&quot;  <ArrowRightIcon className="w-4 h-4 my-auto inline-block" /></p>
                          <p onClick={()=>{
                            setinput(`Got any creative ideas for a 10 year old's birthday?`)
                          }} className="infoText inline-block hover:cursor-pointer hover:bg-[#d2d2d7] hover:dark:bg-[#202123] transition-all duration-300">&quot;Got any creative ideas for a 10 year old&apos;s birthday?&quot; <ArrowRightIcon className="w-4 h-4 my-auto inline-block" /></p>
                          <p onClick={()=>{
                            setinput("How do I make an HTTP request in Javascript?")
                          }} className="infoText inline-block hover:cursor-pointer hover:bg-[#d2d2d7] hover:dark:bg-[#202123] transition-all duration-300">&quot;How do I make an HTTP request in Javascript?&quot;  <ArrowRightIcon className="w-4 h-4 my-auto inline-block" /></p>
                        </div>
                      </div>
                      <div>
                        <div className="text-center mb-4">
                          <BoltIcon className="h-6 w-6 mx-auto mb-2" />
                          <h2 className="font-bold">Capabilities</h2>
                        </div>
                        <div>
                          <p className="infoText">&quot;Remembers what user said earlier in the conversation&quot;</p>
                          <p className="infoText">&quot;Allows user to provide follow-up corrections&quot;</p>
                          <p className="infoText">&quot;Trained to decline inappropriate requests&quot;</p>
                        </div>
                      </div>
                      <div>
                        <div className="text-center mb-4">
                          <ExclamationTriangleIcon className="h-6 w-6 mx-auto mb-2" />
                          <h2 className="font-bold">Limitations</h2>
                        </div>
                        <div>
                          <p className="infoText">&quot;May occasionally generate incorrect information&quot;</p>
                          <p className="infoText">&quot;May occasionally produce harmful instructions or biased content&quot;</p>
                          <p className="infoText">&quot;Limited knowledge of world and events after 2021&quot;</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          </div>
        </div>
        <div className="flex-[0.15] min-h-[120px]">
          <div className="h-full w-full">
            <form onSubmit={sendMessage}>
              <div className="border-gray-400 dark:border-gray-500 dark:bg-[#40414F] flex border w-11/12 lg:w-8/12 shadow-sm rounded-sm mx-auto">
                <textarea placeholder="Send a message..." value={input} onChange={(e) => setinput(e.target.value) } className="w-full dark:bg-[#40414F] h-11 outline-none ml-2 resize-none p-[9px]" />
                <button 
                  disabled={!input}
                  type="submit"
                  className="disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="w-5 h-6 mr-2 text-gray-400 hover:text-gray-300 transition-all duration-300 my-auto" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page