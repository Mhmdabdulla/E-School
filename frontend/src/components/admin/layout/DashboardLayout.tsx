import { Outlet } from 'react-router-dom'
import Sidebar from '../common/Sidebar'
import Navbar from '../common/Navbar'

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
    <Navbar />
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 p-6 pt-16">{<Outlet />}</main>
    </div>
  </div>
  )
}

export default DashboardLayout