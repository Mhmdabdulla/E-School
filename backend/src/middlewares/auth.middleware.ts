import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { IUser } from "../models/user.model";
import { STATUS_CODES  } from "../utils/constants";
import { UserRole } from "../utils/constants";
// import { IUserService } from "..";



//  const userService = container.get<IUserService>(TYPES.UserService)

export const authMiddleware = (
  roles:UserRole[],
) => {
  return async (  req: Request,res: Response,next: NextFunction) => {
    try {
      const accessToken =
      req.cookies.accessToken || req.header("Authorization")?.split(" ")[1];
      if (!accessToken){
        res.status(STATUS_CODES.UNAUTHORIZED).json({ error: "Unauthorized: No token provided" });
        return 
      }
      
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!
      ) as { userId: string, role:string };
      
        if(roles.length && !roles.includes(decoded.role as UserRole)){
          res.status(STATUS_CODES.FORBIDDEN).json({message: "permisson denied"})
          return
        }

        // const user = await userService.findById(decoded.userId)

        // if(user?.status === 'blocked'){
        //    res.status(StatusCodes.FORBIDDEN).json({
        //     message: "Your account has been blocked. Please contact support."
        //   });
        //   return
        // }
    
        // req.user = { _id: decoded.userId };
        next();
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          res.status(STATUS_CODES.UNAUTHORIZED).json({ error: "Token has expired" });
          return;
        }
        res.status(STATUS_CODES.FORBIDDEN).json({ error: "Invalid token" });
      }
    }
  
};