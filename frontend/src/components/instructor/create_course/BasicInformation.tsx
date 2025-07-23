import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Card, CardContent } from "../../ui/card"
import { ScrollArea } from "../../ui/scroll-area"
import { useEffect, useState } from "react"
import { fetchListedCategories } from "../../../services/categoryService"
import type { Category } from "../../../types/category"

export const basicInformationSchema = z.object({
  title: z
    .string({ message: "Please enter a title" })
    .min(5, "Title should be at least 5 characters long")
    .max(80, "Title must be less than 80 characters"),
  subtitle: z
    .string()
    .min(10, "Subtitle should be at least 10 characters long")
    .max(120, "Subtitle must be less than 120 characters"),
  category: z.string({message:"Please select a category"}).min(1, "Please select a category"),
  subCategory: z.string({message: "Please select a sub-category"}).min(1, "Please select a sub-category"),
  topic: z.string({message: "Please enter a topic"}).min(5, "Topic should be at least 5 characters long"),
  language: z.string({message:"Please select a language"}).min(1, "Please select a language"),
  level: z.string({message: "Please select a course level"}).min(1, "Please select a course level"),
  // duration: z.string({message: "Please enter course duration"}).min(1, "Please enter course duration"),
  // durationUnit: z.enum(["day", "week", "month"], {
  //   errorMap: () => ({ message: "Please select a duration unit" }),
  // }),
})

export type BasicInformationType = z.infer<typeof basicInformationSchema>

interface BasicInformationFormProps {
  defaultValues?: Partial<BasicInformationType>
  onSubmit: (data: BasicInformationType) => void
  onCancel: () => void
}

const BasicInformation = ({ defaultValues, onSubmit, onCancel }: BasicInformationFormProps) => {
  const form = useForm<BasicInformationType>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: defaultValues || {
      title: "",
      subtitle: "",
      category: "",
      subCategory: "",
      topic: "",
      language: "",
      level: "",
      // duration: "",
      // durationUnit: "day",
    },
  })

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<any[]>([]); 
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
    if(defaultValues){
      setSelectedCategory(defaultValues.category as string)
    }
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
    <ScrollArea>
    <Card className="md:px-7">
      <CardContent className="p-6 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Title</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input placeholder="Your course title" {...field} />
                    </FormControl>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      {field.value?.length ? field.value.length : 0}/80
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Subtitle</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input placeholder="Your course subtitle" {...field} />
                    </FormControl>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      {field.value?.length ? field.value.length : 0 }/120
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Course Category</FormLabel>
                    <Select onValueChange={(value) => {
                      setSelectedCategory(value)
                      field.onChange(value)
                    }} defaultValue={field.value}  >
                      <FormControl>
                        <SelectTrigger className="w-full md:w-64">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category._id} value={category._id}  >{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subCategory"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Course Sub-category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full md:w-64">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subCategories.map(subCat => (
                          <SelectItem key={subCat._id} value={subCat._id}>{subCat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Course Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="What is primarily taught in your course?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Course Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full md:w-64">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Course Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full md:w-64">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="all">All Levels</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols- gap-6">
              <div className="space-y-2">
                <div className="flex gap-10">
                  <div className="">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Durations</FormLabel>
                          <FormControl>
                            <Input placeholder="Course durations" {...field} className="md:w-64" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="durationUnit"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>Unit</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="day">Day</SelectItem>
                            <SelectItem value="week">Week</SelectItem>
                            <SelectItem value="month">Month</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div> */}

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Save & Next</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
    </ScrollArea>

  )
}

export default BasicInformation