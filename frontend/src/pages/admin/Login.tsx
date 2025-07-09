import LoginForm from "../../components/admin/login/LoginForm"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const user = useSelector((state:any) => state.auth.user)
    const isAdmin = localStorage.getItem("adminLoggedIn")
    const navigate = useNavigate()
    useEffect(()=>{
        if(user && isAdmin === 'true'){
            navigate('/admin/dashboard')
        }
    },[])
  return (
    <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 lg:flex dark:border-r">
            <div className="absolute inset-0 " />
            <div className="relative z-20 flex items-center text-lg font-medium">
              ESchool Admin
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;This LMS platform has transformed how we deliver educational content to our students. The admin
                  dashboard makes management a breeze.&rdquo;
                </p>
                <footer className="text-sm">Sofia Davis</footer>
              </blockquote>
            </div>
          </div>
            <LoginForm/>
        </div>
  )
}

export default LoginPage