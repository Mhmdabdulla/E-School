import { Route } from "react-router-dom";
import ProtectedRoute from "../components/hoc/protected-routes";
import { UserRole } from "../lib/constants/role";
import CreateCoursePage from "../pages/instructor/CreateCoursePage";
import InstructorDashboardPage from "../pages/instructor/InstructorDashboardPage";
import { AccountSettingsPage } from "../components/instructor/account-settings/account-settings-page";
import CoursesPage from "../pages/instructor/CoursePage";
import SingleCoursePage from "../pages/instructor/CourseDetails";
import EditCoursePage from "../pages/instructor/EditCoursePage";


export const instructorRoutes = (
  <Route element={<ProtectedRoute role={[UserRole.INSTRUCTOR]} />}>
    <Route path="/instructor/dashboard" element={<InstructorDashboardPage />} />
    <Route path="/instructor/create-course" element={<CreateCoursePage />} />
    <Route path="/instructor/settings" element={<AccountSettingsPage/>}/>
    <Route path="/instructor/my-courses" element={<CoursesPage />} />
    <Route path="/instructor/my-courses/:courseId" element={<SingleCoursePage />} />
    <Route path="/instructor/my-courses/:courseId/edit" element={< EditCoursePage/>} />
    {/* <Route path="/instructor/messages" element={<InstructorMessagesPage />} />
    <Route path="/instructor/earnings" element={<EarningsPage/>}/> */}
    {/* <Route path="/instructor/messages/:chatId" element={<InstructorMessagesPage />} /> */}
  </Route>
);