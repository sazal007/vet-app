import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "../../context/toastProvider";
import { isLoggedIn } from "../../apis/auth/userApi";

const AdminRoutes = () => {
  const { showToast } = useToast();
  const location = useLocation();
  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setIsLoading(true); // Start loading
      if (isLoggedIn()) {
        if (isLoggedIn().role === "admin") {
          setIsAllowed(true);
        } else {
          showToast("You are not authorized to access this page", "error");
          setIsAllowed(false);
        }
      } else {
        setIsAllowed(false);
      }
      setIsLoading(false); // End loading
    } catch (err) {
      console.log(err)
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      {isAllowed ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />}
    </>
  )
}

export default AdminRoutes