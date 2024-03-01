import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/misc/home'
import Login from '../pages/Auth/login'
import Register from '../pages/Auth/register'

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default MyRoutes