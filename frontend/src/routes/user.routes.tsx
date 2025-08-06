import { Navigate, Route } from "react-router-dom";
import ProtectedRoute from "../components/hoc/protected-routes";
import { UserRole } from "../lib/constants/role";
import InstructorApply from "../pages/user/InstructorApply";
import BecomeInstructorPage from "../pages/user/BecomeInstructor";
import UserProfile from "../pages/user/UserProfilet";
import UserDashboard from "../components/user/dashboard/dashboard-page"
import AccountSettings from "../components/user/profile/account-settings";
import UserCourses from "../components/user/enrolled-courses/enrolled-courses-page"
import WatchCoursePage from "../components/user/watch-course/watch-course-page"
import PaymentSuccess from "../components/common/PaymentSuccess";
import PaymentFailed from "../components/common/PaymentFailed";
import { InstructorsPage } from "../components/user/instructors/instructor-page";
import PurchaseHistoryContent from "../components/user/purchase-history/purchase-history-content";

export const userRoutes = (
    <>
    <Route element={<ProtectedRoute role={[UserRole.USER]} />}>
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/be-instructor" element={<BecomeInstructorPage />} />
      <Route path="/be-instructor/apply" element={<InstructorApply/>} />
      <Route path="/courses/watch/:courseId" element={<WatchCoursePage />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-cancel" element={<PaymentFailed />} />

      <Route path="/user" element={<UserProfile />}>
    <Route index element={<Navigate to="dashboard" />} />
    <Route path="dashboard" element={<UserDashboard />} />
    <Route path="settings" element={<AccountSettings />} />
    <Route path="courses" element={<UserCourses />} />
    <Route path="instructors" element={<InstructorsPage/>}/>
    <Route path="purchase-history" element={<PurchaseHistoryContent />} />
    {/* <Route path="messages" element={<MessagingPage />} /> */}
    {/* <Route path="messages/:chatId" element={<MessagingPage />} /> */}
    {/* <Route path="certificates" element={<CertificatesPage/>}/> */}
  </Route>
    </Route>
    </>
)