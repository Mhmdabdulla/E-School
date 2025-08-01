import { IWishlist } from "../../models/Wishlist";

export interface IWishlistService {
    addToWishlist(userId: string, courseId: string): Promise<IWishlist | null>;
    removeFromWishlist(userId: string, courseId: string): Promise<IWishlist | null>;
    getWishlist(userId: string): Promise<IWishlist | null>;
    // isProductInWishlist(userId: string, productId: string): Promise<boolean>;
}