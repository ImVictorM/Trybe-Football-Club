import { Router } from 'express';

abstract class Controller<ServiceType> {
  protected router: Router;
  protected service: ServiceType;

  constructor() {
    this.router = Router();
    this.service = this.initService();
  }

  abstract initService(): ServiceType;
  abstract initRoutes(): Router;
}

export default Controller;
