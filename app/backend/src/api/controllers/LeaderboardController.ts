import { Request, Response, Router } from 'express';
import { LeaderboardService } from '../services';
import { LeaderboardPath } from '../services/interfaces/IServiceLeaderboard';
import Controller from './Controller';

class LeaderboardController extends Controller<LeaderboardService> {
  constructor() {
    super(new LeaderboardService());
  }

  private async getLeaderboard(req: Request, res: Response) {
    const path = req.path as LeaderboardPath;
    const homeLeaderboard = await this.service.getLeaderboard(path);
    return res.status(200).json(homeLeaderboard);
  }

  initRoutes(): Router {
    this.router.get('/', (req, res) => this.getLeaderboard(req, res));
    this.router.get('/home', (req, res) => this.getLeaderboard(req, res));
    this.router.get('/away', (req, res) => this.getLeaderboard(req, res));
    return this.router;
  }
}

export default LeaderboardController;
