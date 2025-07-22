import { IModule } from "../../models/Module";
import { IBaseRepository } from "./IBaseRepository";

export interface IModuleRepository extends IBaseRepository<IModule> {
    addModule(moduleData: Partial<IModule>): Promise<IModule>;
    getModulesByCourse(courseId: string): Promise<IModule[]>;
}