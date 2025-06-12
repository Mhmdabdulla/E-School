// src/utils/jwt.ts
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export const generateAccessToken = (id: string, role: string) =>
  jwt.sign({ id, role }, ACCESS_SECRET, { expiresIn: "15m" });

export const generateRefreshToken = (id: string, role: string) =>
  jwt.sign({ id, role }, REFRESH_SECRET, { expiresIn: "7d" });

export const verifyAccessToken = (token: string) => jwt.verify(token, ACCESS_SECRET) as any;
export const verifyRefreshToken = (token: string) => jwt.verify(token, REFRESH_SECRET) as any;
