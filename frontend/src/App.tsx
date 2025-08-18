import { BrowserRouter, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { refreshToken } from "./services/authServices";
import { useDispatch } from "react-redux";
import { commonRoutes } from "./routes/common.routes";
import { userRoutes } from "./routes/user.routes";
import { adminRoutes } from "./routes/admin.routes";
import { instructorRoutes } from "./routes/instructor.routes";
import { useAppDispatch } from "./redux/store";
import { fetchCartItems } from "./redux/thunks/cartThunk";
import { fetchChats } from "./redux/thunks/chatThunk";
import { fetchNotificationsThunk } from "./redux/thunks/notificationThunk";
import { fetchInstructor } from "./redux/thunks/instructorThunk";
import { SocketProvider } from "./redux/socketProvider";

function App() {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const user = await refreshToken(dispatch);
        if (user?.role !== "admin") {
          appDispatch(fetchCartItems());
          appDispatch(fetchChats());
          appDispatch(fetchNotificationsThunk());
        }

        if (user?.role === "instructor") {
          appDispatch(fetchInstructor(user._id));
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (loading) return <div />;

  return (
    <>
      <BrowserRouter>
        <Toaster richColors position="top-right" />
        <SocketProvider>
        <Routes>
          {commonRoutes}
          {userRoutes}
          {adminRoutes}
          {instructorRoutes}
        </Routes>
        </SocketProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
