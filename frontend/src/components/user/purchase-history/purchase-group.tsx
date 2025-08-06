import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
// import PurchaseCourseList from "@/components/purchase-history/purchase-course-list"
// import PurchaseGroupSummary from "@/components/purchase-history/purchase-group-summary"
import type { IOrder } from "../../../types/order"
import PurchaseGroupSummary from "./purchase-group-summary"
import PurchaseCourseList from "./purchase-course-list"

interface PurchaseGroupProps {
  purchaseGroup: IOrder
}

export default function PurchaseGroup({ purchaseGroup }: PurchaseGroupProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 cursor-pointer " onClick={toggleExpand}>
        <PurchaseGroupSummary purchaseGroup={purchaseGroup} />
        <button className="p-1 rounded-full ">
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="border-t">
          <PurchaseCourseList
            courses={purchaseGroup.courseIds}
            purchaseDetails={purchaseGroup}
          />
        </div>
      )}
    </div>
  )
}