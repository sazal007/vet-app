import { useEffect, useState } from "react";
import { ChatState } from "../../context/chatProvider";
import UserSearch from "./UserSearch"
import { useToast } from "../../context/toastProvider";
import axios from "axios";
import CreateGroup from "../modals/CreateGroup";
import SearchLoading from "./SearchLoading";
import { getSender } from "./ChatLogis";

// eslint-disable-next-line react/prop-types
const Chats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const {
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
  } = ChatState();
  const { showToast } = useToast();
  // console.log(user.token);

  const fetchChats = async () => {
    const token = JSON.parse(localStorage.getItem("userInfo"));
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      setChats(data);
    } catch (error) {
      console.log(error);
      showToast("Failed to load chats", "error");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <>
      <main className="h-[100vh] w-[22rem] p-3  bg-base-200 border-r-2 border-r-black/10">
        <UserSearch />
        <section>
          <div className="mx-2 my-4 flex items-center justify-between">
            <h2 className="text-lg">Messages</h2>
            <CreateGroup />
          </div>
          <div>
            {
              chats ? (
                <div className="overflow-y-scroll">
                  {
                    chats.map((chat) => (
                      <div key={chat._id} className={`mb-1 pt-2 ${selectedChat === chat ? "bg-black/5" : ""} rounded-md cursor-pointer hover:bg-black/5`} onClick={() => setSelectedChat(chat)}>
                        <p className={`mx-3 py-2`}>
                          {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                        </p>
                        {/* Display latest message text */}
                        {chat.latestMessage && (
                          <p className="text-sm text-gray-600">
                            {chat.latestMessage.sender._id === loggedUser._id}
                            {chat.latestMessage.text}
                          </p>
                        )}
                        <hr className="mb-2 border-black/10" />
                      </div>
                    ))
                  }
                </div>
              ) : (
                <SearchLoading />
              )
            }
          </div>
        </section>
      </main>
    </>
  )
}

export default Chats