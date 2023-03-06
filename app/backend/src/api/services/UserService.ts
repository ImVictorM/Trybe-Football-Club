import { ModelStatic } from 'sequelize';
import UserModel from '../../database/models/UserModel';
import IServiceUser, { IToken, IUserFromDB, IUserFromReq } from './interfaces/IServiceUser';
import AuthService from './AuthService';
import userPattern from './schemas/userPattern';
import { InvalidUserData, InvalidUserRequest } from '../errors';

class UserService implements IServiceUser {
  private userModel: ModelStatic<UserModel> = UserModel;

  public async login(userFromRequest: IUserFromReq): Promise<IToken> {
    const { email, password } = userFromRequest;

    UserService.validateUserDataFromRequest(userFromRequest);

    const user = await this.getUserByEmail(email);

    if (user) {
      AuthService.checkPassword(password, user.password);
      const token = AuthService.userToToken(user);
      return { token };
    }

    throw new InvalidUserData();
  }

  private async getUserByEmail(email: string): Promise<IUserFromDB | null> {
    const user = await this.userModel.findOne({
      where: { email },
    });
    return user || null;
  }

  static validateUserDataFromRequest(userFromRequest: IUserFromReq): void {
    const { error: joiError } = userPattern.validate(userFromRequest);

    if (joiError) {
      const joiErrorMessage = joiError.details[0].message;
      const error = (joiErrorMessage === 'All fields must be filled')
        ? new InvalidUserRequest() : new InvalidUserData();
      throw error;
    }
  }
}

export default UserService;
