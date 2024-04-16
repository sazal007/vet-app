import { RiHome5Line } from "react-icons/ri";
import { MdOutlineShoppingCart, MdOutlineBookmarkAdd } from "react-icons/md";
import { FiMessageCircle, FiUser } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";
import { ChatState } from "../context/chatProvider";
import { Link } from "react-router-dom";
import { IoShareSocialOutline } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
const IconSideBar = ({ children }) => {
  const { notification, setNotification } = ChatState();

  const handleOpenMessages = () => {
    // Clear the notifications here
    setNotification([]);
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="sidebar bg-base-200 w-20 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out border-r-2 border-r-black/10">
          {/* Sidebar content */}
          <div className="flex items-center justify-center">
            <Link to="/" className="px-4 text-2xl"><FaPaw /></Link>
          </div>
          <hr className="border-black/35" />
          <nav className="flex flex-col gap-4 items-center justify-center">
            <Link to="/" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><RiHome5Line className="text-2xl" /></p>
            </Link>
            <Link to="/shop" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><MdOutlineShoppingCart className="text-2xl" /></p>
            </Link>
            <Link to="/community" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><IoShareSocialOutline className="text-2xl font-bold" /></p>
            </Link>
            <Link to="/appointments" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><MdOutlineBookmarkAdd className="text-2xl" /></p>
            </Link>
            <div className="indicator" onClick={handleOpenMessages}>
              <Link to="/messages" className="block py-2.5 px-4 rounded transition duration-200">
                {/* Conditionally render notification badge */}
                {notification.length > 0 && (
                  <span className="indicator-item badge badge-secondary">{notification.length}</span>
                )}
                <p className="flex items-center gap-2"><FiMessageCircle className="text-2xl" /></p>
              </Link>
            </div>
            <Link to="/profile" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><FiUser className="text-2xl" /></p>
            </Link>
          </nav>
        </div>

        {/* Main content area */}
        <div className="main flex-1">
          <div className="">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default IconSideBar