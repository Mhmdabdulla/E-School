import { BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import { Toaster } from 'sonner'
import { useEffect, useState } from 'react'
import { refreshToken } from './services/authServices'
import { useDispatch } from 'react-redux'
import { commonRoutes } from './routes/common.routes'
import { userRoutes } from './routes/user.routes'
import { adminRoutes } from './routes/admin.routes'
import { instructorRoutes } from './routes/instructor.routes'

function App() {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
         await refreshToken(dispatch);

      } finally {
        setLoading(false);
      }
    };
    init();
  }, [dispatch]);

  if (loading) return <div />;

  return (
    <>
    <BrowserRouter>
    <Toaster richColors position="top-right" />
    <Routes>
      {commonRoutes}
      {userRoutes}
      {adminRoutes}
      {instructorRoutes}
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
