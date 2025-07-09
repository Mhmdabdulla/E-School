import { Button } from "../../ui/button";
import { ChevronRight } from "lucide-react";
import CategoryCard from "./category-card";

const CategorySection = () => {
  return (
    <section className="py-16 px-[4%]">
      <div className="container">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Browse top category
        </h2>
        <div className="grid gap-6 gapm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <CategoryCard
            icon="Label"
            title="Label"
            count="63,476 Courses"
            color="bg-indigo-50"
            iconColor="text-indigo-500"
          />
          <CategoryCard
            icon="DollarSign"
            title="Business"
            count="32,822 Courses"
            color="bg-green-50"
            iconColor="text-green-500"
          />
          <CategoryCard
            icon="BarChart"
            title="Finance & Accounting"
            count="33,841 Courses"
            color="bg-orange-50"
            iconColor="text-orange-500"
          />
          <CategoryCard
            icon="Code"
            title="IT & Software"
            count="22,649 Courses"
            color="bg-red-50"
            iconColor="text-red-500"
          />
          <CategoryCard
            icon="User"
            title="Personal Development"
            count="20,126 Courses"
            color="bg-orange-50"
            iconColor="text-orange-500"
          />
          <CategoryCard
            icon="FileText"
            title="Office Productivity"
            count="13,932 Courses"
            color="bg-gray-50"
            iconColor="text-gray-500"
          />
          <CategoryCard
            icon="BarChart2"
            title="Marketing"
            count="12,068 Courses"
            color="bg-blue-50"
            iconColor="text-blue-500"
          />
          <CategoryCard
            icon="Camera"
            title="Photography & Video"
            count="6,196 Courses"
            color="bg-gray-50"
            iconColor="text-gray-500"
          />
          <CategoryCard
            icon="Coffee"
            title="Lifestyle"
            count="2,756 Courses"
            color="bg-yellow-50"
            iconColor="text-yellow-500"
          />
          <CategoryCard
            icon="Palette"
            title="Design"
            count="2,600 Courses"
            color="bg-orange-50"
            iconColor="text-orange-500"
          />
          <CategoryCard
            icon="Heart"
            title="Health & Fitness"
            count="1,876 Courses"
            color="bg-green-50"
            iconColor="text-green-500"
          />
          <CategoryCard
            icon="Music"
            title="Music"
            count="951 Courses"
            color="bg-yellow-50"
            iconColor="text-yellow-500"
          />
        </div>
        <div className="mt-10 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            We have more category & subcategory.
          </p>
          <Button
            variant="link"
            className="text-orange-500 hover:text-orange-600"
          >
            Browse All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;