import { useState, useEffect } from "react";
import { fetchEnrolledCourses } from "../services/enrollmentService";
import { type EnrolledCourse } from "../types/enrollment";

interface UseEnrolledCoursesProps { 
  userId: string;
}

export function useEnrolledCourses({ userId }: UseEnrolledCoursesProps) {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const coursesPerPage = 12;

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); 

  const getEnrolledCourses = async () => {
    try {
      setLoading(true);

      const response = await fetchEnrolledCourses({
        page: currentPage,
        limit: coursesPerPage,
        searchQuery,
        filter,
      });

      setEnrolledCourses(response.data); 
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch enrolled courses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getEnrolledCourses();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, currentPage, searchQuery, filter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filter]);

  return {
    enrolledCourses,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
    refetch: getEnrolledCourses,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
  };
}