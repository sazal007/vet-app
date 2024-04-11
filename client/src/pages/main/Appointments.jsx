import SideBar from '../../components/SideBar'
import ApprovedDocList from '../../components/appointment/ApprovedDocList'
import ViewDocAppointmentRequests from '../../components/appointment/ViewDocAppointmentRequests';
import { ChatState } from '../../context/chatProvider'

const Appointments = () => {
  const { user } = ChatState();

  return (
    <>
      <SideBar>
        {
          user?.isDoctor == true ?
            <>
              <div className='text-2xl my-3 mx-2'>Your appointments</div>
              <div>
                <ViewDocAppointmentRequests />
              </div>
            </>
            :
            <>
              <div className='text-2xl my-3 mx-2'><h1>Available appointments</h1></div>
              <div>
                <ApprovedDocList />
              </div>
            </>
        }
      </SideBar>
    </>
  )
}

export default Appointments