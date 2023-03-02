import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MatchModel from '../../database/models/MatchModel';
import IServiceMatch, { MatchFromReq } from './interfaces/IServiceMatch';

class MatchService implements IServiceMatch {
  private matchModel: ModelStatic<MatchModel> = MatchModel;

  public async findAllMatches(inProgress?: boolean): Promise<MatchModel[]> {
    const inProgressClause = inProgress !== undefined ? { where: { inProgress } } : null;
    const matches = await this.matchModel.findAll({
      ...inProgressClause,
      include: [
        { model: TeamModel, as: 'homeTeam' },
        { model: TeamModel, as: 'awayTeam' },
      ],
    });
    return matches;
  }

  public async finishMatch(matchId: number): Promise<void> {
    const finishValue = { inProgress: false };
    await this.matchModel.update(finishValue, {
      where: {
        id: matchId,
      },
    });
  }

  public async updateInProgressMatchGoals(
    matchId: number,
    matchGoals: MatchFromReq,
  ): Promise<number> {
    const response = await this.matchModel.update(matchGoals, {
      where: {
        id: matchId,
        inProgress: true,
      },
    });
    const affectedRows = response[0];
    return affectedRows;
  }
}

export default MatchService;
