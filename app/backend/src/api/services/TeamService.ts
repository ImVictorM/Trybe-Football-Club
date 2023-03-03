import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import IServiceTeam from './interfaces/IServiceTeam';

class TeamService implements IServiceTeam {
  protected teamModel: ModelStatic<TeamModel> = TeamModel;

  public async findAllTeams(): Promise<TeamModel[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async findTeamById(id: number): Promise<TeamModel | null> {
    const team = await this.teamModel.findByPk(id);
    return team;
  }
}

export default TeamService;
