// import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Login from '../pages/Auth/login'

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default MyRoutes