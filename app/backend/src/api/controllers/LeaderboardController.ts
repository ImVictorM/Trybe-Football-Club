import { Request, Response, Router } from 'express';
import { LeaderboardService } from '../services';
import Controller from './Controller';

class LeaderboardController extends Controller<LeaderboardService> {
  constructor() {
    super(new LeaderboardService());
  }

  private async getHomeLeaderboard(_req: Request, res: Response) {
    const homeLeaderboard = await this.service.getHomeLeaderboard();
    return res.status(200).json(homeLeaderboard);
  }

  initRoutes(): Router {
    this.router.get('/home', (req, res) => this.getHomeLeaderboard(req, res));
    return this.router;
  }
}

export default LeaderboardController;
