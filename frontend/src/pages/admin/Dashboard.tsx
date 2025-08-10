import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { getAdminDashboard } from '../../services/adminService'
import { fetchRecentOrders } from '../../services/orderService';
import {type IOrder } from '../../types/order';
import {type IUser } from '../../types/user';
import { ArrowDownRight, ArrowUpRight, BookOpen, DollarSign, GraduationCap, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface AdminDashboardStats {
  totalUsers: number | null;
  totalTutors: number | null;
  totalCourses: number | null;
}

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState<AdminDashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [recentOrders, setRecentOrders] = useState<IOrder[]>([])
  useEffect(()=> {
    const fetchDashboardData = async()=> {
      try {
        const data = await getAdminDashboard()
        console.log(data)
        setDashboardData(data.dashboardDetails)
        const orderData = await fetchRecentOrders(5)
        setRecentOrders(orderData.orders)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDashboardData()
  },[])

  if(loading){
    return <div></div>
  }
  return (
    <div className="flex-1 space-y-4 md:pl-64">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardData?.totalUsers}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              +12.5%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Instructors</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardData?.totalTutors}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              +4.3%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardData?.totalCourses}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              +8.2%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹45,231.89</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-rose-500 flex items-center">
              <ArrowDownRight className="mr-1 h-4 w-4" />
              -2.5%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Monthly revenue for the current year</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
  <table className="min-w-full text-sm">
    <thead>
      <tr className="text-gray-500 font-semibold">
        <th className="py-1 pr-6 text-left">Month</th>
        <th className="py-1 text-right">Revenue</th>
      </tr>
    </thead>
    <tbody>
      {[
        { month: "Jan", revenue: 12000 },
        { month: "Feb", revenue: 13550 },
        { month: "Mar", revenue: 14600 },
        { month: "Apr", revenue: 17200 },
        { month: "May", revenue: 15500 },
        { month: "Jun", revenue: 13900 },
      ].map((r) => (
        <tr key={r.month}>
          <td className="py-1 pr-6">{r.month}</td>
          <td className="py-1 text-right font-medium">₹{r.revenue.toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
</CardContent>
      </Card>
      <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>Latest course purchases</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentOrders.map((order) => {
          const user = order.userId as IUser
          return(
            <div key={order._id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {order.courseIds.map((course) => course.title).join(", ")}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">₹{order.totalAmount}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
    </div>
  </div>
  )
}

export default DashboardPage