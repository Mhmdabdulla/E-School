import { GenericPagination } from "../../components/common/pagination";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../components/ui/DropDownMenu";
import { Input } from "../../components/ui/input";
import { Skeleton } from "../../components/ui/skeleton";
import { TableBody, TableCell, TableHead, TableRow } from "../../components/ui/table";
import { getAllcoursesForAdmin, toggleCourseStatus } from "../../services/courseService";
import type { Course } from "../../types/course";
import type { IUser } from "../../types/user";
import { AlertCircle, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchQuery(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);

  const getAllCourses = async () => {
    try {
      setIsLoading(true);
      const data = await getAllcoursesForAdmin(page, limit, searchQuery);
      setCourses(data.coursesWithPagination.courses);
      setTotalPages(data.coursesWithPagination.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeStatus = async(courseId: string) => {
    try {
        await toggleCourseStatus(courseId);
        setCourses(prev =>
          prev.map(course =>
            course._id === courseId ? { ...course, status: !course.status } : course
          )
        );
        toast.info("course status changed successfully")
      } catch (error:any) {
       toast.error(error.message || "unexpected error while updating status")
      }
  }

  useEffect(() => {
    getAllCourses();
  }, [page, searchQuery]);

  return (
    <div className="flex-1 space-y-4 md:pl-64">
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search...."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent>
          {isLoading ? (
            <table className="w-full">
              <thead>
                <TableRow>
                  <TableHead><Skeleton className="h-7 w-24" /></TableHead>
                  <TableHead><Skeleton className="h-7 w-20" /></TableHead>
                  <TableHead><Skeleton className="h-7 w-20" /></TableHead>
                  <TableHead><Skeleton className="h-7 w-20" /></TableHead>
                  <TableHead><Skeleton className="h-7 w-20" /></TableHead>
                </TableRow>
              </thead>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-7 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-7 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-7 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-7 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-7 w-12" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </table>
          ) : courses.length === 0 ? (
      <Card className="border-none">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">No Courses Found</h3>
          <p className="text-sm text-gray-500 text-center mt-2">
            It looks like there are no courses available at the moment. Try adjusting your search or check back later.
          </p>
        </CardContent>
      </Card>
          ) : (
            <table className="w-full">
              <thead>
                <TableRow>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Enrollment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </thead>
              <TableBody>
                {courses.map((course) => {
                  const instructor = course.instructorId as Partial<IUser>;
                  return (
                    <TableRow key={course._id}>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{instructor.name}</TableCell>
                      <TableCell>{course.categoryId.name}</TableCell>
                      <TableCell className="text-center">{course.enrollmentCount}</TableCell>
                      <TableCell>
                        <Badge variant={course.status ? "default" : "destructive"}>
                          {course.status  ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell>{course.price ? `$${course.price}` : "Free"}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            {/* <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit course</DropdownMenuItem> */}
                            <DropdownMenuItem onClick={() => handleChangeStatus(course._id)}>{course.status ? "Unlist" : " List"}</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </table>
          )}
        </CardContent>
      </Card>

      {!isLoading && totalPages > 1 && (
        <GenericPagination currentPage={page} onPageChange={setPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default CoursesPage;