import type { IInstructor } from "../../../types/instructor"
import { InstructorCard } from "./instructors-card"

interface InstructorsGridProps {
  instructors: IInstructor[] | null
}

export function InstructorsGrid({ instructors }: InstructorsGridProps) {
    console.log(instructors)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {instructors?.map((instructor) => {
      return  (           
          <InstructorCard key={instructor._id} instructor={instructor} />
        )
})}
    </div>
  )
}