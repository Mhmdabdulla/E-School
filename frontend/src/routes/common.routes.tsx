import { Route } from "react-router-dom";
import Home from "../pages/user/Home";
import Login from "../pages/user/LoginPage";
import ProtectedRoute from "../components/hoc/protected-routes";
import { UserRole } from "../lib/constants/role";
import UserCoursesPage from "../pages/user/CorsePage";
import UserCourseDetailsPage from "../pages/user/CourseDetails";

export const commonRoutes = (
    <>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />} />

    <Route element={<ProtectedRoute role={[UserRole.USER, UserRole.INSTRUCTOR]} />}>
      <Route path="/courses" element={<UserCoursesPage />} />
      <Route path="/courses/:courseId" element={<UserCourseDetailsPage />} />
      {/* <Route path="/cart" element={<CartPage />} /> */}
      {/* <Route path="/wishlist" element={<WishlistPage />} /> */}
    </Route>
    </>
    
);