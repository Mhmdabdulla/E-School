import React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "../../ui/button"
import { ScrollArea } from "../../ui/scroll-area"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (href: string) => {
    if (window.innerWidth < 1024) {
      setOpen(false)
    }
    setTimeout(() => {
      navigate(href)
    }, 10)
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {!open && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-50 lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col  transition-transform duration-300 ease-in-out lg:static lg:translate-x-0  ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-300 px-6 ">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            E-SCHOOL
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-black lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-3 px-2">
            <NavItem
              href="/instructor/dashboard"
              icon={<LayoutDashboard className="h-4 w-4" />}
              active={location.pathname === "/instructor/dashboard"}
              onClick={() => handleNavigation("/instructor/dashboard")}
            >
              Dashboard
            </NavItem>
            <NavItem
              href="/instructor/create-course"
              icon={<PlusCircle className="h-4 w-4" />}
              active={location.pathname.includes("/instructor/create-course")}
              onClick={() => handleNavigation("/instructor/create-course")}
            >
              Create New Course
            </NavItem>
            <NavItem
              href="/instructor/my-courses"
              icon={<BookOpen className="h-4 w-4" />}
              active={location.pathname.includes("/instructor/my-courses")}
              onClick={() => handleNavigation("/instructor/my-courses")}
            >
              My Courses
            </NavItem>
            <NavItem
              href="/instructor/earnings"
              icon={<DollarSign className="h-4 w-4" />}
              active={location.pathname.includes("/instructor/earnings")}
              onClick={() => handleNavigation("/instructor/earnings")}
            >
              Earning
            </NavItem>
            <NavItem
              href="/instructor/messages"
              icon={<MessageSquare className="h-4 w-4" />}
              badge={1}
              active={location.pathname.includes("/instructor/messages")}
              onClick={() => handleNavigation("/instructor/messages")}
            >
              Message
            </NavItem>
            <NavItem
              href="/instructor/settings"
              icon={<Settings className="h-4 w-4" />}
              active={location.pathname.includes("/instructor/settings")}
              onClick={() => handleNavigation("/instructor/settings")}
            >
              Settings
            </NavItem>
          </nav>
        </ScrollArea>
        <div className="mt-auto border-t border-gray-300 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-black hover:bg-gray-100"
            onClick={() => {
              if (window.innerWidth < 1024) {
                setOpen(false)
              }
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign-out
          </Button>
        </div>
      </div>
    </>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  active?: boolean
  badge?: number
  onClick?: () => void
}

function NavItem({ icon, children, active, badge, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors text-left ${active ? 'bg-gray-200 text-black font-medium' : 'text-gray-600 hover:text-black hover:bg-gray-100'}`}
    >
      {icon}
      <span>{children}</span>
      {badge && (
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {badge}
        </span>
      )}
    </button>
  )
}