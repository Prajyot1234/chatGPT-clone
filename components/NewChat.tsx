'use client'

import { db } from "@/firebase";
import { PlusIcon } from "@heroicons/react/24/outline"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    const doc = await toast.promise( addDoc( collection(db!,"users",session?.user?.email!,"chats"),{
        userId : session?.user?.email,
        title : {
           title : true,
           editable : false
        },
        createdAt : serverTimestamp(),
    }),{
      loading: 'generating...',
      success: <b className="text-sm">chat created successfully!</b>,
      error: <b className="text-sm">Could not able to create.</b>,
    })

    router.push(`/chat/${doc?.id}`)
  }

  return (
    <div className="font-mono">
        <button onClick={createNewChat} className="w-full px-2">
            <div className="flex mt-2 p-2 rounded-lg border-gray-500  border hover:bg-darkTheme/40 transition-all duration-300 ">
                <PlusIcon className="w-6 h-6 mx-2 my-auto" />
                <p>New Chat</p>
            </div>
        </button>
    </div>
  )
}

export default NewChat