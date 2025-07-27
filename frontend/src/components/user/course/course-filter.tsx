import { Checkbox } from "../../ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { useEffect, useState } from "react";
import type { Category } from "../../../types/category";
import { fetchListedCategories } from "../../../services/categoryService";

interface CourseFiltersProps {
  userCatagories: string[];
  setUserCatagories: (catagories: string[]) => void;
  userSubCatagories: string[];
  setUserSubCatagories: (subCatagories: string[]) => void;
  rating: string;
  setRating: (rating: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  level: string[];
  setLevel: (level: string[]) => void;
  duration: string[];
  setDuration: (duration: string[]) => void;
}

export function CourseFilters(
  {
    userSubCatagories,
    setUserSubCatagories,
  }: CourseFiltersProps
) {


  const handleSubCategoryChange = (id: string) => {
    const updatedSubCategories = userSubCatagories.includes(id)
        ? userSubCatagories.filter((sub) => sub !== id)
        : [...userSubCatagories, id];
    
      setUserSubCatagories(updatedSubCategories);
      console.log(updatedSubCategories);
  };

   const [selectedCategory] = useState<string | null>(null);
    const [, setSubCategories] = useState<any[]>([]); 
    const [categories, setCategories]= useState<Category[] >([])
  
    useEffect(()=> {
      const fetchCategories = async () => {
        try {
          const {categories} = await fetchListedCategories()
          setCategories(categories)
          console.log(categories)
        } catch (error) {
          console.log(error)
        }
      }
      fetchCategories()
    },[])
  
    useEffect(() => {
      if (selectedCategory) {
        const category = categories.find(cat => cat._id === selectedCategory);
        if (category) {
          setSubCategories(category.subcategories); 
        }
      }
    }, [selectedCategory, categories]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-lg font-semibold uppercase">Category</h2>
        <Accordion type="multiple" defaultValue={[""]}>
          {
            categories.map(category => (
              <CategoryAccordionItem
              key={category._id}
              value={category._id}
              title={category.name}
              items={
                category.subcategories.map(subCat => (
                  { id: subCat._id, label: subCat.name, count: 574 }
                ))
              }
              selectedSubCategories={userSubCatagories}
              onSubCategoryChange={handleSubCategoryChange}
            />
            ))
          }
        </Accordion>
      </div>
    </div>
  );
}

interface CategoryAccordionItemProps {
  value: string;
  title: string;
  items: {
    id: string;
    label: string;
    count: number;
    checked?: boolean;
  }[];
  selectedSubCategories: string[];
  onSubCategoryChange: (id: string) => void;
}

function CategoryAccordionItem({
  value,
  title,
  items,
  selectedSubCategories,
  onSubCategoryChange,
}: CategoryAccordionItemProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="py-2">{title}</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={item.id}
                  checked={selectedSubCategories.includes(item.id)}
                  onCheckedChange={() => onSubCategoryChange(item.id)}
                />
                <label
                  htmlFor={item.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.label}
                </label>
              </div>
              <span className="text-xs text-muted-foreground">{item.count}</span>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}