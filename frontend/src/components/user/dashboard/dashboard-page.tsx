
// import { DashboardFooter } from "@/components/dashboard/footer"

import { useEffect, useState } from "react";
import { CourseCarousel } from "./course-carousel";
import { StatsCards } from "./stats-cards";
import { getUserDashboard } from "../../../services/userServices";
import {type EnrolledCourse } from "../../../types/enrollment";
import {type DashboardData } from "../../../types/user";

export default function DashboardPage() {

  const [enrollments, setEnrollments] = useState<EnrolledCourse[] | null>([])
  const [dashboardData, setDashboardData] = useState<DashboardData| null>(null)

  const fetchUserDashboard = async() => {
    const data = await getUserDashboard()
    setEnrollments(data.dashboardData.enrollments)
    setDashboardData(data.dashboardData)
  }

  useEffect(()=> {
    fetchUserDashboard()
  },[])
  return (
    <div className="min-h-screen flex flex-col ">
      <main className="flex-1 container mx-auto  py-8">

        <StatsCards dashboardData={dashboardData} />

        <CourseCarousel courses={enrollments} />
      </main>

      {/* <DashboardFooter /> */}
    </div>
  )
}