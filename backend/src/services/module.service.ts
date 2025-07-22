import { inject, injectable } from "inversify";
import { IModuleService } from "./interfaces/IModuleService";
import  TYPES  from "../di/types";
import { IModule } from "../models/Module";
import { IModuleRepository } from "../repositories/interfaces/IModuleRepository";
import { BaseService } from "./base.service";

@injectable()
export class ModuleService extends BaseService<IModule> implements IModuleService{
    constructor(@inject(TYPES.ModuleRepository) private moduleRepository: IModuleRepository) {
        super(moduleRepository);
    }

    async createModule(moduleData: any): Promise<IModule | null> {
       return await this.moduleRepository.addModule(moduleData)
    }
}