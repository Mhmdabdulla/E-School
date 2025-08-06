import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "../../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"

interface CourseFilterProps{
    setSearchQuery: (value: string) => void,
    filter: string,
    setFilter: (value:string) => void
}
export default function CoursesFilters({setFilter,setSearchQuery,filter}:CourseFilterProps) {
  const [search, setSearch] = useState("")

  useEffect(()=> {
    const debouce = setTimeout(()=>{
        setSearchQuery(search)
    },500)

    return ()=> clearTimeout(debouce)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search])
  
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="relative">
        <p className="mb-2 text-sm text-gray-500">Search:</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search in your courses..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-500">Filter</p>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="not-started">Not Started</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}