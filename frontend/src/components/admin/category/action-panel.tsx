import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/DropDownMenu";
import { Input } from "../../ui/input";
import { Filter, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

interface ActionPanelProps {
  setIsCreateDialogOpen: (open: boolean) => void;
  setSearchQuery: (value: string) => void;
  setStatusFilter: (value: string | null) => void;
}
const ActionPanel = ({ setIsCreateDialogOpen, setSearchQuery, setStatusFilter }: ActionPanelProps) => {
    const [search, setSearch] = useState<string>("")

    useEffect(()=> {
        const debounce = setTimeout(()=>{
            setSearchQuery(search)
        }, 500)

        return ()=> clearTimeout(debounce)
    })
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search categories..."
          className="w-full pl-8 sm:w-[300px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setStatusFilter(null)}>All</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatusFilter("active")}>Listed</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>Unlisted</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button onClick={() => setIsCreateDialogOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Category
      </Button>
    </div>
  );
};

export default ActionPanel;