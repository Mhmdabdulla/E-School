import { useEffect, useState } from "react"
import type { FullCourse } from "../../types/course"

import CourseHeader from "../../components/user/course-details/course-header"
import CoursePreview from "../../components/user/course-details/course-preview"
import CourseTabs from "../../components/user/course-details/course-tab"
import CourseDescription from "../../components/user/course-details/course-description"
import CourseCurriculum from "../../components/user/course-details/course-curriculum"
import CourseInstructor from "../../components/user/course-details/course-instructor"
import CourseSidebar from "../../components/user/course-details/course-sidebar"
import { useNavigate, useParams } from "react-router-dom"
import { getCourseById } from "../../services/courseService"
import Header from "../../components/user/home/Header"
import { createCurriculumData } from "../../lib/utils/courses"
import CourseReviews from "../../components/user/course-review/course-reviews"

export default function UserCourseDetailsPage() {

  const { courseId } = useParams()
  const [course, setCourse] = useState<FullCourse | null>(null)
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "instructor" | "review">("overview")
const navigate = useNavigate()

    useEffect(() => {
      if(!courseId){
          navigate("/courses")
          return
      }
      const fetchCourse = async () => {
        try {
          const res = await getCourseById(courseId); 
          setCourse(res.data );
        } catch (error) {
          console.error("Failed to fetch course:", error);
          navigate("/courses");
        } finally {
          setLoading(false);
        }
      };
  
      fetchCourse();
    }, [courseId, navigate]);

    if(loading){
        return <div></div>
    }

    if(!course){
        return null
    }

  return (
    <>
    <Header/>
    <div className="container mx-auto px-[4%] py-8">
      <div className="mb-6">
        <CourseHeader
          title={course.title as string}
          subtitle={course.subtitle as string}
          rating={course.rating as number}
          reviewCount={0}
          instructor={course.instructor}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CoursePreview thumbnailUrl={course.thumbnail as string} trailer={course.trailer as string} />

          <div className="mt-8">
            <CourseTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="mt-6 rounded-lg border p-6">
              {activeTab === "overview" && <CourseDescription description={course.description as string} whatYouWillLearn={course.whatYouWillLearn } />}
              {activeTab === "curriculum" && <CourseCurriculum curriculum={createCurriculumData(course)} />}
              {activeTab === "instructor" && <CourseInstructor instructorId={course.instructorId} />}
              {activeTab === "review" && <CourseReviews courseId={course._id as string} />}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <CourseSidebar
           id={course._id}
            price={course.price }
            duration={course.duration}
            level={course.level}
            studentsEnrolled={course.enrollmentCount}
            language={course.language}
          />
        </div>
      </div>
    </div>
  </>
  )
} 