import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { Plus, X } from "lucide-react"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Switch } from "../../ui/switch"
import type { CategoryFormValues } from "../../../types/category"

const formSchema = z.object({
  _id:z.string().optional(),
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  status: z.boolean(),
  subcategories: z
    .array(
      z.object({
        _id: z.string().optional(),  // _id is optional for subcategories
        name: z.string().min(2, {
          message: "Subcategory name must be at least 2 characters.",
        }),
      }),
    )
    .min(1, {
      message: "At least one subcategory is required.",
    }),
})

interface CategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: CategoryFormValues,id?:string) => void
  title: string
  submitLabel: string
  defaultValues?: CategoryFormValues
}

export function CategoryDialog({
  open,
  onOpenChange,
  onSubmit,
  title,
  submitLabel,
  defaultValues = {
    _id: "",
    name: "",
    status: true,
    subcategories: [{ name: "" }],
  },
}: CategoryDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subcategories",
  })

  useEffect(() => {
    if (open) {
      form.reset(defaultValues)
    }
  }, [form, defaultValues, open])

  function handleSubmit(values: z.infer<typeof formSchema>) {
    // Remove _id from subcategories if it's for a new category
    if (!defaultValues.subcategories[0]._id) {
      values.subcategories = values.subcategories.map(sub => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = sub // Destructure to remove _id
        return rest
      })
    }
    const {_id, ...updatedValues} = values

    onSubmit(updatedValues,_id as string,)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader className="p-2">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem >
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">Subcategories</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "" })}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Subcategory
                </Button>
              </div>
              <FormDescription>
                Add at least one subcategory
              </FormDescription>

              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`subcategories.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Subcategory name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="h-10 w-10"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove subcategory</span>
                    </Button>
                  )}
                </div>
              ))}

              {form.formState.errors.subcategories?.root && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.subcategories.root.message}
                </p>
              )}
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Visibility</FormLabel>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">{submitLabel}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}