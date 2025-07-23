import type React from "react"
import { CheckCircle } from "lucide-react"
import { cn } from "../../../../lib/utils/className"

interface StepItemProps {
  icon: React.ReactNode
  title: string
  isActive: boolean
  isCompleted: boolean
  progress?: string
}

const  StepItem = ({ icon, title, isActive, isCompleted, progress }: StepItemProps) => {
  return (
    <div
      className={cn(
        "flex h-5 items-center gap-3 p-4 flex-1 border-b md:border-b-0 md:border-r last:border-0",
        isActive ? "" : "",
      )}
    >
      <div
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded-full",
          isCompleted
            ? "bg-green-500 text-white"
            : isActive
              ? "bg-primary text-primary-foreground"
              : "bg-gray-100 text-gray-500",
        )}
      >
        {isCompleted ? <CheckCircle className="h-3 w-3" /> : icon}
      </div>
      <div className="flex-1">
        <h3
          className={cn(
            "text-sm font-medium hidden md:block",
            isCompleted ? "text-green-500" : isActive ? "text-primary" : "text-gray-500",
          )}
        >
          {title}
        </h3>
        {progress && <p className="text-xs text-muted-foreground">{progress}</p>}
      </div>
    </div>
  )
}


export default StepItem