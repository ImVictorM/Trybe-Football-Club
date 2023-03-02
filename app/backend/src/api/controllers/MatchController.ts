import { Request, Response, Router } from 'express';
import { MatchService } from '../services';
import Controller from './Controller';
import { TokenHandler } from '../middlewares';
import { NewMatch, PatchMatch } from '../services/interfaces/IServiceMatch';

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

  private async updateInProgressMatchGoals(req: Request, res: Response) {
    const matchId = Number(req.params.id);
    const matchGoals = req.body as PatchMatch;
    const affectedRows = await this.service.updateInProgressMatchGoals(matchId, matchGoals);
    return res.status(200).json({ affectedRows });
  }

  private async registerNewMatch(req: Request, res: Response) {
    const newMatch = req.body as NewMatch;
    const createdMatch = await this.service.registerNewMatch(newMatch);
    return res.status(201).json(createdMatch);
  }

  initRoutes(): Router {
    this.router.get('/', (req, res) => this.getAllMatches(req, res));

    this.router.patch(
      '/:id',
      TokenHandler.validateToken,
      (req, res) => this.updateInProgressMatchGoals(req, res),
    );

    this.router.patch(
      '/:id/finish',
      TokenHandler.validateToken,
      (req, res) => this.finishMatch(req, res),
    );

    this.router.post(
      '/',
      TokenHandler.validateToken,
      (req, res) => this.registerNewMatch(req, res),
    );
    return this.router;
  }
}

export default MatchController;
