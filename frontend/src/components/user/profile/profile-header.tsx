import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { getApplications } from "../../../services/userServices";

const ProfileHeader = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await getApplications();
        setApplications(response.applications);
        console.log(response)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [user]);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-2 flex items-center gap-4">
        <Avatar className="h-20 w-20 border-2 border-white shadow-md">
          <AvatarImage src={user.profileImageUrl} alt="" />
          <AvatarFallback>{user.name.split("")[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-sm text-muted-foreground">
            {user.title || "title"}
          </p>
        </div>
        <div className="ml-auto hidden gap-2  md:flex">
          <Link to={"/be-instructor"}>
            <Button variant="outline" className="">
              Become Instructor
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </Link>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              {applications.length && (
                <Button variant="outline">View Applications</Button>
              )}
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto no-scrollbar">
              <DialogHeader>
                <DialogTitle>Your Instructor Applications</DialogTitle>
              </DialogHeader>
              {/* <ScrollArea className="max-h-[60vh] scrollbar-hide"></ScrollArea> */}
              {applications.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No applications submitted yet
                </p>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <Card key={app._id}>
                      <CardHeader className="py-3">
                        <DialogDescription className="text-ms font-bold mb-4">
                          {/* View the status and details of your instructor applications  */}
                        </DialogDescription>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Submitted:{" "}
                            {new Date(app.createdAt).toLocaleDateString()}
                          </CardTitle>
                          <Badge
                            variant={
                              app.status === "approved"
                                ? "default"
                                : app.status === "rejected"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {app.adminApproval.status}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="py-2">
                        <div>
                          <span className="text-sm font-medium">
                            Subjects:{" "}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {app.preferredSubjects.join(", ")}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Skills: </span>
                          <span className="text-sm text-muted-foreground">
                            {app.skills.join(", ")}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">
                            Languages:{" "}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {app.teachingLanguages.join(", ")}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">
                            Experience:{" "}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {app.experience}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">
                            Occupation:{" "}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {app.currentOccupation}
                          </span>
                        </div>
                        {app.adminApproval.status === "rejected" && (
                          <div className="pt-2">
                            <span className="text-sm font-medium text-destructive">
                              Rejection Reason:{" "}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {app.adminApproval.reason}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
