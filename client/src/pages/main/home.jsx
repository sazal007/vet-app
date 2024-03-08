import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to='/login'><button>login</button></Link>
    </>
  )
}

export default Home