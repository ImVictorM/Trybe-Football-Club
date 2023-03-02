import { Router } from 'express';

abstract class Controller<ServiceType> {
  protected router: Router;
  protected service: ServiceType;

  constructor(service: ServiceType) {
    this.router = Router();
    this.service = service;
  }

  abstract initRoutes(): Router;
}

export default Controller;
