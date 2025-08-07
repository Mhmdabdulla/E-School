/* eslint-disable react-refresh/only-export-components */
import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "../../ui/button"
import { Textarea } from "../../ui/textarea"
import { Input } from "../../ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../ui/form"
import { Card, CardContent } from "../../ui/card"
import {Plus, Image, X, Video, Upload } from "lucide-react"

export const advancedInformationSchema = z.object({
  thumbnail: z.union([z.instanceof(File), z.undefined(), z.string()]).refine((val) => val !== null,{
      message: "Thumbnail image is required", 
    }),
  trailer: z.union([z.instanceof(File), z.undefined(), z.string()]).optional(),
  description: z.string({message:'Description is required'}).min(50, "Description should be at least 50 characters long"),
  teachItems: z
    .array(
      z.object({
        id: z.number(),
        content: z
          .string()
          .min(5, "Item should be at least 5 characters long")
          .max(120, "Item must be less than 120 characters"),
      }),
    )
    .min(1, "At least one teaching item is required"),
})

export type AdvancedInformationType = z.infer<typeof advancedInformationSchema>

interface AdvancedInformationFormProps {
  defaultValues?: Partial<AdvancedInformationType>
  onSubmit: (data: AdvancedInformationType) => void
  onBack: () => void
}

const AdvancedInformation = ({ defaultValues, onSubmit, onBack }: AdvancedInformationFormProps) => {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [trailerPreview, setTrailerPreview] = useState<string | null>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const trailerInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<AdvancedInformationType>({
    resolver: zodResolver(advancedInformationSchema),
    defaultValues: defaultValues || {
      thumbnail: undefined,
      trailer: undefined,
      description: "",
      teachItems: [
        { id: 1, content: "" },
        { id: 2, content: "" },
        { id: 3, content: "" },
        { id: 4, content: "" },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "teachItems",
  })


  useEffect(()=>{
    if(defaultValues){
      if(defaultValues.thumbnail){
        setThumbnailPreview(defaultValues.thumbnail as string)
      }
      
      if(defaultValues.trailer){
        setTrailerPreview(defaultValues.trailer as string)
      }
      
    }
  }, [defaultValues])
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    e.preventDefault()
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setThumbnailPreview(reader.result as string)
        form.setValue("thumbnail", file , { shouldValidate: false })
      }
      reader.readAsDataURL(file)
    }

  }

  const handleTrailerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("trailer", file)

      // Create a video preview URL if possible
      if (file.type.startsWith("video/")) {
        const url = URL.createObjectURL(file)
        setTrailerPreview(url)
      }
    }
  }

  const removeThumbnail = () => {
    setThumbnailPreview(null)
    form.setValue("thumbnail", undefined, { shouldValidate: true })
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = ""
    }
  }

  const removeTrailer = () => {
    setTrailerPreview(null)
    form.setValue("trailer", undefined)
    if (trailerInputRef.current) {
      trailerInputRef.current.value = ""
    }
  }

  const addTeachItem = () => {
    if (fields.length < 8) {
      append({ id: fields.length + 1, content: "" })
    }
  }

  return (
    <>
      <Card className="mb-6">
        <CardContent className="p-6">
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-15 px-6">
                <div>
                  <h3 className="font-medium mb-4">Course Thumbnail</h3>
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                    {thumbnailPreview ? (
                      <div className="relative w-full mb-4">
                        <div className="absolute top-2 right-2 z-10">
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={removeThumbnail}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <img
                          src={thumbnailPreview || "/placeholder.svg"}
                          alt="Thumbnail preview"
                          className="w-full aspect-video object-cover rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-video  rounded-md flex items-center justify-center mb-4">
                        <Image className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    <div className="text-sm text-center mb-4">
                      <p>Upload your course Thumbnail here.</p>
                      <p className="font-medium mt-1">Important guidelines:</p>
                      <p className="text-muted-foreground">
                        1200×800 pixels or 12:8 Ratio. Supported format: .jpg, .jpeg, or .png
                      </p>
                    </div>
                    <input
                      type="file"
                      ref={thumbnailInputRef}
                      accept="image/jpeg,image/png,image/jpg"
                      className="hidden"
                      onChange={handleThumbnailChange}
                    />
                    <Button type="button" className="gap-2"  onClick={() => thumbnailInputRef.current?.click()}>
                      <Upload className="h-4 w-4" />
                      Upload Image
                    </Button>
                    {form.formState.errors.thumbnail && (
                      <p className="text-sm text-red-500 mt-2 text-center">{form.formState.errors.thumbnail.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className=" font-medium mb-4">Course Trailer</h3>
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                    {trailerPreview ? (
                      <div className="relative w-full mb-4">
                        <div className="absolute top-2 right-2 z-10">
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={removeTrailer}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <video src={trailerPreview} controls className="w-full aspect-video object-cover rounded-md" />
                      </div>
                    ) : (
                      <div className="w-full aspect-video  rounded-md flex items-center justify-center mb-4">
                        <div className="h-16 w-16 rounded-full  flex items-center justify-center">
                          <Video className="h-8 w-8 text-gray-500" />
                        </div>
                      </div>
                    )}
                    <div className="text-sm text-center mb-4">
                      <p>Students who watch a well-made promo video are 5x more likely to enroll in your course.</p>
                      <p className="text-muted-foreground mt-1">
                        We've seen that statistics go up to 10X for exceptionally awesome videos.
                      </p>
                    </div>
                    <input
                      type="file"
                      ref={trailerInputRef}
                      accept="video/mp4,video/webm,video/ogg"
                      className="hidden"
                      onChange={handleTrailerChange}
                    />
                    <Button type="button" className="gap-2" onClick={() => trailerInputRef.current?.click()}>
                      <Video className="h-4 w-4" />
                      Upload Video
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <h3 className="text-lg font-medium mb-4">Course Descriptions</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your course descriptions"
                          className="min-h-[200px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">What you will teach in this course ({fields.length}/8)</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTeachItem}
                  disabled={fields.length >= 8}
                  className="gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add new
                </Button>
              </div>

              {form.formState.errors.teachItems?.root && (
                <p className="text-sm text-red-500 mb-4">{form.formState.errors.teachItems.root.message}</p>
              )}
{/* 
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="relative">
                    <div className="absolute left-4 top-3 text-sm font-medium text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <FormField
                      control={form.control}
                      name={`teachItems.${index}.content`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="What you will teach in this course..."
                              className="pl-12 pr-16"
                            />
                          </FormControl>
                          <div className="absolute right-4 top-3 text-xs text-muted-foreground">
                            {field.value.length}/120
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div> */}

              <div className="space-y-4">
  {fields.map((field, index) => (
    <div key={field.id} className="relative">
      {/* Number label for each item */}
      <div className="absolute left-4 top-2 text-sm font-medium text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </div>
      
      {/* Form field for the teaching item */}
      <FormField
        control={form.control}
        name={`teachItems.${index}.content`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                placeholder="What you will teach in this course..."
                className="pl-12 pr-20" // Adjusted padding for space on the right
              />
            </FormControl>
            
            {/* Character count */}
            <div className="absolute right-14 top-3 text-xs text-muted-foreground">
              {field.value.length}/120
            </div>
            
            {/* Remove button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-0 bg-transparent hover:bg-transparent cursor-pointer"
              onClick={() => remove(index)}
              aria-label="Remove this teaching item"
            
            >
              <X className="h-4 w-4" />
            </Button>
            
            {/* Error message */}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  ))}
</div>

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={onBack}>
                  Back
                </Button>
                <Button type="submit">Save & Next</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}



export default AdvancedInformation