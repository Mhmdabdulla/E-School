
const TYPES = {
  //CONTROLLERS
  AuthController: Symbol.for("AuthController"),
  UserController: Symbol.for("UserController"),
  InstructorController: Symbol.for("InstructorController"),
  CourseController: Symbol.for("CourseController"),
  ModuleController: Symbol.for("ModuleController"),
  LessonController: Symbol.for("LessonController"),
  CategoryController: Symbol.for("CategoryController"),
  

  //SERVICES
  AuthService: Symbol.for("AuthService"),
  UserService: Symbol.for("UserService"),
  InstructorService: Symbol.for("InstructorService"),
  CourseService: Symbol.for("CourseService"),
  ModuleService: Symbol.for("ModuleService"),
  LessonService: Symbol.for("LessonService"),
  CategoryService: Symbol.for("CategoryService"),

  //REPOSITORIES
  AuthRepository: Symbol.for("AuthRepository"),
  UserRepository: Symbol.for("UserRepository"),
  InstructorRepository: Symbol.for("InstructorRepository"),
  CourseRepository: Symbol.for("CourseRepository"),
  ModuleRepository: Symbol.for("ModuleRepository"),
  LessonRepository: Symbol.for("LessonRepository"),
  CategoryRepository: Symbol.for("CategoryRepsoitory"),
};

export default TYPES;
