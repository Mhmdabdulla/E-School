import { Request, Response } from "express";
import { ICartController } from "./interfaces/ICartController";
import { inject, injectable } from "inversify";
import  TYPES  from "../di/types";
import { ICartService } from "../services/interfaces/ICartService";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class CartController implements ICartController {
    constructor(@inject(TYPES.CartService) private cartService:ICartService){}
addItemToCart = async (req: Request, res:Response) => {
    const {courseId } = req.body
    const userId = req.user?._id

    const cart = await this.cartService.addItemToCart(userId as string, courseId)
    res.status(STATUS_CODES.OK).json({message: "course added to cart successfully", cart})
    
}
clearCart = async (req: Request, res:Response) => {
    const userId = req.user?.id as string
    const cart = await this.cartService.clearCart(userId)
    res.status(STATUS_CODES.OK).json({message: "cart cleared successfully", cart})
}
getCart = async (req: Request, res:Response) => {
    const userId = req.user?._id
    const cart = await this.cartService.getCartItems(userId as string)
    res.status(STATUS_CODES.OK).json({message:"cart fetched successfully", cart})
}
removeItemFromCart = async (req: Request, res:Response) => {
  const {courseId} = req.body
  const userId = req.user?._id

  const cart = await this.cartService.removeItemFromCart(userId as string, courseId)
  res.status(STATUS_CODES.OK).json({message:"course remove from cart successfully", cart})
}
}