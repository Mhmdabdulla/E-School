import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "./types";

//Auth
import { AuthRepository } from "../repositories/auth.repository";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";
import { IAuthService } from "../services/interfaces/IAuthService";
import { IAuthRepository } from "../repositories/interfaces/IAuthRepository";

//user
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { UserRepository } from "../repositories/user.repository";
import { IUserService } from "../services/interfaces/IUserService";
import { UserService } from "../services/user.service";
import { IUserController } from "../controllers/interfaces/IUserController";
import { UserController } from "../controllers/user.controller";

//instructor
import { IInstructorRepository } from "../repositories/interfaces/IInstructorRepository";
import { InstructorRepository } from "../repositories/instructor.repository";
import { IInstructorService } from "../services/interfaces/IInstructorService";
import { InstructorService } from "../services/instructor.service";
import { IInstructorController } from "../controllers/interfaces/IInstructorController";
import { InstructorController } from "../controllers/instructor.controller";

//course
import { ICourseRepository } from "../repositories/interfaces/ICourseRepository";
import { CourseRepository } from "../repositories/course.repository";
import { ICourseService } from "../services/interfaces/ICourseService";
import { CourseService } from "../services/course.service";
import { ICourseController } from "../controllers/interfaces/ICourseController";
import { CourseController } from "../controllers/course.controller";

//modules
import { IModuleController } from "../controllers/interfaces/IModuleController";
import { ModuleController } from "../controllers/module.controller";
import { IModuleService } from "../services/interfaces/IModuleService";
import { ModuleService } from "../services/module.service";
import { IModuleRepository } from "../repositories/interfaces/IModuleRepository";
import { ModuleRepository } from "../repositories/module.repository";

//lessons
import { ILessonController } from "../controllers/interfaces/ILessonController";
import { LessonController } from "../controllers/lesson.controller";
import { ILessonService } from "../services/interfaces/ILessonService";
import { LessonService } from "../services/lesson.service";
import { LessonRepository } from "../repositories/lesson.repository";
import { ILessonRepository } from "../repositories/interfaces/ILessonRepository";

//category
import { ICategoryController } from "../controllers/interfaces/ICategoryController";
import { CategoryController } from "../controllers/category.controller";
import { ICategoryService } from "../services/interfaces/ICategoryService";
import { CategoryService } from "../services/category.service";
import { CategoryRepository } from "../repositories/category.repository";
import { ICategoryRepository } from "../repositories/interfaces/ICategoryRepository";

//cart
import { ICartController } from "../controllers/interfaces/ICartController";
import { CartController } from "../controllers/cart.controller";
import { ICartService } from "../services/interfaces/ICartService";
import { CartService } from "../services/cart.service";
import { ICartRepository } from "../repositories/interfaces/ICartRepository";
import { CartRepository } from "../repositories/cart.repository";

const container = new Container();

container.bind<IAuthRepository>(TYPES.AuthRepository).to(AuthRepository);
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IUserController>(TYPES.UserController).to(UserController);

container.bind<IInstructorRepository>(TYPES.InstructorRepository).to(InstructorRepository);
container.bind<IInstructorService>(TYPES.InstructorService).to(InstructorService);
container.bind<IInstructorController>(TYPES.InstructorController).to(InstructorController)

container.bind<ICourseRepository>(TYPES.CourseRepository).to(CourseRepository)
container.bind<ICourseService>(TYPES.CourseService).to(CourseService);
container.bind<ICourseController>(TYPES.CourseController).to(CourseController)

container.bind<IModuleController>(TYPES.ModuleController).to(ModuleController)
container.bind<IModuleService>(TYPES.ModuleService).to(ModuleService)
container.bind<IModuleRepository>(TYPES.ModuleRepository).to(ModuleRepository)

container.bind<ILessonController>(TYPES.LessonController).to(LessonController)
container.bind<ILessonService>(TYPES.LessonService).to(LessonService)
container.bind<ILessonRepository>(TYPES.LessonRepository).to(LessonRepository)

container.bind<ICategoryController>(TYPES.CategoryController).to(CategoryController)
container.bind<ICategoryService>(TYPES.CategoryService).to(CategoryService)
container.bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository)

container.bind<ICartController>(TYPES.CartController).to(CartController)
container.bind<ICartService>(TYPES.CartService).to(CartService)
container.bind<ICartRepository>(TYPES.CartRepository).to(CartRepository)

export default container;
