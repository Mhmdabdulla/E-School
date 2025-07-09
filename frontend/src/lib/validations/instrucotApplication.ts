import { z } from "zod"

export const formSchema = z.object({
    idCardImage: z
    .union([z.instanceof(File), z.null()])
    .refine((file) => {
        if (file && file instanceof File) {
          return file.size <= 10 * 1024 * 1024;
        }
        return false; 
      }, {
        message: "File must be less than 10MB",
      })
      .refine((file) => {
        if (file && file instanceof File) {
          return file.type.startsWith("image/");
        }
        return false;
      }, {
        message: "Please upload a valid image file",
      })
      .refine((file) => {
        if (file && file instanceof File) {
          return file.size > 0;
        }
        return false;
      }, {
        message: "File is required",
      }),
    
  education: z.object({
    highestDegree: z.string().min(1, "Please select your highest degree"),
    institution: z.string().min(2, "Institution name is required"),
    graduationYear: z.string().regex(/^\d{4}$/, "Please enter a valid year"),
    fieldOfStudy: z.string().min(2, "Field of study is required"),
  }),
  experience: z.string().min(10, "Please provide your teaching experience"),
  currentOccupation: z.string().min(2, "Current occupation is required"),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  preferredSubjects: z.array(z.string()).min(1, "Please select at least one subject"),
  teachingLanguages: z.array(z.string()).min(1, "Please select at least one language"),
  bio: z.string().min(50, "Bio must be at least 50 characters").max(500, "Bio cannot exceed 500 characters"),
})

export type FormValues = z.infer<typeof formSchema>

export const defaultValues: FormValues = {
    idCardImage:null,
    education: {
    highestDegree: "",
    institution: "",
    graduationYear: "",
    fieldOfStudy: "",
  },
  experience: "",
  currentOccupation: "",
  skills: [],
  preferredSubjects: [],
  teachingLanguages: [],
  bio: "",
}

export const skills = [
  { id: "communication", label: "Communication" },
  { id: "patience", label: "Patience" },
  { id: "organization", label: "Organization" },
  { id: "time-management", label: "Time Management" },
  { id: "adaptability", label: "Adaptability" },
  { id: "problem-solving", label: "Problem Solving" },
  { id: "creativity", label: "Creativity" },
  { id: "empathy", label: "Empathy" },
  { id: "technology", label: "Technology" },
  { id: "assessment", label: "Assessment" },
]

export const subjects = [
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "english", label: "English" },
  { value: "history", label: "History" },
  { value: "geography", label: "Geography" },
  { value: "computer-science", label: "Computer Science" },
  { value: "foreign-languages", label: "Foreign Languages" },
  { value: "music", label: "Music" },
  { value: "art", label: "Art" },
  { value: "physical-education", label: "Physical Education" },
]

export const languages = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "italian", label: "Italian" },
  { value: "portuguese", label: "Portuguese" },
  { value: "russian", label: "Russian" },
  { value: "mandarin", label: "Mandarin" },
  { value: "japanese", label: "Japanese" },
  { value: "arabic", label: "Arabic" },
  { value: "hindi", label: "Hindi" },
]