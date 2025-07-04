import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "./types";
import { AuthRepository } from "../repositories/auth.repository";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";
import { IAuthService } from "../services/interfaces/IAuthService";
import { IAuthRepository } from "../repositories/interfaces/IAuthRepository";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { UserRepository } from "../repositories/user.repository";
import { IUserService } from "../services/interfaces/IUserService";
import { UserService } from "../services/user.service";
import { IUserController } from "../controllers/interfaces/IUserController";
import { UserController } from "../controllers/user.controller";
import { IInstructorRepository } from "../repositories/interfaces/IInstructorRepository";
import { InstructorRepository } from "../repositories/instructor.repository";
import { IInstructorService } from "../services/interfaces/IInstructorService";
import { InstructorService } from "../services/instructor.service";
import { IInstructorController } from "../controllers/interfaces/IInstructorController";
import { InstructorController } from "../controllers/instructor.controller";

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

export default container;
