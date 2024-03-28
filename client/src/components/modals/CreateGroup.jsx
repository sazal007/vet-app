import { useRef, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useToast } from "../../context/toastProvider";
import { ChatState } from "../../context/chatProvider";
import axios from "axios";
import UserList from "../chat/UserList";
import UserBadge from "../chat/UserBadge";

const CreateGroup = () => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { user, chats, setChats } = ChatState();
  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
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

  const handleGroup = async (userToAdd) => {
    if (userToAdd === user._id) {
      showToast("You can't add yourself in group.", "error");
    } else if (selectedUsers.includes(userToAdd)) {
      showToast("User already added.", "error");
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  }

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupChatName || !selectedUsers) {
      showToast("Please fill all the fields");
      return;
    }
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat/group`, { name: groupChatName, users: JSON.stringify(selectedUsers) }, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setChats([data, ...chats]);
      closeModal();
      showToast("Group created successfully", "success");
    } catch (error) {
      console.log(error);
      showToast("Error occurred. Please try again.", "error");
    }
  }
  return (
    <>
      <button className="btn btn-neutral flex items-center" onClick={openModal}>New Group <IoMdAddCircleOutline className="text-xl" /></button>
      <dialog id="categoryModal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
          <h1 className="text-xl text-center">Create Group</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full mb-1">
              <label htmlFor="name" className="label">
                {/* <span className="label-text text-gray-600">Group Name</span> */}
              </label>
              <input type="text" placeholder="Group Name" className="input input-bordered w-full" autoComplete="off" required onChange={(e) => setGroupChatName(e.target.value)} />
            </div>
            <div className="form-control w-full mb-4">
              <label htmlFor="name" className="label">
                {/* <span className="label-text text-gray-600">Group Name</span> */}
              </label>
              <input type="text" placeholder="Add Users" className="input input-bordered w-full" autoComplete="off" required onChange={(e) => handleSearch(e.target.value)} />
            </div>
            {
              selectedUsers.map((user) => (
                <UserBadge key={user._id} user={user} handleFunction={() => handleDelete(user)} />
              ))
            }
            {
              loading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                searchResult?.slice(0, 4).map((user) => (
                  <UserList key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                ))
              )
            }
            <div className='flex justify-end'>
              <button type="submit" className="btn btn-success">Create</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default CreateGroup