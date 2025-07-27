import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { ProfileUpload } from "./profile-upload";
import { useAppSelector } from "../../../redux/store";
import { updateInstructorProfile } from "../../../services/intructorServices";
import type { IInstructor } from "../../../types/instructor";
import { updateProfile } from "../../../services/userServices";
import { useDispatch } from "react-redux";
import { updateInstructor } from "../../../redux/slices/instructorSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function AccountSettings() {
  const instructor = useAppSelector((state) => state.auth.user);
  const instructorDetails = useAppSelector((state) => state.instructor.instructor);

  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("+91");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [biography, setBiography] = useState<string>("");
  const [image, setImage] = useState<File | string | null>(null);
  const [, setInitialImage] = useState<string | null>(null);

  const initialValues = {
    firstName: instructor?.name || "",
    username: instructor?.username || instructor?.name || "",
    phoneCode: instructorDetails?.countryCode || "+91",
    phoneNumber: instructorDetails?.phoneNumber || "",
    title: instructor?.title || "",
    biography: instructorDetails?.bio || "",
  };

  useEffect(() => {
    setFirstName(initialValues.firstName);
    setUsername(initialValues.username);
    setPhoneCode(initialValues.phoneCode);
    setPhoneNumber(initialValues.phoneNumber);
    setTitle(initialValues.title);
    setBiography(initialValues.biography);
    setImage(instructor?.profileImageUrl || null);
    setInitialImage(instructor?.profileImageUrl || null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instructor, instructorDetails]);

  const getUpdatedData = () => {
    const trimmed = {
      firstName: firstName.trim(),
      username: username.trim(),
      phoneCode: phoneCode.trim(),
      phoneNumber: phoneNumber.trim(),
      title: title.trim(),
      biography: biography.trim(),
    };

    const updatedFields: any = {};

    if (trimmed.firstName !== initialValues.firstName.trim()) {
      updatedFields.name = trimmed.firstName;
    }
    if (trimmed.username !== initialValues.username.trim()) {
      updatedFields.username = trimmed.username;
    }
    if (trimmed.phoneCode !== initialValues.phoneCode.trim()) {
      updatedFields.phoneCode = trimmed.phoneCode;
    }
    if (trimmed.phoneNumber !== initialValues.phoneNumber.trim()) {
      updatedFields.phoneNumber = trimmed.phoneNumber;
    }
    if (trimmed.title !== initialValues.title.trim()) {
      updatedFields.title = trimmed.title;
    }
    if (trimmed.biography !== initialValues.biography.trim()) {
      updatedFields.biography = trimmed.biography;
    }

    if (Object.keys(updatedFields).length === 0) {
      return null;
    }

    return updatedFields;
  };

  const handleSave = async () => {
    const { biography, phoneCode, phoneNumber, ...basicInstructorDetails } = getUpdatedData() ?? {};

    console.log(biography, phoneCode, phoneNumber, basicInstructorDetails);
    if (
      !biography &&
      !phoneCode &&
      !phoneNumber &&
      Object.keys(basicInstructorDetails).length === 0 &&
      typeof image === "string"
    ) {
      toast.info("no changes detected");
      return;
    }
    setIsSubmitting(true);
    if (biography || phoneCode || phoneNumber) {
      const updated: Partial<IInstructor> = {};
      if (biography) {
        updated.bio = biography;
      }
      if (phoneCode) {
        updated.countryCode = phoneCode;
      }
      if (phoneNumber) {
        updated.phoneNumber = phoneNumber;
      }
      try {
        const data = await updateInstructorProfile(instructor._id, updated);
        dispatch(updateInstructor(data.instructor));
      } catch (error) {
        console.log(error);
      }
    }

    if (Object.keys(basicInstructorDetails).length !== 0 || typeof image !== "string") {
      const formData = new FormData();

      for (const key in basicInstructorDetails) {
        const value = basicInstructorDetails[key as keyof typeof basicInstructorDetails]?.trim();
        if (value) {
          formData.append(key, value);
        }
      }

      if (image && typeof image !== "string") {
        formData.append("profileImage", image);
      }

      try {
        await updateProfile(formData, dispatch);
      } catch (error) {
        console.log(error);
      }
    }
    setIsSubmitting(false);
    toast.success("profile updated successfully");
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="firstName"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <Select value={phoneCode} onValueChange={setPhoneCode}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+880">+880</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                    <SelectItem value="+91">+91</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  placeholder="Your phone number..."
                  className="flex-1"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="title">Title</Label>
                <span className="text-xs text-muted-foreground">{title.length}/50</span>
              </div>
              <Input
                id="title"
                placeholder="Your title, profession or small biography"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="biography">Biography</Label>
              <Textarea
                id="biography"
                placeholder="Tell us about yourself"
                className="min-h-[120px]"
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
              />
            </div>
          </div>

          <div>
            <ProfileUpload image={image} setImage={setImage} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              updating changes...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}