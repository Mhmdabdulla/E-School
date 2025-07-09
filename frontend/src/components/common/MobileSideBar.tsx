import type React from "react";
import { Link } from "react-router-dom";
import { X, LogOutIcon, Home, BookOpen, Info, Phone, ShoppingCart, Heart, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils/className";
import TutoriamLogo from "./ESchoolLogo";

interface MobileSidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  user: {
    name: string;
    profileImageUrl: string;
    role: string;
  } | null;
  isAdmin: boolean;
  cartCount: number;
  handleLogout: () => void;
  isActive: (path: string) => boolean;
}

export function MobileSidebar({
  sidebarOpen,
  toggleSidebar,
  user,
  isAdmin,
  cartCount,
  handleLogout,
  isActive,
}: MobileSidebarProps) {
  const mainNavItems = [
    { path: "/", label: "Home", icon: <Home className="w-4 h-4 mr-2" /> },
    { path: "/courses", label: "Courses", icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { path: "/about", label: "About", icon: <Info className="w-4 h-4 mr-2" /> },
    { path: "/contact", label: "Contact", icon: <Phone className="w-4 h-4 mr-2" /> },
  ];

  const secondaryNavItems = [
    {
      path: "/cart",
      label: "Cart",
      badge: cartCount > 0 ? cartCount : null,
      icon: <ShoppingCart className="w-4 h-4 mr-2" />,
    },
    {
      path: "/wishlist",
      label: "Wishlist",
      icon: <Heart className="w-4 h-4 mr-2" />,
    },
  ];

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 sm:hidden h-screen backdrop-blur-sm bg-black/50 dark:bg-black/60"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 w-[270px] h-screen z-60 sm:hidden bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200 dark:border-zinc-800">
                {user && !isAdmin ? (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-gray-300 dark:border-zinc-700">
                      <AvatarImage src={user.profileImageUrl || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-100 font-semibold">
                        {user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Hello,</p>
                      <p className="font-medium text-gray-900 dark:text-white truncate max-w-[160px]">{user.name}</p>
                    </div>
                  </div>
                ) : (
                  <TutoriamLogo text size={28} />
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleSidebar}
                  className="rounded-full h-9 w-9 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex-1 py-6 px-4">
                <div className="space-y-1">
                  {mainNavItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      active={isActive(item.path)}
                      onClick={toggleSidebar}
                      icon={item.icon}
                    >
                      {item.label}
                    </NavLink>
                  ))}

                  {user && 
                  secondaryNavItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      active={isActive(item.path)}
                      onClick={toggleSidebar}
                      badge={item.badge}
                      icon={item.icon}
                    >
                      {item.label}
                    </NavLink>
                  ))
                  }
                </div>

                {user?.role === "user" && (
                  <>
                    <div className="my-6 border-t border-gray-200 dark:border-zinc-800" />
                    <div className="space-y-1">
                      <NavLink
                        to="/be-instructor"
                        active={isActive("/be-instructor")}
                        onClick={toggleSidebar}
                        icon={<GraduationCap className="w-4 h-4 mr-2" />}
                        highlight
                      >
                        Become an Instructor
                      </NavLink>
                    </div>
                  </>
                )}
              </nav>

              {user && !isAdmin && (
                <div className="px-4 py-4 border-t border-gray-200 dark:border-zinc-800">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      toggleSidebar();
                      handleLogout();
                    }}
                    className="w-full justify-start text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  badge?: number | null;
  highlight?: boolean;
  icon?: React.ReactNode;
}

function NavLink({ to, active, children, onClick, badge, highlight, icon }: NavLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ease-in-out",
        active && "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white",
        highlight
          ? "bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white"
      )}
    >
      <span className="flex items-center gap-2">
        {icon}
        {children}
      </span>
      {badge !== null && badge !== undefined && (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-black text-xs font-medium">
          {badge}
        </span>
      )}
    </Link>
  );
}