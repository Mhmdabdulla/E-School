
import { Button } from "../../ui/button"
import { Star } from "lucide-react"
// import type {  } from "@/types/order"
import { type Course } from "../../../types/course"

interface PurchaseCourseItemProps {
  course: Course
  onViewDetails: () => void
}

export default function PurchaseCourseItem({ course, onViewDetails }: PurchaseCourseItemProps) {
  return (
    <div className="p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-32 flex-shrink-0">
          <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="object-cover rounded-md" />
        </div>

        <div>
          <div className="flex items-center mb-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium">{course.rating}</span>
            <span className="ml-1 text-xs text-gray-500">({course.rating} Review)</span>
          </div>

          <h3 className="text-sm font-medium text-gray-900 mb-1">{course.title}</h3>
          <div className="text-xs text-gray-500">Course by: {''}</div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="text-lg font-medium text-[#ff6b38]">${Number(course.price).toFixed(2)}</div>
        <Button variant="outline" size="sm" className="whitespace-nowrap" onClick={onViewDetails}>
          View Details
        </Button>
      </div>
    </div>
  )
}