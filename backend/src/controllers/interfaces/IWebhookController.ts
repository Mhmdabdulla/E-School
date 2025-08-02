import { RequestHandler } from "express";

export interface IWebhookController {
    handleStripeWebhook:RequestHandler
}