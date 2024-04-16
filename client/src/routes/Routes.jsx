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
import UserProducts from '../pages/main/userProducts'
import ProductDetails from '../components/products/ProductDetails'
import Cart from '../pages/main/Cart'
import { CartProvider } from '../context/cartProvider'
import Profile from '../pages/main/Profile'
import RegisterAsDoctor from '../pages/main/RegisterAsDoctor'
import Appointments from '../pages/main/Appointments'
import ViewDocDetails from '../components/appointment/ViewDocDetails'
import AdminRoutes from './selectiveRoutes/adminRoutes'
import UserRoutes from './selectiveRoutes/userRoutes'
import Community from '../pages/main/Community'

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <ChatProvider>
          <ToastProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<UserProducts />} />
                <Route path="/shop/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<Register />} />
                {/* user routes */}
                <Route element={<UserRoutes />}>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/messages" element={<ChatsPage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/register-as-vet" element={<RegisterAsDoctor />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/appointment/booking/:id" element={<ViewDocDetails />} />
                  <Route path="/community" element={<Community />} />
                </Route>
                {/* admin routes */}
                <Route element={<AdminRoutes />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/products" element={<Products />} />
                  <Route path="/admin/doctors-list" element={<DoctorsList />} />
                  <Route path="/admin/users" element={<UsersList />} />
                </Route>
                {/* Catch-all route for 404 error */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </CartProvider>
          </ToastProvider>
        </ChatProvider>
      </BrowserRouter>
    </>
  )
}

export default MyRoutes