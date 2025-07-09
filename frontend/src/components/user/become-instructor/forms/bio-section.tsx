import type { Control } from "react-hook-form";
import { Textarea } from "../../../ui/textarea";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form";
import type { FormValues } from "../../../../lib/validations/instrucotApplication";

interface BioSectionProps {
  control: Control<FormValues>;
}

const BioSection = ({ control }: BioSectionProps) => {
  return (
    <div className="grid gap-6 py-4">
      <FormField
        control={control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormDescription>Write a brief bio about yourself and why you want to be a tutor.</FormDescription>
            <FormControl>
              <Textarea
                placeholder="Tell us about yourself, your teaching philosophy, and what makes you a great tutor."
                className="min-h-[150px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
            <div className="mt-1 text-xs text-muted-foreground">{field.value.length}/500 characters</div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default BioSection;