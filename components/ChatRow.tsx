import { db } from "@/firebase";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { Fade } from "react-awesome-reveal";

type Props = {
  id: string
}

function ChatRow({ id }: Props) {

  /*
  const [disable, setdisable] = useState(true);

  // ref for input
  const ref = useRef<HTMLInputElement>(null);

  // focusing on OnClick.
  const handleClick = () => {
    if (ref?.current) {
      setdisable(false);
      ref.current.focus();
    }
  };

  // for title 
  const [displayTitle, setdisplayTitle] = useState("");

  const { data: session } = useSession();
  const [chats] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "chats"),
    ));

  const [messages] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "chats", id!, "messages"),
      orderBy("createdAt", "asc")
    )
  )

  useEffect(() => {
    let flag : boolean = false;
    chats?.docs?.map( chat => {
      if(chat.id == id) {
        flag = true;
        if(!chat?.data()?.title?.editable && messages?.docs[0]?.data()?.text){
          setdisplayTitle(messages?.docs[0]?.data()?.text)
        } else {
          setdisplayTitle(chat?.data()?.title?.title)
        }
        if(!chat?.data()?.title?.title) {
          setdisplayTitle("New Chat");     
        }
      } 
    });
    if(!flag){
      setdisplayTitle("New Chat");     
    }
  }, [chats])

  const setTitle = async () => {
    const docRef = doc(db,"users",session?.user?.email!,"chats",id);
    const _doc = await updateDoc(docRef,{
      title : {
        editable : false,
        title : displayTitle
      }
    });
    setdisable(true);
  }

  */

  // router
  const router = useRouter();
  
  const [currentID, setcurrentID] = useState("");
  let pathname = usePathname();

  //only on first render
  useEffect(() => {
    let pathnameArray = pathname?.split('/')
    if(pathnameArray) setcurrentID(pathnameArray[pathnameArray?.length-1])
  }, [pathname])
  
  //session information 
  const { data: session } = useSession();

  const [ messages ] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "chats", id!, "messages"),
      orderBy("createdAt", "desc"),
    )
  )  
  
  const deleteChat = (event: React.FormEvent<SVGSVGElement>) => {
    event.preventDefault();
    // delete chat
    const docRef = doc(db,  "users", session?.user?.email!, "chats", id!);
    
    toast.promise(
      deleteDoc(docRef)
        .then(() => {
            console.log("Entire Document has been deleted successfully.")
            router.push('/');
        })
        .catch(error => {
            console.log(error);
        }),
        {
          loading: 'deleting...',
          success: <b className="text-sm">chat deleted successfully!</b>,
          error: <b className="text-sm">Could not delete.</b>,
        }
      );
  }

  return (
    <Link href={`/chat/${id}`}>
      <div className={currentID == id ? "bg-darkTheme/50 rounded-lg": "" }>
        <div className="flex mt-3 p-2 w-full overflow-hidden rounded-lg hover:cursor-pointer hover:!bg-darkTheme/40 transition-all duration-300" >
          <ChatBubbleLeftIcon className="w-4 h-4 my-auto mx-2 flex-[0.1]" />
          <div className="flex-[0.8]">
            <p className="!max-w-[185px] !max-h-[24px] !min-h-[24px] !min-w-[185px] text-base !truncate">
              <Fade className="!max-w-[185px] !max-h-[24px] !min-h-[24px] !min-w-[185px]" delay={1e2} cascade damping={1e-1}>
                { messages?.docs[1]?.data()?.text ? messages?.docs[1]?.data()?.text : "New Chat"}
              </Fade>
            </p>
            {/* <input onBlur={setTitle} ref={ref} disabled={disable} value={displayTitle} onChange={(e) => setdisplayTitle(e.target.value)} onKeyUp={(e) => { console.log(e);
            if(e.key === 'Enter') setTitle() }} tabIndex={0} className="max-w-[200px] h-full text-base bg-sidebar truncate" /> */}
          </div>
          {/* <PencilIcon onClick={(e) => {
            e.preventDefault();
            handleClick();
          }} className="w-4 h-4 my-auto mr-2 ml-1 flex-[0.1] hover:text-white/70 transition-all duration-100" /> */}
          <TrashIcon onClick={deleteChat} className="w-4 h-4 my-auto ml-2 flex-[0.1] hover:text-white/70 transition-all duration-100" />
        </div>
      </div>
    </Link>
  )
}

export default ChatRow