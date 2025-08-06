import {type EnrolledCourse } from "../../../types/enrollment"
import EnrolledCourseCard from "../enrolled-courses/enrolled-courses-card"
import { Button } from "../../ui/button"
import { Link } from "react-router-dom"

interface CourseCarouselProps {
  courses: EnrolledCourse[] | null
}

export function CourseCarousel({ courses }: CourseCarouselProps) {
  const hasCourses = courses && courses.length > 0

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Let&apos;s start learning, from where you left
        </h2>
      </div>

      {hasCourses ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses!.map((course) => (
            <EnrolledCourseCard key={course._id} enrolledCourse={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center border border-muted rounded-md p-8">
          <h3 className="text-lg font-medium mb-2">No courses in progress</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You haven't started any course yet. Begin your journey by browsing our collection.
          </p>
          <Link to="/courses">
            <Button variant="default" size="sm">
              Browse Courses
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}