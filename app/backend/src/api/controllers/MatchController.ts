import { Request, Response, Router } from 'express';
import { MatchService } from '../services';
import Controller from './Controller';

class MatchController extends Controller <MatchService> {
  constructor() {
    super(new MatchService());
  }

  private static convertStringToBoolean(query: string | undefined): boolean | undefined {
    if (query !== undefined) {
      // convert string to boolean
      return JSON.parse(query);
    }

    return query;
  }

  private async getAllMatches(req: Request, res: Response) {
    const stringInProgress = req.query.inProgress as string | undefined;
    const inProgress = MatchController.convertStringToBoolean(stringInProgress);
    const matches = await this.service.findAllMatches(inProgress);
    return res.status(200).json(matches);
  }

  initRoutes(): Router {
    this.router.get('/', (req, res) => this.getAllMatches(req, res));
    return this.router;
  }
}

export default MatchController;
