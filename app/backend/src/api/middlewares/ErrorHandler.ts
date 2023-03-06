import { NextFunction, Request, Response } from 'express';

class ErrorHandler extends Error {
  public static handleError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    const errorStack = Number(error.stack);
    const errorStackIsNotANumber = Number.isNaN(errorStack);
    const errorCode = errorStackIsNotANumber ? 500 : errorStack;
    return res.status(errorCode).json({ message: error.message });
  }
}

export default ErrorHandler;
