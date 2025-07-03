import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "../../../lib/utils/className";
import { resendOtp, verifyOtp } from "../../../services/authServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface OtpVerificationProps {
  length?: number;
  onVerify?: (otp: string) => Promise<boolean>;
  onResend?: () => Promise<void>;
  initialTimerSeconds?: number;
  email?: string;
}

export default function OtpVerification({
  length = 6,
  initialTimerSeconds = 300,
  email = "example@email.com",
}: OtpVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [activeInput, setActiveInput] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(initialTimerSeconds);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resendLoading, setResendLoading] = useState<boolean>(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const dispactch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsResendDisabled(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
  inputRefs.current[0]?.focus();
}, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (!/^\d+$/.test(pastedData)) return;

    const pastedOtp = pastedData.slice(0, length).split("");
    const newOtp = [...otp];

    pastedOtp.forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const lastFilledIndex = Math.min(pastedOtp.length - 1, length - 1);
    setActiveInput(lastFilledIndex);
    inputRefs.current[lastFilledIndex]?.focus();
  };


  const handleResend = async () => {
    try {
      setResendLoading(true)
      const response = await resendOtp(email);
      if(response?.status === 200){
      setTimeLeft(initialTimerSeconds);
      setIsResendDisabled(true);
      setVerificationStatus("idle");
      setOtp(Array(length).fill(""));
      setActiveInput(0);
      inputRefs.current[0]?.focus();
      }else{
      toast.error("error while resending otp. please try again")
      }
    } catch (error) {
      toast.error(error as string || "error while resending otp. please try again")
      console.error("Error resending OTP:", error);
    }finally{
      setResendLoading(false)
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");

    if (otpString.length !== length) {
      setVerificationStatus("error");
      setErrorMessage("Please enter all digits");
      return;
    }

    setIsVerifying(true);

    try {

      const response = await verifyOtp(email, otpString, dispactch)

      if (response.status === 200) {
          navigate("/")
      } else {
      setVerificationStatus("error");
      setErrorMessage(response.data.message || "Incorrect otp");
        toast.error(response.data.message || "Incorrect otp", 
          {
            position:"top-right",
            style:{
              color:"red"
            }
          },
          
        )
      }
    } catch (error) {
      setVerificationStatus("error");
      setErrorMessage("Verification failed");
      console.error("Error verifying OTP:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-[400px] py-5 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Verification</h2>
        <p className="text-muted-foreground">
          We've sent a verification code to{" "}
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            {Array.from({ length }).map((_, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                onFocus={() => setActiveInput(index)}
                className={cn(
                  "w-[43px] h-[43px] sm:w-14 sm:h-14 text-center text-xl font-semibold",
                  activeInput === index && "border-[#000000]",
                  verificationStatus === "error" && "border-red-500"
                )}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          {verificationStatus === "error" && (
            <div className="flex items-center justify-center text-red-500 gap-1">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{errorMessage}</span>
            </div>
          )}

          {verificationStatus === "success" && (
            <div className="flex items-center justify-center text-green-500 gap-1">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm">Verification successful</span>
            </div>
          )}

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Time remaining:{" "}
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </p>
          </div>
        </div>

        <div className="space-y-4 px-2">
          <Button
            onClick={handleVerify}
            disabled={isVerifying || verificationStatus === "success"}
            className="hover:cursor-pointer w-full"
          >
            {isVerifying ?
            (
              <div className="flex items-center justify-center gap-1">
                <div className="h-4 w-4 border-2 border-t-transparent rounded-full animate-spin mr-2"></div>
                Verifying...
              </div>
            )
            : "Verify Code"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="text-center">
            <p className="text-sm">
              Didn't receive the code?{" "}
              <Button
                variant="link"
                onClick={handleResend}
                disabled={isResendDisabled || resendLoading}
                className={cn(
                  "h-auto text-[#ff7a59]",
                  isResendDisabled && "text-muted-foreground cursor-not-allowed"
                )}
              >
                {
                  resendLoading ? "Resending..." : "Resend"
                }
                
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}