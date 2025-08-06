import { CreditCard } from "lucide-react"
import type { IOrder } from "../../../types/order"
import { formatDate } from "../../../lib/utils/formatDate"

interface PurchaseGroupSummaryProps {
  purchaseGroup: IOrder
}

export default function PurchaseGroupSummary({ purchaseGroup }: PurchaseGroupSummaryProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
      <div className="text-sm font-medium">{formatDate(purchaseGroup.createdAt)}</div>

      <div className="flex items-center gap-2">
        <div className="flex items-center text-sm text-gray-600">
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {purchaseGroup.courseIds.length} Courses
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.25 18.75C7.71719 18.75 13.1844 18.75 19.6875 18.75C19.9367 18.75 20.1875 18.75 20.4375 18.75C20.8781 18.75 21.2344 18.3937 21.2344 17.9531C21.2344 17.5125 20.8781 17.1562 20.4375 17.1562C20.1875 17.1562 19.9367 17.1562 19.6875 17.1562C13.1844 17.1562 7.71719 17.1562 2.25 17.1562"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.75 17.1562L5.37891 5.46094C5.53125 4.35938 6.45703 3.51562 7.57031 3.51562H16.4297C17.543 3.51562 18.4688 4.35938 18.6211 5.46094L20.25 17.1562"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.15625 7.03125H15.8438"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.59375 10.5469H16.4062"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.03125 14.0625H16.9688"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          ${purchaseGroup.totalAmount.toFixed(2)} {"INR"}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <CreditCard className="h-4 w-4 mr-1" />
          {"Credit Card"}
        </div>
      </div>
    </div>
  )
}