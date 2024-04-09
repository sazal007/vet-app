import { useState } from "react";
import SideBar from "../../components/SideBar"
import { registerAsVet } from "../../apis/vet/doctorApi";
import { useToast } from "../../context/toastProvider";

const RegisterAsDoctor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [feesPerCunsaltation, setFeesPerCunsaltation] = useState("");
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const { showToast } = useToast();


  const handleSubmit = (e) => {
    e.preventDefault();
    const vetData = {
      firstName,
      lastName,
      email,
      phone,
      Website,
      address,
      specialization,
      experience,
      feesPerCunsaltation,
      timings: {
        startTime,
        endTime
      }
    };
    // console.log(vetData);
    registerAsVet(vetData)
      .then(() => {
        showToast("wait for approval");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <SideBar>
        <main className="h-full w-full p-4 mt-16 rounded-lg bg-base-200">
          <h1 className="text-xl font-bold uppercase">Register as vet</h1>
          <hr className="border-black/35 my-5" />
          <form onSubmit={handleSubmit}>
            {/* Personal Details */}
            <div>
              <h2 className="text-lg italic">Personal Details</h2>
              {/* section 1 for personal details */}
              <div className="my-2 flex flex-wrap justify-evenly items-center">
                {/* first name */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input type="text" name="firstName" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={firstName} required onChange={(e) => setFirstName(e.target.value)} />
                </label>
                {/* last name */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input type="text" name="lastName" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={lastName} required onChange={(e) => setLastName(e.target.value)} />
                </label>
                {/* contact number */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Contact Number</span>
                  </div>
                  <input type="text" name="contact" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={phone} required onChange={(e) => setPhone(e.target.value)} />
                </label>
              </div>
              {/* section 2 for personal details */}
              <div className="mt-3 mb-10 flex flex-wrap justify-evenly items-center">
                {/* email */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input type="email" name="email" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={email} required onChange={(e) => setEmail(e.target.value)} />
                </label>
                {/* website */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Website</span>
                  </div>
                  <input type="text" name="Website" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={Website} onChange={(e) => setWebsite(e.target.value)} />
                </label>
                {/* address */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Address</span>
                  </div>
                  <input type="text" name="address" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={address} required onChange={(e) => setAddress(e.target.value)} />
                </label>
              </div>
              <hr className="border-black/35 my-5" />
            </div>
            {/* Professional Details */}
            <div>
              <h2 className="text-lg italic">Professional Details</h2>
              {/* section 1 for professional details */}
              <div className="my-2 flex flex-wrap justify-evenly items-center">
                {/* specialization */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Specialization</span>
                  </div>
                  <input type="text" name="specialization" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={specialization} required onChange={(e) => setSpecialization(e.target.value)} />
                </label>
                {/* experience */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Experience</span>
                  </div>
                  <textarea className="textarea textarea-bordered h-10" name="experience" placeholder="Type here" value={experience} required onChange={(e) => setExperience(e.target.value)}></textarea>
                </label>
                {/* fees */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Fees per consultation</span>
                  </div>
                  <input type="number" name="fees" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={feesPerCunsaltation} required onChange={(e) => setFeesPerCunsaltation(e.target.value)} />
                </label>
              </div>
              {/* section 2 for professional details */}
              <div className="mt-3 mb-10 ml-11 flex flex-wrap justify-start items-center gap-10">
                {/* start time */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Start time</span>
                  </div>
                  <input type="time" name="startTime"
                    className="input input-bordered w-full max-w-xs" required value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </label>
                {/* end time */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">End time</span>
                  </div>
                  <input type="time" name="endTime"
                    className="input input-bordered w-full max-w-xs" required value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </label>
                <button type="submit" className="btn btn-accent mt-9 w-40">Register</button>
              </div>
            </div>
          </form>
        </main>
      </SideBar>
    </>
  )
}

export default RegisterAsDoctor