// CategoriesPage.tsx
import { useState } from "react";
import { useCategory } from "../../hooks/useCategory";
import { CategoryDialog } from "../../components/admin/category/category-dialog"
import { createCategory, editCategory, toggleCategoryStatus } from "../../services/categoryService";
import ActionPanel from "../../components/admin/category/action-panel";
import { trackCategoryChanges } from "../../lib/utils/category";
import type { Category } from "../../types/category";
import CategoryTable from "../../components/admin/category/category-table";
import { GenericPagination } from "../../components/common/pagination";

export default function CategoriesPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showPopover, setShowPopover] = useState<string | null>(null);

  const {
    categories,
    setCategories,
    setSearchQuery,
    setFilter,
    totalPages,
    currentPage,
    setCurrentPage,
    refetch
  } = useCategory();

  const handleCreateCategory = async (categoryData: {
    name: string;
    status: boolean;
    subcategories: { name: string }[];
  }) => {
    try {
       await createCategory(categoryData);
      refetch()
      // setCategories(prev => [category,...prev])
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreateDialogOpen(false);
    }
  };

  const handleEditCategory = async (categoryData: { name: string; status: boolean; subcategories: { name: string }[] }, id?: string) => {
    if (!selectedCategory || !id || !categoryData) return;
    try {
      const changes = trackCategoryChanges(selectedCategory, categoryData as Category);
      console.log(changes);
      const res = await editCategory(id, changes);
      console.log(res.category);
      const updatedCategory = res.category;
      setCategories(prev => prev.map(category => (category._id === updatedCategory._id ? updatedCategory : category)));
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditDialogOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleToggleVisibility = async (id: string) => {

      const { category: updatedCategory } = await toggleCategoryStatus(id);
      setCategories(prev => prev.map(category => (category._id === id ? updatedCategory : category)));

  };

  const handleTogglePopover = (categoryId: string) => {
    setShowPopover(showPopover === categoryId ? null : categoryId);
  };

  return (
    <div className="flex-1 space-y-4 md:pl-64">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-5">
        <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
        <ActionPanel 
        setIsCreateDialogOpen={setIsCreateDialogOpen} 
        setSearchQuery={setSearchQuery} 
        setStatusFilter={setFilter}
        />
      </div>

      <CategoryTable
        categories={categories}
        onEditCategory={(category) => {
          setSelectedCategory(category);
          setIsEditDialogOpen(true);
        }}
        onToggleVisibility={handleToggleVisibility}
        onTogglePopover={handleTogglePopover}
        showPopover={showPopover}
      />

      {isCreateDialogOpen && (
        <CategoryDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSubmit={handleCreateCategory}
          title="Create Category"
          submitLabel="Create"
          defaultValues={{ name: "", status: true, subcategories: [{ name: "" }] }}
        />
      )}

      {selectedCategory && (
        <CategoryDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleEditCategory}
          title="Edit Category"
          submitLabel="Save Changes"
          defaultValues={{
            _id: selectedCategory._id,
            name: selectedCategory.name,
            status: selectedCategory.status,
            subcategories: selectedCategory.subcategories,
          }}
        />
      )}
      {
        categories.length  &&
      <GenericPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
      }
    </div>
    
  );
}