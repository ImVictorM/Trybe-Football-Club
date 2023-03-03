import { ModelStatic } from 'sequelize';
import MatchModel from '../../database/models/MatchModel';
import IServiceMatch, { NewMatch, PatchMatch, Match } from './interfaces/IServiceMatch';
import { EqualTeamsException, InvalidTeamException } from '../errors';
import TeamService from './TeamService';

class MatchService extends TeamService implements IServiceMatch {
  protected matchModel: ModelStatic<MatchModel> = MatchModel;

  public async findAllMatches(inProgress?: boolean): Promise<Match[]> {
    const inProgressClause = inProgress !== undefined ? { where: { inProgress } } : null;
    const matches = await this.matchModel.findAll({
      ...inProgressClause,
      include: [
        { model: this.teamModel, as: 'homeTeam' },
        { model: this.teamModel, as: 'awayTeam' },
      ],
    });
    return matches as unknown as Match[];
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
    matchGoals: PatchMatch,
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

  private static validateMatchTeamsAreEqual(newMatch: NewMatch): void {
    const { awayTeamId, homeTeamId } = newMatch;
    if (awayTeamId === homeTeamId) {
      throw new EqualTeamsException();
    }
  }

  private async validateTeamsExists(newMatch: NewMatch): Promise<void> {
    const { awayTeamId, homeTeamId } = newMatch;
    const awayTeam = await this.findTeamById(awayTeamId);
    const homeTeam = await this.findTeamById(homeTeamId);
    if (!awayTeam || !homeTeam) {
      throw new InvalidTeamException();
    }
  }

  public async registerNewMatch(newMatch: Omit<NewMatch, 'id'>): Promise<NewMatch> {
    MatchService.validateMatchTeamsAreEqual(newMatch);
    await this.validateTeamsExists(newMatch);
    const createdMatch = await this.matchModel.create({ ...newMatch, inProgress: true });
    return createdMatch;
  }
}

export default MatchService;
