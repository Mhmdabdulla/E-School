import { useEffect, useState } from "react";
import { Filter, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { CourseSort } from "../../components/user/course/course-sort";
import { CourseFilters } from "../../components/user/course/course-filter";
import { CourseGrid } from "../../components/user/course/course-grid";
import { CoursePagination } from "../../components/user/course/course-pagination";
import Header from "../../components/user/home/Header";
import { useCourses } from "../../hooks/useCourse";

export default function UserCoursesPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState("");

  const {
    courses,
    totalPages,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
    userCatagories,
    setUserCatagories,
    userSubCatagories,
    setUserSubCatagories,
    rating,
    setRating,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    level,
    setLevel,
    duration,
    setDuration,
    loading,
  } = useCourses({ role: "user" });

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search);
    }, 500); 

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <>
      <Header />
      <div className="container mx-auto px-[4%] py-8">
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex w-full items-center ">
            <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for courses..."
                className="md:w-1/3 pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* <div className="relative flex-1 items-center sm:flex ">
            <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search for courses..."
                className="w-1/3 pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
          </div> */}
            <div className="flex items-center gap-2 justify-between">
              <Button
                variant="outline"
                size={"sm"}
                className="flex items-center gap-2"
                onClick={toggleFilter}
              >
                <Filter className="h-" />
                Filter
                {/* <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">8</span> */}
              </Button>
              <CourseSort sortBy={sortBy} setSortBy={setSortBy} /> {/* Assuming this manages sortBy */}
            </div>
          </div>

          {!loading && searchQuery.length > 0 && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{courses.length}</span> results found for "
              {searchQuery}"
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {isFilterOpen && (
            <div className="lg:col-span-1">
              <CourseFilters
                userCatagories={userCatagories}
                setUserCatagories={setUserCatagories}
                userSubCatagories={userSubCatagories}
                setUserSubCatagories={setUserSubCatagories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                level={level}
                setLevel={setLevel}
                duration={duration}
                setDuration={setDuration}
                rating={rating}
                setRating={setRating}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          )}

          <div className={isFilterOpen ? "lg:col-span-3" : "lg:col-span-4"}>
            <CourseGrid courses={courses} loading={loading} isFilterOpen={isFilterOpen} />
            <div className="mt-8 flex justify-center">
              <CoursePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}