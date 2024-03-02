import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/misc/home'
import Login from '../pages/Auth/login'
import Register from '../pages/Auth/register'
import ChatProvider from '../context/chatProvider'
import NotFoundPage from '../pages/misc/NotFoundPage'

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route */}
          </Routes>
        </ChatProvider>
      </BrowserRouter>
    </>
  )
}

export default MyRoutes