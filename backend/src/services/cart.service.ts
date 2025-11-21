import { inject, injectable } from "inversify";
import { ICartService } from "./interfaces/ICartService";
import { ICart } from "../models/Cart";
import  TYPES  from "../di/types";
import { ICartRepository } from "../repositories/interfaces/ICartRepository";
import mongoose from "mongoose";
import { CartBasicResponseDTO, CartResponseDTO } from "../dto/response/cart.response.dto";
import { AppError } from "../utils/AppError";

@injectable()
export class CartService implements ICartService {
    constructor(@inject(TYPES.CartRepository) private cartRepository:ICartRepository){}

    async addItemToCart(userId: string, courseId: string): Promise<CartResponseDTO | null> {
        const courseObjectId = new mongoose.Types.ObjectId(courseId);
        let  cart = await this.cartRepository.findOne({userId});
        if(!cart){
            cart = await this.cartRepository.create({userId})
        }

        if (cart?.courses.map(course => course.toString()).includes(courseObjectId.toString())) {
            throw new Error("This course is already in your cart.");
        }

        const updatedCart = await this.cartRepository.addItemToCart(userId, courseId)
        if(!updatedCart){
            throw new Error("cannot add course into the cart , please try again")
        }


        return CartResponseDTO.fromEntity(updatedCart)
    }

    async clearCart(userId: string): Promise<CartResponseDTO | null> {
        const cart =  await this.cartRepository.clearCart(userId)
        if(!cart){
            throw new Error(" cannot find cart. please try again")
        }

        return CartResponseDTO.fromEntity(cart)
    }

    async getCartItems(userId: string): Promise<CartResponseDTO | null> {
        let cart = await this.cartRepository.getCartItems(userId)
        if(!cart){
            cart = await this.cartRepository.create({userId: userId})
        }
        
        return CartResponseDTO.fromEntity(cart)
    }
    async removeItemFromCart(userId: string, courseId: string): Promise<CartResponseDTO | null> {
        const cart = await this.cartRepository.removeItemFromCart(userId, courseId);

        if (!cart) {
            throw new AppError("Cannot remove course from cart", 500);
          }

           return CartResponseDTO.fromEntity(cart);
        }

async updateCart(userId: string, update: Partial<ICart>): Promise<CartResponseDTO> {
  const cart = await this.cartRepository.findOneAndUpdate({ userId }, update);

  if (!cart) {
    throw new AppError("Cannot update cart", 500);
  }

  return CartResponseDTO.fromEntity(cart);
}


async findOne(userId: string): Promise<CartBasicResponseDTO | null> {
  const cart = await this.cartRepository.findOne({ userId });

  if (!cart) return null;

  return CartBasicResponseDTO.fromEntity(cart);
}


}