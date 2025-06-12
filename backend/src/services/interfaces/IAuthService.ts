
export interface IAuthService {
  register(name: string, email: string, password: string): Promise<void>;
  sendOTP(email: string): Promise<void>;
  verifyOTP(userId: string, otp: string): Promise<{ accessToken: string; refreshToken: string }>;
  login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }>;
  refreshToken(oldToken: string): Promise<{ accessToken: string; refreshToken: string }>;
  logout(userId: string): Promise<void>;
}
