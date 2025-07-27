import { useState, useEffect } from "react"
// import { getMyCourses } from "@/services/instructorService"
import type { Course } from "../types/course"
import { getAllCourses, getMyCourses } from "../services/courseService"

interface useCoursesProps{
    role:string
}
export function useCourses({role}:useCoursesProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState("latest")
  const [category, setCategory] = useState("all")
  const [subCategory, setSubCategory] = useState("all")
  const [rating, setRating] = useState("4")
  const [searchQuery, setSearchQuery] = useState("")
  const [userCatagories, setUserCatagories] = useState<string[]>([])
  const [userSubCatagories, setUserSubCatagories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [level, setLevel] = useState<string[]>([]);
  const [duration, setDuration] = useState<string[]>([]);
  const [loading, setLoading] = useState(true) 

  const coursesPerPage = 12

  const fetchCoursesFromBackend = async () => {
    try {
      setLoading(true)
      const response = await getMyCourses({
        page: currentPage,
        limit: coursesPerPage,
        searchQuery,
        category,
        subCategory,
        sortBy,
      })

      console.log(response)
      setCourses(response.coursesWithPagination.courses)
      setTotalPages(response.coursesWithPagination.totalPages)  
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCoursesFromBackendForUser = async () => {
    try {
      setLoading(true)
      const response = await getAllCourses({
        page: currentPage,
        limit: coursesPerPage,
        searchQuery,
        category: userCatagories ,
        subCategory: userSubCatagories,
        sortBy,
        priceMin: priceRange[0],
        priceMax: priceRange[1],
        level: level.length > 0 ? level : undefined,
        duration: duration.length > 0 ? duration : undefined,
      })
  
      console.log(response)
      setCourses(response.coursesWithPagination.courses)
      setTotalPages(response.coursesWithPagination.totalPages)  
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getCourses = async () => {
      try {
        if(role === 'instructor'){
             await fetchCoursesFromBackend()
        }else if(role === 'user'){   
            await fetchCoursesFromBackendForUser()
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)}
    }
    getCourses()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, category, searchQuery, currentPage, subCategory, userCatagories, userSubCatagories])

  return {
    courses ,
    setCourses,
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
    userCatagories,
    setUserCatagories,
    userSubCatagories,
    setUserSubCatagories,
    priceRange,
    setPriceRange,
    level,
    setLevel,
    duration,
    setDuration,
    loading,
    setLoading  
  }
}