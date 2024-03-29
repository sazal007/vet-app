import { useState } from 'react'
import { useToast } from '../../context/toastProvider';
import { ChatState } from '../../context/chatProvider';
import { getSender, } from './ChatLogis';
import UpdateGroup from '../modals/UpdateGroup';


// eslint-disable-next-line react/prop-types
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const { showToast } = useToast();
  const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();

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
                      // fetchMessages={fetchMessages}
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                    />
                  </>
                ))}
            </div>
            <div className='w-full mt-3 h-screen flex flex-col justify-end rounded-md bg-base-100 overflow-y-hidden'>message</div>
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