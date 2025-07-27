// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Clock, BarChart, Users, Globe, CheckCircle, Download, BookOpenText } from "lucide-react"
import { Button } from "../../ui/button"
import { toast } from "sonner"
// import { useAppDispatch } from "../../../redux/store"
// import { addToCart } from "../../../redux/thunks/cartThunk"
import { useEffect, } from "react"
// import { enrollUserIntoCourse, fetchUserEnrollmentStatus } from "@/services/enrollmentService"
// import { Link } from "react-router-dom"
// import { addCourseToWishlist } from "@/services/wishlistService"
// import { addCourseToWishlist } from "@/services/wishlistService"
// import type { EnrolledCourse } from "../../../types/enrollment"

export default function CourseSidebar({
  id,
  price,
  duration,
  level,
  studentsEnrolled,
  language,
}: any) {
//   const [isUserEnrolled, setIsUserEnrolled] = useState<EnrolledCourse>()
//   const dispatch = useAppDispatch()

  const handleAddToCart = async () => {
    try {
    //   const result = await dispatch(addToCart(id))
    //   toast.success("course added to cart", {position:"top-right"})
    //   console.log(result)
    console.log('Item added to cart')
    } catch (error:any) {
      toast.error(error.data.message ||"error while adding course to cart", {position:"top-right"})
    }
  }

  const handleAddToWishlist = async () => {
    try {
    //   await addCourseToWishlist(id)
    //   toast.success("course added to wishlist", {position:"top-right"})
    console.log("item added to wishlist")
    } catch (error:any) {
      toast.error(error.data.message ||"error while adding course to cart", {position:"top-right"})
    }
  }

  const handleEnrollCourse = async (courseId: string) => {
    try {
    //   const data = await enrollUserIntoCourse(courseId)
    //   console.log(data)
    //   setIsUserEnrolled(data.enrollment)
    //   toast.success(data.message || "enrolled successfully")
    console.log("You enrolled for course",courseId)
    } catch (error) {
      console.log(error)
    }
  }

  const getUserEnrollmentStatus = async () => {
    try {
    //   const data = await fetchUserEnrollmentStatus(id)
    //   setIsUserEnrolled(data.userEnrolled)
    console.log('status will show here later')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getUserEnrollmentStatus()

  },[])

  return (
    <div className="sticky top-24 space-y-6 rounded-lg border bg-card p-6 shadow-sm">
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          {/* {
            !isUserEnrolled && */}
          <div className="text-2xl font-bold">{`${price === 0 ? 'Free' : `₹ ${price.toFixed(2)}`}`}</div>
        {/* //   } */}
          {/* <div className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</div> */}
        </div>
      </div>

      <div className="space-y-4">
        {
        //   isUserEnrolled ? 
        //   (
        //     <div className="flex gap-4">
        //     <Link to={`/courses/watch/${id}`} className="flex-1">
        //     <Button className="w-full flex gap-4 ">
        //       <BookOpenText className="mt-1"/>
        //       watch Now</Button>
        //   </Link>
        //   { isUserEnrolled.completed &&
        //    <Button className="flex-1 gap-4 ">
        //     <Download/>
        //     Certificate</Button>
        //   }
        //     </div>
        //   )
        //   :
          price === 0 ?
            <Button className="w-full" onClick={()=> handleEnrollCourse(id)}>Enroll Now</Button>
            :
            <div className="flex w-full justify-between gap-5 ">
            <Button onClick={handleAddToCart} className="flex-1">Add To Cart</Button>
            <Button onClick={handleAddToWishlist} className="flex-1">Add To wishlist</Button>
            </div>
          
        }
        
        
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Course Duration</p>
            <p className="text-sm text-muted-foreground">{duration}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <BarChart className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Course Level</p>
            <p className="text-sm text-muted-foreground">{level}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Students Enrolled</p>
            <p className="text-sm text-muted-foreground">{studentsEnrolled.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Language</p>
            <p className="text-sm text-muted-foreground">{language}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-4">
        <h3 className="font-medium">This course includes:</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-black" />
            <span className="text-sm">Lifetime access</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-black" />
            <span className="text-sm">Free exercises file & downloadable resources</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-black" />
            <span className="text-sm">Shareable certificate of completion</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-black" />
            <span className="text-sm">Access on mobile, tablet and TV</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-black" />
            <span className="text-sm">English subtitles</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-black" />
            <span className="text-sm">100% online course</span>
          </li>
        </ul>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="font-medium">Share this course:</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <span className="sr-only">Share on Facebook</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-facebook"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <span className="sr-only">Share on Twitter</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-twitter"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <span className="sr-only">Share via Email</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <span className="sr-only">Share on WhatsApp</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-message-circle"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <span className="sr-only">Copy link</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-link"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </Button>
        </div>
      </div>

    </div>
  )
}