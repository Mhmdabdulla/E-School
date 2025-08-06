import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { Progress } from "../../ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { completeLesson, updateLastVisitedLesson } from "../../../services/enrollmentService";
import {type EnrolledCourse } from "../../../types/enrollment";
import {type Lesson } from "../../../types/lessons";
import { type Module } from "../../../types/module";
import { formatTimeFromSeconds } from "../../../lib/utils/formatDate";
import { Clock, Play, Pause } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface CourseContentsProps {
  modules: Module[];
  enrolledCourse: EnrolledCourse;
  setEnrolledCourse: (enrollment: EnrolledCourse) => void;
  setCurrentLesson: (lesson: Lesson) => void;
}
export function CourseContents({ modules, enrolledCourse, setCurrentLesson, setEnrolledCourse }: CourseContentsProps) {
  const progress = enrolledCourse.progress;
  const handleChangeLesson = async (lesson: Lesson) => {
    setCurrentLesson(lesson);
    const res = await updateLastVisitedLesson(lesson.courseId, lesson._id);
    setEnrolledCourse(res.enrollment);
  };

  const handleCompletLesson = async (lesson: Lesson) => {
    try {
      const data = await completeLesson(lesson.courseId, lesson._id);
    setEnrolledCourse(data.enrollment);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
    const message = axiosError.response?.data?.message || axiosError.message || "Something went wrong";
    toast.error(message);
    }
  };

  return (
    <div className=" rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Course Contents</h2>
        <div className={`text-sm font-medium  ${progress.percentage > 0 ? "text-green-500" : "text-muted-foreground"}`}>
          {progress.percentage > 0 ? `${progress.percentage}% Completed` : "not started yet"}{" "}
        </div>
      </div>

      <Progress value={progress.percentage} className="h-1 mb-6" />

      <Accordion type="multiple" defaultValue={["0"]}>
        {modules.map((module, index) => (
          <AccordionItem key={index} value={index.toString()} className="border-b">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-start justify-between w-full text-left">
                <span className="font-medium">{module.title}</span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-1">
                      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    {module.lessons?.length} lectures
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTimeFromSeconds(
                      module.lessons?.reduce((duration, lesson) => {
                        return duration + Number(lesson.duration);
                      }, 0) || 0
                    )}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {module.lessons?.map((lesson) => (
                <div
                  key={lesson._id}
                  className={`flex items-center justify-between py-2 px-1 rounded ${progress.lastVisited ? "" : ""} `}
                >
                  <div className="flex items-center gap-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex-shrink-0 cursor-pointer" onClick={() => handleCompletLesson(lesson)}>
                          {progress.completedLessons.includes(lesson._id) ? (
                            <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center text-white">
                              <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
                                <path
                                  d="M5 12l5 5 9-9"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          ) : progress.lastVisited === lesson._id ? (
                            <div className="w-5 h-5 flex items-center justify-center">
                              <Pause className="w-3 h-3" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 border rounded-sm" />
                          )}
                        </div>
                      </TooltipTrigger>

                      <TooltipContent side="top" className="text-xs">
                        {progress.completedLessons.includes(lesson._id) ? "Mark as incompleted" : "Mark as completed"}
                      </TooltipContent>
                    </Tooltip>

                    <span
                      onClick={() => handleChangeLesson(lesson)}
                      className={`text-sm ${
                        progress.completedLessons.includes(lesson._id) ? "text-muted-foreground" : ""
                      } hover:underline hover:cursor-pointer`}
                    >
                      {lesson.order}. {lesson.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="w-3 h-3" />
                    <span className="text-xs text-muted-foreground">
                      {formatTimeFromSeconds(Number(lesson.duration))}
                    </span>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}