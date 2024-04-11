import { Link } from "react-router-dom"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import { useCart } from "../../context/cartProvider"
import { useState } from "react"

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useCart();

  // State to hold the selected shipping cost
  const [shippingCost, setShippingCost] = useState(0);

  // Function to update the state when the shipping option changes
  const handleShippingChange = (event) => {
    const selectedShippingCost = parseFloat(event.target.value);
    setShippingCost(selectedShippingCost);
  };

  // Calculate the total cost including shipping
  const getTotalCostWithShipping = () => {
    return getCartTotal() + shippingCost;
  };
  return (
    <>
      <Navbar />
      <main>
        <div className="container mx-auto mt-10">
          <div className="flex shadow-sm my-10">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
              </div>
              {
                cartItems.length === 0 ? <p className="text-center mt-28">Cart is empty</p> : cartItems.map((item, index) => (
                  <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={index}>
                    <div className="flex w-2/5">
                      <div className="w-20">
                        <img className="h-24" src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/${item.product_image}`} alt={item.product_name} onError={e => e.target.src = "/no_image_found.png"} />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">{item.product_name}</span>
                        <span className="text-red-500 text-xs">{item.category.category_name}</span>
                        <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={() => { removeFromCart(item) }}>Remove</a>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <button onClick={() => { removeFromCart(item) }}>
                        <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                      <input type="text" className="mx-2 border text-center w-16" value={item.quantity} disabled />
                      <button onClick={() => { addToCart(item) }}>
                        <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512" >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">Nrs. {item.price}</span>
                    <span className="text-center w-1/5 font-semibold text-sm">Nrs. {item.price * item.quantity}</span>
                  </div>

                ))
              }
              <div className="flex items-center justify-between font-semibold text-sm mt-14">
                <Link to="/shop" className="w-40 flex cursor-pointer">
                  <svg className="fill-current mr-2 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                  Continue Shopping
                </Link>
                <div className="w-40 flex cursor-pointer" onClick={clearCart()}>Clear Cart</div>
              </div>
            </div>

            <div id="summary" className="w-1/4 px-8 py-10 bg-base-200">
              <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">Items: {cartItems.length}</span>
                <span className="font-semibold text-sm">Nrs. {getCartTotal()}</span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                <select
                  className="block p-2 text-gray-600 w-full text-sm"
                  onChange={handleShippingChange}
                  defaultValue="0" // Default value for no shipping cost
                >
                  <option value="0">Select shipping</option>
                  <option value="100.00">Standard shipping - Nrs. 100.00</option>
                  <option value="250.00">Within a day shipping - Nrs. 250.00</option>
                  {/* Add more shipping options here if needed */}
                </select>
              </div>

              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm">
                  <span className="uppercase">Total cost</span>
                  <span>Nrs. {getTotalCostWithShipping().toFixed(2)}</span>
                </div>
                <button className="btn btn-neutral font-semibold py-3 text-sm text-white uppercase w-full cursor-pointer">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Cart