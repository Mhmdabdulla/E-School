import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { useState } from "react"

interface RejectionDialogProps {
  application: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onReject: (application: any, reason: string) => void
}

export function RejectionDialog({ application, open, onOpenChange, onReject }: RejectionDialogProps) {
  const [reason, setReason] = useState("")
  const [error, setError] = useState("")

  const handleReject = () => {
    if (!reason.trim()) {
      setError("Please provide a reason for rejection")
      return
    }

    onReject(application._id, reason)
    setReason("")
    setError("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reject Application</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this application. This will be shared with the applicant.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rejection-reason">Rejection Reason</Label>
            <Textarea
              id="rejection-reason"
              placeholder="Please explain why this application is being rejected..."
              value={reason}
              onChange={(e) => {
                setReason(e.target.value)
                if (e.target.value.trim()) {
                  setError("")
                }
              }}
              className="min-h-[100px]"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleReject}>
            Reject Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}