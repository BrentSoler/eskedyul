import { NextFunction, Request, Response } from "express";

export default function ErrHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(400).json({
    msg: err.message,
    stack: err.stack,
  });

  next();
}
