import Stripe from "stripe";
import { IWebhookService } from "./interfaces/IWebhookService";
import { inject, injectable } from "inversify";
import  TYPES  from "../di/types";
import { IOrderService } from "../services/interfaces/IOrderService";
import { IEnrollmentService } from "../services/interfaces/IEnrollmentService";
import { ICartService } from "../services/interfaces/ICartService";
import { ICourseService } from "../services/interfaces/ICourseService";
import { ITransactionService } from "./interfaces/ITransactionService";
import { IWalletService } from "./interfaces/IWalletService";


@injectable()
export class WebhookService implements IWebhookService{
    constructor(
        @inject(TYPES.OrderService) private orderService: IOrderService ,
        @inject(TYPES.EnrollmentService) private enrollmentService: IEnrollmentService,
        @inject(TYPES.CartService) private cartService: ICartService,
        @inject(TYPES.CourseService) private courseService: ICourseService,
        @inject(TYPES.TransactionService) private transactionService: ITransactionService,
        @inject(TYPES.WalletService) private walletService: IWalletService
    ){}
    async handleCheckoutSuccess(session: Stripe.Checkout.Session): Promise<void> {
        const metadata = session.metadata;
        if(!metadata || !metadata.userId || !metadata.courseIds){
            throw new Error("Metadata is missing in session")
        }

        const userId = metadata.userId;
        const courseIds = metadata.courseIds.split(',');
        const totalAmount = Number(metadata.totalAmount)
        const paymentIntentId = session.payment_intent as string;

        const order = await this.orderService.createOrder(userId, courseIds,totalAmount, paymentIntentId );
        await this.cartService.updateCart(userId, {courses: [],status: "paid", stripeSesstionId: null})

        for(const courseId of courseIds){
            await this.enrollmentService.enrollUserIntoCourse(userId, courseId);
            

             const course = await this.courseService.findById(courseId)
            if(!course){
                return
            }
            const instructorId = course.instructorId.toString()
            const price = Number(course.price);
        
            const instructorShare = Math.round(price * 0.8)

            await this.transactionService.createTransaction({
                instructorId,
                userId,
                courseId,
                type: 'credit',
                amount: instructorShare,
                status: 'completed',
                referenceId: order._id,
                method: 'stripe',
                note: `Earning from course purchase: ${course.title}`,
              });       

              await this.walletService.creditWallet(instructorId, instructorShare);
        }
       

        

    }
}