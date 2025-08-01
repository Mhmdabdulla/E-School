import { RequestHandler } from "express";

export interface IWishlistController {
    getWishlistItems:RequestHandler
    addItemToWishlist:RequestHandler
    removeItemFromWishlist:RequestHandler
    // clearWishlist:RequestHandler
}