import { useEffect, useState } from "react";
import { getUserAppointments } from "../../apis/vet/appointment";
import moment from "moment";

const ViewUserAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = () => {
    getUserAppointments()
      .then((response) => {
        setAppointments(response.data);
        console.log(response.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <>
      <div className="overflow-x-auto bg-base-100 rounded-md">
        {appointments.length > 0 ? (
          <table className="table">
            {/* Table head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>Dr. {appointment.doctorInfo.firstName} {appointment.doctorInfo.lastName}</td>
                  <td>{moment(appointment.date).format("DD-MM-YYYY")}</td>
                  <td>{moment(appointment.time).format("HH:mm")}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // Display this div if there are no appointments
          <div className="text-center p-5">
            <h3 className="text-lg">No Appointments Found</h3>
          </div>
        )}
      </div>

    </>
  )
}

export default ViewUserAppointment