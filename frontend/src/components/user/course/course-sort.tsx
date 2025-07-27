import { Button } from "../../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/DropDownMenu"
import { ChevronDown } from "lucide-react"

const sortOptions = [
  { label: "Trending", value: "trending" },
  { label: "Most Popular", value: "popular" },
  { label: "Highest Rated", value: "rating" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
]

 interface CourseSortProps {
  sortBy:string
  setSortBy: (value: string) => void
 }
export function CourseSort({sortBy, setSortBy}:CourseSortProps) {
  // const [selectedSort, setSelectedSort] = useState(sortOptions[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"sm"} className="w-[160px] justify-between">
          <span>Sort by: {sortBy}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setSortBy(option.value)}
            // className={selectedSort.value === option.value ? "bg-muted" : ""}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}