import { createContext, useContext, useEffect, useState } from "react";

const chatContext = createContext();

// eslint-disable-next-line react/prop-types
const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const data = JSON.parse(localStorage.getItem("userInfo"));
      setUser(data);
    }, 5000);

    return () => clearInterval(interval); // Clean up the interval
  }, [])

  return (
    <chatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, notification, setNotification }}>
      {children}
    </chatContext.Provider>
  );
}

export const ChatState = () => {
  return useContext(chatContext);
}


export default ChatProvider;