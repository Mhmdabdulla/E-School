import { Link, useLocation, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/DropDownMenu";
import { Button } from "../../ui/button";
import { ChevronDown, Heart, LogOutIcon, Search, ShoppingCart, User, Menu } from "lucide-react";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { userLogout } from "../../../services/authServices";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ThemeToggle from "../../common/ThemeToggler";
import TutoriamLogo from "../../common/ESchoolLogo";
import { MobileSidebar } from "../../common/MobileSideBar";

const Header = () => {
  const user = useSelector((state: any) => state.auth.user);
  const cartCount = 3
  const isAdmin = localStorage.getItem("adminLoggedIn") === "true"
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
  if(!sidebarOpen){
      const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }
  }, [lastScrollY,sidebarOpen]);

  const handleLogout = async () => {
    const response = await userLogout(dispatch);
    if (response.status === 200) {
      navigate("/");
      localStorage.clear();
    }
  };

  const handleCreateAccountClick = () => {
    navigate("/login", { state: { formState: "signup" } });
  };

  const handleSignInClick = () => {
    navigate("/login", { state: { formState: "signIn" } });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0 shadow-md" : "-translate-y-full"
      } bg-white dark:bg-black`} // Monochromatic background, shadow, smooth transition
    >
      {/* Top Bar: Navigation and Language/Theme */}
      <div className="bg-black text-white px-4 sm:px-6 ">
        <div className="container mx-auto flex items-center justify-between">
          <Button
            onClick={toggleSidebar}
            className="sm:hidden bg-transparent hover:bg-gray-800 p-2 rounded-full"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-white" />
          </Button>

          <nav className="hidden sm:flex items-center space-x-8">
            {["/", "/courses", "/about", "/contact"].map((path, index) => (
              <Link
                key={index}
                to={path}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isActive(path) ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {path === "/" ? "Home" : path.charAt(1).toUpperCase() + path.slice(2)}
              </Link>
            ))}
            {user?.role === "user" && (
              <Link
                to="/be-instructor"
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isActive("/be-instructor") ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Become an Instructor
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="h-9 bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white font-semibold rounded-full px-4"
                >
                  English <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-zinc-800 rounded-lg shadow-md">
                {["English", "Spanish", "French"].map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md"
                  >
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main Header: Logo, Search, User Actions */}
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center space-x-6">
          <TutoriamLogo text size={30}  /> {/* Monochromatic logo */}
          <div className="relative hidden sm:flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search for courses..."
              className="pl-10 pr-4 py-2 w-[400px] rounded-full border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user && !isAdmin ? (
            <>
              {/* <NotificationPopover /> */}
              <Link to="/wishlist" className="relative hidden sm:block">
                <Button
                  variant="ghost"
                  size="icon"
                  className=" rounded-full"
                  aria-label="Wishlist"
                >
                  <Heart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </Button>
              </Link>
              <Link to="/cart" className="relative hidden sm:block">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-black text-xs flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 border-2 border-gray-300 dark:border-gray-600 cursor-pointer hover:scale-105 transition-transform duration-200">
                    <AvatarImage src={user.profileImageUrl} alt={user.name} />
                    <AvatarFallback className="bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-100 font-semibold">
                      {user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="mt-2 w-48 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
                  <DropdownMenuItem asChild className="hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md">
                    <Link
                      to={user.role === "instructor" ? "/instructor/dashboard" : "/user/dashboard"}
                      className="flex items-center text-gray-900 dark:text-gray-100 py-2 px-3"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700 py-2 px-3 rounded-md"
                  >
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleCreateAccountClick}
                className="rounded-full hidden sm:flex"
              >
                Create Account
              </Button>
              <Button
                onClick={handleSignInClick}
                className="rounded-full "
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </div>
     <MobileSidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        user={user}
        isAdmin={isAdmin}
        cartCount={cartCount}
        handleLogout={handleLogout}
        isActive={isActive}
      />
    </header>
  );
};

export default Header;