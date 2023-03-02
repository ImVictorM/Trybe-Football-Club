import { Request, Response, Router } from 'express';
import { MatchService } from '../services';
import Controller from './Controller';

class MatchController extends Controller <MatchService> {
  constructor() {
    super(new MatchService());
  }

  private async getAllMatches(_req: Request, res: Response) {
    const matches = await this.service.findAllMatches();
    return res.status(200).json(matches);
  }

  initRoutes(): Router {
    this.router.get('/', (req, res) => this.getAllMatches(req, res));
    return this.router;
  }
}

export default MatchController;
