import ChatItem from "./ChatItem"
import NewChat from "./NewChat"
import Settings from "./Settings"

function Sidebar() {
  return (
    <div className="flex font-mono w-full flex-col h-screen bg-sidebar dark:bg-sidebar text-white">
        <NewChat />
        <div className="flex-1 overflow-scroll px-2">
          <ChatItem />
        </div>
        <div>
          <Settings />
        </div>
    </div>
  )
}

export default Sidebar