import { useState } from "react"
import { useCourses } from "../../hooks/useCourse"
import { Sidebar } from "../../components/instructor/common/Sidebar"
import PageHeader from "../../components/instructor/common/Header"
import { CoursePagination } from "../../components/instructor/common/Pagination"
import { CourseFilters } from "../../components/instructor/courses/course-filter"
import { CourseGrid } from "../../components/instructor/courses/course-grid"

export default function CoursesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {
    courses,
    totalPages,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
    category,
    setCategory,
    subCategory,
    setSubCategory,
    rating,
    setRating,
    searchQuery,
    setSearchQuery,

  } = useCourses({role:'instructor'})

  


  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <PageHeader />

        <main className="flex-1 overflow-y-auto p-6 pb-16">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">My Courses</h1>
          </div>

          <CourseFilters
            sortBy={sortBy}
            setSortBy={setSortBy}
            category={category}
            setCategory={setCategory}
            rating={rating}
            setRating={setRating}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            subCategory={subCategory}
            setSubCategory={setSubCategory}
          />

          <CourseGrid courses={courses} />

          <div className="mt-8 flex justify-center">
            <CoursePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </main>
      </div>
    </div>
  )
}