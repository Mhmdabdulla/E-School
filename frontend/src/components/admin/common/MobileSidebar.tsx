import { Link, useLocation } from "react-router-dom"
import { BarChart3, Users, GraduationCap, BookOpen, ShoppingCart, Tag, Settings, LogOut } from "lucide-react"

import { cn } from "../../../lib/utils/className"
import { Button } from "../../ui/button"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: BarChart3,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Tutors",
    href: "/admin/tutors",
    icon: GraduationCap,
  },
  {
    title: "Courses",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Purchases",
    href: "/admin/purchases",
    icon: ShoppingCart,
  },
  {
    title: "Offers",
    href: "/admin/offers",
    icon: Tag,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function MobileSidebar() {
  const location = useLocation()

  return (
    <div className="flex flex-col space-y-1 p-4">
      {sidebarItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            location.pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Link>
      ))}
      <Button variant="outline" className="w-full justify-start" asChild>
        <Link to="/login">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Link>
      </Button>
    </div>
  )
}