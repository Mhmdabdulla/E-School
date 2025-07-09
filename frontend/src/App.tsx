
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

function App() {

  return (
    <>
    <BrowserRouter>
    <Toaster richColors position="top-right" />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/be-instructor" element={<BecomeInstructorPage />} />
      <Route path="/be-instructor/apply" element={<InstructorApply/>} />
      {/* <Route path='/signup' element={<Signup />} /> */}


      {/* admin */}
       <Route path="/admin/login" element={<LoginPage />} />

       <Route path="/admin" element={<DashboardLayout />}>
       <Route index element={<Navigate to="/admin/dashboard" replace />} />
       <Route path="dashboard" element={<Dashboard />} />
       <Route path="users" element={<UsersPage />} />
       <Route path="tutors" element={<Instructors />} />
       <Route path="applications" element={<InstructorApplicationsPage />} />
       </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
