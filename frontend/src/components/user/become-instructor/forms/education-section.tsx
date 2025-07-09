import type { Control } from "react-hook-form"

import { Input } from "../../../ui/input"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"

import type { FormValues } from "../../../../lib/validations/instrucotApplication"

interface EducationSectionProps {
  control: Control<FormValues>
}

const EducationInfoSecion = ({ control }: EducationSectionProps) => {
  return (
    <div className="grid gap-6 py-4 sm:grid-cols-2">
      {/* Highest Degree */}
      <FormField
        control={control}
        name="education.highestDegree"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Highest Degree</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your highest degree" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="high-school">High School</SelectItem>
                <SelectItem value="associate">Associate's Degree</SelectItem>
                <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                <SelectItem value="master">Master's Degree</SelectItem>
                <SelectItem value="doctorate">Doctorate</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Institution Name */}
      <FormField
        control={control}
        name="education.institution"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Institution</FormLabel>
            <FormControl>
              <Input placeholder="University name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Graduation Year */}
      <FormField
        control={control}
        name="education.graduationYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Graduation Year</FormLabel>
            <FormControl>
              <Input placeholder="YYYY" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Field of Study */}
      <FormField
        control={control}
        name="education.fieldOfStudy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Field of Study</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Computer Science" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default EducationInfoSecion