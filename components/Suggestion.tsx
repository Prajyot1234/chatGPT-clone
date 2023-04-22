'use client';

// icons
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { BoltIcon } from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

type Props = { 
    suggestion : boolean
}

function Suggestion(  { suggestion } : Props ) {
  console.log(suggestion);
  return (
      <div className="font-mono h-screen overflow-scroll bg-white dark:bg-darkTheme dark:text-white">
        <div className="flex flex-col overflow-scroll justify-center place-items-center lg:h-screen ">
          <h1 className="text-center text-4xl mt-2 lg:text-4xl">
            ChatGPT-Clone
          </h1>
            <div className="flex my-2 flex-col mt-8 lg:flex-row lg:mt-15">
              <div className="grid mx-auto grid-cols-1 gap-4 w-11/12 lg:w-8/12 lg:grid-cols-3">
                  <div>
                    <div className="text-center mb-4">
                      <MagnifyingGlassIcon className="h-6 w-6 mx-auto mb-2" />
                      <h2 className="font-bold">Examples</h2>
                    </div>
                    <div>
                      <p className="infoText">&quot;Explain what ChatGPT means&quot;</p>
                      <p className="infoText">&quot;what is difference between javascript and java with proper reasons&quot;</p>
                      <p className="infoText">&quot;who comes first the chicken or the egg&quot;</p>
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

export default Suggestion