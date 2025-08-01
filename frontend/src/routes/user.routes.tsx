import { Navigate, Route } from "react-router-dom";
import ProtectedRoute from "../components/hoc/protected-routes";
import { UserRole } from "../lib/constants/role";
import InstructorApply from "../pages/user/InstructorApply";
import BecomeInstructorPage from "../pages/user/BecomeInstructor";
import UserProfile from "../pages/user/UserProfilet";
import UserDashboard from "../components/user/dashboard/dashboard-page"
import AccountSettings from "../components/user/profile/account-settings";

export const userRoutes = (
    <>
    <Route element={<ProtectedRoute role={[UserRole.USER]} />}>
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/be-instructor" element={<BecomeInstructorPage />} />
      <Route path="/be-instructor/apply" element={<InstructorApply/>} />

      <Route path="/user" element={<UserProfile />}>
    <Route index element={<Navigate to="dashboard" />} />
    <Route path="dashboard" element={<UserDashboard />} />
    <Route path="settings" element={<AccountSettings />} />
    {/* <Route path="courses" element={<UserCourses />} /> */}
    {/* <Route path="messages" element={<MessagingPage />} /> */}
    {/* <Route path="messages/:chatId" element={<MessagingPage />} /> */}
    {/* <Route path="purchase-history" element={<PurchaseHistoryContent />} /> */}
    {/* <Route path="instructors" element={<InstructorsPage/>}/> */}
    {/* <Route path="certificates" element={<CertificatesPage/>}/> */}
  </Route>
    </Route>
    </>
)