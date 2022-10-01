import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import UserUtil from "../User/utils/userUtil";
import { Encryption } from "../utils/encryption";

const authHandler = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      throw new Error("Not Authorized");
    }
    if (!req.headers.authorization?.includes("Bearer")) {
      throw new Error("Not Authorized");
    }

    try {
      const token = req.headers.authorization?.split(" ")[1].toString();

      const encrypt = new Encryption(token);

      const decodedToken: any = encrypt.decryptToken();

      const User = new UserUtil({ data: undefined });

      const userInfo = await User.findUserId(Number(decodedToken.id));

      if (!userInfo) {
        throw new Error("Not Authorized");
      }

      req.user = { ...userInfo, password: decodedToken.password };
      next();
    } catch (err) {
      throw new Error("Not Authorized");
    }
  }
);

export default authHandler;
