import { ICart } from "../../models/Cart";
import { IBaseRepository } from "./IBaseRepository";

export interface ICartRepository extends IBaseRepository<ICart> {
    addItemToCart(userId: string, courseId: string): Promise<ICart | null>;
    removeItemFromCart(userId: string, courseId: string): Promise<ICart | null>;
    getCartItems(userId: string): Promise<ICart | null>;
    clearCart(userId: string): Promise<ICart | null>;
}