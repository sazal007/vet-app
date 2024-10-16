import SingleChat from "./SingleChat";

// eslint-disable-next-line react/prop-types
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  return (
    <>
      <div className="h-screen w-full p-4 flex flex-col items-center bg-base-200 border-r-2 border-r-black/20">
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </div>
    </>
  )
}

export default ChatBox