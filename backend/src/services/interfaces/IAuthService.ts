// import { refreshedUser, verifiedUer } from "../../types/userTypes";

export interface IAuthService {
  register(name: string, email: string, hashedPassword: string): Promise<void>;
  verifyOtp(email: string, otp: string): Promise<any>;
  resendOtp(email: string): Promise<void>;
  adminLogin(email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;
  refreshAccessToken(refreshToken: string, role: string): Promise<void>;
  sendMagicLink(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
}