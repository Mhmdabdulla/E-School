import { useEffect, useState } from "react";
import { GenericPagination } from "../../components/common/pagination";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../components/ui/DropDownMenu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import type{ IPayoutRequest } from "../../types/PayoutRequest";
import { toast } from "sonner";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import NoPayoutRequests from "../../components/admin/common/no-content";
import { approvePayoutRequest, getAllPayoutRequestsForAdmin, rejectPayoutRequest } from "../../services/earningService";
import { PayoutRequestDetailsDialog } from "../../components/admin/dialogs/payout-details-dialog";

export default function PayoutRequestsPage() {
  const [payoutRequests, setPayoutRequests] = useState<IPayoutRequest[]>([]);
  const [page, setPage] = useState<number>(1);
  // const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState<boolean>(false);
  const [selectedPayoutRequestId, setSelectedPayoutRequestId] = useState<string | null>(null);
  const [adminNote, setAdminNote] = useState<string>("");
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<
    (IPayoutRequest & { instructorId: { name: string; email: string } }) | null
  >(null);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchQuery(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);

  const fetchPayoutRequests = async () => {
    try {
      const data = await getAllPayoutRequestsForAdmin();
      setPayoutRequests(data);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    fetchPayoutRequests();
  }, [page, searchQuery]);

  const handleApprove = async (payoutRequestId: string) => {
    try {
      await approvePayoutRequest(payoutRequestId);
      toast.success("Payout request approved");
      fetchPayoutRequests();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleReject = (payoutRequestId: string) => {
    setSelectedPayoutRequestId(payoutRequestId);
    setAdminNote("");
    setIsRejectDialogOpen(true);
  };

  const confirmReject = async () => {
    if (!selectedPayoutRequestId) return;
    try {
      await rejectPayoutRequest(selectedPayoutRequestId, adminNote || undefined);
      toast.success("Payout request rejected");
      setIsRejectDialogOpen(false);
      setSelectedPayoutRequestId(null);
      setAdminNote("");
      fetchPayoutRequests();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex-1 space-y-4 md:pl-64">
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-3xl font-bold tracking-tight">Payout Requests</h2>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by instructor name or email..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {payoutRequests.length === 0 ? (
        <NoPayoutRequests />
      ) : (
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requested At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payoutRequests.map((request) => {
                  const instructor = request.instructorId as { name: string; email: string };
                  return (
                    <TableRow key={request._id}>
                      <TableCell>
                        {instructor.name} <br />
                        <span className="text-sm text-muted-foreground">{instructor.email}</span>
                      </TableCell>
                      <TableCell>₹{request.amount.toFixed(2)}</TableCell>
                      <TableCell className="capitalize">{request.method}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === "approved"
                              ? "default"
                              : request.status === "rejected"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(new Date(request.requestedAt), "MMM dd, yyyy")}</TableCell>
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
                              onClick={() => {
                                setSelectedRequest(request as any);
                                setIsDetailsDialogOpen(true);
                              }}
                            >
                              View details
                            </DropdownMenuItem>
                            {request.status === "pending" && (
                              <>
                                <DropdownMenuItem onClick={() => handleApprove(request._id)} className="text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleReject(request._id)} className="text-red-600">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {selectedRequest && (
        <PayoutRequestDetailsDialog
          request={selectedRequest}
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        />
      )}

      {totalPages > 1 && <GenericPagination currentPage={page} onPageChange={setPage} totalPages={totalPages} />}

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Payout Request</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting this payout request (optional).</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="adminNote">Rejection Note</Label>
              <Input
                id="adminNote"
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Enter reason for rejection..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmReject} disabled={adminNote.trim() === ""}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}