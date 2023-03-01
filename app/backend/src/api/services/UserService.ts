/* eslint class-methods-use-this: ["error", {"exceptMethods": ["validateUserDataFromRequest"]}] */
import { ModelStatic } from 'sequelize';
import UserModel from '../../database/models/UserModel';
import IServiceUser, { IToken, IUser } from './interfaces/IServiceUser';
import AuthService from './AuthService';
import userPattern from './schemas/userPattern';
import { InvalidUserData, InvalidUserRequest } from '../errors';

class UserService implements IServiceUser {
  private userModel: ModelStatic<UserModel> = UserModel;

  private validateUserDataFromRequest(userFromRequest: IUser): void {
    const { error: joiError } = userPattern.validate(userFromRequest);

    if (joiError) {
      const joiErrorMessage = joiError.details[0].message;
      const error = (joiErrorMessage === 'All fields must be filled')
        ? new InvalidUserRequest() : new InvalidUserData();
      throw error;
    }
  }

  private async getUserByEmail(email: string): Promise<IUser> {
    const user = await this.userModel.findOne({
      where: { email },
    });
    return user as IUser;
  }

  public async login(userFromRequest: IUser): Promise<IToken> {
    const { email, password } = userFromRequest;

    this.validateUserDataFromRequest(userFromRequest);

    const user = await this.getUserByEmail(email);

    if (user) {
      AuthService.checkPassword(password, user.password);
      const token = AuthService.userToToken(user);
      return { token };
    }

    throw new InvalidUserData();
  }
}

export default UserService;
