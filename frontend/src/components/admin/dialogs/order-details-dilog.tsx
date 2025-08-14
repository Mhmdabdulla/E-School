import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {type IOrder } from "../../../types/order";
import {type IUser } from "../../../types/user";
import {type Course } from "../../../types/course";

interface OrderDetailsDialogProps {
  order: IOrder & { userId: IUser; courseIds: Course[] };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDialog({ order, open, onOpenChange }: OrderDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription> Detailed order summary including student info, enrolled courses, payment details, and status tracking.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={order.userId.profileImageUrl} />
              <AvatarFallback>
                {order.userId.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{order.userId.name}</p>
              <p className="text-sm text-muted-foreground">{order.userId.email}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium">Courses:</h4>
            <ul className="list-disc list-inside text-sm">
              {order.courseIds.map((course) => (
                <li key={course._id}>{course.title}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between text-sm">
            <p>
              <span className="font-medium">Total:</span> ₹{order.totalAmount.toFixed(2)}
            </p>
            <Badge variant={order.status === "Paid" ? "default" : "destructive"}>
              {order.status}
            </Badge>
          </div>

          <div className="text-sm text-muted-foreground">
            Ordered on: {new Date(order.createdAt).toLocaleDateString()}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}