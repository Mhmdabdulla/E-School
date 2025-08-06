import { useState } from "react"
// import PurchaseCourseItem from "@/components/purchase-history/purchase-course-item"
// import PurchaseDetailsDialog from "@/components/purchase-history/purchase-details-dialog"
import type { IOrder } from "../../../types/order"
import PurchaseCourseItem from "./purchase-course-item"
import PurchaseDetailsDialog from "./purchase-course-dialog"
import {type Course } from "../../../types/course"

interface PurchaseCourseListProps {
  courses: Course[]
  purchaseDetails: IOrder
}

export default function PurchaseCourseList({ courses, purchaseDetails }: PurchaseCourseListProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDetails = (course: Course) => {
    setSelectedCourse(course)
    setIsDialogOpen(true)
  }

  return (
    <div>
      <div className="divide-y">
        {courses.slice(0, 3).map((course) => (
          <PurchaseCourseItem key={course._id} course={course} onViewDetails={() => handleOpenDetails(course)} />
        ))}
      </div>

      {courses.length > 3 && (
        <div className="p-4 text-center text-sm text-gray-500">+ {courses.length - 3} more courses</div>
      )}

      <div className="p-4 border-t ">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-sm">
              <svg
                className="h-4 w-4 mr-1 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {purchaseDetails.courseIds.length} Courses
            </div>

            <div className="flex items-center text-sm">
              <svg
                className="h-4 w-4 mr-1 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
              ${purchaseDetails.totalAmount.toFixed(2)} {"INR"}
            </div>

            <div className="flex items-center text-sm">
              <svg
                className="h-4 w-4 mr-1 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 5.25H3C2.58579 5.25 2.25 5.58579 2.25 6V18C2.25 18.4142 2.58579 18.75 3 18.75H21C21.4142 18.75 21.75 18.4142 21.75 18V6C21.75 5.58579 21.4142 5.25 21 5.25Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.75 15.75H18.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.25 15.75H12.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.25 9.08008H21.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {"Credit Card"}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm">Kevin Gilbert</div>
            <div className="text-sm">{"12345"}</div>
            <div className="text-sm">{"12345"}</div>
          </div>
        </div>
      </div>

      <PurchaseDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        course={selectedCourse}
        order={purchaseDetails}
      />
    </div>
  )
}