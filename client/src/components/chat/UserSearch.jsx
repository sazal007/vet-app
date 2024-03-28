import { useState } from "react";
import { ChatState } from "../../context/chatProvider";
import { RiUserAddLine } from "react-icons/ri";
import axios from "axios";
import UserList from "./UserList";
import SearchLoading from "./SearchLoading";
import { useToast } from "../../context/toastProvider";

const UserSearch = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  const { showToast } = useToast();

  const handleSearch = async () => {
    if (!search) {
      showToast("Please enter username or email.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user?search=${search}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(data);
      setLoading(false);
      setSearchResult(data);

    } catch (error) {
      console.log(error);
      showToast("Error occurred. Please try again.", "error");
      setLoading(false);
    }
  }

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      console.log(error);
      setLoadingChat(false);
    }
  }

  return (
    <>
      <main className="flex gap-5 items-center">
        <div className="pl-3 text-lg font-bold">
          <p>k</p>
        </div>
        <div className="drawer w-0">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content tooltip tooltip-bottom" data-tip="Add users">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-primary drawer-button"><RiUserAddLine className="text-lg" /></label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <h1 className="p-3 font-bold bg-base-100 border-4 border-base-300 rounded-md">Search Users</h1>
              <div className="mt-3">
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                  <button onClick={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                  </button>
                </label>
                {/* <button className="btn btn-success" onClick={handleSearch}>search</button> */}
              </div>

              {loading ? (<SearchLoading />) : (
                searchResult?.map((user) => (
                  <UserList key={user._id} user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
              {loadingChat}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default UserSearch