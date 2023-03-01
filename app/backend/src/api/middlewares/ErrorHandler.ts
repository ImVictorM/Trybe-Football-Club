import { NextFunction, Request, Response } from 'express';

class ErrorHandler extends Error {
  public static handleError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    const errorCode = error.stack || 500;
    return res.status(Number(errorCode)).json({ message: error.message });
  }
}

export default ErrorHandler;
