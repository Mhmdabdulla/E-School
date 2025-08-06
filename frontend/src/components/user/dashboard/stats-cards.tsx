import { Card, CardContent } from "../../ui/card"
import {type DashboardData } from "../../../types/user"
import { BookOpen, Users, CheckCircle, LayoutGrid } from "lucide-react"

interface StatsCardsProps {
  dashboardData: DashboardData | null
}
export function StatsCards({dashboardData}: StatsCardsProps) {
  const stats = [
    {
      title: "Enrolled Courses",
      value: dashboardData?.enrolledCourses,
      icon: <BookOpen className="h-5 w-5 " />,
      bgColor: "bg-red-50",
    },
    {
      title: "Active Courses",
      value: dashboardData?.activeCourses,
      icon: <LayoutGrid className="h-5 w-5 text-blue-500" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Completed Courses",
      value: dashboardData?.completedCourses,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Course Instructors",
      value: dashboardData?.instructors,
      icon: <Users className="h-5 w-5 text-amber-500" />,
      bgColor: "bg-amber-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} >
          <CardContent className="flex items-center p-6">
            <div className="mr-4">{stat.icon}</div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}