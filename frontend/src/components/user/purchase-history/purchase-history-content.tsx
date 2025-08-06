import { useEffect, useState } from "react"

import type { IOrder } from "../../../types/order"
import PurchaseHistoryHeader from "./purchase-history-header"
import PurchaseGroup from "./purchase-group"
import { fetchUserOrders } from "../../../services/orderService"

export default function PurchaseHistoryContent() {
  const [orders, setOrders] = useState<IOrder[]>([])


  const getOrders = async () => {
    try {
        const data = await fetchUserOrders()
        console.log(data)
        setOrders(data.orders)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=> {
    getOrders()
  }, [])

  return (
    <div className="p-6">
      <PurchaseHistoryHeader />
      <div className="mt-6 space-y-4">
        {orders.map((group) => (
          <PurchaseGroup key={group._id} purchaseGroup={group} />
        ))}
      </div>
    </div>
  )
}