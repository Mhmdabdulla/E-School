import { inject, injectable } from "inversify";
import { IPaymentService } from "./interfaces/IPaymentService";
import  TYPES  from "../di/types";
import { ICourseRepository } from "../repositories/interfaces/ICourseRepository";
import stripe from "../config/stripe";
import { STATUS_CODES } from "../utils/constants";
import { ICourse } from "../models/Course";
import { ICartService } from "./interfaces/ICartService";
import { AppError } from "../utils/AppError";

@injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @inject(TYPES.CourseRepository) private courseRepository: ICourseRepository,
    @inject(TYPES.CartService) private cartService: ICartService
  ) {}

  async createStripeSession(userId: string, courseIds: string[]): Promise<string> {
    const cart = await this.cartService.findOne(userId);
    if (!cart) {
      throw new AppError("cart not found", STATUS_CODES.NOT_FOUND);
    }

    if (
      cart.status === "in_progress" &&
      cart.stripeSessionId &&
      cart.sessionExpiresAt &&
      new Date(cart.sessionExpiresAt) > new Date()
    ) {
      return cart.stripeSessionId;
    }

    const courses: ICourse[] = [];

    for (const courseId of courseIds) {
      const course = await this.courseRepository.findById(courseId);
      if (!course) {
        throw new AppError("course not found", STATUS_CODES.NOT_FOUND);
      }
      courses.push(course);
    }

    const totalAmount = courses.reduce((acc, course) => acc + (course.price ? +course.price : 0), 0);

    const lineItems = courses.map((course) => ({
      price_data: {
        currency: "inr",
        unit_amount: course.price ? +course.price * 100 : 0,
        product_data: {
          images: [course.thumbnail],
          name: course.title,
          description: course.description,
        },
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NGORK_URL_FRONDEND}/payment-success`,
      cancel_url: `${process.env.NGORK_URL_FRONDEND}/payment-cancel`,
      metadata: {
        userId,
        courseIds: courseIds.join(","),
        totalAmount,
      },
    });

    await this.cartService.updateCart(userId, {
      status: "in_progress",
      stripeSesstionId: session.id,
      sessionExpiresAt: new Date(Date.now() + 30 * 60 * 1000),
    });

    return session.id!;
  }
}