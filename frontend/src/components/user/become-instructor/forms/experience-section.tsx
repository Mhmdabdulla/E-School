import type { Control } from "react-hook-form"

import { Input } from "../../../ui/input"
import { Textarea } from "../../../ui/textarea"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form"

import type { FormValues } from "../../../../lib/validations/instrucotApplication"

interface ExperienceSectionProps {
  control: Control<FormValues>
}

const ExperienceInfoSection = ({ control }: ExperienceSectionProps) => {
  return (
    <div className="grid gap-6 py-4">
      {/* Teaching Experience */}
      <FormField
        control={control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Teaching Experience</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your teaching experience, including years of experience and types of students you've taught."
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Current Occupation */}
      <FormField
        control={control}
        name="currentOccupation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Occupation</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Teacher, Engineer, Student" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default ExperienceInfoSection