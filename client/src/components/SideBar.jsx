import { RiHome5Line } from "react-icons/ri";
import { MdOutlineShoppingCart, MdOutlineBookmarkAdd } from "react-icons/md";
import { FiMessageCircle, FiUser } from "react-icons/fi";

// eslint-disable-next-line react/prop-types
const SideBar = ({ children }) => {

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="sidebar bg-base-200 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out border-r-2 border-r-black/10">
          {/* Sidebar content */}
          <div>
            <a href="#" className="px-4 text-xl font-semibold font-mono uppercase hover:text-gray-300">Pawsitive Care</a>
          </div>
          <hr className="border-black/35" />
          <nav className="flex flex-col gap-4">
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><RiHome5Line className="text-xl" /> Home</p>
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><MdOutlineShoppingCart className="text-xl" /> Shop</p>
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><MdOutlineBookmarkAdd className="text-xl" /> Appointments</p>
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><FiMessageCircle className="text-xl" /> Message</p>
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><FiUser className="text-xl" /> Profile</p>
            </a>
          </nav>
        </div>

        {/* Main content area */}
        <div className="main flex-1">
          <div className="py-4 px-8">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default SideBar