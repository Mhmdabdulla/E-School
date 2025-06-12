import { IAuthRepository } from "./interfaces/IAuthRepository";
import { User, IUser } from "../models/user.model";

export class AuthRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async createUser(name: string, email: string, password: string): Promise<IUser> {
    return User.create({ name, email, password });
  }

  async saveRefreshToken(id: string, token: string): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, { refreshToken: token }, { new: true });
  }

  async removeRefreshToken(id: string): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, { $unset: { refreshToken: "" } }, { new: true });
  }

  async saveOTP(id: string, otp: string, expires: Date): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, { otp, otpExpires: expires }, { new: true });
  }

  async verifyOTP(id: string, otp: string): Promise<IUser | null> {
    return User.findOne({
      _id: id,
      otp,
      otpExpires: { $gt: new Date() },
    });
  }
}
