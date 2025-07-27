import { getInstructorDetails } from "../../../services/intructorServices"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"

interface CourseInstructorProps {
  instructorId: any
}

export default function CourseInstructor({ instructorId }: CourseInstructorProps) {
  const [instructor, setInstructor] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(()=> {
     const fetchInstructorDetails = async () => {
      try {
        const data = await getInstructorDetails(instructorId)
        console.log(data)
        setInstructor(data.instructor)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
     }

     fetchInstructorDetails()
  }, [instructorId])

  if(loading){
    return <div>  </div>
  }
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">About the Instructor</h2>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-shrink-0">
          <div className="relative h-24 w-24 overflow-hidden rounded-full">
            <img src={instructor.userId.profileImageUrl || "/placeholder.svg"} alt={instructor.name}  className="object-cover" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">{instructor.userId.name}</h3>
          <p className="text-sm text-muted-foreground">{instructor.userId.title}</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star className="h-4 w-4" />
              <span className="ml-1 text-sm">{instructor.rating} instructor Rating</span>
            </div>
            <div className="text-sm text-muted-foreground">{4} Reviews</div>
            <div className="text-sm text-muted-foreground">{235} Students</div>
            <div className="text-sm text-muted-foreground">{4} Courses</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">About</h4>
        <p className="text-muted-foreground">{instructor.bio}</p>
      </div>
    </div>
  )
}