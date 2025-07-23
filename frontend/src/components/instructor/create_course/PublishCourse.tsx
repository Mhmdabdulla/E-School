import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Card, CardContent } from "../../ui/card";
import { Checkbox } from "../../ui/checkbox";

const priceValidation = z
  .string()
  .min(1, "Price is required")
  .refine((val) => !isNaN(parseFloat(val)), {
    message: "Price must be a number",
  })
  .refine((val) => parseFloat(val) > 0, {
    message: "Price must be greater than 0",
  })
  .refine((val) => parseFloat(val) <= 10000, {
    message: "Price must be less than 10,000",
  });

const paidCourseSchema = z.object({
  isFree: z.literal(false).default(false).optional(),
  price: priceValidation,
});

const freeCourseSchema = z.object({
  isFree: z.literal(true),
  price: z.string().optional(),
});

const baseSchema = z.object({
  welcomeMessage: z.string().min(20),
  congratulationsMessage: z.string().min(20),
  isPublic: z.boolean().optional(),
});

export const publishSchema = baseSchema.and(
  z
    .discriminatedUnion("isFree", [freeCourseSchema, paidCourseSchema])
    .default({ ...baseSchema.shape, isFree: false } as any)
);

export type PublishType = z.infer<typeof publishSchema>;

interface PublishCourseFormProps {
  defaultValues?: Partial<PublishType>;
  onSubmit: (data: PublishType) => void;
  onBack: () => void;
  isSubmitting:boolean
}

const PublishCourse = ({ defaultValues, onSubmit, onBack, isSubmitting }: PublishCourseFormProps) => {
  const form = useForm<PublishType>({
    resolver: zodResolver(publishSchema),
    defaultValues: defaultValues || {
      welcomeMessage: "",
      congratulationsMessage: "",
      price: "",
      isPublic: false,
      isFree: false,
    },
  });

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <h3 className="text-lg font-medium mb-4">Message</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <FormField
                control={form.control}
                name="welcomeMessage"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Welcome Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter course starting message here..."
                        className="min-h-[150px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="congratulationsMessage"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Congratulations Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your course completed message here..."
                        className="min-h-[150px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y- mt-8 ">
              <div className="flex flex-col mb-6 sm:w-1/4">
                {!form.watch("isFree") && (
                  <FormField
                    control={form.control}
                    name="price"
                    shouldUnregister={true}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Price </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter course price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="isFree"
                  render={({ field }) => (
                    <FormItem className=" flex gap-6 space-y-2 min-h-[50px] items-end">
                      <FormLabel>Make this course free</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                          className="h-4 w-4 text-primary focus:ring-primary"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  {/* <FormLabel>Course Status</FormLabel> */}
                  <div className="flex items-center space-x-5">
                    <FormLabel htmlFor="isPublic" className="text-sm">
                      Make this course public
                    </FormLabel>
                    <Checkbox
                      id="isPublic"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                      className="h-4 w-4 text-primary focus:ring-primary"
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between mt-8">
              <Button type="button" variant="outline" onClick={onBack}>
                Prev Step
              </Button>
              <Button type="submit" disabled={isSubmitting} >{isSubmitting ? "Submitting..." : "Submit and create"}</Button>
              {/* <Button type="submit" disabled={isSubmitting} className="relative">
                {isSubmitting ? (
                  <div className="absolute inset-0 flex justify-center items-center">
                    <Loader className="w-5 h-5 animate-spin text-white" />
                  </div>
                ) : (
                  "Submit and create"
                )}
              </Button> */}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PublishCourse;