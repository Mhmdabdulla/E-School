
import { cn } from "../../../lib/utils/className"

interface CourseTabsProps {
  activeTab: "overview" | "curriculum" | "instructor" | "review"
  onTabChange: (tab: "overview" | "curriculum" | "instructor" | "review") => void
}

export default function CourseTabs({ activeTab, onTabChange }: CourseTabsProps) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "instructor", label: "Instructor" },
    { id: "review", label: "Review" },
  ] as const

  return (
    <div className="border-b">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative pb-4 text-sm font-medium transition-colors hover:text-foreground",
              activeTab === tab.id
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-black"
                : "text-muted-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}