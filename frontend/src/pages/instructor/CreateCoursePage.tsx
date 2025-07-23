import { useState } from "react"
import { Card, CardContent } from "../../components/ui/card"
import { FileText, Layers, CheckCircle } from "lucide-react"
import StepItem from "../../components/instructor/create_course/common/StepItem"
import { Sidebar } from "../../components/instructor/common/Sidebar"
import PublishCourse, { type PublishType } from "../../components/instructor/create_course/PublishCourse"
import Curriculum, { type CurriculumType } from "../../components/instructor/create_course/Curriculum"
import AdvancedInformation, { type AdvancedInformationType } from "../../components/instructor/create_course/AdvancedInformation"
import BasicInformation, { type BasicInformationType } from "../../components/instructor/create_course/BasicInformation"
import PageHeader from "../../components/instructor/common/Header"
import { createCourseData, createLessonData, createModuleData } from "../../lib/utils/courses"
import ProgressLoaderModal from "../../components/instructor/create_course/progress-loader"
import { createCourse } from "../../services/courseService"
import { createModule } from "../../services/moduleService"
import { createLesson } from "../../services/lessonService"


const CreateCoursePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus] = useState<{
    success: boolean
    message: string
    courseId?: string
  } | null>(null)

  // Form state
  const [basicInformation, setBasicInformation] = useState<Partial<BasicInformationType>>({})
  const [advancedInformation, setAdvancedInformation] = useState<Partial<AdvancedInformationType>>({
    teachItems: [
      { id: 1, content: "" },
    ],
  })
  const [curriculum, setCurriculum] = useState<Partial<CurriculumType>>({
    sections: [
      {
        id: '1',
        name: "",
        description: "",
        lectures: [
          {
            id: '1',
            name: "",
            description: "",
            type: "video",
            content: undefined,
            isExpanded: true,
          },
        ],
      },
    ],
  })
  const [publish, setPublish] = useState<Partial<PublishType>>({})
  

  const handleBasicInfoSubmit = (data: BasicInformationType) => {
    setBasicInformation(data)
    setCurrentStep(2)
  }

  const handleAdvancedInfoSubmit = (data: AdvancedInformationType) => {
    setAdvancedInformation(data)
    setCurrentStep(3)
  }

  const handleCurriculumSubmit = (data: CurriculumType) => {
    setCurriculum(data)
    setCurrentStep(4)
  }

  const handlePublishSubmit = async (data: PublishType) => {
    setPublish(data)
    await publishCourse(data)
  }

  type ProgressStep = {
    message: string;
    status: "pending" | "success" | "error";
  };

  const [progressSteps, setProgressSteps] = useState<ProgressStep[]>([]);
const [showProgress, setShowProgress] = useState(false);

const updateStep = (message: string, status: ProgressStep["status"] = "pending") => {
  setProgressSteps([{ message, status }]);
};

const markLastStep = (status: ProgressStep["status"]) => {
  setProgressSteps((prev) => {
    const newSteps = [...prev];
    newSteps[newSteps.length - 1].status = status;
    return newSteps;
  });
};


  const publishCourse = async (publish: PublishType) => {
    setShowProgress(true);
    setProgressSteps([]);
    try {
      setIsSubmitting(true)
      updateStep("Creating course...");
      const courseDate = createCourseData(basicInformation,advancedInformation,publish)
      const response = await createCourse(courseDate)
      const courseId = response.data._id
      markLastStep("success");

     if(curriculum.sections){
      for (const section of curriculum.sections) {
        updateStep(`Creating module: ${section.name || "Untitled"}...`);

        const moduleData = createModuleData(section, courseId)      
        const response = await createModule(moduleData)
        const moduleId = response.data._id
        markLastStep("success");

        for (const lecture of section.lectures) {
          updateStep(`Creating lesson: ${lecture.name || "Untitled"}...`);

          const lessonData = createLessonData(lecture,courseId,moduleId);
           await createLesson(lessonData)
          markLastStep("success");
        }
      }
    }
    updateStep("All steps completed!");
    markLastStep("success");
      console.log(response)
    } catch (error:any) {
      markLastStep("error");
      updateStep("Failed to publish. Please try again.", "error");
      console.log(error)
    }finally{
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background" >
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      {showProgress && <ProgressLoaderModal
  open={showProgress}
  title="Publishing Course"
  description="Please wait while we complete all publishing steps."
  steps={progressSteps}
  onDone={() => {
    setShowProgress(false);
    setProgressSteps([]);
    setCurrentStep(1);
    setBasicInformation({})
    setAdvancedInformation({})
    setPublish({})
  }}
/>}

      <div className="flex-1 flex flex-col overflow-hidden">
        <PageHeader />

        <main className="flex-1 overflow-y-auto p-6 pb-16 ">
          <Card className="mb-6 px-5 py-2">
            <CardContent className="p-0 ">
              <div className="flex flex-row  p-0">
                <StepItem
                  icon={<Layers className="h-3 w-3" />}
                  title="Basic Information"
                  isActive={currentStep === 1}
                  isCompleted={currentStep > 1}
                />
                <StepItem
                  icon={<FileText className="h-3 w-3" />}
                  title="Advance Information"
                  isActive={currentStep === 2}
                  isCompleted={currentStep > 2}
                />
                <StepItem
                  icon={<Layers className="h-3 w-3" />}
                  title="Curriculum"
                  isActive={currentStep === 3}
                  isCompleted={currentStep > 3}
                />
                <StepItem
                  icon={<CheckCircle className="h-3 w-3" />}
                  title="Publish Course"
                  isActive={currentStep === 4}
                  isCompleted={currentStep > 4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {currentStep === 1 && "Basic Information"}
              {currentStep === 2 && "Advance Information"}
              {currentStep === 3 && "Course Curriculum"}
              {currentStep === 4 && "Publish Course"}
            </h2>
          </div>

          {submissionStatus && (
            <div
              className={`mb-6 p-4 rounded-md ${submissionStatus.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
            >
              <p className="font-medium">{submissionStatus.message}</p>
              {submissionStatus.courseId && <p className="text-sm mt-1">Course ID: {submissionStatus.courseId}</p>}
            </div>
          )}

          {currentStep === 1 && (
            <BasicInformation
              defaultValues={basicInformation}
              onSubmit={handleBasicInfoSubmit}
              onCancel={() => {}}
            />
          )}

          {currentStep === 2 && (
            <AdvancedInformation
              defaultValues={advancedInformation}
              onSubmit={handleAdvancedInfoSubmit}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <Curriculum
              defaultValues={curriculum}
              onSubmit={handleCurriculumSubmit}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <PublishCourse
              defaultValues={publish}
              onSubmit={handlePublishSubmit}
              onBack={() => setCurrentStep(3)}
              isSubmitting={isSubmitting}
            />
          )}

          {/* <PageFooter /> */}
        </main>
      </div>
    </div>
  )
}

export default CreateCoursePage