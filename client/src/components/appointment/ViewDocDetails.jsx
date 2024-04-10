import { useEffect, useState } from "react";
import { getSingleDoctor } from "../../apis/vet/doctorApi";
import { useParams } from "react-router-dom"
import SideBar from "../SideBar";
import { appointmentBooking, checkAvailability } from "../../apis/vet/appointment";
import { ChatState } from "../../context/chatProvider";
import { useToast } from "../../context/toastProvider";

const ViewDocDetails = () => {
  const [details, setDetails] = useState({});
  const [date, setDate] = useState('');
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const { id } = useParams();
  const { user } = ChatState();
  const { showToast } = useToast()

  useEffect(() => {
    fetchDocDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchDocDetails = () => {
    getSingleDoctor(id)
      .then((response) => {
        setDetails(response.data);
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleBooking = () => {
    setIsAvailable(true);
    const appointmentData = {
      doctorId: id,
      userId: user._id,
      doctorInfo: details,
      userInfo: user,
      date: date,
      time: time,
    };
    appointmentBooking(appointmentData)
      .then((response) => {
        showToast(response.message, "success")
      })
      .catch((err) => {
        console.log(err);
        showToast("Failed to book appointment. Please try again.", "error");
      });
  }

  const handleAvailability = () => {
    if (!date || !time) {
      showToast("Please select date and time")
      return
    }
    const info = {
      doctorId: id,
      date: date,
      time: time
    }
    checkAvailability(info)
      .then((response) => {
        if (response) {
          setIsAvailable(true)
          showToast(response.message, "success")
        } else {
          setIsAvailable(false)
          showToast("Appointments not available", "error")
        }
      })
      .catch((err) => {
        console.log(err);
        // showToast("Failed to check availability. Please try again.", "error");
      });
  }

  return (
    <>
      <SideBar>
        {
          details && (
            <div className="container mx-auto p-4">
              <h1 className="text-4xl font-bold mb-4">Book appointment for Doctor</h1>
              <div className="divider"></div> {/* Provides a nice visual break */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Dr. {details.firstName} {details.lastName}</h2>
                  <p className="text-xl"><strong>Specialization:</strong> {details.specialization}</p>
                  <p><strong>Experience:</strong> {details.experience}</p>
                  <p><strong>Email:</strong> {details.email}</p>
                  <p><strong>Phone:</strong> {details.phone}</p>
                  <p><strong>Address:</strong> {details.address}</p>
                  <p><strong>Fees Per Consultation:</strong> ${details.feesPerCunsaltation}</p>
                </div>
                <div>
                  {details.website && (
                    <p>
                      <strong>Website:</strong>
                      <a href={details.website} target="_blank" rel="noopener noreferrer" className="link link-primary">
                        {details.website}
                      </a>
                    </p>
                  )}
                  <p><strong>Timings:</strong> {details.timings?.startTime} - {details.timings?.endTime}</p>
                  <div>
                    {/* date selector */}
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text"><strong>Select Date for Appointment:</strong></span>
                      </div>
                      <input type="date" name="startTime"
                        className="input input-bordered w-full max-w-xs" value={date} onChange={(e) => { setIsAvailable(false); setDate(e.target.value) }} />
                    </label>
                    {/* time selector */}
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text"><strong>Select Time for Appointment:</strong></span>
                      </div>
                      <input type="time" name="startTime"
                        className="input input-bordered w-full max-w-xs" value={time} onChange={(e) => { setIsAvailable(false); setTime(e.target.value) }} />
                    </label>

                    <button className="btn btn-primary mt-4" onClick={handleAvailability}>Check Availability</button>

                    {isAvailable && (
                      <button className="btn btn-success mt-4 ml-2" onClick={handleBooking}>Book</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </SideBar>
    </>
  )
}

export default ViewDocDetails