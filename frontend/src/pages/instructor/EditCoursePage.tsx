  import { useState, useEffect } from "react";
  import { useNavigate, useParams } from "react-router-dom"; 
  import { Card, CardContent } from "../../components/ui/card";
  import { Button } from "../../components/ui/button";
  import { FileText, Layers, CheckCircle } from "lucide-react";
  import {isEqual} from 'lodash'
  import { Sidebar } from "../../components/instructor/common/Sidebar";
  import PageHeader from "../../components/instructor/common/Header";
  import BasicInformation, { type BasicInformationType } from "../../components/instructor/create_course/BasicInformation";
  import AdvancedInformation, { type AdvancedInformationType } from "../../components/instructor/create_course/AdvancedInformation";
  import Curriculum, { type CurriculumType } from "../../components/instructor/create_course/Curriculum";
  import PublishCourse, { type PublishType } from "../../components/instructor/create_course/PublishCourse";
  import StepItem from "../../components/instructor/create_course/common/StepItem";
  import { getCourseById, updateCourse } from "../../services/courseService";
  import { createAdvancedInformationData, createBasicInformationData, createCourseData, createCurriculumData, createLessonData, createModuleData, createPublishData } from "../../lib/utils/courses";
  import { toast } from "sonner";
import { createModule, deleteModule, updateModule } from "../../services/moduleService";
import { createLesson, deleteLesson, updateLesson } from "../../services/lessonService";

  export default function EditCoursePage() {
    const { courseId } = useParams();  
    const navigate = useNavigate();  
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [submissionStatus, setSubmissionStatus] = useState<{
      success: boolean;
      message: string;
    } | null>(null);

    const [basicInformation, setBasicInformation] = useState<Partial<BasicInformationType>>({});
    const [advancedInformation, setAdvancedInformation] = useState<Partial<AdvancedInformationType>>({});
    const [curriculum, setCurriculum] = useState<Partial<CurriculumType>>({});
    const [publish, setPublish] = useState<Partial<PublishType>>({});

    const [prevBasicInfo, setPrevBasicInfo] = useState<Partial<BasicInformationType>>({});
    const [prevCurriculum, setPrevCurriculum] = useState<Partial<CurriculumType>>({});
    const [prevAdvancedInfo, setPrevAdvancedInfo] = useState<Partial<AdvancedInformationType>>({});
    const [prevPublishData, setPrevPublishData] = useState<Partial<PublishType>>({});
    
    useEffect(() => {
      const fetchCourseData = async () => {
        try {
          setIsLoading(true);
          const res = await getCourseById(courseId as string);
          const courseData = res.data
          console.log('coursedata',courseData)

          setBasicInformation(createBasicInformationData(courseData));
          setAdvancedInformation(createAdvancedInformationData(courseData));
          setCurriculum(createCurriculumData(courseData));
          setPublish(createPublishData(courseData));

          setPrevBasicInfo(createBasicInformationData(courseData));
          setPrevCurriculum(createCurriculumData(courseData) as Partial<CurriculumType>);
          setPrevAdvancedInfo(createAdvancedInformationData(courseData) as Partial<AdvancedInformationType>);
          setPrevPublishData(createPublishData(courseData));
        } catch (error) {
          console.error("Failed to fetch course data:", error);
          navigate("/instructor/my-courses"); 
        } finally {
          setIsLoading(false);
        }
      };

      fetchCourseData();
    }, [courseId, navigate]);

    const handleBasicInfoSubmit = (data: BasicInformationType) => {
      setBasicInformation(data);
      setCurrentStep(2);
    };

    const handleAdvancedInfoSubmit = (data: AdvancedInformationType) => {
      setAdvancedInformation(data);
      setCurrentStep(3);
    };

    const handleCurriculumSubmit = (data: CurriculumType) => {
      setCurriculum(data);
      setCurrentStep(4);
    };

    const handlePublishSubmit = async (data: PublishType) => {
      setPublish(data);
      await updateCourseData(data);
    };

    const compareAndUpdateModulesAndLessons = async () => {
      const newCurriculum = curriculum;
      const oldCurriculum = prevCurriculum;

      if(oldCurriculum.sections){
      for (const module of oldCurriculum.sections) {
        const newModule = newCurriculum.sections?.find((newMod) => newMod.id === module.id);

        if (!newModule) {
          console.log(`Module deleted: ${module.id}`);
          await deleteModule(module.id); 
          for (const lesson of module.lectures) {
            console.log(`Lesson deleted: ${lesson.id}`);
            await deleteLesson(lesson.id); 
          }
        } else {
          const updatedModule = getChangedFields(newModule, module, ['lectures']); 
          if (Object.keys(updatedModule).length > 0) {
            const updatedModuleData = createModuleData(updatedModule)
            console.log(`Module updated: `, module.id ,updatedModuleData);
            try {
              const res = await updateModule(module.id,updatedModuleData); 
              console.log(res)
            } catch (error) {
              console.log(error)
            }
          }

          for (const lesson of module.lectures) {
            const newLesson = newModule.lectures.find((newLsn) => newLsn.id === lesson.id);
            if (!newLesson) {
              try {
                console.log(lesson.id)
               const res = await deleteLesson(lesson.id);
               console.log(res)
              } catch (error) {
                console.log(error)
              }
            } else {
              const updatedLesson = getChangedFields(newLesson, lesson); 
            if (Object.keys(updatedLesson).length > 0) {
              try {
                console.log(`Lesson updated: `, updatedLesson);
              const updatedLessonData = createLessonData(updatedLesson)
              const res = await updateLesson(newLesson.id, updatedLessonData); 
              console.log(res)
              } catch (error) {
                console.log(error)
              }
            }
            }
          }

          for (const newLesson of newModule.lectures) {
            if (!module.lectures.find((lsn:any) => lsn.id === newLesson.id)) {
             try {
              const lessonData = createLessonData(newLesson,courseId,newModule.id )

              const res = await createLesson(lessonData);
              console.log(res)
             } catch (error) {
              console.log(error)
             }
            }
          }
        }
      }
  }

      for (const newModule of newCurriculum.sections ?? []) {
        if (!oldCurriculum.sections?.find((mod) => mod.id === newModule.id)) {
          const moduleData = createModuleData(newModule, courseId)
          
          const moduleRes = await createModule(moduleData);
          const newModuleId = moduleRes.data._id;
          
          for (const newLesson of newModule.lectures) {
            try {
              const lessonData = createLessonData(newLesson,courseId,newModuleId)
            const res = await createLesson(lessonData);
            console.log(res.data)
            } catch (error) {
              console.log(error)
            }
          }
        }
      }
    };

    const getChangedFields = (newData:any, prevData:any, excludeFields: string[] = []) => {
      const changedFields: Record<string, any> = {};
    
      for (const key in newData) {
        if (!excludeFields.includes(key)) {
         if (!isEqual(newData[key], prevData[key])) {
          changedFields[key] = newData[key];
          
        }
      }
      }  
      return changedFields;
    };
  
    const updateCourseData = async (data:PublishType) => {
      const  publish = data
      setIsSubmitting(true);
      setSubmissionStatus(null);
      try {

        const getUpdatedCourseData = () => {
          const updatedData: Partial<{
            basicInformation: Record<string, any>;
            advancedInformation: Record<string, any>;
            publish: Record<string, any>;
          }> = {};
        
          const basicChanged = getChangedFields(basicInformation, prevBasicInfo);
          if (Object.keys(basicChanged).length > 0) {
            updatedData.basicInformation = basicChanged;
          }
        
          const advancedChanged = getChangedFields(advancedInformation, prevAdvancedInfo);
          if (Object.keys(advancedChanged).length > 0) {
            updatedData.advancedInformation = advancedChanged;
          }
        
          const publishChanged = getChangedFields(publish, prevPublishData);
          if (Object.keys(publishChanged).length > 0) {
            updatedData.publish = publishChanged;
          }
        
          return updatedData;
        };

    const updatedData = getUpdatedCourseData()

        if (Object.keys(updatedData).length > 0) { 

          try {
            const courseDate = createCourseData(updatedData.basicInformation ?? {}, updatedData.advancedInformation ?? {}, updatedData.publish as PublishType)
           const res = await updateCourse(courseId as string,courseDate)
           console.log(res)
          } catch (error) {
            toast.error(error as string || "error while updating course")
            console.log(error)
            return
          }
        }
        await compareAndUpdateModulesAndLessons();
      toast.success('course updated successfully', {position:"top-right"})
      navigate("/instructor/my-courses")
      } catch (error) {
        console.error("Error during course update:", error);
        setSubmissionStatus({
          success: false,
          message: "Failed to update course. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
        
      }
    };

    if (isLoading) {
      return (
        <div className="flex h-screen bg-background">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <PageHeader />
            <main className="flex-1 overflow-y-auto p-6 pb-16">
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse">Loading course data...</div>
              </div>
            </main>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-screen bg-background">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <PageHeader />

          <main className="flex-1 overflow-y-auto p-6 pb-16">
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <StepItem
                    icon={<Layers className="h-5 w-5" />}
                    title="Basic Information"
                    isActive={currentStep === 1}
                    isCompleted={currentStep > 1}
                  />
                  <StepItem
                    icon={<FileText className="h-5 w-5" />}
                    title="Advance Information"
                    isActive={currentStep === 2}
                    isCompleted={currentStep > 2}
                  />
                  <StepItem
                    icon={<Layers className="h-5 w-5" />}
                    title="Curriculum"
                    isActive={currentStep === 3}
                    isCompleted={currentStep > 3}
                  />
                  <StepItem
                    icon={<CheckCircle className="h-5 w-5" />}
                    title="Update Course"
                    isActive={currentStep === 4}
                    isCompleted={currentStep > 4}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {currentStep === 1 && "Edit Basic Information"}
                {currentStep === 2 && "Edit Advance Information"}
                {currentStep === 3 && "Edit Course Curriculum"}
                {currentStep === 4 && "Update Course"}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline">Save</Button>
                <Button variant="outline">Save & Preview</Button>
              </div>
            </div>

            {submissionStatus && (
              <div
                className={`mb-6 p-4 rounded-md ${
                  submissionStatus.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                <p className="font-medium">{submissionStatus.message}</p>
              </div>
            )}

            {currentStep === 1 && (
              <BasicInformation
                defaultValues={basicInformation as BasicInformationType}
                onSubmit={handleBasicInfoSubmit}
                onCancel={() => navigate(`/course/${courseId}`)}  
              />
            )}

            {currentStep === 2 && (
              <AdvancedInformation
                defaultValues={advancedInformation as AdvancedInformationType}
                onSubmit={handleAdvancedInfoSubmit}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && (
              <Curriculum
                defaultValues={curriculum as CurriculumType}
                onSubmit={handleCurriculumSubmit}
                onBack={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 4 && (
              <PublishCourse
                defaultValues={publish as PublishType}
                onSubmit={handlePublishSubmit}
                onBack={() => setCurrentStep(3)}
                isSubmitting={isSubmitting}
              />
            )}

          </main>
        </div>
      </div>
    );
  }