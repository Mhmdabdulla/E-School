import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet'
import { Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MobileSidebar } from './MobileSidebar'

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-2 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 pt-10">
            <MobileSidebar />
          </SheetContent>
        </Sheet>
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="hidden md:inline-block">E-School Admin</span>
        </Link>
      </div>
      <div className="hidden flex-1 md:flex md:max-w-md md:px-6">
        <div className="relative w-full">
          {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
          {/* <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
          /> */}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
          {isSearchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          <span className="sr-only">Toggle search</span>
        </Button>
        {isSearchOpen && (
          <div className="absolute inset-x-0 top-16 z-40 border-b bg-background p-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full bg-background pl-8" />
            </div>
          </div>
        )}
        {/* <NotificationPopover />
        <UserNav /> */}
      </div>
    </header>
  )
}

export default Navbar