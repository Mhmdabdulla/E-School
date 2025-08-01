import { IWishlist } from "../../models/Wishlist";
import { IBaseRepository } from "./IBaseRepository";

export interface IWishlistRepository extends IBaseRepository<IWishlist>{
    addWishlistItem(userId: string, courseId: string): Promise<IWishlist | null>;
    removeWishlistItem(userId: string, courseId: string): Promise<IWishlist | null>;
    getWishlistItems(userId: string): Promise<IWishlist | null>;
    // clearWishlist(userId: string): Promise<void>;
}