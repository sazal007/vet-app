import { useEffect, useState } from 'react'
import { useToast } from '../../context/toastProvider';
import { ChatState } from '../../context/chatProvider';
import { getSender, } from './ChatLogis';
import UpdateGroup from '../modals/UpdateGroup';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

// eslint-disable-next-line react/prop-types
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const { showToast } = useToast();
  const { selectedChat, setSelectedChat, notification, setNotification } = ChatState();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      showToast("Error fetching messages", "error");
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/message`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        showToast("Failed to send the Message", "error");
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {
        selectedChat ? (
          <>
            <div className='w-full px-4 py-4 flex justify-between items-center rounded-md bg-base-100'>
              {messages &&
                (!selectedChat.isGroupChat ? (
                  <>
                    <h2>{getSender(user, selectedChat.users)}</h2>
                  </>
                ) : (
                  <>
                    <h2>{selectedChat.chatName.toUpperCase()}</h2>
                    <UpdateGroup
                      fetchMessages={fetchMessages}
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                    />
                  </>
                ))}
            </div>
            <div className='w-full mt-3 h-screen flex flex-col justify-end rounded-md bg-base-100 overflow-y-hidden overflow-x-none'>
              {
                loading ? (<span className="loading loading-spinner loading-lg m-auto"></span>) : (
                  <>
                    <div>
                      <ScrollableChat messages={messages} />
                    </div>
                  </>
                )
              }
              <div onKeyDown={sendMessage}>
                {istyping ? (
                  <div>
                    <span className="ml-5 mt-3 loading loading-dots loading-md"></span>
                  </div>
                ) : (
                  <></>
                )}
                <input type="text" placeholder="Type message..." className="ml-5 my-4 input input-bordered input-primary w-[96%] rounded-lg" value={newMessage}
                  onChange={typingHandler} />
              </div>
            </div>
          </>
        ) : (
          <div className='w-full text-xl flex items-center justify-center'>
            <p>Please select a message or search user.</p>
          </div>
        )
      }
    </>
  )
}

export default SingleChat