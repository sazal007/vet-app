import { useRef, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { ChatState } from "../../context/chatProvider";
import { useToast } from "../../context/toastProvider";
import UserBadge from "../chat/UserBadge";
import axios from "axios";
import UserList from "../chat/UserList";


// eslint-disable-next-line react/prop-types
const UpdateGroup = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const { selectedChat, setSelectedChat, user, } = ChatState();
  const modalRef = useRef(null);
  const { showToast } = useToast();

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      showToast("Only admins can remove someone!");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/chat/remove-user`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      showToast(error.response.data.message, "error");
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      showToast("User already in group!");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      showToast("Only admins can add someone!");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/chat/add-user`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      showToast(error.response.data.message, "error");
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/chat/rename-group`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      // console.log(data._id);
      // setSelectedChat("");
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      showToast(error.response.data.message, "error");
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      showToast("Please enter group name");
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
      // console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      showToast("Error occurred. Please try again.", "error");
      setLoading(false);
    }
  }


  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };
  return (
    <>
      <div className="tooltip tooltip-bottom" data-tip="update group">
        <button className="btn btn-ghost flex items-center" onClick={openModal}><GrUpdate className="text-xl" /></button>
      </div>
      <dialog id="categoryModal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
          <h1 className="text-xl text-center">Update Group</h1>
          <div className="mt-3 mb-4">
            <h2 className="mb-2">Group Members:</h2>
            {
              selectedChat.users.map((user) => (
                <UserBadge key={user._id} user={user} handleFunction={() => handleRemove(user)} />
              ))
            }
          </div>
          <form >
            <div className="form-control mb-1 flex flex-row items-center gap-2">
              <label htmlFor="rename" className="label">
                {/* <span className="label-text text-gray-600">Group Name</span> */}
              </label>
              <input type="text" placeholder="Rename Group" className="input input-bordered w-[21.5rem]" autoComplete="off" value={groupChatName} onChange={(e) => setGroupChatName(e.target.value)} />
              <button type="submit" className="btn btn-accent w-20" onClick={handleRename} loading={renameloading}>Rename</button>
            </div>
            <div className="form-control w-full mb-4">
              <label htmlFor="name" className="label">
                {/* <span className="label-text text-gray-600">Group Name</span> */}
              </label>
              <input type="text" placeholder="Add Users" className="ml-4 input input-bordered w-[27rem]" autoComplete="off" onChange={(e) => handleSearch(e.target.value)} />
            </div>
            {
              loading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                searchResult?.slice(0, 4).map((user) => (
                  <UserList key={user._id} user={user} handleFunction={() => handleAddUser(user)} />
                ))
              )
            }
            <div className='flex justify-end'>
              <button className="btn btn-error" onClick={() => handleRemove(user)}>Leave Group</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default UpdateGroup