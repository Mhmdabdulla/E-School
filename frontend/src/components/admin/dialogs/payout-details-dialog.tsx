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
import {type IPayoutRequest } from "../../../types/PayoutRequest";
import { format } from "date-fns";

interface PayoutRequestDetailsDialogProps {
  request: IPayoutRequest & { instructorId: { name: string; email: string } };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PayoutRequestDetailsDialog({
  request,
  open,
  onOpenChange,
}: PayoutRequestDetailsDialogProps) {
  const {
    instructorId,
    amount,
    method,
    status,
    requestedAt,
    resolvedAt,
    adminNote,
    upiId,
    bankAccountNumber,
    ifsc,
    bankName,
    accountHolderName,
    paypalEmail,
  } = request;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Payout Request Details</DialogTitle>
          <DialogDescription>
            Review instructor's payout request including amount, payment method, status, and notes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium">Instructor</p>
            <p>{instructorId.name}</p>
            <p className="text-muted-foreground">{instructorId.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Amount</p>
              <p>₹{amount.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-medium">Method</p>
              <p className="capitalize">{method}</p>
            </div>
            <div>
              <p className="font-medium">Requested At</p>
              <p>{format(new Date(requestedAt), "PPP")}</p>
            </div>
            {resolvedAt && (
              <div>
                <p className="font-medium">Resolved At</p>
                <p>{format(new Date(resolvedAt), "PPP")}</p>
              </div>
            )}
            <div>
              <p className="font-medium">Status</p>
              <Badge
                variant={
                  status === "approved"
                    ? "default"
                    : status === "rejected"
                    ? "destructive"
                    : "secondary"
                }
              >
                {status}
              </Badge>
            </div>
          </div>

          {/* Dynamic Payment Info */}
          {method === "upi" && upiId && (
            <div>
              <p className="font-medium">UPI ID</p>
              <p>{upiId}</p>
            </div>
          )}

          {method === "paypal" && paypalEmail && (
            <div>
              <p className="font-medium">PayPal Email</p>
              <p>{paypalEmail}</p>
            </div>
          )}

          {method === "bank" && (
            <div className="grid grid-cols-2 gap-4">
              {accountHolderName && (
                <div>
                  <p className="font-medium">Account Holder</p>
                  <p>{accountHolderName}</p>
                </div>
              )}
              {bankAccountNumber && (
                <div>
                  <p className="font-medium">Account Number</p>
                  <p>{bankAccountNumber}</p>
                </div>
              )}
              {ifsc && (
                <div>
                  <p className="font-medium">IFSC Code</p>
                  <p>{ifsc}</p>
                </div>
              )}
              {bankName && (
                <div>
                  <p className="font-medium">Bank Name</p>
                  <p>{bankName}</p>
                </div>
              )}
            </div>
          )}

          {adminNote && (
            <div>
              <p className="font-medium">Admin Note</p>
              <p className="text-muted-foreground">{adminNote}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}