import { Request, Response, Router } from 'express';
import { MatchService } from '../services';
import Controller from './Controller';
import { TokenHandler } from '../middlewares';
import { MatchFromReq } from '../services/interfaces/IServiceMatch';

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

  private async finishMatch(req: Request, res: Response) {
    const matchId = Number(req.params.id);
    await this.service.finishMatch(matchId);
    return res.status(200).json({ message: 'Finished' });
  }

  private async updateMatchGoals(req: Request, res: Response) {
    const matchId = Number(req.params.id);
    const matchGoals = req.body as MatchFromReq;
    const affectedRows = await this.service.updateMatchGoals(matchId, matchGoals);
    return res.status(200).json({ affectedRows });
  }

  initRoutes(): Router {
    this.router.get(
      '/',
      (req, res) => this.getAllMatches(req, res),
    );

    this.router.patch(
      '/:id',
      TokenHandler.validateToken,
      (req, res) => this.updateMatchGoals(req, res),
    );

    this.router.patch(
      '/:id/finish',
      TokenHandler.validateToken,
      (req, res) => this.finishMatch(req, res),
    );
    return this.router;
  }
}

export default MatchController;
