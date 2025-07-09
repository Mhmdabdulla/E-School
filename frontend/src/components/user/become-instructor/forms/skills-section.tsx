import { ChevronsUpDown } from "lucide-react"
import { Button } from "../../../ui/button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../ui//form"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover"
import { Checkbox } from "../../../ui/checkbox"
import { cn } from "../../../../lib/utils/className"

import { type FormValues, skills, subjects, languages } from "../../../../lib/validations/instrucotApplication"
import { type Control } from "react-hook-form"

interface SkillsSubjectsSectionProps {
  control: Control<FormValues>
}

const SkillsInfoSection = ({ control }: SkillsSubjectsSectionProps) => {
  return (
    <div className="grid gap-6 py-4">
      <FormField
        control={control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Skills</FormLabel>
            <FormDescription>Select all skills that apply to you.</FormDescription>
            <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
              {skills.map((skill) => (
                <FormItem key={skill.id} className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(skill.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, skill.id])
                          : field.onChange(field.value?.filter((value) => value !== skill.id))
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{skill.label}</FormLabel>
                </FormItem>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Preferred Subjects Selection */}
      <FormField
        control={control}
        name="preferredSubjects"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Subjects</FormLabel>
            <FormDescription>Select subjects you'd like to teach.</FormDescription>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn("w-full justify-between", !field.value.length && "text-muted-foreground")}
                  >
                    {field.value.length > 0
                      ? `${field.value.length} subject${field.value.length > 1 ? "s" : ""} selected`
                      : "Select subjects"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search subjects..." />
                  <CommandList>
                    <CommandEmpty>No subject found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {subjects.map((subject) => (
                        <CommandItem
                          value={subject.label}
                          key={subject.value}
                          onSelect={() => {
                            const newValue = [...field.value]
                            const index = newValue.indexOf(subject.value)
                            if (index === -1) {
                              newValue.push(subject.value)
                            } else {
                              newValue.splice(index, 1)
                            }
                            field.onChange(newValue)
                          }}
                        >
                          <Checkbox checked={field.value.includes(subject.value)} className="mr-2" />
                          {subject.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Teaching Languages Selection */}
      <FormField
        control={control}
        name="teachingLanguages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Teaching Languages</FormLabel>
            <FormDescription>Select languages you can teach in.</FormDescription>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn("w-full justify-between", !field.value.length && "text-muted-foreground")}
                  >
                    {field.value.length > 0
                      ? `${field.value.length} language${field.value.length > 1 ? "s" : ""} selected`
                      : "Select languages"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search languages..." />
                  <CommandList>
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {languages.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            const newValue = [...field.value]
                            const index = newValue.indexOf(language.value)
                            if (index === -1) {
                              newValue.push(language.value)
                            } else {
                              newValue.splice(index, 1)
                            }
                            field.onChange(newValue)
                          }}
                        >
                          <Checkbox checked={field.value.includes(language.value)} className="mr-2" />
                          {language.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default SkillsInfoSection