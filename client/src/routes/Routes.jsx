import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/main/home'
import Login from '../pages/Auth/login'
import Register from '../pages/Auth/register'
import ChatProvider from '../context/chatProvider'
import NotFoundPage from '../pages/main/NotFoundPage'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import Products from '../pages/Admin/Products'
import DoctorsList from '../pages/Admin/DoctorsList'
import UsersList from '../pages/Admin/UsersList'
import ChatsPage from '../pages/main/chatsPage'
import { ToastProvider } from '../context/toastProvider'

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <ChatProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<Register />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/doctors-list" element={<DoctorsList />} />
              <Route path="/admin/users" element={<UsersList />} />
              <Route path="/messages" element={<ChatsPage />} />
              <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route for 404 error */}
            </Routes>
          </ToastProvider>
        </ChatProvider>
      </BrowserRouter>
    </>
  )
}

export default MyRoutes