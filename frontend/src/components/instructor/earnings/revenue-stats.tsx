import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import {type Wallet } from "../../../types/wallet"
import { DollarSign, CreditCard, ArrowDownCircle, BarChart } from "lucide-react"

interface RevenueStatsProps {
  wallet: Wallet | null
}

export function RevenueStats({wallet}: RevenueStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 " />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{wallet?.totalEarnings.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Lifetime earnings</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          <CreditCard className="h-4 w-4 " />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{wallet?.balance.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Available for withdrawal</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
          <ArrowDownCircle className="h-4 w-4 " />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{wallet?.totalWithdrawn.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">All time withdrawals</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today Revenue</CardTitle>
          <BarChart className="h-4 w-4 " />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{wallet?.todayRevenue.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Last 24 hours</p>
        </CardContent>
      </Card>
    </div>
  )
}