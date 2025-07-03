// import { refreshedUser, verifiedUer } from "../../types/userTypes";

export interface IAuthService {
  register(name: string, email: string, hashedPassword: string): Promise<void>;
  verifyOtp(email: string, otp: string): Promise<any>;
  resendOtp(email: string): Promise<void>;
  adminLogin(email: string, password: string): Promise<any>;
  login(email: string, password: string): Promise<any>;
  refreshAccessToken(refreshToken: string): Promise<any>;
  sendMagicLink(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
}