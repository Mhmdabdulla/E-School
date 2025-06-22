
// import { Request, Response, NextFunction } from "express";
// import { verifyAccessToken } from "../utils/jwt";

// // First: Extend Express Request to include `user`
// interface AuthenticatedRequest extends Request {
//   user?: { id: string; role: string };
// }

// export const protect = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
//   const header = req.headers.authorization;

//   if (!header || !header.startsWith("Bearer ")) {
//     res.status(401).json({ message: "Unauthorized" });
//     return; // 🚨 Make sure to return after sending response
//   }

//   try {
//     const token = header.split(" ")[1];
//     const payload = verifyAccessToken(token);

//     req.user = {
//       id: payload.id,
//       role: payload.role,
//     };

//     next(); // Continue to next middleware/route
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//     return;
//   }
// };
