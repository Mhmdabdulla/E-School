import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Form } from "../../ui/form";
import { Card, CardContent } from "../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/DropDownMenu";
import {
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  Video,
  FileText,
  X,
  Grid,
  BookOpen,
} from "lucide-react";

export const curriculumSchema = z.object({
  sections: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(5, "Section name should be at least 5 characters long"),
        description: z
          .string({ message: "Please enter description" })
          .min(10, "description should be atleast 10 char long"),
        lectures: z
          .array(
            z.object({
              id: z.string(),
              name: z.string().min(5, "Lecture name should be at least 5 characters long"),
              description: z
                .string({ message: "Please enter lesson description" })
                .min(10, "description should be atleast 10 char long"),
              type: z.enum(["video", "file"]),
              content: z.union([z.instanceof(File), z.undefined(), z.string()]).refine((val) => val !== null, {
                message: "Content is required",
              }),
              duration: z.string().optional(),
              isExpanded: z.boolean(),
            })
          )
          .min(1, "At least one lecture is required"),
      })
    )
    .min(1, "At least one section is required"),
});

export type CurriculumType = z.infer<typeof curriculumSchema>;

interface CurriculumFormProps {
  defaultValues?: Partial<CurriculumType>;
  onSubmit: (data: CurriculumType) => void;
  onBack: () => void;
}

const Curriculum = ({ defaultValues, onSubmit, onBack }: CurriculumFormProps) => {
  const [filePreviews, setFilePreviews] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (!defaultValues?.sections) return;
  
    defaultValues.sections.forEach((section) => {
      section.lectures.forEach((lecture) => {
        if (lecture.content && typeof lecture.content === 'string') {
          setFilePreviews((prev:any) => {
            if (prev[`${section.id}-${lecture.id}`] !== lecture.content) {
              return {
                ...prev,
                [`${section.id}-${lecture.id}`]: lecture.content,
              };
            }
            return prev;
          });
        }
      });
    });
  }, [defaultValues]); 
  


  const form = useForm<CurriculumType>({
    resolver: zodResolver(curriculumSchema),
    mode: "onSubmit",
    defaultValues: defaultValues || {
      sections: [
        {
          id: `1`,
          name: "",
          description: "",
          lectures: [
            {
              id: `1`,
              name: "",
              description: "",
              type: "video",
              content: undefined,
              isExpanded: false,
            },
          ],
        },
      ],
    },
  });

  const { sections } = form.watch();

  const addSection = () => {
    const currentSections = sections || [];

    const newSection = {
      id: `${currentSections.length + 1}`,
      name: "",
      description: "",
      lectures: [{
        id: `1`,
        name: "",
        description: "",
        type: "video" as "video" | "file" ,
        content: undefined,
        isExpanded: true,
      },],
    };

    const updatedSections = [...(sections || []), newSection];
    form.setValue("sections", updatedSections, { shouldValidate: true });
  };

  const updateSectionName = (sectionId: string, name: string) => {
    const updatedSections = (sections || []).map((section) => {
      if (section.id === sectionId) {
        return { ...section, name };
      }
      return section;
    });

    form.setValue("sections", updatedSections, { shouldValidate: true });
  };

  const updateSectionDescription = (sectionId: string, description: string) => {
    const updatedSections = (sections || []).map((section) => {
      if (section.id === sectionId) {
        return { ...section, description };
      }
      return section;
    });

    form.setValue("sections", updatedSections, { shouldValidate: true });
  };

  const deleteSection = (sectionId: string) => {
    const updatedSections = (sections || []).filter((section) => section.id !== sectionId);
    form.setValue("sections", updatedSections, { shouldValidate: true });
  };

  // Lecture handlers
  const addLecture = (sectionId: string) => {
    const updatedSections = (sections || []).map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          lectures: [
            ...(section.lectures || []),
            {
              id: `${section?.lectures?.length + 1}`,
              name: "",
              description: "",
              type: "video" as "video" | "file" ,
              content: undefined,
              isExpanded: true,
            },
          ],
        };
      }
      return section;
    });

    form.setValue("sections", updatedSections, { shouldValidate: true });
  };

  const updateLectureName = (sectionId: string, lectureId: string, name: string) => {
    const updatedSections = (sections || []).map((section) => {
      if (section.id === sectionId) {
        const updatedLectures = section.lectures?.map((lecture) => {
          if (lecture.id === lectureId) {
            return { ...lecture, name };
          }
          return lecture;
        });

        return { ...section, lectures: updatedLectures };
      }
      return section;
    });

    form.setValue("sections", updatedSections, { shouldValidate: true });
  };

  const updateLectureDescription = (sectionId: string, lectureId: string, description: string) => {
    const updatedSections = (sections || []).map((section) => {
      if (section.id === sectionId) {
        const updatedLectures = section.lectures?.map((lecture) => {
          if (lecture.id === lectureId) {
            return { ...lecture, description };
          }
          return lecture;
        });

        return { ...section, lectures: updatedLectures };
      }
      return section;
    });

    form.setValue("sections", updatedSections, { shouldValidate: true });
  };

  const toggleLectureExpanded = (sectionId: string, lectureId: string) => {
    const updatedSections = (sections || []).map((section) => {
      if (section.id === sectionId) {
        const updatedLectures = section.lectures?.map((lecture) => {
          if (lecture.id === lectureId) {
            return { ...lecture, isExpanded: !lecture.isExpanded };
          }
          return lecture;
        });

        return { ...section, lectures: updatedLectures };
      }
      return section;
    });

    form.setValue("sections", updatedSections);
  };

  const updateLectureType = (sectionId: string, lectureId: string, type: "video" | "file" ) => {
    const updatedSections = (sections || []).map((section) => {
      if (section.id === sectionId) {
        const updatedLectures = section.lectures?.map((lecture) => {
          if (lecture.id === lectureId) {
            return { ...lecture, type };
          }
          return lecture;
        });

        return { ...section, lectures: updatedLectures };
      }
      return section;
    });

    form.setValue("sections", updatedSections, { shouldValidate: true });
  };

  const updateLectureContent = (sectionId: string, lectureId: string, content: File | undefined) => {
    const updatedSections = (sections || []).map((section) => {
      if (section.id === sectionId) {
        const updatedLectures = section.lectures?.map((lecture) => {
          if (lecture.id === lectureId) {
            return { ...lecture, content };
          }
          return lecture;
        });

        return { ...section, lectures: updatedLectures };
      }
      return section;
    });

    form.setValue("sections", updatedSections, { shouldValidate: true });
  };

  const handleFileUpload = (sectionId: string, lectureId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Update lecture content with file name
      updateLectureContent(sectionId, lectureId, file);

      // Create preview URL for video files
      if (file.type.startsWith("video/")) {
        const url = URL.createObjectURL(file);
        setFilePreviews((prev) => ({
          ...prev,
          [`${sectionId}-${lectureId}`]: url,
        }));
      }
    }
  };

  const removeFile = (sectionId: string, lectureId: string) => {
    // Clear content
    updateLectureContent(sectionId, lectureId, undefined);

    // Clear preview
    setFilePreviews((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[`${sectionId}-${lectureId}`];
      return newPreviews;
    });

    // Clear file input
    const inputRef = fileInputRefs.current[`${sectionId}-${lectureId}`];
    if (inputRef) {
      inputRef.value = "";
    }
  };

  const deleteLecture = (sectionId: string, lectureId: string) => {
    const updatedSections = (sections || []).map((section) => {
      if (section.id === sectionId) {
        const updatedLectures = section.lectures?.filter((lecture) => lecture.id !== lectureId);
        return { ...section, lectures: updatedLectures };
      }
      return section;
    });

    form.setValue("sections", updatedSections, { shouldValidate: true });

    // Clean up any file previews
    setFilePreviews((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[`${sectionId}-${lectureId}`];
      return newPreviews;
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {form.formState.errors.sections?.root && (
              <p className="text-sm text-red-500 mb-4">{form.formState.errors.sections.root.message}</p>
            )}

            {sections?.map((section, index) => (
              <div key={section.id} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 p-3 rounded-md mb-2">
                  <Grid className="h-5 w-5 text-gray-500" />
                  <div className="font-medium text-sm">Module {String(index + 1).padStart(2, "0")} :</div>
                  <Input
                    value={section.name}
                    onChange={(e) => updateSectionName(section.id, e.target.value)}
                    className={`h-8 flex-1 ${
                      form.formState.errors.sections?.[index]?.name ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => addLecture(section.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => deleteSection(section.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {form.formState.errors.sections?.[index]?.name && (
                  <p className="text-sm text-red-500 ml-4 mb-2">
                    {form.formState.errors.sections[index]?.name?.message}
                  </p>
                )}

                {form.formState.errors.sections?.[index]?.lectures?.root && (
                  <p className="text-sm text-red-500 ml-4 mb-2">
                    {form.formState.errors.sections[index]?.lectures?.root?.message}
                  </p>
                )}

                <div className="ml-4 py-2 mb-2">
                  <Input
                    value={section.description || ""}
                    onChange={(e) => updateSectionDescription(section.id, e.target.value)}
                    className={`h-8 flex-1 ${
                      form.formState.errors.sections?.[index]?.description ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    placeholder="Section Description"
                  />
                  {form.formState.errors.sections?.[index]?.description && (
                    <p className="text-sm text-red-500 ml-4 mb-2">
                      {form.formState.errors.sections[index]?.description?.message}
                    </p>
                  )}
                </div>

                <div className="pl-4 space-y-2">
                  {section.lectures?.map((lecture, lectureIndex) => (
                    <div key={lecture.id} className="border rounded-md">
                      <div className="flex items-center gap-2 p-3">
                        <BookOpen className="h-5 w-5 text-gray-500" />
                        <div className="font-medium text-sm">
                          Lesson {String(lectureIndex + 1).padStart(2, "0")} : Title
                        </div>
                        <Input
                          value={lecture.name}
                          onChange={(e) => updateLectureName(section.id, lecture.id, e.target.value)}
                          className={`h-8 flex-1 ${
                            form.formState.errors.sections?.[index]?.lectures?.[lectureIndex]?.name
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          placeholder="Enter lesson title"
                        />
                        <div className="flex gap-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8">
                                Contents{" "}
                                {lecture.isExpanded ? (
                                  <ChevronUp className="ml-1 h-4 w-4" />
                                ) : (
                                  <ChevronDown className="ml-1 h-4 w-4" />
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => updateLectureType(section.id, lecture.id, "video")}>
                                <Video className="mr-2 h-4 w-4" />
                                <span>Video</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateLectureType(section.id, lecture.id, "file")}>
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Attach File</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleLectureExpanded(section.id, lecture.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => deleteLecture(section.id, lecture.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {form.formState.errors.sections?.[index]?.lectures?.[lectureIndex]?.name && (
                        <p className="text-sm text-red-500 px-3 pb-2">
                          {form.formState.errors.sections[index]?.lectures?.[lectureIndex]?.name?.message}
                        </p>
                      )}

                      <div className="ml-4 mt-2">
                        <Input
                          value={lecture.description || ""}
                          onChange={(e) => updateLectureDescription(section.id, lecture.id, e.target.value)}
                          className={`h-8 flex-1 ${
                            form.formState.errors.sections?.[index]?.lectures?.[lectureIndex]?.description
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          placeholder="Lecture Description"
                        />
                        {form.formState.errors.sections?.[index]?.lectures?.[lectureIndex]?.description && (
                          <p className="text-sm text-red-500 ml-4 mb-2">
                            {form.formState.errors.sections[index]?.lectures?.[lectureIndex]?.description?.message}
                          </p>
                        )}
                      </div>

                      {lecture.isExpanded && (
                        <div className="p-4 border-t">
                          {lecture.type === "video" && (
                            <div className="flex flex-col items-center justify-center p-6 border border-dashed border-gray-300 rounded-md">
                              {filePreviews[`${section.id}-${lecture.id}`] ? (
                                <div className="relative w-full mb-4">
                                  <div className="absolute top-2 right-2 z-10">
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="icon"
                                      className="h-8 w-8 rounded-full"
                                      onClick={() => removeFile(section.id, lecture.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <video
                                    src={filePreviews[`${section.id}-${lecture.id}`]}
                                    controls
                                    className="w-full aspect-video object-cover rounded-md"
                                  />
                                </div>
                              ) : (
                                <>
                                  <Video className="h-12 w-12 text-gray-400 mb-4" />
                                  <p className="text-sm text-center mb-4">Upload your lecture video here</p>
                                </>
                              )}
                              <input
                                type="file"
                                accept="video/mp4,video/webm,video/ogg"
                                className="hidden"
                                ref={(el: any) => (fileInputRefs.current[`${section.id}-${lecture.id}`] = el)}
                                onChange={(e) => handleFileUpload(section.id, lecture.id, e)}
                              />
                              <Button
                                type="button"
                                onClick={() => fileInputRefs.current[`${section.id}-${lecture.id}`]?.click()}
                              >
                                {lecture.content ? "Change Video" : "Upload Video"}
                              </Button>

                              {form.formState.errors?.sections?.[index]?.lectures?.[lectureIndex]?.content && (
          <p className="text-sm text-red-500 mt-2">
            {form.formState.errors.sections[index].lectures[lectureIndex].content.message}
          </p>
        )}
                            </div>
                          )}

                          {lecture.type === "file" && (
                            <div className="flex flex-col items-center justify-center p-6 border border-dashed border-gray-300 rounded-md">
                              {lecture.content ? (
                                <div className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-md mb-4">
                                  <div className="flex items-center">
                                    <FileText className="h-6 w-6 text-gray-500 mr-2" />
                                    {/* <span className="text-sm font-medium">{lecture.content}</span> */}
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500"
                                    onClick={() => removeFile(section.id, lecture.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  <FileText className="h-12 w-12 text-gray-400 mb-4" />
                                  <p className="text-sm text-center mb-4">Upload your lecture materials here</p>
                                </>
                              )}
                              <input
                                type="file"
                                className="hidden"
                                ref={(el: any) => (fileInputRefs.current[`${section.id}-${lecture.id}`] = el)}
                                onChange={(e) => handleFileUpload(section.id, lecture.id, e)}
                              />
                              <Button
                                type="button"
                                onClick={() => fileInputRefs.current[`${section.id}-${lecture.id}`]?.click()}
                              >
                                {lecture.content ? "Change File" : "Attach File"}
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-6">
              <Button type="button" variant="outline" className="w-full py-6 border-dashed" onClick={addSection}>
                <Plus className="mr-2 h-4 w-4" />
                Add Module
              </Button>
            </div>

            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={onBack}>
                Previous
              </Button>
              <Button type="submit">Save & Next</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Curriculum;