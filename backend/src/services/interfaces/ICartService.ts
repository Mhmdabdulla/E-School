import { CartBasicResponseDTO, CartResponseDTO } from "../../dto/response/cart.response.dto";
import { ICart } from "../../models/Cart";

export interface ICartService {
  addItemToCart(userId: string, courseId: string): Promise<CartResponseDTO | null>;
  removeItemFromCart(userId: string, courseId: string): Promise<CartResponseDTO | null>;
  getCartItems(userId: string): Promise<CartResponseDTO | null>;
  clearCart(userId: string): Promise<CartResponseDTO | null>;
  updateCart(userId: string, update: Partial<ICart>): Promise<CartResponseDTO | null>;
  findOne(userId: string): Promise<CartBasicResponseDTO | null>
}