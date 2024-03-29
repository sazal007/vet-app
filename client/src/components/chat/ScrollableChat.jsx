import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "./ChatLogis";
import { ChatState } from "../../context/chatProvider";
// eslint-disable-next-line react/prop-types
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <>
      <ScrollableFeed>
        {messages && messages.map((m, i) => (
          <div className="flex" key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
                <div className="avatar">
                  <div className="w-1 ml-6 mt-1 rounded-full">
                    <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/${m.sender.pic}`} alt={m.sender.name} onError={e => e.target.src = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} />
                  </div>
                </div>
              )}
            <div className={`chat ${m.sender._id === user._id ? "chat-end" : "chat-start"}`} style={{
              // backgroundColor: `${m.sender._id === user._id ? "#fff" : "#B9F5D0"}`,
              marginLeft: isSameSenderMargin(messages, m, i, user._id),
              marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              padding: "5px 15px",
              maxWidth: "75%",
            }}>
              <div className="chat-header">
                {m.sender.name}
                <time className="ml-2 text-xs opacity-50">
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </time>

              </div>
              <div className="chat-bubble">{m.content}</div>
            </div>
          </div>
        ))}
      </ScrollableFeed>
    </>
  )
}

export default ScrollableChat