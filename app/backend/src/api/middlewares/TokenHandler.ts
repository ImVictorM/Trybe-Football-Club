import { NextFunction, Request, Response } from 'express';
import { TokenNotFound } from '../errors';
import { AuthService } from '../services';

class TokenHandler extends AuthService {
  public static validateToken(req: Request, _res: Response, next: NextFunction) {
    const tokenFromReq = req.headers.authorization;
    if (!tokenFromReq) {
      throw new TokenNotFound();
    }
    super.checkUserToken(tokenFromReq);
    return next();
  }
}

export default TokenHandler;
