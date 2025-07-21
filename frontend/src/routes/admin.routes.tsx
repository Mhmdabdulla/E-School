import { Navigate, Route } from "react-router-dom";
import LoginPage from "../pages/admin/Login";
import ProtectedRoute from "../components/hoc/protected-routes";
import { UserRole } from "../lib/constants/role";
import DashboardLayout from "../components/admin/layout/DashboardLayout";
import Dashboard from "../pages/admin/Dashboard";
import UsersPage from "../pages/admin/Users";
import Instructors from "../pages/admin/Instructors";
import InstructorApplicationsPage from "../pages/admin/InstructorApplications";

export const adminRoutes = (
    <>
       <Route path="/admin/login" element={<LoginPage />} />

       <Route element={<ProtectedRoute role={[UserRole.ADMIN]} />}>
       <Route path="/admin" element={<DashboardLayout />}>
       <Route index element={<Navigate to="/admin/dashboard" replace />} />
       <Route path="dashboard" element={<Dashboard />} />
       <Route path="users" element={<UsersPage />} />
       <Route path="tutors" element={<Instructors />} />
       <Route path="applications" element={<InstructorApplicationsPage />} />
       </Route>
       </Route>
    </>
)