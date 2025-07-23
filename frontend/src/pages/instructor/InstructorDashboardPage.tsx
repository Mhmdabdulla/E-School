import { useState } from "react"
import { Sidebar } from "../../components/instructor/common/Sidebar"
import PageHeader from "../../components/instructor/common/Header"




const DashboardPage = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className=" ">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}  />
    
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
    
<PageHeader />
 
  </div>
  )
}

export default DashboardPage