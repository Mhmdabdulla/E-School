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
import { Input } from "../../components/ui/input";
import { Skeleton } from "../../components/ui/skeleton";
import { TableBody, TableCell, TableHead, TableRow } from "../../components/ui/table";
import type{ IOrder } from "../../types/order"; 
import {type IUser } from "../../types/user";
import { AlertCircle, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAllOrders } from "../../services/orderService";
import { OrderDetailsDialog } from "../../components/admin/dialogs/order-details-dilog";
import {type Course } from "../../types/course";

const OrdersPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedOrder, setSelectedOrder] = useState<IOrder & { userId: IUser; courseIds: Course[] } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchQuery(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);

  const getAllOrders = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllOrders(page, limit);
      setOrders(data.ordersWithPagination.orders);
      setTotalPages(data.ordersWithPagination.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  return (
    <div className="flex-1 space-y-4 md:pl-64">
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search...."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent>
          {isLoading ? (
            <table className="w-full">
              <thead>
                <TableRow>
                  <TableHead><Skeleton className="h-7 w-24" /></TableHead>
                  <TableHead><Skeleton className="h-7 w-20" /></TableHead>
                  <TableHead><Skeleton className="h-7 w-28" /></TableHead>
                  <TableHead><Skeleton className="h-7 w-20" /></TableHead>
                  <TableHead><Skeleton className="h-7 w-20" /></TableHead>
                  <TableHead><Skeleton className="h-7 w-16" /></TableHead>
                </TableRow>
              </thead>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-7 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-7 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-7 w-36" /></TableCell>
                    <TableCell><Skeleton className="h-7 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-7 w-12" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-7 w-8" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </table>
          ) : orders.length === 0 ? (
            <Card className="border-none">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">No Orders Found</h3>
          <p className="text-sm text-gray-500 text-center mt-2">
            It looks like there are no orders available at the moment. Try adjusting your search or check back later.
          </p>
        </CardContent>
        </Card>
          ) : (
            <table className="w-full">
              <thead>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </thead>
              <TableBody>
                {orders.map((order) => {
                  const user = order.userId as Partial<IUser>;
                  return (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{user.name || "Unknown User"}</TableCell>
                      <TableCell className="text-center">
                        {order.courseIds.length}
                      </TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === "Paid" ? "default" : "destructive"}>
                          {order.status}
                        </Badge>
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
                            <DropdownMenuItem  onClick={() => {
    setSelectedOrder(order as any);
    setDialogOpen(true);
}}>View details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </table>
          )}
        </CardContent>
      </Card>

      {selectedOrder && (
  <OrderDetailsDialog
    order={selectedOrder}
    open={dialogOpen}
    onOpenChange={setDialogOpen}
  />
)}

      {!isLoading && totalPages > 1 && (
        <GenericPagination currentPage={page} onPageChange={setPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default OrdersPage;