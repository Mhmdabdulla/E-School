import { IInstructor } from "../../models/instructor.model";
import { IBaseRepository } from "./IBaseRepository";

export interface IInstructorRepository extends IBaseRepository<IInstructor> {
    createInstructor(instructor:Partial<IInstructor>):Promise<IInstructor | null>
    getInstructorApplications():Promise<IInstructor[]|null>
    // updateInstructorProfile(userId: string, data: Partial<IInstructor>): Promise<IInstructor | null> 
    updateInstructorStatus(id:string, updates:{}):Promise<IInstructor| null>
    // getInstructors():Promise<IInstructor[]  | null>
    findInstructorByUserId(userId:string):Promise<IInstructor|null>
    // getInstructorProfile(instructorId:string):Promise<IInstructor | null>
    // getUserApplications(userId:string):Promise<IInstructor[] | null>
    // findInstructorsByUserId(instructorIds: string[], skip:number, limit: number, searchQuery?:string): Promise<IInstructor[] | null>
    findAllInstructors(skip: number, limit: number, searchQuery?: string): Promise<IInstructor[] | null>
}