import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  { value: "dashboard", label: "Dashboard" },
  { value: "courses", label: "Courses" },
  { value: "instructors", label: "Instructor" },
  { value: "messages", label: "Message" },
  { value: "purchase-history", label: "Purchase History" },
  { value: "certificates", label: "Certificates" },
  { value: "settings", label: "Settings" },
];

const ProfileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get last segment of the path, e.g. 'courses' from '/user/courses'
  const currentTab = location.pathname.split("/").pop() || "dashboard";

  const handleTabChange = (value: string) => {
    navigate(`/user/${value}`);
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="mb-8 w-full justify-start border-b bg-transparent p-0">
        {tabs.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default ProfileNavigation;