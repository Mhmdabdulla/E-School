
import { IInstructorService } from "./interfaces/IInstructorService";
import { IInstructorRepository } from "../repositories/interfaces/IInstructorRepository";

import { InstructorRepository } from "../repositories/instructor.repository";
import { inject, injectable } from "inversify";
import TYPES from "../di/types";

@injectable()
export class InstructorService implements IInstructorService{

  constructor(
    @inject(TYPES.InstructorRepository) private instructorRepository:IInstructorRepository
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
}