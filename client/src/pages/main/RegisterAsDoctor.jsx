import SideBar from "../../components/SideBar"
import { TimePicker } from "antd";

const RegisterAsDoctor = () => {
  return (
    <>
      <SideBar>
        <main className="h-full w-full p-4 mt-16 rounded-lg bg-base-200">
          <h1 className="text-xl font-bold uppercase">Register as vet</h1>
          <hr className="border-black/35 my-5" />
          <form>
            {/* Personal Details */}
            <div>
              <h2 className="text-lg italic">Personal Details</h2>
              {/* section 1 for personal details */}
              <div className="my-2 flex flex-wrap justify-evenly items-center">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Contact Number</span>
                  </div>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </label>
              </div>
              {/* section 2 for personal details */}
              <div className="mt-3 mb-10 flex flex-wrap justify-evenly items-center">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Website</span>
                  </div>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Address</span>
                  </div>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </label>
              </div>
              <hr className="border-black/35 my-5" />
            </div>
            {/* Professional Details */}
            <div>
              <h2 className="text-lg italic">Professional Details</h2>
              {/* section 1 for professional details */}
              <div className="my-2 flex flex-wrap justify-evenly items-center">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Specialization</span>
                  </div>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Experience</span>
                  </div>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Fees per consultation</span>
                  </div>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </label>
              </div>
              {/* section 2 for professional details */}
              <div className="mt-3 mb-10 ml-11 flex flex-wrap justify-start items-center">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Timings</span>
                  </div>
                  <TimePicker.RangePicker className="input input-bordered w-full max-w-xs decoration-clone hover:outline-none" required />
                </label>
                <button className="btn btn-accent mt-9 mx-10 w-40">Register</button>
              </div>
            </div>
          </form>
        </main>
      </SideBar>
    </>
  )
}

export default RegisterAsDoctor