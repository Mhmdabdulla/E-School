import "express";

export interface AuthUser {
  _id: string;
  role?: string;
  email?: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
    file?: Express.Multer.File;
  }
}
