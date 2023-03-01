/* eslint class-methods-use-this: ["error", {"exceptMethods": ["initService"]}] */

import { Request, Response, Router } from 'express';
import { UserService } from '../services';
import { IUser } from '../services/interfaces/IServiceUser';
import Controller from './Controller';

class UserController extends Controller<UserService> {
  public async login(req: Request, res: Response) {
    const user = req.body as IUser;
    const { token } = await this.service.login(user);
    return res.status(200).json({ token });
  }

  initService(): UserService {
    return new UserService();
  }

  initRoutes(): Router {
    this.router.post('/', (req, res) => this.login(req, res));
    return this.router;
  }
}

export default UserController;
