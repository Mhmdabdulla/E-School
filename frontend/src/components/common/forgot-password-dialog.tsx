import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { forgotPassword } from "../../services/authServices"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../../components/ui/button"
import { Label } from "@radix-ui/react-label"

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordDialog() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true)
      const response = await forgotPassword(data.email) 
      toast.success(response.data.message, { position: "top-right" })
      reset()
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong",
        { position: "top-right" }
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-sm">
          Forgot Password?
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Forgot your password ?</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 py-4 text-center">
            Enter your registered email and we’ll send a link to reset your password.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="font-medium text-sm px-1">
              Registered Email
            </Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="Email"
              type="text"
              className="border rounded-md p-3 w-full "
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 rounded-md  "
            >
              {isLoading ? (
               <div className="flex items-center justify-center gap-1">
                <div className="h-4 w-4 border-2 border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending Link...
              </div>
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}