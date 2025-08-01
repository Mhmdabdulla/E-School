import { ICart } from "../../models/Cart";

export interface ICartService {
  addItemToCart(userId: string, courseId: string): Promise<ICart | null>;
  removeItemFromCart(userId: string, courseId: string): Promise<ICart | null>;
  getCartItems(userId: string): Promise<ICart | null>;
  clearCart(userId: string): Promise<ICart | null>;
  updateCart(userId: string, update: Partial<ICart>): Promise<ICart | null>;
  findOne(userId: string): Promise<ICart | null>
}