import { Badge } from "../../ui/badge"
import { cn } from "../../../lib/utils/className"
import { Link } from "react-router-dom" // Replaced next/link with react-router-dom

import type { Course } from "../../../types/course" // Assuming this is the type for course data

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const { _id, title, thumbnail, price, categoryId, enrollmentCount, isFree } = course
  return (
    <Link to={`/courses/${_id}`} className="group flex h-full flex-col overflow-hidden rounded-lg border transition-all hover:shadow-md">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className=" flex justify-between mb-2">
          <Badge
            variant="secondary"
            className={cn("border-0 px-2 py-0.5 text-xs font-medium text-[10px] uppercase")}
          >
            {categoryId.name}
          </Badge>
          <div className="text-xs text-[10px] font-medium text-muted-foreground">{enrollmentCount! > 999 ? "999+" : enrollmentCount} enrollments</div>
        </div>
        <h3 className="mb-2 line-clamp-2 flex-1 font-medium leading-tight">{title}</h3>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> */}
            {/* <span className="text-sm font-medium">{rating}</span> */}
            {/* <span className="text-xs text-muted-foreground">({enrollmentCount?.toLocaleString()} students)</span> */}
          </div>
          <div className="text-lg font-bold text-[16px] ">
  {Number(price) === 0 || isFree ? "Free" : `₹ ${price}`}
</div>
        </div>
      </div>
    </Link>
  )
}