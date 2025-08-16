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

//payment
import { IPaymentController } from "../controllers/interfaces/IPaymentController";
import { PaymentController } from "../controllers/payment.controller";
import { IPaymentService } from "../services/interfaces/IPaymentService";
import { PaymentService } from "../services/paymentService";

//order
import { IOrderController } from "../controllers/interfaces/IorderController";
import { OrderController } from "../controllers/order.controller";
import { OrderService } from "../services/order.service";
import { IOrderService } from "../services/interfaces/IOrderService";
import { IOrderRepository } from "../repositories/interfaces/IOrderRepository";
import { OrderRepository } from "../repositories/order.repository";
import { IEnrollmentController } from "../controllers/interfaces/IEnrollmentController";
import { EnrollmentController } from "../controllers/enrollment.controller";
import { IEnrollmentService } from "../services/interfaces/IEnrollmentService";
import { EnrollmentService } from "../services/enrollment.service";
import { IEnrollmentRepository } from "../repositories/interfaces/IEnrollmentRepository";
import { EnrollmentRepository } from "../repositories/enrollment.repository";
import { IWebhookController } from "../controllers/interfaces/IWebhookController";
import { WebhookController } from "../controllers/webhook.controller";
import { IWebhookService } from "../services/interfaces/IWebhookService";
import { WebhookService } from "../services/webhook.service";
import { ITransactionController } from "../controllers/interfaces/ITransactionController";
import { TransactionController } from "../controllers/transaction.controller";
import { ITransactionService } from "../services/interfaces/ITransactionService";
import { TransactionService } from "../services/transaction.service";
import { ITransactionRepository } from "../repositories/interfaces/ITransactionRepository";
import { TransactionRepository } from "../repositories/transaction.repository";
import { IWalletController } from "../controllers/interfaces/IWalletController";
import { WalletController } from "../controllers/wallet.controller";
import { IWalletService } from "../services/interfaces/IWalletService";
import { WalletService } from "../services/wallet.service";
import { IWalletRepository } from "../repositories/interfaces/IWalletRepository";
import { WalletRepository } from "../repositories/wallet.repository";
import { AdminController } from "../controllers/admin.controller";
import { IAdminController } from "../controllers/interfaces/IAdminController";
import { IAdminService } from "../services/interfaces/IAdminService";
import { AdminService } from "../services/admin.service";
import { AdminRepository } from "../repositories/admin.repository";
import { IAdminRepository } from "../repositories/interfaces/IAdminRepository";
import { ReviewController } from "../controllers/review.controller";
import { IReviewController } from "../controllers/interfaces/IReviewController";
import { ReviewService } from "../services/review.service";
import { IReviewService } from "../services/interfaces/IReviewService";
import { ReviewRepository } from "../repositories/review.repository";
import { IReviewRepository } from "../repositories/interfaces/IReviewRepository";
import { IPayoutController } from "../controllers/interfaces/IPayoutController";
import { PayoutController } from "../controllers/payout.controller";
import { PayoutService } from "../services/payout.service";
import { IPayoutService } from "../services/interfaces/IPayoutService";
import { IPayoutRepository } from "../repositories/interfaces/IPayoutRepository";
import { PayoutRepository } from "../repositories/payout.repository";
import { CertificateController } from "../controllers/certificate.controller";
import { ICertificateController } from "../controllers/interfaces/ICertificateController";
import { ICertificateService } from "../services/interfaces/ICertificateService";
import { CertificateService } from "../services/certificate.service";
import { CertificateRepository } from "../repositories/certificate.repository";
import { ICertificateRepository } from "../repositories/interfaces/ICertificateRepository";
import { INotificationController } from "../controllers/interfaces/INotificationController";
import { NotificationController } from "../controllers/notification.controller";
import { NotificationService } from "../services/notification.service";
import { INotificationService } from "../services/interfaces/INotificationService";
import { INotificationRepository } from "../repositories/interfaces/INotificationRepository";
import { NotificationRepository } from "../repositories/notification.repository";

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

container.bind<IPaymentController>(TYPES.PaymentController).to(PaymentController)
container.bind<IPaymentService>(TYPES.PaymentService).to(PaymentService)

container.bind<IOrderController>(TYPES.OrderController).to(OrderController)
container.bind<IOrderService>(TYPES.OrderService).to(OrderService)
container.bind<IOrderRepository>(TYPES.OrderRepository).to(OrderRepository)

container.bind<IEnrollmentController>(TYPES.EnrollmentController).to(EnrollmentController)
container.bind<IEnrollmentService>(TYPES.EnrollmentService).to(EnrollmentService)
container.bind<IEnrollmentRepository>(TYPES.EnrollmentRepository).to(EnrollmentRepository)

container.bind<IWebhookController>(TYPES.WebhookController).to(WebhookController)
container.bind<IWebhookService>(TYPES.WebhookService).to(WebhookService)

container.bind<ITransactionController>(TYPES.TransactionController).to(TransactionController)
container.bind<ITransactionService>(TYPES.TransactionService).to(TransactionService)
container.bind<ITransactionRepository>(TYPES.TransactionRepository).to(TransactionRepository)

container.bind<IWalletController>(TYPES.WalletController).to(WalletController)
container.bind<IWalletService>(TYPES.WalletService).to(WalletService)
container.bind<IWalletRepository>(TYPES.WalletRepository).to(WalletRepository)

container.bind<IAdminController>(TYPES.AdminController).to(AdminController)
container.bind<IAdminService>(TYPES.AdminService).to(AdminService)
container.bind<IAdminRepository>(TYPES.AdminRepository).to(AdminRepository)

container.bind<IReviewController>(TYPES.ReviewController).to(ReviewController)
container.bind<IReviewService>(TYPES.ReviewService).to(ReviewService)
container.bind<IReviewRepository>(TYPES.ReviewRepository).to(ReviewRepository)

container.bind<IPayoutController>(TYPES.PayoutController).to(PayoutController)
container.bind<IPayoutService>(TYPES.PayoutService).to(PayoutService)
container.bind<IPayoutRepository>(TYPES.PayoutRepository).to(PayoutRepository)

container.bind<ICertificateController>(TYPES.CertificateController).to(CertificateController)
container.bind<ICertificateService>(TYPES.CertificateService).to(CertificateService)
container.bind<ICertificateRepository>(TYPES.CertificateRepository).to(CertificateRepository)

container.bind<INotificationController>(TYPES.NotificationController).to(NotificationController)
container.bind<INotificationService>(TYPES.NotificationService).to(NotificationService)
container.bind<INotificationRepository>(TYPES.NotificationRepository).to(NotificationRepository)

export default container;
