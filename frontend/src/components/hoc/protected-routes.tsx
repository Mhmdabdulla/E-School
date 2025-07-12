import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserRole } from "../../lib/constants/role";
    
interface ProtectedRouteProps {
  role: UserRole[]
}

const ProtectedRoute = ({role}:ProtectedRouteProps) => {
  const user = useSelector((state: any) => state.auth.user);  
  const isAdmin = localStorage.getItem("adminLoggedIn")

  if(!user){
    return <Navigate to="/login" replace/>
  }

  const userRole = user.role as UserRole;

  const isActive = user.status === 'active';

    const hasAccess =
    role.includes(userRole) &&
    (userRole === UserRole.ADMIN ? isAdmin : !isAdmin) &&
    isActive;

  if (!hasAccess) {
    return userRole === UserRole.ADMIN
      ? <Navigate to="/admin/login" replace />
      : <Navigate to="/login" replace />;
  }

  return <Outlet />;

};

export default ProtectedRoute;