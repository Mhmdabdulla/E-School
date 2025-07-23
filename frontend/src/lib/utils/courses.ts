import type { AdvancedInformationType } from "../../components/instructor/create_course/AdvancedInformation";
import type { BasicInformationType } from "../../components/instructor/create_course/BasicInformation";
import type { CurriculumType } from "../../components/instructor/create_course/Curriculum";
import type { PublishType } from "../../components/instructor/create_course/PublishCourse";

export const createLessonData = (lesson:any, courseId?:string,moduleId?:string ) => {
    const lessonData = new FormData();
  if(courseId)lessonData.append("courseId", courseId)
  if(moduleId)lessonData.append("moduleId", moduleId);
  if(lesson.id)lessonData.append("order",lesson.id)
  if(lesson.name)lessonData.append("title", lesson.name);
  if(lesson.description)lessonData.append("description", lesson.description);
  if(lesson.type)lessonData.append("contentType", lesson.type);
  if(lesson.durationUnit)lessonData.append("duration", `${lesson.duration} ${lesson.durationUnit}`);

  if (lesson.content) {
    lessonData.append("content", lesson.content);
  }

  return lessonData
  }

 export const createModuleData = (section:any, courseId?:any) => {
  const moduleData: Record<string, any> = {};

  if (courseId) {
    moduleData.courseId = courseId;
  }

  if (section.name) moduleData.title = section.name;
  if (section.description) moduleData.description = section.description;
  if (section.id) moduleData.order = section.id;

  return moduleData;
  }

 export const createCourseData = (basicInformation:Partial<BasicInformationType>,
    advancedInformation:Partial<AdvancedInformationType>
    ,publish:PublishType) => {
    const courseDate = new FormData()
    if(publish && Object.keys(publish).length > 0){
      if(publish.welcomeMessage)courseDate.append("welcomeMessage", publish.welcomeMessage)
      if(publish.congratulationsMessage)courseDate.append("congratulationsMessage", publish.congratulationsMessage)
      if(publish.price)courseDate.append("price", publish.price)
      if(publish.isPublic)courseDate.append("isPublic", publish.isPublic ? "true" : "false")
      if(publish.isFree)courseDate.append("isFree", publish.isFree ? "true" : "false")
    }

    if(basicInformation && Object.keys(basicInformation).length > 0){
      if(basicInformation.title)courseDate.append("title", basicInformation.title || "")
      if(basicInformation.subtitle)courseDate.append("subtitle", basicInformation.subtitle || "")
      if(basicInformation.category)courseDate.append("categoryId", basicInformation.category || "")
      if(basicInformation.subCategory)courseDate.append("subCategoryId", basicInformation.subCategory || "")
      if(basicInformation.topic)courseDate.append("topic", basicInformation.topic || "")
      if(basicInformation.language)courseDate.append("language", basicInformation.language || "")
      if(basicInformation.level)courseDate.append("level", basicInformation.level || "")
    }
    
    if(advancedInformation && Object.keys(advancedInformation).length > 0){
      if(advancedInformation.description)courseDate.append("description", advancedInformation.description)
      if (advancedInformation.thumbnail)
        courseDate.append("thumbnail", advancedInformation.thumbnail) 
      if (advancedInformation.trailer) 
        courseDate.append("trailer", advancedInformation.trailer)
      if (advancedInformation.teachItems) {
        advancedInformation.teachItems.forEach((item) => {
          courseDate.append("whatYouWillLearn[]", JSON.stringify(item)) 
        })
      }
    }

    return courseDate
  }


   export const createPublishData = (data: any): PublishType => {
      return {
          welcomeMessage: data.welcomeMessage,
          congratulationsMessage: data.congratulationsMessage,
          isPublic: data.isPublic,
          ...(data.isFree ? { isFree: true } : { isFree: false, price: data.price.toString() }),
      };
  }
  
  
  export const createCurriculumData = (data: any): CurriculumType => {
      return {
          sections: data.modules.map((module: any) => ({
              description: module.description,
              id: module._id,
              name: module.title,
              lectures: module.lessons.map((lesson: any) => ({
                  type: lesson.contentType,
                  description: lesson.description || "default course description",
                  id: lesson._id,
                  name: lesson.title,
                  isExpanded: true,
                  duration: lesson.duration,
                  content: `http://localhost:5000/api/lessons/${lesson._id}/stream`,
              })),
          })),
      };
  }
  
  
export const createBasicInformationData = (data: any): BasicInformationType => {
      return {
          title: data.title,
          subtitle: data.subtitle,
          category: data.categoryId,
          subCategory: data.subCategoryId,
          topic: data.title, 
          language: data.language,
          level: data.level,
      };
  }
  
export const createAdvancedInformationData = (data: any): AdvancedInformationType => {
      return {
          description: data.description,
          teachItems: data.whatYouWillLearn.map((item: string, index: number) => ({
              id: index + 1, 
              content: JSON.parse(item).content,
          })),
          thumbnail: data.thumbnail,
          trailer:data.trailer,
      };
  }