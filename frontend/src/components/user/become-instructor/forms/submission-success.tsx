import { Check } from "lucide-react"
import { Button } from "../../../ui/button"
import { Card } from "../../../ui/card"

interface SubmissionSuccessProps {
  onReset: () => void
}

const SubmissionSuccess = ({ onReset }: SubmissionSuccessProps) => {
  return (
    <div className="px-[200px]">
    <Card className="p-8  text-center">
      
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <Check className="h-6 w-6 text-green-600" />
      </div>
      <h2 className="mb-2 text-2xl font-semibold">Application Submitted</h2>
      <p className="mb-2 text-muted-foreground text-sm">
        Thank you for applying to become a tutor. We will review your application and get back to you soon.
      </p>
      <div className="flex items-center justify-center">
      <Button onClick={onReset}>Go to home</Button>
      </div>
    </Card>
    </div>
  )
}

export default SubmissionSuccess