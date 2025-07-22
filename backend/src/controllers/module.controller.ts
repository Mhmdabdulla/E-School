import { inject, injectable } from "inversify";
import { IModuleController } from "./interfaces/IModuleController";
import { Request, Response } from "express";
import { IModuleService } from "../services/interfaces/IModuleService";
import { STATUS_CODES } from "../utils/constants";
import  TYPES  from "../di/types";


@injectable()
export class ModuleController implements IModuleController{
    constructor(@inject(TYPES.ModuleService) private moduleService: IModuleService) {}

 createModule = async (req:Request, res:Response) => {
    console.log(req.body)
    const data = req.body
    const module = await this.moduleService.createModule(data)
    res.status(STATUS_CODES.CREATED).json(module)
 }

 updateModule = async (req:Request, res:Response) => {
    const {moduleId} = req.params
    const data = req.body
    
    const module = await this.moduleService.update(moduleId, data)
    res.status(STATUS_CODES.OK).json({message: "module updated successfully", module})
 }

deleteModule = async (req:Request, res:Response) => {
    const {moduleId} = req.params 
    const module = await this.moduleService.delete(moduleId)

    res.status(STATUS_CODES.OK).json({message: "module deleted successfully", module})
}

}