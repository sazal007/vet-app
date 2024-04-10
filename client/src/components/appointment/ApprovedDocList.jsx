import { useEffect, useState } from "react"
import { getApprovedDoctors } from "../../apis/vet/doctorApi"
import { Link, } from "react-router-dom"

const ApprovedDocList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchApprovedDotors()
  }, [])

  const fetchApprovedDotors = () => {
    getApprovedDoctors()
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <>
      <div className="flex flex-wrap justify-start gap-4">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor._id} className="card w-80 bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Dr. {doctor.firstName} {doctor.lastName}</h2>
                <p>Specialization: {doctor.specialization}</p>
                <p>Fees per Consultation: ${doctor.feesPerCunsaltation}</p>
                <p>Timing: {doctor.timings.startTime} to {doctor.timings.endTime}</p>
                <div className="card-actions justify-end">
                  <Link to={`/appointment/booking/${doctor._id}`}> <button className="btn btn-primary">View</button></Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No approved doctors found.</p>
        )}
      </div>
    </>
  )
}

export default ApprovedDocList