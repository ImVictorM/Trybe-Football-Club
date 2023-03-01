import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import { InvalidUserData } from '../errors';
import { IUser } from './interfaces/IServiceUser';

const JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

class AuthService {
  public static checkPassword(password: string, hash: string): void {
    const passwordIsValid = bcrypt.compareSync(password, hash);
    if (!passwordIsValid) {
      throw new InvalidUserData();
    }
  }

  public static userToToken(user: IUser) {
    const token = jwt.sign({ ...user }, JWT_SECRET as jwt.Secret);
    return token;
  }
}

export default AuthService;
