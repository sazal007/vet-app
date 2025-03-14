import { Link, useNavigate } from "react-router-dom"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import { isLoggedIn, loginUser } from "../../apis/auth/userApi";
import { useEffect, useState } from "react";
import { useToast } from "../../context/toastProvider";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      loginUser(email, password)
        .then(() => {
          showToast('Login successful', 'success');
          // Store credentials if "Remember Me" is checked
          if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('rememberedPassword', password);
          } else {
            // Clear stored credentials if "Remember Me" is unchecked
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
          }
          // Redirect the user according to their role
          if (isLoggedIn().role === 'admin') {
            navigate('/admin/dashboard');
          } else if (isLoggedIn().isDoctor === true) {
            navigate('/appointments');
          } else {
            navigate('/');
          }
        })
    } catch (error) {
      console.log(error);
      showToast(error.message, 'error');
    }
  };
  return (
    <>
      <Navbar />
      {/* <!-- component --> */}
      <div className="mt-10 mb-10 flex justify-center items-center h-screen">
        {/* <!-- Left: Image --> */}
        <div className="m-32 mt-56 p-5 w-1/2 h-screen hidden lg:block flex-col">
          <img src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat" alt="Placeholder Image" className="object-cover h-[25rem] w-[30rem]" />
          <p className="w-[30rem] mt-5 p-2 text-center">Log in to continue accessing personalized advice, connect with vets, and shop for your pet’s needs. We’re excited to see you again!</p>
        </div>
        {/* <!-- Right: Login Form --> */}
        <div className="lg:p-44 md:p-52 sm:20 p-8 w-full lg:w-1/2 border-2 bg-[#fff]">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            {/* <!-- Email Input --> */}
            <div className="form-control w-full mb-4">
              <label htmlFor="email" className="label">
                <span className="label-text text-gray-600">Email</span>
              </label>
              <input type="email" id="email" name="email" placeholder="Email" className="input input-bordered w-full" autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
            </div>
            {/* <!-- Password Input --> */}
            <div className="form-control w-full mb-4">
              <label htmlFor="password" className="label">
                <span className="label-text text-gray-600">Password</span>
              </label>
              <input type="password" id="password" name="password" placeholder="Password" className="input input-bordered w-full" autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
            </div>
            {/* <!-- Remember Me Checkbox --> */}
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="remember" name="remember" className="text-blue-500" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <label htmlFor="remember" className="text-gray-600 ml-2">Remember Me</label>
            </div>
            {/* <!-- Forgot Password Link --> */}
            <div className="mb-6">
              <Link to="#" className="text-secondary-content hover:underline">Forgot Password?</Link>
            </div>
            {/* <!-- Login Button --> */}
            <button type="submit" className="btn btn-primary text-lg font-semibold rounded-md py-2 px-4 w-full">Login</button>
          </form>
          {/* <!-- Sign up  Link --> */}
          <div className="mt-6 text-center">
            <Link to="/sign-up" className="text-secondary-content hover:underline">Sign up Here</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login