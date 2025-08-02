import Stripe from "stripe";

export interface IWebhookService {
    handleCheckoutSuccess(session:Stripe.Checkout.Session):Promise<void>
}