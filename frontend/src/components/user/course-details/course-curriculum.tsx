import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"
import { BookOpen } from "lucide-react"

interface CourseCurriculumProps {
  curriculum:any
}

const formatDuration = (durationInSeconds:number) => {
  const minutes = Math.floor(durationInSeconds / 60); // Get the minutes
  const seconds = Math.floor(durationInSeconds % 60); // Get the remaining seconds

  // Optionally, you can format seconds to always be two digits (e.g., 05 instead of 5)
  return `${minutes}m : ${seconds.toString().padStart(2, '0')}s`;
};

export default function CourseCurriculum({ curriculum }: CourseCurriculumProps) {
  console.log(curriculum)
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Course Curriculum</h2>
      <p className="text-muted-foreground">
        {/* {curriculum.length} sections • {curriculum.reduce((acc:any, section:any) => acc + section.lectures.length, 0)} lectures
        • {curriculum.reduce((acc:any, section:any) => acc + section.totalDuration, 0)} total length */}
      </p>

      <Accordion type="multiple" className="w-full">
        {curriculum.sections.map((section:any, index:any) => (
          <AccordionItem key={index} value={`section-${index}`}>
            <AccordionTrigger className="text-base font-medium">
              <div className="flex flex-1 items-center justify-between pr-4">
                <span>{section.name}</span>
                <span className="text-sm text-muted-foreground">
                  {section.lectures.length} lectures • {section.totalDuration}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {section.lectures.map((lecture:any, lectureIndex:any) => (
                  <li key={lectureIndex} className="flex items-center justify-between rounded-md p-2 hover:bg-muted">
                    <div className="flex items-center">
                      <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{lecture.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatDuration(lecture.duration)}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}