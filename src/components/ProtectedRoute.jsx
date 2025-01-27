
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";


function ProtectedRoute() {
  const isLoggedIn = Cookies.get("logged-user");
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/" />
    </>
  );
}

export default ProtectedRoute;
