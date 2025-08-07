import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { fetchRevenueStats } from "../../../services/earningService"
import {type RevenueStats } from "../../../types/revenue"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function RevenueChart() {
  const [range, setRange] = useState<"daily" | "weekly" | "monthly">("daily")
  const [chartData, setChartData] = useState<{ name: string, value: number }[]>([])

  const getChartData = async () => {
    try {
      const data: RevenueStats = (await fetchRevenueStats(range)).data
      console.log(data)

      const formatted = data.map(item => {
        if ("date" in item) {
          return {
            name: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
            value: item.revenue,
          }
        }
        if ("week" in item) {
          return {
            name: item.week, 
            value: item.revenue,
          }
        }
        if ("month" in item) {
          return {
            name: item.month, 
            value: item.revenue,
          }
        }
        return { name: "", value: 0 }
      })

      setChartData(formatted)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getChartData()
  }, [range])

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Statistic</CardTitle>
          <CardDescription>Revenue over time</CardDescription>
        </div>
        <Select defaultValue="daily" onValueChange={(val) => setRange(val as typeof range)}>
          <SelectTrigger className="h-7">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[300px] pl-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={true} className="text-sm" />
            <YAxis tickFormatter={(value) => `${value }`} tickLine={false} axisLine={false} className="text-sm"/>
            <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} labelFormatter={(label) => `Date: ${label}`} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#000"
              strokeWidth={2}
              dot={{ r: 4, fill: "#000", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#000", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}