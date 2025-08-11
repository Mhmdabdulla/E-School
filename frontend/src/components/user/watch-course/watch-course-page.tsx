import { useEffect, useState } from "react";
import Header from "../home/Header";
import { LectureDescription } from "./lecture-description";
import { LectureInfo } from "./lecture-info";
import { CourseContents } from "./watch-course-content";
import { CourseHeader } from "./watch-course-header";
import { useParams } from "react-router-dom";
import {
  completeLesson,
  fetchEnrolledCourseWithModulesAndLessons,
  updateLastVisitedLesson,
} from "../../../services/enrollmentService";
import { type Course } from "../../../types/course";
import { formatDate, formatTimeFromSeconds } from "../../../lib/utils/formatDate";
import ReactPlayer from "react-player";
import {type EnrolledCourse } from "../../../types/enrollment";
import {type Lesson } from "../../../types/lessons";
import CourseReviews from "../course-review/course-reviews";
import { toast } from "sonner";

export default function WatchCoursePage() {
  const [enrolledCourse, setEnrolledCourse] = useState<EnrolledCourse>();
  const [courseDetails, setCourseDetails] = useState<Course>();
  const [currentLesson, setCurrentLesson] = useState<Lesson>();
  const [loading, setLoading] = useState<boolean>(true);
  const { courseId } = useParams();

  const getEnrolledCourse = async () => {
    try {
      const data = await fetchEnrolledCourseWithModulesAndLessons(courseId as string);
      setEnrolledCourse(data.enrolledCourse);
      setCourseDetails(data.courseWithModulesAndLessons);

      const lastVisitedId = data.enrolledCourse?.progress.lastVisited
        ? data.enrolledCourse.progress.lastVisited
        : data.courseWithModulesAndLessons?.modules?.[0].lessons?.[0]._id;

      const allLessons = data.courseWithModulesAndLessons?.modules?.flatMap((module: any) => module.lessons || []);

      const lastVisitedLesson = allLessons?.find((lesson: any) => lesson._id === lastVisitedId);
      setCurrentLesson(lastVisitedLesson);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const allLessons: Lesson[] = courseDetails?.modules?.flatMap((module: any) => module.lessons || []) || [];

  const handleVideoEnd = async () => {
    if (!enrolledCourse?.progress.completedLessons.includes(currentLesson?._id.toString() as string)) {
      try {
        const data = await completeLesson(currentLesson?.courseId as string, currentLesson?._id as string);
        setEnrolledCourse(data.enrollment);
        const currentIndex = allLessons.findIndex((l) => l._id === currentLesson?._id);
        const nextLesson = allLessons[currentIndex + 1];
        console.log(nextLesson);
        if (nextLesson) {
          setCurrentLesson(nextLesson);
          await updateLastVisitedLesson(nextLesson?.courseId as string, nextLesson?._id as string);
        }
      } catch (error: any) {
        const message = error?.data?.message || "Could not complete the lesson";
        toast.error(message);
      }
    } else {
      const currentIndex = allLessons.findIndex((l) => l._id === currentLesson?._id);
      const nextLesson = allLessons[currentIndex + 1];
      if (nextLesson) {
        setCurrentLesson(nextLesson);
        setCurrentLesson(nextLesson);
        await updateLastVisitedLesson(nextLesson?.courseId as string, nextLesson?._id as string);
      }
    }
  };

  useEffect(() => {
    getEnrolledCourse();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalLessons = courseDetails?.modules?.reduce((total, module) => {
    return total + (module.lessons ? module.lessons.length : 0);
  }, 0);

  const totalDuration =
    courseDetails?.modules?.reduce((total, module) => {
      const moduleDuration =
        module.lessons?.reduce((durationSum, lesson) => {
          return durationSum + (lesson.duration ? +lesson.duration : 0);
        }, 0) || 0;
      return total + moduleDuration;
    }, 0) || 0;

  if (!courseDetails || !enrolledCourse) {
    return <div></div>;
  }
  if (loading) {
    return <div></div>;
  }

  return (
    <div className="min-h-screen ">
      <Header />
      <div className="container mx-auto px-[4%] py-6">
        <CourseHeader
          title={courseDetails.title}
          sections={courseDetails.modules?.length as number}
          lectures={totalLessons as number}
          duration={formatTimeFromSeconds(totalDuration)}
          enrollment={enrolledCourse}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <ReactPlayer
              src={`http://localhost:5000/api/lessons/${currentLesson?._id}/stream`}
              controls={true}
              width="100%"
              onEnded={handleVideoEnd}
            />
            <LectureInfo
              title={currentLesson?.title as string}
              students={courseDetails.enrollmentCount as number}
              lastUpdated={formatDate(courseDetails.updatedAt as Date)}
              comments={154}
            />
            <LectureDescription description={currentLesson?.description as string} />
            <CourseReviews courseId={courseDetails._id} />
          </div>
          <div className="lg:col-span-1">
            <CourseContents
              modules={courseDetails.modules!}
              enrolledCourse={enrolledCourse}
              setCurrentLesson={setCurrentLesson}
              setEnrolledCourse={setEnrolledCourse}
            />
          </div>
        </div>
      </div>
    </div>
  );
}