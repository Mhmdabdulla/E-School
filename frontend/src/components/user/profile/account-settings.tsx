import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useEffect, useRef, useState } from "react";
import profilePlaceholder from "/profile_placeholder.png";
import { getUserProfile, updateProfile } from "../../../services/userServices";
import { useDispatch } from "react-redux";
import ChangePassword from "./change-password";

interface User {
  _id: string;
  name: string;
  email: string;
  courses: number;
  title: string;
  profileImageUrl: string;
  status: "active" | "blocked";
  createdAt: Date;
}

const AccountSettings: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserProfile();
      if (response.status === 200) {
        const user = response.data.user;
        setUser(user);
        setLoading(false);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user.name.split(" ")[0]);
      setLastName(user.name.split(" ")[1] || "");
      setTitle(user.title);
      setImagePreview(user.profileImageUrl || null);
    }
  }, [user]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSaveClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) formData.append("profileImage", image);
    formData.append("name", `${firstName} ${lastName}`);
    formData.append("title", title);
    await updateProfile(formData, dispatch);
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-background"></div>;
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Account Settings</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <motion.div
            className="lg:col-span-1"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-background border border-border rounded-lg shadow-sm p-6 text-center">
              <div className="relative md:w-full md:h-full w-32 h-32 mx-auto mb-4 md:mb-20"> 
                <img
                  src={imagePreview || profilePlaceholder}
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full border-2 border-border"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-border text-foreground hover:bg-muted"
                onClick={handleUploadClick}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Photo
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-background border border-border rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      First Name
                    </label>
                    <Input
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Last Name
                    </label>
                    <Input
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Username
                  </label>
                  <Input
                    readOnly
                    placeholder="Username"
                    value={user?.name || ""}
                    className="bg-muted text-foreground/70 border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <Input
                    readOnly
                    type="email"
                    value={user?.email || ""}
                    className="bg-muted text-foreground/70 border-border"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-foreground">
                      Title
                    </label>
                    <span className="text-xs text-muted-foreground">
                      {title?.length}/50
                    </span>
                  </div>
                  <Input
                    maxLength={50}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-background border-border text-foreground"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    onClick={handleSaveClick}
                    className="bg-foreground text-background hover:bg-muted-foreground"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <ChangePassword />
    </motion.div>
  );
};

export default AccountSettings;