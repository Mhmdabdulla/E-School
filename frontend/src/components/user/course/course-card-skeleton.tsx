import { Skeleton } from "../../ui/skeleton"

export function CourseCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border">
      <Skeleton className="aspect-video w-full" />
      <div className="p-4">
        <Skeleton className="mb-2 h-5 w-16" />
        <Skeleton className="mb-2 h-5 w-full" />
        <Skeleton className="mb-2 h-5 w-3/4" />
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-12" />
        </div>
      </div>
    </div>
  )
}