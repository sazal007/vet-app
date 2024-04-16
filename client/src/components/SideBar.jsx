import { RiHome5Line } from "react-icons/ri";
import { MdOutlineShoppingCart, MdOutlineBookmarkAdd } from "react-icons/md";
import { FiMessageCircle, FiUser } from "react-icons/fi";
import { IoShareSocialOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SideBar = ({ children }) => {

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="sidebar bg-base-200 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out border-r-2 border-r-black/10">
          {/* Sidebar content */}
          <div>
            <Link to="/" className="px-4 text-xl font-semibold font-mono uppercase hover:text-gray-300">Pawsitive Care</Link>
          </div>
          <hr className="border-black/35" />
          <nav className="flex flex-col gap-4">
            <Link to="/" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><RiHome5Line className="text-xl" /> Home</p>
            </Link>
            <Link to="/shop" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><MdOutlineShoppingCart className="text-xl" /> Shop</p>
            </Link>
            <Link to="/community" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><IoShareSocialOutline className="text-xl" /> Community</p>
            </Link>
            <Link to="/appointments" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><MdOutlineBookmarkAdd className="text-xl" /> Appointments</p>
            </Link>
            <Link to="/messages" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><FiMessageCircle className="text-xl" /> Message</p>
            </Link>
            <Link to="/profile" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><FiUser className="text-xl" /> Profile</p>
            </Link>
          </nav>
        </div>

        {/* Main content area */}
        <div className="main flex-1">
          <div className="py-4 px-4">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default SideBar