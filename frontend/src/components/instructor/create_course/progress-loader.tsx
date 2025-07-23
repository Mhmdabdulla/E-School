import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "../../ui/dialog";
  import { Button } from "../../ui/button";
  import { Loader2, CheckCircle, XCircle } from "lucide-react";
  
  export type ProgressStep = {
    message: string;
    status: "pending" | "success" | "error";
  };
  
  type ProgressLoaderModalProps = {
    title?: string;
    description?: string;
    steps: ProgressStep[];
    open: boolean;
    onDone?: () => void;
  };
  
  const ProgressLoaderModal = ({
    title = "Publishing...",
    description,
    steps,
    open,
    onDone,
  }: ProgressLoaderModalProps) => {
    const isComplete = steps.length > 0 && steps.every((step) => step.status === "success");
  
    return (
      <Dialog open={open}>
        <DialogContent className="max-w-md sm:rounded-lg pointer-events-none select-none [&>button:last-child]:hidden">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
  
          <div className="mt-4 space-y-3">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                {step.status === "pending" && (
                  <Loader2 className="w-4 h-4 mt-0.5 animate-spin" />
                )}
                {step.status === "success" && (
                  <CheckCircle className="w-4 h-4 mt-0.5" />
                )}
                {step.status === "error" && (
                  <XCircle className="w-4 h-4 mt-0.5" />
                )}
                <span>{step.message}</span>
              </div>
            ))}
          </div>
  
          {isComplete && (
            <div className="mt-6 flex justify-end">
              <Button onClick={onDone} className="pointer-events-auto">
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ProgressLoaderModal;
  