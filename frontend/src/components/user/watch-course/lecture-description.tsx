import { Card, CardContent } from "../../ui/card"

interface LectureDescriptionProps{
    description:string
}

export function LectureDescription({description}:LectureDescriptionProps) {
  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-3">Lecture Description</h3>
        <p className="text-muted-foreground">
            {description}
        </p>
        {/* <p className="text-muted-foreground">
          In this lecture, you'll learn how to sign up for Webflow and get started with your first project. We'll cover
          the basics of the Webflow interface, how to navigate the dashboard, and how to create a new project from
          scratch or using a template.
        </p>
        <p className="text-muted-foreground mt-4">
          By the end of this lecture, you'll have your Webflow account set up and be ready to start designing your first
          website. We'll also discuss the different pricing plans and which one might be right for your needs.
        </p>
        <p className="text-muted-foreground mt-4">
          This is the second lecture in our comprehensive course on website design, where we'll take you from Figma
          designs to fully functional Webflow websites.
        </p> */}
      </CardContent>
    </Card>
  )
}