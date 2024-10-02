import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function RequireAuth({ children }) {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/admin/login" />;
  }

  return children;
}

export default RequireAuth;
