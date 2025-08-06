import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../ui/dialog"
import { type Course } from "../../../types/course"
import { type IOrder } from "../../../types/order"
import { formatDate } from "../../../lib/utils/formatDate"
import { Star, Download, CreditCard, Calendar, User } from "lucide-react"

interface PurchaseDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  course: Course | null
  order: IOrder
}

export default function PurchaseDetailsDialog({
  isOpen,
  onClose,
  course,
  order,
}: PurchaseDetailsDialogProps) {
  if (!course) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative h-32 w-full sm:w-48 flex-shrink-0">
              <img
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                className="object-cover rounded-md"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center mb-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 text-sm font-medium">{course.rating}</span>
                <span className="ml-1 text-xs text-gray-500">({course.enrollmentCount} Review)</span>
              </div>

              <h3 className="text-base font-medium text-gray-900 mb-1">{course.title}</h3>
              <div className="text-sm text-gray-500 mb-2">
                Course by: {typeof course.instructorId === "object" && "name" in course.instructorId ? course.instructorId.name : course.instructorId}
              </div>
              <div className="text-lg font-medium text-[#ff6b38]">${Number(course.price).toFixed(2)}</div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Payment Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{formatDate(order.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{"Credit Card"}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{"23423"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Expires: {"12/12/25"}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Order Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Original Price:</span>
                <span className="text-sm">${((Number(course.price) || 0) * 1.2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Discount:</span>
                <span className="text-sm text-green-600">-${(Number(course.price) * 0.2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>${Number(course.price).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="sm:w-auto w-full">
            Close
          </Button>
          <Button className="bg-black hover:bg-gray-800 sm:w-auto w-full">
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}