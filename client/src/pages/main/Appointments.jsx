import SideBar from '../../components/SideBar'
import ApprovedDocList from '../../components/appointment/ApprovedDocList'

const Appointments = () => {

  return (
    <>
      <SideBar>
        <div className='text-2xl my-3 mx-2'><h1>Available appointments</h1></div>
        <div>
          <ApprovedDocList />
        </div>
      </SideBar>
    </>
  )
}

export default Appointments