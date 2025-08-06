import { Button } from "../ui/button"
import { CheckCircle2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Header from "../user/home/Header"

export default function PaymentSuccess() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
    <Header/>
    <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
      <CheckCircle2 className="text-green-600 w-16 h-16 mb-4" />
      <h1 className="text-2xl sm:text-3xl font-semibold text-green-700 mb-2">
        Payment Successful!
      </h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Your purchase has been completed. You now have access to your course materials.
      </p>
      <div className="flex gap-3">
        <Button onClick={() => navigate("/user/courses")} >
          Go to My Courses
        </Button>
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </div>
    </div>
  )
}