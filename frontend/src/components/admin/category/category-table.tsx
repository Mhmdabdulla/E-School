// CategoryTable.tsx
import type { Category } from "../../../types/category";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../../ui/DropDownMenu";
import { Edit, CheckCircle2, XCircle, MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { formatDate } from "../../../lib/utils/formatDate";

interface CategoryTableProps {
  categories: Category[];
  onEditCategory: (category: Category) => void;
  onToggleVisibility: (id: string) => void;
  onTogglePopover: (categoryId: string) => void;
  showPopover: string | null;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories, onEditCategory, onToggleVisibility, onTogglePopover, showPopover }) => {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Subcategories</TableHead>
          <TableHead>Courses</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category._id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell>
              <div className=" flex">
                {category.subcategories.slice(0, 2).map((sub) => (
                  <Badge key={sub._id} variant="outline" className="mr-1">
                    {sub.name}
                  </Badge>
                ))}

                {category.subcategories.length > 2 && (
                  <Popover open={showPopover === category._id}>
                    <PopoverTrigger asChild>
                      <button onClick={() => onTogglePopover(category._id)} className="cursor-pointer">
                        {showPopover === category._id ? <ChevronUp className="w-4" /> : <ChevronDown className="w-4" />}
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="">
                      {/* Render all subcategories when the popover is opened */}
                      {category.subcategories.map((sub) => (
                        <div key={sub._id}>
                          <Badge variant="outline" className="mr-1">
                            {sub.name}
                          </Badge>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </TableCell>
            <TableCell>{category.courses}</TableCell>
            <TableCell>
              <Badge variant={category.status ? "default" : "secondary"}>
                {category.status ? "Listed" : "Unlisted"}
              </Badge>
            </TableCell>
            <TableCell>{formatDate(category.updatedAt, "dd/MM/yyyy", true)}</TableCell>
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
                  <DropdownMenuItem onClick={() => onEditCategory(category)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onToggleVisibility(category._id)}>
                    {category.status ? (
                      <>
                        <XCircle color="red" />
                        Unlist
                      </>
                    ) : (
                      <>
                        <CheckCircle2 color="green" />
                        List
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;