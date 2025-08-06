import { Button } from "../ui/button"
import { XCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Header from "../user/home/Header"


export default function PaymentFailed() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
    <Header/>
    <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
      <XCircle className="text-red-600 w-16 h-16 mb-4" />
      <h1 className="text-2xl sm:text-3xl font-semibold text-red-700 mb-2">
        Payment Failed
      </h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Something went wrong during the payment process. Please try again or contact support if the issue persists.
      </p>
      <div className="flex gap-3">
        <Button onClick={() => navigate("/cart")}>
          Try Again
        </Button>
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </div>
</div>
  )
}