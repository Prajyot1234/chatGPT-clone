'use client';

import { db } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import ChatRow from './ChatRow';

function  ChatItem() {
  //user data
  const { data: session } = useSession();

  //chat items data
  const [ chats ] = useCollection(
    session && collection(db,'users',session?.user?.email!,'chats')
  );
  
  return (
    <div className='flex-1'>
      {
        !chats?.docs.length ? (<div>
          <p className='text-center text-faint mt-2'>empty</p>
        </div>) :
        chats?.docs.map(chat => <ChatRow key={chat.id} id={chat.id} />)
      }
    </div>
  )
}

export default ChatItem