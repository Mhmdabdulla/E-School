
import { IInstructorService } from "./interfaces/IInstructorService";
import { IInstructorRepository } from "../repositories/interfaces/IInstructorRepository";

import { InstructorRepository } from "../repositories/instructor.repository";
import { inject, injectable } from "inversify";
import TYPES from "../di/types";
import { IInstructor } from "../models/instructor.model";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";

@injectable()
export class InstructorService implements IInstructorService{

  constructor(
    @inject(TYPES.InstructorRepository) private instructorRepository:IInstructorRepository,
    @inject(TYPES.UserRepository) private userRepository:IUserRepository
  ){}
  
  async getAllInstructors(page: number, limit: number, searchQuery?: string): Promise<any | null>{
        const skip = (Number(page) - 1) * Number(limit);
        
        const instructors = await this.instructorRepository.findAllInstructors( skip, limit, searchQuery)

        const totalInstructors = await this.instructorRepository.countDocuments({"adminApproval.status": "approved"})
        return {
            totalInstructors,
            totalPages: Math.ceil(totalInstructors / limit),
            currentPage: page,
            instructors
          };
    }


  async getInstructorApplications():Promise<IInstructor[]|null>{
        try {
            const instructorApplications = await this.instructorRepository.getInstructorApplications()
            if(!instructorApplications)
                throw new Error(" cannot find any applications")

            return instructorApplications
        } catch (error) {
            throw new Error(" cannot find any applications please try again")
        }
    }

 reviewTutorApplication = async(tutorId: string, status: string, reason?: string) :Promise<IInstructor|null> => {
        try {
            if (!["approved", "rejected"].includes(status)) {
              throw new Error("Invalid status. Must be 'approved' or 'rejected'.");
            }

            const updatedInstructor =  await  this.instructorRepository.updateInstructorStatus(tutorId, {
              "adminApproval.status": status,
             "adminApproval.reason" : reason ? reason : ''
            });
      
            if (!updatedInstructor) {
              throw new Error("instructor not found");
            }
    
            const InstructorStatus:any = updatedInstructor.adminApproval.status
    
            if( InstructorStatus === 'approved'){
               const instructor = await this.userRepository.updateById(updatedInstructor.userId as string, {role:"instructor"})
               if(!instructor){
                throw new Error("user not found")
               }
            }
      
            return updatedInstructor;
          } catch (error) {
            console.error("Error updating tutor status:", error);
            throw error
          }
       }
    
}