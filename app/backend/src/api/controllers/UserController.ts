import { Request, Response, Router } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { TokenHandler } from '../middlewares';
import { UserService, AuthService } from '../services';
import { IUserFromReq } from '../services/interfaces/IServiceUser';
import Controller from './Controller';

class UserController extends Controller<UserService> {
  constructor() {
    super(new UserService());
  }

  public async login(req: Request, res: Response) {
    const user = req.body as IUserFromReq;
    const { token } = await this.service.login(user);
    return res.status(200).json({ token });
  }

  // must use token validation before using this method
  public static getRoleFromToken(req: Request, res: Response) {
    const tokenFromReq = req.headers.authorization as string;
    const user = AuthService.checkUserToken(tokenFromReq) as JwtPayload;
    return res.status(200).json({ role: user.dataValues.role });
  }

  initRoutes(): Router {
    this.router.get(
      '/role',
      TokenHandler.validateToken,
      (req, res) => UserController.getRoleFromToken(req, res),
    );
    this.router.post('/', (req, res) => this.login(req, res));
    return this.router;
  }
}

export default UserController;
