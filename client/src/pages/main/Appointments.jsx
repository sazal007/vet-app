import { isLoggedIn } from '../../apis/auth/userApi';
import SideBar from '../../components/SideBar'
import ApprovedDocList from '../../components/appointment/ApprovedDocList'
import ViewDocAppointmentRequests from '../../components/appointment/ViewDocAppointmentRequests';

const Appointments = () => {
  const user = isLoggedIn()

  return (
    <>
      <SideBar>
        {user?.isDoctor ? (
          <div className='my-3 mx-2'>
            <h2 className='text-2xl'>Your appointments</h2>
            <ViewDocAppointmentRequests />
          </div>
        ) : (
          <div className='my-3 mx-2'>
            <h2 className='text-2xl'>Available appointments</h2>
            <ApprovedDocList />
          </div>
        )}
      </SideBar>
    </>
  )
}

export default Appointments