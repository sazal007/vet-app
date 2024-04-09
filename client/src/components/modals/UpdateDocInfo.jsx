import { useEffect, useRef, useState } from "react";
import { useToast } from "../../context/toastProvider";
import { getDoctorDetails, updateDocDetails } from "../../apis/vet/doctorApi";

// eslint-disable-next-line react/prop-types
const UpdateDocInfo = ({ docId }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [feesPerCunsaltation, setFeesPerCunsaltation] = useState();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const { showToast } = useToast();

  const fetchDocdetails = async () => {
    getDoctorDetails()
      .then((response) => {
        const { success, message, data } = response;
        if (success && data) {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          setPhone(data.phone);
          setWebsite(data.website);
          setAddress(data.address);
          setSpecialization(data.specialization);
          setExperience(data.experience);
          setFeesPerCunsaltation(data.feesPerCunsaltation);
          setStartTime(data.timings.startTime);
          setEndTime(data.timings.endTime);
        } else {
          console.error("Failed to fetch data:", message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchDocdetails();
  }, []);

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
    // console.log(vetData)
    updateDocDetails(docId, vetData)
      .then(() => {
        showToast("Details updated successfully", "success");
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const modalRef = useRef(null);
  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };
  return (
    <>
      <button className="mb-2 cursor-pointer" onClick={openModal}>Edit Profile</button>
      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <div className="modal-box w-full">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
          <h1 className="text-xl text-center">Edit Profile</h1>
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
                  <input type="text" name="firstName" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>
                {/* last name */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input type="text" name="lastName" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>
                {/* contact number */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Contact Number</span>
                  </div>
                  <input type="text" name="contact" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
              </div>
              {/* section 2 for personal details */}
              <div className="mt-3 mb-10 flex flex-wrap justify-evenly items-center">
                {/* email */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input type="email" name="email" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                  <input type="text" name="address" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={address} onChange={(e) => setAddress(e.target.value)} />
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
                  <input type="text" name="specialization" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                </label>
                {/* experience */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Experience</span>
                  </div>
                  <textarea className="textarea textarea-bordered h-10" name="experience" placeholder="Type here" value={experience} onChange={(e) => setExperience(e.target.value)}></textarea>
                </label>
                {/* fees */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Fees per consultation</span>
                  </div>
                  <input type="number" name="fees" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={feesPerCunsaltation} onChange={(e) => setFeesPerCunsaltation(e.target.value)} />
                </label>
              </div>
              {/* section 2 for professional details */}
              <div className="mt-3 mb-10 flex flex-wrap justify-evenly items-center">
                {/* start time */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Start time</span>
                  </div>
                  <input type="time" name="startTime"
                    className="input input-bordered w-full max-w-xs" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </label>
                {/* end time */}
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">End time</span>
                  </div>
                  <input type="time" name="endTime"
                    className="input input-bordered w-full max-w-xs" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </label>
                <button type="submit" className="btn btn-accent mt-9 w-40">Register</button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default UpdateDocInfo