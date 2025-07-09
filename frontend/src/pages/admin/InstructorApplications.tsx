import type React from "react";
import { useEffect, useState } from "react";
import { MoreHorizontal, Search, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropDownMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { ApplicationReviewDialog } from "../../components/admin/instructorApplications/ApplicationReviewDialog";
import { RejectionDialog } from "../../components/admin/instructorApplications/RejectDialog";
import { type AxiosResponse } from "axios";
import { toast } from "sonner";
import { fetchInstructorApplications, updateInstructorStatus } from "../../services/intructorServices";

export default function InstructorApplicationsPage() {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isRejectionOpen, setIsRejectionOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response: AxiosResponse = await fetchInstructorApplications();
        console.log(response);
        setApplications(response.data.instructorApplications);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleApprove = async (instructorId: string) => {
    try {
      const response = await updateInstructorStatus(instructorId, "approved");
      if (response.status === 200) {
        setApplications((prev) => prev.filter((app) => app._id !== instructorId));
      }
      toast.success("application approved successfully", {position:"top-right"})  
    } catch (error) {
      console.log(error)
    }finally{
      setIsReviewOpen(false);
    }
  };

  const handleReject = async (instructorId: string, reason: string) => {
    try {
      const response = await updateInstructorStatus(instructorId, "rejected", reason);
      if (response.status === 200) {
        setApplications((prev) => prev.filter((app) => app._id !== instructorId));
      }
      toast.success("application rejected successfully", {position:"top-right"})  
    } catch (error) {
      console.log(error)
    }finally{
      setIsRejectionOpen(false);
    }
    
  };

  const openReviewDialog = (application: any) => {
    setSelectedApplication(application);
    setIsReviewOpen(true);
  };

  const openRejectionDialog = (application: any) => {
    setSelectedApplication(application);
    setIsRejectionOpen(true);
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="flex-1 space-y-4 md:pl-64">
      <div className="flex space-y-6 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight mt-5">
          Instructor Applications
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search applications..."
              className="w-full pl-8 sm:w-[300px]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <Card className="hidden md:block">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Expertise</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={application.userId.profileImageUrl}
                          alt={application.userId.name}
                        />
                        <AvatarFallback>
                          {application.userId.name
                            .split(" ")
                            .map((n: any) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {application.userId.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{application.education.highestDegree} degree</TableCell>
                  {/* {application.preferredSubjects.map((subject:any) => (
                    <TableCell>{subject}</TableCell>
                  ))} */}
                  <TableCell>{application.preferredSubjects[0]}</TableCell>
                  <TableCell>{application.teachingLanguages[0]}</TableCell>
                  <TableCell>
                    {new Date(application.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => openReviewDialog(application)}
                        >
                          Review application
                        </DropdownMenuItem>
                        {application.adminApproval.status === "pending" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleApprove(application._id)}
                            >
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openRejectionDialog(application)}
                            >
                              <XCircle className="mr-2 h-4 w-4 text-red-500" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="space-y-4 md:hidden">
        {applications.map((application) => (
          <Card key={application._id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={application.userId.profileImageUrl}
                      alt={application.userId.name}
                    />
                    <AvatarFallback>
                      {application.userId.name
                        .split(" ")
                        .map((n: any) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">
                      {application.userId.name}
                    </CardTitle>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground">
                    Qualification
                  </p>
                  <p>{application.education.highestDegree}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Expertise</p>
                  {/* {application.preferredSubjects.map((subject:any) => (
                    <p>{subject}</p>
                  ))} */}
                  <p>{application.preferredSubjects[0]}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Language</p>
                  {/* {application.teachingLanguages.map((language:any) => (
                    <p>{language}</p>
                  ))} */}
                  <p>{application.teachingLanguages[0]}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Submitted</p>
                  <p>{new Date(application.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openReviewDialog(application)}
                >
                  Review
                </Button>
                {application.adminApproval.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-500"
                      onClick={() => handleApprove(application.id)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500"
                      onClick={() => openRejectionDialog(application)}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedApplication && (
        <ApplicationReviewDialog
          application={selectedApplication}
          open={isReviewOpen}
          onOpenChange={setIsReviewOpen}
          onApprove={handleApprove}
          onReject={() => openRejectionDialog(selectedApplication)}
        />
      )}

      {selectedApplication && (
        <RejectionDialog
          application={selectedApplication}
          open={isRejectionOpen}
          onOpenChange={setIsRejectionOpen}
          onReject={handleReject}
        />
      )}
    </div>
  );
}