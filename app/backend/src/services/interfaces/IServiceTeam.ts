import TeamModel from '../../database/models/TeamModel';

export default interface IServiceTeam {
  findAllTeams(): Promise<TeamModel[]>;
  findTeamById(id: number): Promise<TeamModel | null>;
}
