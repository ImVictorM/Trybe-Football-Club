import { NextFunction, Request, Response } from 'express';

class ErrorHandler extends Error {
  public static handleError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    const errorStackIsNotANumber = Number.isNaN(Number(error.stack));
    const errorCode = errorStackIsNotANumber ? 500 : error.stack;
    return res.status(Number(errorCode)).json({ message: error.message });
  }
}

export default ErrorHandler;
