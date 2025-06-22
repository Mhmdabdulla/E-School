// src/utils/jwt.ts
import jwt from "jsonwebtoken";
import RedisClient from "../config/redis";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const generateAccessToken = (id: string, role: string) =>
  jwt.sign({ id, role }, ACCESS_SECRET, { expiresIn: "15m" });

export const generateRefreshToken = (id: string, role: string) =>
  jwt.sign({ id, role }, REFRESH_SECRET, { expiresIn: "7d" });

export const verifyAccessToken = (token: string) => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as { userId: string; role: string };
export const verifyRefreshToken = (token: string) => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as { userId: string; role: string };
export const resetPasswordTocken = (userId:string,email:string) =>{
  jwt.sign({ userId, email, purpose: "reset-password" }, process.env.JWT_TOKEN_SECRET!, {
        expiresIn: "15m",
      });
}



export const verifyResetToken = async (token: string, expectedPurpose: string) => {
  try {
    const currentLink = `${process.env.CLIENT_URL!}/reset-password?token=${token}`
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET!) as {
          userId: string
          email: string
          purpose: string
        }
        
        if (decoded.purpose !== expectedPurpose) {
            throw new Error('Invalid token purpose')
        }
        
    const storedLink = await RedisClient.get(`magicLink:${decoded.email}`)
    if (!storedLink) throw new Error('Invalid or expired token')
        const parsedStoredLink = JSON.parse(storedLink);
   if(parsedStoredLink.magicLink !== currentLink)
     throw new Error("Invalid or expired token")

    return decoded
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

