import { useEffect, useState } from 'react'
import { appointmentSatus, getDocAppoiments } from '../../apis/vet/appointment'
import moment from 'moment'

const ViewDocAppointmentRequests = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = () => {
    getDocAppoiments()
      .then((response) => {
        setAppointments(response.data);
        // console.log(response.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const acceptAppointment = (appointment, status) => {
    appointmentSatus(appointment, status)
      .then(() => {
        fetchAppointments()
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <>
      <div className="overflow-x-auto bg-base-100 rounded-md">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {
              appointments.map((appointment, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{appointment.userInfo.name}</td>
                  <td>{moment(appointment.date).format("DD-MM-YYYY")}</td>
                  <td>{moment(appointment.time).format("HH:mm")}</td>
                  <td>{appointment.status}</td>
                  <td>
                    {
                      appointment.status === "pending" &&
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-success" onClick={() => acceptAppointment(appointment, "approved")}>Accept</button>
                        <button className="btn btn-sm btn-error" onClick={() => acceptAppointment(appointment, "rejected")}>Reject</button>
                      </div>
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ViewDocAppointmentRequests