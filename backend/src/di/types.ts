
const TYPES = {
  //CONTROLLERS
  AuthController: Symbol.for("AuthController"),
  UserController: Symbol.for("UserController"),
  InstructorController: Symbol.for("InstructorController"),
  
  

  //SERVICES
  AuthService: Symbol.for("AuthService"),
  UserService: Symbol.for("UserService"),
  InstructorService: Symbol.for("InstructorService"),

  //REPOSITORIES
  AuthRepository: Symbol.for("AuthRepository"),
  UserRepository: Symbol.for("UserRepository"),
  InstructorRepository: Symbol.for("InstructorRepository")
};

export default TYPES;
