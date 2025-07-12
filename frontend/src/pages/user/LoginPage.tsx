import Header from "../../components/user/login/login-header"
import LoginForm from "../../components/user/login/login-form"
import SignupForm from "../../components/user/login/signup-form"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import ResetPasswordDialog from "../../components/common/reset-password-dialog"

const LoginPage = () => {
  const location = useLocation()
  const formState = location.state?.formState || "signIn"
  const [signState, setSignState] = useState<"signIn" | "signUp">(formState === "signIn" ? "signIn" : "signUp")
  const user = useSelector((state: any) => state.auth.user)
  const [loading, setLoading] = useState<boolean>(true)
  const isAdmin = localStorage.getItem("adminLoggedIn")
  const navigate = useNavigate()
  useEffect(() => {
    if (user && !isAdmin) {
      navigate("/")
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <div></div>
  }

  return (
    <div className="min-h-screen ">
      <Header signState={signState} setSignState={setSignState} />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="relative">
              <div className="absolute inset-0 opacity-20 -z-10 "></div>
              <div className="border rounded-2xl overflow-hidden">
                <div className="p-8">
                  <motion.div
                    key={signState}
                    initial={{ opacity: 0, x: signState === "signIn" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {signState === "signIn" ? <LoginForm /> : <SignupForm />}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 text-center"
          >
          </motion.div>
        </div>
      </div>
      <ResetPasswordDialog/>
    </div>
  )
}

export default LoginPage
