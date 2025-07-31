import type{ FullCourse } from "../../../types/course"
import type{ Lesson } from "../../../types/lessons"
import type{ Module } from "../../../types/module"
import { formatTimeFromSeconds } from "../../../lib/utils/formatDate"
import { Clock, Users, BookOpen, Languages, Menu, Gauge, ChartColumnStacked, ChartBarStacked } from "lucide-react"


interface CourseStatsProps {
  course: FullCourse
}


export function CourseStats({ course }: CourseStatsProps) {
  console.log(course)
    const getLessonsCount = () => {
        let lessonsCount = 0;
    
        course.modules?.forEach(module => {
          lessonsCount += module.lessons?.length || 0 
        });

        return lessonsCount
    }
      const totalDuration = course.modules?.flatMap((module: Module) =>
        module.lessons?.map((lesson: Lesson) => Number(lesson.duration) || 0) || []
      ).reduce((sum: number, minutes: number) => sum + minutes, 0) || 0;
    


    const stats = [
        {
            icon: <Menu className="h-5 w-5 text-gray-500" />,
            value: course.modules?.length,
            label: `Modues`,
          },
          {
            icon: <BookOpen className="h-5 w-5 text-gray-500" />,
            value: getLessonsCount(),
            label: `Lessons`,
        }
        ,
        {
            icon: <Users className="h-5 w-5 text-gray-500" />,
            value: course.enrollmentCount,
      label: "Students enrolled",
    },
        {
            icon: <Gauge className="h-5 w-5 text-gray-500" />,
            value: course.level,
            label: "Course level",
          },
          {
            icon: <Languages className="h-5 w-5 text-gray-500" />,
            value: course.language,
            label: "Course Language",
          },
         
          {
            icon: <Clock className="h-5 w-5 text-gray-500" />,
            value: formatTimeFromSeconds(totalDuration), 
            label: "Hours",
          },
        {
            icon: <ChartColumnStacked className="h-5 w-5 text-gray-500" />,
            value: course.categoryName?.toLocaleString(),
            label: "Category",
        },
    
    {
      icon: <ChartBarStacked className="h-5 w-5 text-gray-500" />,
      value: course.subCategoryName?.toLocaleString(),
      label: "Sub-Category",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <div key={index} className=" rounded-lg p-4 border flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full ">{stat.icon}</div>
          <div>
            <div className="font-bold text-lg">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        </div>
      ))}
    </>
  )
}