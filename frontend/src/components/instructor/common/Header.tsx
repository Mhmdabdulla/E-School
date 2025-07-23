import { useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Input } from "../../ui/input"
// import ThemeToggle from "../../common/ThemeToggler"

const PageHeader = () => {
  const location = useLocation()

  const getPageTitle = () => {
    if (location.pathname === "/") return "Dashboard"
    if (location.pathname.includes("/create-course")) return "Create a new course"
    if (location.pathname.includes("/my-courses")) return "My Courses"
    if (location.pathname.includes("/earning")) return "Earning"
    if (location.pathname.includes("/message")) return "Message"
    if (location.pathname.includes("/settings")) return "Settings"
    return "Dashboard"
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
      <div className="flex flex-1 items-center gap-4">
        <div>
          <h1 className="text-xl font-bold hidden md:block md:pl-10">{getPageTitle()}</h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Input
            type="search"
            placeholder="Search"
            className="h-9 w-64 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:ring-1 "
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
        <div className="relative">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              3
            </span>
          </button>
        </div>
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </div>
      {/* <ThemeToggle/> */}
    </header>
  )
}

export default PageHeader