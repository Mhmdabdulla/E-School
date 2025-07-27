import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Globe, Instagram, Linkedin, Twitter, Github } from "lucide-react";
import { useAppSelector } from "../../../redux/store";
import { z } from "zod";
import { updateInstructorProfile } from "../../../services/intructorServices";
import { useDispatch } from "react-redux";
import { updateInstructor } from "../../../redux/slices/instructorSlice";
import { toast } from "sonner";

export const socialLinksSchema = z.object({
  portfolio: z.string().url("Invalid website URL").optional(),
  instagram: z.string().url("Invalid Instagram URL").optional(),
  linkedin: z.string().url("Invalid LinkedIn URL").optional(),
  twitter: z.string().url("Invalid Twitter URL").optional(),
  github: z.string().url("Invalid GitHub URL").optional(),
});

export type SocialLinksFormData = z.infer<typeof socialLinksSchema>;

export function SocialProfile() {
  const socialLinks = useAppSelector((state) => state.instructor.instructor?.socialLinks);
  const instructorId = useAppSelector((state) => state.auth.user?._id);
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setValue,
  } = useForm<SocialLinksFormData>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: {
      portfolio: typeof socialLinks?.portfolio === "string" ? socialLinks.portfolio : "",
      instagram: typeof socialLinks?.instagram === "string" ? socialLinks.instagram : "",
      linkedin: typeof socialLinks?.linkedin === "string" ? socialLinks.linkedin : "",
      twitter: typeof socialLinks?.twitter === "string" ? socialLinks.twitter : "",
      github: typeof socialLinks?.github === "string" ? socialLinks.github : "",
    },
  });

  useEffect(() => {
    if (socialLinks) {
      setValue("portfolio", typeof socialLinks?.portfolio === "string" ? socialLinks.portfolio : "");
      setValue("instagram", typeof socialLinks?.instagram === "string" ? socialLinks.instagram : "");
      setValue("linkedin", typeof socialLinks?.linkedin === "string" ? socialLinks.linkedin : "");
      setValue("twitter", typeof socialLinks?.twitter === "string" ? socialLinks.twitter : "");
      setValue("github", typeof socialLinks?.github === "string" ? socialLinks.github : "");
    }
  }, [socialLinks, setValue]);

  const onSubmit = async (data: SocialLinksFormData) => {

  const updatedLinks = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => value !== socialLinks?.[key as keyof typeof socialLinks]?.type)
  ) as Record<string, string>;

    if (Object.keys(updatedLinks).length === 0) {
      toast.info("no changes detected")
      return;
    }

    try {
      console.log(updatedLinks)
      const data = await updateInstructorProfile(instructorId, {socialLinks:updatedLinks});
      dispatch(updateInstructor(data.instructor))
      toast.success("Social links updated successfully.");
    } catch (error) {
      console.error("Failed to update social links:", error);
      toast.error("An error occurred while updating social links.");
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Social Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="website">Personal Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="website"
                placeholder="Personal website or portfolio URL..."
                className="pl-10"
                {...register("portfolio")}
              />
            </div>
            {errors.portfolio && <p className="text-red-500">{errors.portfolio.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="instagram"
                  placeholder="Instagram URL"
                  className="pl-10"
                  {...register("instagram")}
                />
              </div>
              {errors.instagram && <p className="text-red-500">{errors.instagram.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="linkedin"
                  placeholder="LinkedIn URL"
                  className="pl-10"
                  {...register("linkedin")}
                />
              </div>
              {errors.linkedin && <p className="text-red-500">{errors.linkedin.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="twitter"
                  placeholder="Twitter URL"
                  className="pl-10"
                  {...register("twitter")}
                />
              </div>
              {errors.twitter && <p className="text-red-500">{errors.twitter.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="github"
                  placeholder="GitHub URL"
                  className="pl-10"
                  {...register("github")}
                />
              </div>
              {errors.github && <p className="text-red-500">{errors.github.message}</p>}
            </div>
          </div>

          <CardFooter>
            <Button type="submit" disabled={isSubmitting || !isDirty} className="hover:cursor-pointer">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}