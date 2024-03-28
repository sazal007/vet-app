import IconSideBar from "../../components/IconSideBar"
import ChatBox from "../../components/chat/ChatBox";
// import UserSearch from "../../components/chat/UserSearch";
import Chats from "../../components/chat/chats";
import { ChatState } from "../../context/chatProvider"

const ChatsPage = () => {
  const { user } = ChatState();

  return (
    <>
      <IconSideBar>
        <main className="w-full h-full flex">
          {/* {user && <Chats />} */}
          <Chats />
          {/* {user && <ChatBox />} */}
          <ChatBox />
        </main>
      </IconSideBar>
    </>
  )
}

export default ChatsPage