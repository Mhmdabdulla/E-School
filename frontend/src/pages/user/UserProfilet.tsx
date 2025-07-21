import Header from "../../components/user/home/Header";
import ProfileHeader from "../../components/user/profile/profile-header";
import ProfileNavigation from "../../components/user/profile/profile-navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

const UserProfile = () => {
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user?.role === "instructor") {
      navigate("/instructor/dashboard");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="pb-5">
      <Header />
      <div className="w-full">
        <div className="px-[8%]">
          <ProfileHeader />
          <ProfileNavigation />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
