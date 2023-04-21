'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark,materialLight, duotoneDark , vs ,gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Messages({ text, user }: Message) {

  console.log('text - ',text);
    
  return (
    <div className={ user?.name == "ChatGPT" ? "bg-[#F7F7F8] dark:bg-[#434654] py-1 lg:py-3": "py-1 lg:py-3" }>
        <div className="flex space-x-5 !w-screen lg:w-full max-w-[400px] lg:!max-w-4xl my-4 px-2 lg:px-10 mx-auto">
            <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 mt-[10px]"
                width={32}
                height={32}
            />
            <div className="!max-w-[80%] p-0 lg:!max-w-[90%] !overflow-scroll">
                <SyntaxHighlighter className="!rounded-lg"  style={duotoneDark} language="plaintext" >
                    {text.trim()}
                </SyntaxHighlighter>
            </div>
        </div>
    </div>
  )
}

export default Messages

