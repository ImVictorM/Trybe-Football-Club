import { NextFunction, Request, Response } from 'express';
import { TokenNotFound } from '../errors';

class TokenHandler {
  public static validateToken(req: Request, res: Response, next: NextFunction) {
    const tokenFromReq = req.headers.authorization;
    if (!tokenFromReq) {
      throw new TokenNotFound();
    }
    return next();
  }
}

export default TokenHandler;
