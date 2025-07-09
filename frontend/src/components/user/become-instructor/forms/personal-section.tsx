import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form"
import { Input } from "../../../ui/input"


import type { FormValues } from "../../../../lib/validations/instrucotApplication"
import { type Control } from "react-hook-form"

interface PersonalInfoSectionProps {
  control: Control<FormValues>
}

const PersonalInfoSection = ({ control }: PersonalInfoSectionProps) => {
  return (
    <div className="grid gap-6 py-4 sm:grid-cols-2">
      <FormField
        control={control}
        name="idCardImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID Card Image</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    field.onChange(e.target.files[0]) 
                  }
                }}
              />
            </FormControl>
            {field.value && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(field.value)}
                  alt="ID Card Preview"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default PersonalInfoSection