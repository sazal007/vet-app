import { CgProfile } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import { ChatState } from "../context/chatProvider";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartProvider";
const Navbar = () => {
  const { user } = ChatState();
  const { cartItems } = useCart();

  return (
    <>
      <nav className="bg-base-200 w-full z-20 top-0 start-0 text-[#000]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Pa</span>
          </a> */}
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex items-center justify-center gap-5">
              {
                user &&
                <Link to="/cart">
                  <p className="tooltip tooltip-bottom indicator" data-tip="Cart">
                    <span className="indicator-item badge badge-neutral border-none text-sm">{cartItems.length}</span>
                    <FiShoppingCart className="text-2xl" /></p>
                </Link>
              }
              {
                user && <p className="tooltip tooltip-bottom" data-tip="Profile"><CgProfile className="text-2xl" /></p>
              }
            </div>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 ">
              <li>
                <a href="#" className="block py-2 px-3" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3">Shop</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3">Services</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar