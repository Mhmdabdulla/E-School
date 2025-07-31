import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { fetchListedCategories } from "../../../services/categoryService";
import type{ Category } from "../../../types/category";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface CourseFiltersProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  rating: string;
  setRating: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  subCategory: string;
  setSubCategory: (value: string) => void;
}

export function CourseFilters({
  sortBy,
  setSortBy,
  category,
  setCategory,
  subCategory,
  setSubCategory,
  setSearchQuery,
}: CourseFiltersProps) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { categories } = await fetchListedCategories();
        setCategories(categories);
        console.log(categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find((cat) => cat._id === selectedCategory);
      if (category) {
        setSubCategories(category.subcategories);
      }
    }
  }, [selectedCategory, categories]);

  const handleCategoryChange = async (value: string) => {
    console.log(value);
    setSelectedCategory(value);
    setCategory(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div>
        <p className="text-sm mb-2">Search</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search in your courses..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="text-sm mb-2">Sort by</p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Latest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <p className="text-sm mb-2">Category</p>
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Category</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <p className="text-sm mb-2">Sub Category</p>
        <Select value={subCategory} onValueChange={setSubCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All Sub Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sub Category</SelectItem>
            {subCategories.map((subCat) => (
              <SelectItem key={subCat._id} value={subCat._id}>
                {subCat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* <div>
        <p className="text-sm mb-2">Rating</p>
        <Select value={rating} onValueChange={setRating}>
          <SelectTrigger>
            <SelectValue placeholder="4 Star & Up" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4 Star & Up</SelectItem>
            <SelectItem value="3">3 Star & Up</SelectItem>
            <SelectItem value="2">2 Star & Up</SelectItem>
            <SelectItem value="1">1 Star & Up</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
    </div>
  );
}