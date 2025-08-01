import { inject, injectable } from "inversify";
import { ICartService } from "./interfaces/ICartService";
import { ICart } from "../models/Cart";
import  TYPES  from "../di/types";
import { ICartRepository } from "../repositories/interfaces/ICartRepository";
import mongoose from "mongoose";

@injectable()
export class CartService implements ICartService {
    constructor(@inject(TYPES.CartRepository) private cartRepository:ICartRepository){}

    async addItemToCart(userId: string, courseId: string): Promise<ICart | null> {
        const courseObjectId = new mongoose.Types.ObjectId(courseId);
        let  cart = await this.cartRepository.findOne({userId});
        if(!cart){
            cart = await this.cartRepository.create({userId})
        }

        if (cart?.courses.map(course => course.toString()).includes(courseObjectId.toString())) {
            throw new Error("This course is already in your cart.");
        }

        const updatedCart = this.cartRepository.addItemToCart(userId, courseId)
        if(!updatedCart){
            throw new Error("cannot add course into the cart , please try again")
        }
        return updatedCart
    }

    async clearCart(userId: string): Promise<ICart | null> {
        const cart =  await this.cartRepository.clearCart(userId)
        if(!cart){
            throw new Error(" cannot find cart. please try again")
        }
        return cart
    }

    async getCartItems(userId: string): Promise<ICart | null> {
        let cart = await this.cartRepository.getCartItems(userId)
        if(!cart){
            cart = await this.cartRepository.create({userId: userId})
        }
        
        return cart
    }
    async removeItemFromCart(userId: string, courseId: string): Promise<ICart | null> {
        return await this.cartRepository.removeItemFromCart(userId, courseId)
    }

    async updateCart(userId: string, update:Partial<ICart>): Promise<ICart | null> {
        return await this.cartRepository.findOneAndUpdate({userId}, update)
    }

    async findOne(userId: string): Promise<ICart | null> {
        return await this.cartRepository.findOne({userId})
    }

}