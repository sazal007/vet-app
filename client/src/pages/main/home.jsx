import { Link } from "react-router-dom"
import SideBar from "../../components/SideBar"

const Home = () => {
  return (
    <>
      <SideBar>
        <div>Home</div>
        <Link to='/login'><button>login</button></Link>
      </SideBar>
    </>
  )
}

export default Home