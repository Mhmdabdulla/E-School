import { Button } from "../../ui/button"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { useState } from "react"
import { googleLogin, registerUser } from "../../../services/authServices"
import type { AxiosResponse } from "axios"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { motion } from "framer-motion"
import OtpVerificationDialog from "../../common/otp-verification-dialog"


const passwordSchema = z
  .string()
  .trim()
  .superRefine((val, ctx) => {
    if (val.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 8,
        type: "string",
        inclusive: true,
        message: "Password must be at least 8 characters",
      })
    }

    if (!/[a-zA-Z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one letter",
      })
    }

    if (!/[0-9]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one number",
      })
    }

    if (!/[\W_]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one special character",
      })
    }

    if (!/[A-Z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one uppercase letter",
      })
    }

    if (/password|123456|qwerty|letmein/i.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password cannot contain common patterns",
      })
    }
  })

const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: passwordSchema,
  })
  
type FormData = z.infer<typeof formSchema>

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
    const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  // const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (data: FormData) => {
    if (loading) return
    setLoading(true)
    const { firstName, lastName, email, password } = data
    const response: AxiosResponse = await registerUser(`${firstName} ${lastName}`, email, password)
    setLoading(false)
    console.log('status = ',response.status)
    if (response.status === 201) {
      // const data = { email, time: 120, length: 6 }
      // navigate("/verify-otp", { state: data })
              setUserEmail(email);
        setShowOtpDialog(true);
    } else {
      console.log(response.data.error)
      toast.error(response.data.error, {
        position: "top-right",
        duration: 2000,
        style: {
          color: "red",
        },
      })
    }
  }

  return (
    <motion.div
      className="flex flex-1 flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center mb-6">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold text-black dark:text-white">Join Us Today!</h1>
          </motion.div>
        </div>

        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <motion.div
              className="space-y-2"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First name
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    className="pl-3 pr-3 py-2 rounded-lg border "
                    {...register("firstName")}
                    placeholder="First name..."
                  />
                  {errors.firstName && <p className="text-red-500 font-mono text-xs">{errors.firstName.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last name
                  </Label>
                  <Input
                    type="text"
                    id="lastName"
                    className="pl-3 pr-3 py-2 rounded-lg border "
                    {...register("lastName")}
                    placeholder="Last name..."
                  />
                  {errors.lastName && <p className="text-red-500 font-mono text-xs">{errors.lastName.message}</p>}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                type="text"
                id="email"
                className="pl-3 pr-3 py-2 rounded-lg border "
                {...register("email")}
                placeholder="Email address"
              />
              {errors.email && <p className="text-red-500 font-mono text-xs">{errors.email.message}</p>}
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  className="pl-3 pr-10 py-2 rounded-lg border "
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  {...register("password")}
                />

                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-0 top-0 h-full cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-red-500 font-mono text-xs">{errors.password.message}</p>}
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Button
                className="w-full mt-5 cursor-pointer bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all duration-300"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                 <div className="flex items-center justify-center gap-1">
                <div className="h-4 w-4 border-2 border-t-transparent rounded-full animate-spin mr-2"></div>
                Registering...
              </div>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </form>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-black text-cyan-50 px-2 text-muted-foreground">SIGN UP WITH</span>
          </div>
        </motion.div>

        <motion.div
          className="w-full"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Button
            variant="outline"
            className="w-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 border-gray-200 dark:border-gray-800"
            onClick={googleLogin}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            <span className="ml-2">Google</span>
          </Button>
        </motion.div>
        <OtpVerificationDialog
  open={showOtpDialog}
  onOpenChange={(open) => setShowOtpDialog(open)}
  email={userEmail}
/>

      </div>
    </motion.div>
  )
}

export default SignupForm