import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Shipping = () => {
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    contact: '',
  });

  const [cartSummary, setCartSummary] = useState({
    cartItems: [],
    totalWithShipping: 0,
  });

  useEffect(() => {
    // Retrieve cart summary from sessionStorage
    const orderSummary = sessionStorage.getItem("orderSummary");
    if (orderSummary) {
      const parsedOrderSummary = JSON.parse(orderSummary);
      setCartSummary(parsedOrderSummary);
    }
  }, []); // Empty dependency array to run only once on component mount

  const handleInputChange = (event) => {
    setShippingInfo({ ...shippingInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    // Logic to handle the submission of shipping information
    console.log("Shipping Information Submitted:", shippingInfo);
  };

  const { firstName, lastName, username, email, address, contact } = shippingInfo;
  const { cartItems, totalWithShipping } = cartSummary;

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 p-5">
        <h1 className="text-center text-3xl font-semibold mb-6">Shipping Details</h1>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-3/4 px-4">
            <div className="bg-white p-8 shadow rounded">
              <h2 className="text-2xl font-semibold mb-5">Billing Address</h2>
              <div className="grid grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" className="input input-bordered w-full" name="firstName" value={firstName} onChange={handleInputChange} />
                <input type="text" placeholder="Last Name" className="input input-bordered w-full" name="lastName" value={lastName} onChange={handleInputChange} />
                <input type="text" placeholder="Username" className="input input-bordered w-full col-span-2" name="username" value={username} onChange={handleInputChange} />
                <input type="email" placeholder="Email (Optional)" className="input input-bordered w-full col-span-2" name="email" value={email} onChange={handleInputChange} />
                <input type="text" placeholder="Address" className="input input-bordered w-full col-span-2" name="address" value={address} onChange={handleInputChange} />
                <input type="text" placeholder="Contact Number" className="input input-bordered w-full col-span-2" name="contact" value={contact} onChange={handleInputChange} />
              </div>
              <button className="btn btn-primary mt-6" onClick={handleSubmit}>Save Info</button>
            </div>
          </div>

          <div className="w-full lg:w-1/4 px-4">
            <div className="bg-base-200 p-8 shadow rounded">
              <h3 className="text-xl font-semibold text-center mb-4">Cart Details</h3>
              <p>Cart Items: {cartItems.length}</p>
              <p>Cart Total: ${totalWithShipping}</p>
              <button className="btn btn-primary w-full mt-4">Order</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shipping;
