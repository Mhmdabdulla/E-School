

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog"
import { CheckCircle, XCircle } from "lucide-react"

interface ApplicationReviewDialogProps {
  application: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onApprove: (application: any) => void
  onReject: () => void
}

export function ApplicationReviewDialog({
  application,
  open,
  onOpenChange,
  onApprove,
  onReject,
}: ApplicationReviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Review Instructor Application</DialogTitle>
          <DialogDescription>Review the details of this instructor application.</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Avatar className="h-16 w-16">
              <AvatarImage src={application.userId.profileImageUrl} alt={application.userId.name} />
              <AvatarFallback>
                {application.userId.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{application.userId.name}</h3>
              <p className="text-sm text-muted-foreground">{application.userId.email}</p>
              <div className="mt-1">
                <Badge
                  variant={
                    application.adminApproval.status === "approved"
                      ? "default"
                      : application.status === "rejected"
                        ? "destructive"
                        : "outline"
                  }
                >
                  {application.adminApproval.status.charAt(0).toUpperCase() + application.adminApproval.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Qualification</h4>
              <p className="text-sm">{application.education.highestDegree}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Expertise</h4>
              {application.preferredSubjects.map((subject:any) => (
                    <p>{subject}</p>
                  ))}
              {/* <p className="text-sm">{application.preferredSubjects[0]}</p> */}
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Language</h4>
              {application.teachingLanguages.map((language:any) => (
                    <p>{language}</p>
                  ))}
              {/* <p className="text-sm">{application.teachingLanguages[0]}</p> */}
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Submitted Date</h4>
              <p className="text-sm">{new Date(application.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">skills</h4>
            {application.skills.map((skill:any) => (
              <p className="text-sm">
              {skill}
              </p>
            ))}
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">About</h4>
            <p className="text-sm">
              {application.bio ||
                "I am passionate about teaching and sharing my knowledge with others. I have extensive experience in my field and have worked with various companies on significant projects. I believe I can provide valuable insights and practical knowledge to students on this platform."}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Teaching Experience</h4>
            <p className="text-sm">
              {application.experience ||
                "I have taught several workshops and online courses. I've mentored junior professionals and have received positive feedback on my teaching style and ability to explain complex concepts in simple terms."}
            </p>
          </div>
          <div>
            <p>id card</p>
            <img className="w-30" src={application.idCardImageUrl}></img>
          </div>

          {application.adminApproval.status === "rejected" && application.adminApproval.reason && (
            <div>
              <h4 className="text-sm font-medium text-red-500">Rejection Reason</h4>
              <p className="text-sm">{application.adminApproval.reason}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {application.adminApproval.status === "pending" && (
            <>
              <Button variant="outline" className="text-red-500" onClick={onReject}>
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button variant="default" onClick={() => onApprove(application._id)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}