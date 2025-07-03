
//home
//signup
//login
//verify otp
//admin user management
//admin instructor management

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/user/LoginPage'
// import Signup from './pages/user/Signup'
import Home from './pages/user/Home'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
    <BrowserRouter>
    <Toaster richColors position="top-right" />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path="/login" element={<Login />} />
      {/* <Route path='/signup' element={<Signup />} /> */}
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
