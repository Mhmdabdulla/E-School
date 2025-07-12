
//home
//signup
//login
//verify otp
//admin user management
//admin instructor management

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/user/LoginPage'
// import Signup from './pages/user/Signup'
import Home from './pages/user/Home'
import { Toaster } from 'sonner'
import BecomeInstructorPage from './pages/user/BecomeInstructor'
import InstructorApply from './pages/user/InstructorApply'
import LoginPage from './pages/admin/Login'
import DashboardLayout from './components/admin/layout/DashboardLayout'
import Dashboard from './pages/admin/Dashboard'
import UsersPage from './pages/admin/Users'
import Instructors from './pages/admin/Instructors'
import InstructorApplicationsPage from './pages/admin/InstructorApplications'
import ProtectedRoute from './components/hoc/protected-routes'
import { UserRole } from './lib/constants/role'
import { useEffect, useState } from 'react'
import { refreshToken } from './services/authServices'
import { useDispatch } from 'react-redux'

function App() {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
         await refreshToken(dispatch);

      } finally {
        setLoading(false);
      }
    };
    init();
  }, [dispatch]);

  if (loading) return <div />;

  return (
    <>
    <BrowserRouter>
    <Toaster richColors position="top-right" />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute role={[UserRole.USER]} />}>
      <Route path="/be-instructor" element={<BecomeInstructorPage />} />
      <Route path="/be-instructor/apply" element={<InstructorApply/>} />
      </Route>
    


      {/* admin */}
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
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
