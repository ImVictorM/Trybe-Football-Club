/* eslint class-methods-use-this: ["error", {"exceptMethods": []}] */
import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import IServiceTeam from './interfaces/IServiceTeam';

class TeamService implements IServiceTeam {
  private _teamModel: ModelStatic<TeamModel> = TeamModel;

  public async findAllTeams(): Promise<TeamModel[]> {
    const teams = await this._teamModel.findAll();
    return teams;
  }

  public async findTeamById(id: number): Promise<TeamModel | null> {
    const team = await this._teamModel.findByPk(id);
    return team;
  }
}

export default TeamService;
