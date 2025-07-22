import { BaseRepository } from "./base.repository";
import { IModuleRepository } from "./interfaces/IModuleRepository";
import { IModule, Module } from "../models/Module";

export class ModuleRepository extends BaseRepository<IModule> implements IModuleRepository {
  constructor() {
    super(Module);
  }
  async addModule(moduleData: Partial<IModule>): Promise<IModule> {
    return await Module.create(moduleData);
  }

  async getModulesByCourse(courseId: string): Promise<IModule[]> {
    return await Module.find({ courseId });
  }
}