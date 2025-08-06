import { Search } from "lucide-react"
import { Input } from "../../ui/input"
import { useEffect, useState } from "react"

interface InstructorsHeaderProps {
  count: number
  setSearchQuery:(val: string) => void
}

export function InstructorsHeader({ count, setSearchQuery }: InstructorsHeaderProps) {
    const [search, setSearch] = useState<string>("")

    useEffect(() => {
        const debounce = setTimeout(()=>{
            setSearchQuery(search)
        }, 500)

        return ()=> clearTimeout(debounce)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-6">
        Instructors <span className="text-gray-500">({count})</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <p className="text-sm mb-2">Search:</p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
            value={search}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setSearch(e.target.value)}
              type="text"
              placeholder="Search in your teachers..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </div>
    </div>
  )
}