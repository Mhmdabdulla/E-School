import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils/className";
import { userLogout } from "../../../services/authServices";
import {
  BarChart3,
  Book,
  BookOpen,
  ChartBarStacked,
  DollarSign,
  GraduationCap,
  LogOutIcon,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
    title: "Instructors",
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
  // {
  //   title: "Offers",
  //   href: "/admin/offers",
  //   icon: Tag,
  // },
  {
    title: "Applications",
    href: "/admin/applications",
    icon: Book,
  },
  {
    title: "Category",
    href: "/admin/categories",
    icon: ChartBarStacked,
  },
  {
    title: "Payouts",
    href: "/admin/payouts",
    icon: DollarSign,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const response = await userLogout(dispatch);
    if (response.status === 200) {
      localStorage.clear();
      navigate("/admin/login");
    }
  };
  return (
    <div className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r bg-background pt-16 md:flex">
      <div className="flex flex-1 flex-col space-y-1 p-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              location.pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "transparent"
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
      <div className="p-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;