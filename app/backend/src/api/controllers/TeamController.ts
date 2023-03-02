import { Router } from 'express';
import { Response, Request } from 'express-serve-static-core';
import { TeamService } from '../services';
import Controller from './Controller';

class TeamController extends Controller<TeamService> {
  constructor() {
    super(new TeamService());
  }

  public async getAllTeams(_req: Request, res: Response) {
    const teams = await this.service.findAllTeams();
    return res.status(200).json(teams);
  }

  public async getOneTeam(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.service.findTeamById(Number(id));
    return res.status(200).json(team);
  }

  initRoutes(): Router {
    this.router.get('/', (req, res) => this.getAllTeams(req, res));
    this.router.get('/:id', (req, res) => this.getOneTeam(req, res));
    return this.router;
  }
}

export default TeamController;
