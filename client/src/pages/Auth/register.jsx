import { Link } from "react-router-dom"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"


const Register = () => {
  return (
    <>
      <Navbar />
      {/* <!-- component --> */}
      <div className="mt-10 mb-10 flex justify-center items-center h-screen">
        {/* <!-- Left: Image --> */}
        <div className="m-32 mt-56 p-5 w-1/2 h-screen hidden lg:block flex-col">
          <img src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat" alt="Placeholder Image" className="object-cover h-[25rem] w-[30rem]" />
          <p className="w-[30rem] mt-5 p-2 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nam libero dolorem, pariatur odit nisi autem est cumque harum fuga maxime dicta quidem maiores sint error velit molestias, assumenda explicabo!</p>
        </div>
        {/* <!-- Right: Sign up Form --> */}
        <div className="lg:p-[4rem] md:p-52 sm:20 p-8 w-full lg:w-[49.5rem] border-2 bg-[#fff]">
          <h1 className="text-2xl font-semibold mb-4 ml-[6.4rem]">Sign Up</h1>
          <form action="#" method="POST" className="w-[18rem] ml-[6.4rem]">
            {/* <!-- Name Input --> */}
            <div className="form-control w-full mb-4">
              <label htmlFor="name" className="label">
                <span className="label-text text-gray-600">Name</span>
              </label>
              <input type="text" id="text" name="texr" placeholder="Name" className="input input-bordered w-full" autoComplete="off" />
            </div>
            {/* <!-- Email Input --> */}
            <div className="form-control w-full mb-4">
              <label htmlFor="email" className="label">
                <span className="label-text text-gray-600">Email</span>
              </label>
              <input type="email" id="email" name="email" placeholder="Email" className="input input-bordered w-full" autoComplete="off" />
            </div>
            {/* <!-- Password Input --> */}
            <div className="form-control w-full mb-4">
              <label htmlFor="password" className="label">
                <span className="label-text text-gray-600">Password</span>
              </label>
              <input type="password" id="password" name="password" placeholder="Password" className="input input-bordered w-full" autoComplete="off" />
            </div>
            {/* <!-- Confirm Password Input --> */}
            <div className="form-control w-full mb-4">
              <label htmlFor="password" className="label">
                <span className="label-text text-gray-600">Confirm Password</span>
              </label>
              <input type="password" id="confirmpassword" name="password" placeholder="Confirm Password" className="input input-bordered w-full" autoComplete="off" />
            </div>
            {/* <!-- Password Input --> */}
            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text text-gray-600">Upload your picture</span>
              </div>
              <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
            </label>
            {/* <!-- Sign Up Button --> */}
            <button type="submit" className="btn btn-primary text-lg font-semibold rounded-md py-2 px-4 w-full">Sign Up</button>
          </form>
          {/* <!-- Login  Link --> */}
          <div className="mt-6 text-center">
            <Link to="/login" className="text-secondary-content hover:underline">Already signed-up? Login here</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Register