import z from "zod";

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
              isExpanded: z.boolean().default(false),
            })
          )
          .min(1, "At least one lecture is required"),
      })
    )
    .min(1, "At least one section is required"),
});