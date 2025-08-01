import { RequestHandler } from "express";

export interface ICartController {
    addItemToCart:RequestHandler
    removeItemFromCart:RequestHandler
    getCart:RequestHandler
    // clearCart:RequestHandler
}