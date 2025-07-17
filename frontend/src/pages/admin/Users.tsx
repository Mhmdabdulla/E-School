import { GenericPagination } from "../../components/common/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropDownMenu";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { getUsers, toggleUserStatus } from "../../services/userServices";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  courses: number;
  profileImageUrl: string;
  status: "active" | "blocked";
  createdAt: Date;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[] >([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(()=> {
    const debouce = setTimeout(()=>{
        setSearchQuery(search)
        setPage(1);
    },500)

    return ()=> clearTimeout(debouce)
  },[search])

  const fetchUsers = async() => {
    try {
      const data = await getUsers(page, limit, searchQuery)
      // console.log(data)
      setUsers(data.usersWithPagination.users)
      setTotalPages(data.usersWithPagination.totalPages)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
     fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  const handleChangeStatus = async (userId: string) => {
    const response = await toggleUserStatus(userId);
    if (response.status === 200) {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user._id === userId) {
            return {
              ...user,
              status: user.status === "active" ? "blocked" : "active",
            };
          }
          return user;
        })
      );
      toast.success(
        response.data.message || "user status changed successfully",
        {
          position: "top-right",
        }
      );
    }else{
        toast.error("error while changing user status. Please try again", 
            {position:"top-right"}
        )
    }
  };
  return (
    <div className="flex-1 space-y-4 md:pl-64">
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <div className="flex items-center gap-2">
          <Input
          placeholder="Search...."
          value={search}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value) }
          />
        </div>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                {/* <TableHead>Courses Enrolled</TableHead> */}
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {users.map((user) => (
                <TableRow key={user._id} className="h-15 ">
                  <TableCell className="font-medium flex gap-5 items-center">
                    <Avatar>
                      <AvatarImage src={user.profileImageUrl} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  {/* <TableCell>{user.courses}</TableCell> */}
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : "destructive"
                      }
                    >
                      {user.status === "active" ? "Active" : "Blocked"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
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
                        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Send email</DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleChangeStatus(user._id)}
                        >
                          {user.status === "active"
                            ? "Block user"
                            : "Unblock user"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      { totalPages > 1 &&
      <GenericPagination currentPage={page} onPageChange={setPage} totalPages={totalPages}/>
      }
    </div>
    
  );
};

export default UsersPage;