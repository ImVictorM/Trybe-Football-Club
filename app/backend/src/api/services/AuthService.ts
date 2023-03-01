import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import { IUser } from './interfaces/IServiceUser';

const JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

class AuthService {
  public static checkPassword(password: string, hash: string): void {
    const passwordIsValid = bcrypt.compareSync(password, hash);
    if (!passwordIsValid) {
      const error = new Error('All fields must be filled');
      error.stack = '400';
      throw error;
    }
  }

  public static userToToken(user: IUser) {
    const token = jwt.sign({ ...user }, JWT_SECRET as jwt.Secret);
    return token;
  }
}

export default AuthService;
