
const TYPES = {
  //CONTROLLERS
  AuthController: Symbol.for("AuthController"),
  UserController: Symbol.for("UserController"),
  InstructorController: Symbol.for("InstructorController"),
  CourseController: Symbol.for("CourseController"),
  ModuleController: Symbol.for("ModuleController"),
  LessonController: Symbol.for("LessonController"),
  CategoryController: Symbol.for("CategoryController"),
  CartController: Symbol.for("CartController"),
  PaymentController: Symbol.for("PaymentController"),
  OrderController: Symbol.for("OrderController"),
  EnrollmentController: Symbol.for("EnrollmentController"),
  WebhookController: Symbol.for("WebhookController"),
  

  //SERVICES
  AuthService: Symbol.for("AuthService"),
  UserService: Symbol.for("UserService"),
  InstructorService: Symbol.for("InstructorService"),
  CourseService: Symbol.for("CourseService"),
  ModuleService: Symbol.for("ModuleService"),
  LessonService: Symbol.for("LessonService"),
  CategoryService: Symbol.for("CategoryService"),
  CartService: Symbol.for("CartService"),
  PaymentService: Symbol.for("PaymentService"),
  OrderService: Symbol.for("OrderService"),
  EnrollmentService: Symbol.for("EnrollmentService"),
  WebhookService: Symbol.for("WebhookService"),

  //REPOSITORIES
  AuthRepository: Symbol.for("AuthRepository"),
  UserRepository: Symbol.for("UserRepository"),
  InstructorRepository: Symbol.for("InstructorRepository"),
  CourseRepository: Symbol.for("CourseRepository"),
  ModuleRepository: Symbol.for("ModuleRepository"),
  LessonRepository: Symbol.for("LessonRepository"),
  CategoryRepository: Symbol.for("CategoryRepsoitory"),
  CartRepository: Symbol.for("CartRepository"),
  OrderRepository: Symbol.for("OrderRepository"),
  EnrollmentRepository: Symbol.for("EnrollmentRepository"),
};

export default TYPES;
