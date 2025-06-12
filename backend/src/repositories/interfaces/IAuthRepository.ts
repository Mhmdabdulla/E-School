import { IUser } from "../../models/user.model"
import { IAdmin } from "../../models/Admin.model"

export interface IAuthRepository {
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  createUser(name: string, email: string, password: string): Promise<IUser>;
  saveRefreshToken(id: string, token: string): Promise<IUser | null>;
  removeRefreshToken(id: string): Promise<IUser | null>;
  saveOTP(id: string, otp: string, expires: Date): Promise<IUser | null>;
  verifyOTP(id: string, otp: string): Promise<IUser | null>;
}