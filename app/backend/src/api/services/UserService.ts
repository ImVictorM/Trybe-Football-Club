/* eslint class-methods-use-this: ["error", {"exceptMethods": ["validateUserDataFromRequest"]}] */
import { ModelStatic } from 'sequelize';
import UserModel from '../../database/models/UserModel';
import IServiceUser, { IToken, IUser } from './interfaces/IServiceUser';
import AuthService from './AuthService';

class UserService implements IServiceUser {
  private userModel: ModelStatic<UserModel> = UserModel;

  private validateUserDataFromRequest(userFromRequest: IUser): void {
    const { email, password } = userFromRequest;
    if (!email || !password) {
      const error = new Error('All fields must be filled');
      error.stack = '400';
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

    const error = new Error('User not found');
    error.stack = '404';
    throw error;
  }
}

export default UserService;
