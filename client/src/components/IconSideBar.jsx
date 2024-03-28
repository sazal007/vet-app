import { RiHome5Line } from "react-icons/ri";
import { MdOutlineShoppingCart, MdOutlineBookmarkAdd } from "react-icons/md";
import { FiMessageCircle, FiUser } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const IconSideBar = ({ children }) => {
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="sidebar bg-base-200 w-20 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out border-r-2 border-r-black/10">
          {/* Sidebar content */}
          <div className="flex items-center justify-center">
            <a href="#" className="px-4 text-xl"><FaPaw /></a>
          </div>
          <hr className="border-black/35" />
          <nav className="flex flex-col gap-4 items-center justify-center">
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><RiHome5Line className="text-xl" /></p>
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><MdOutlineShoppingCart className="text-xl" /></p>
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><MdOutlineBookmarkAdd className="text-xl" /></p>
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><FiMessageCircle className="text-xl" /></p>
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200">
              <p className="flex items-center gap-2"><FiUser className="text-xl" /></p>
            </a>
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