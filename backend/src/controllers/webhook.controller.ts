import { Request, Response } from "express";
import { IWebhookController } from "./interfaces/IWebhookController";
import Stripe from "stripe";
import { inject, injectable } from "inversify";
import  TYPES  from "../di/types";
import { IWebhookService } from "../services/interfaces/IWebhookService";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class WebhookController implements IWebhookController {
  constructor(@inject(TYPES.WebhookService) private webhookService: IWebhookService) {}
  handleStripeWebhook = async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers["stripe-signature"] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      event = Stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      res.status(STATUS_CODES.BAD_REQUEST).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await this.webhookService.handleCheckoutSuccess(session);
      res.status(STATUS_CODES.OK).json({ received: true });
    } else {
      res.status(STATUS_CODES.OK).json({ received: true });
    }
  };
}