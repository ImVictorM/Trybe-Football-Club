/* eslint class-methods-use-this: ["error", {"exceptMethods": ["validateUserDataFromRequest"]}] */
import { ModelStatic } from 'sequelize';
import UserModel from '../../database/models/UserModel';
import IServiceUser, { IToken, IUser } from './interfaces/IServiceUser';
import AuthService from './AuthService';
import userPattern from './schemas/userPattern';

class UserService implements IServiceUser {
  private userModel: ModelStatic<UserModel> = UserModel;

  private validateUserDataFromRequest(userFromRequest: IUser): void {
    const { error } = userPattern.validate(userFromRequest);

    if (error) {
      const errorMessage = error.details[0].message;
      const errorCode = (errorMessage === 'All fields must be filled') ? '400' : '401';
      error.stack = errorCode;
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

    const error = new Error('Invalid email or password');
    error.stack = '401';
    throw error;
  }
}

export default UserService;
