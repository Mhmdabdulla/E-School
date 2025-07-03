import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import OtpVerification from "../user/login/otp-verification";

interface OtpVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  length?: number;
  initialTimerSeconds?: number;
}

export default function OtpVerificationDialog({
  open,
  onOpenChange,
  email,
  length = 6,
  initialTimerSeconds = 120,
}: OtpVerificationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[450px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>OTP Verification</DialogTitle>
          <DialogDescription>
            Enter the code sent to <span className="font-semibold">{email}</span>.
          </DialogDescription>
        </DialogHeader>

        <OtpVerification
          email={email}
          length={length}
          initialTimerSeconds={initialTimerSeconds}
        />
      </DialogContent>
    </Dialog>
  );
}
