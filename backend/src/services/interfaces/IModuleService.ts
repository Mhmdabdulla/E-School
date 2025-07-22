import { IModule } from "../../models/Module";
import { IBaseService } from "./IBaseService";

export interface IModuleService extends IBaseService<IModule>  {
   createModule(courseData: any): Promise<IModule | null>;
  
}