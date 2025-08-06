import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import {type Course } from "../../../types/course";
import {type EnrolledCourse } from "../../../types/enrollment";
import { Link } from "react-router-dom";

interface EnrolledCourseCardProps {
  enrolledCourse: EnrolledCourse;
}

export default function EnrolledCourseCard({ enrolledCourse }: EnrolledCourseCardProps) {
  const course = enrolledCourse.courseId as Course;
  return (
    <div className="flex flex-col border rounded-lg overflow-hidden">
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-medium  mb-1 line-clamp-1">{course.title}</h3>
        <p className="text-xs  mb-4 flex-grow line-clamp-2">{course.subtitle}</p>
        <div className="mt-auto">
          {enrolledCourse.progress.percentage > 0 && (
            <div className="flex items-center justify-between mb-2">
              <Progress value={enrolledCourse.progress.percentage} className="h-1" />
              <span className="text-xs text-green-600 ml-2">{enrolledCourse.progress.percentage}% Completed</span>
            </div>
          )}
          <Link to={`/courses/watch/${course._id}`}>
            <Button className={`w-full`} size="sm">
              Watch Lecture
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}