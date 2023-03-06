import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import { InvalidToken, InvalidUserData } from '../errors';
import { IUserFromDB } from './interfaces/IServiceUser';

const JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

class AuthService {
  public static userToToken(user: IUserFromDB): string {
    const token = jwt.sign({ ...user }, JWT_SECRET as jwt.Secret);
    return token;
  }

  public static checkPassword(password: string, hash: string): void {
    const passwordIsValid = bcrypt.compareSync(password, hash);
    if (!passwordIsValid) {
      throw new InvalidUserData();
    }
  }

  public static checkUserToken(token: string) {
    try {
      const user = jwt.verify(token, JWT_SECRET);
      return user as jwt.JwtPayload;
    } catch (_error) {
      throw new InvalidToken();
    }
  }
}

export default AuthService;
