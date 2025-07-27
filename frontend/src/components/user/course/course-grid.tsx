import type { Course } from "../../../types/course"
import { CourseCardSkeleton } from "./course-card-skeleton"
import { CourseCard } from "./course-card"
import { motion } from "framer-motion"

interface CourseGridProps {
  courses: Course[]
  loading: boolean
  isFilterOpen: boolean
}

export function CourseGrid({ courses, loading, isFilterOpen }: CourseGridProps) {

  if (loading) {
    return (
      <div
        className={`grid gap-6 ${isFilterOpen ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}
      >
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h3 className="mb-2 text-xl font-semibold">No courses found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    )
  }

  return (
    <div
      className={`grid gap-6 ${isFilterOpen ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}
    >
      {courses.map((course) => (
      <motion.div
      key={course._id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <CourseCard key={course._id} course={course} />
        </motion.div>
      ))}
    </div>
  )
}