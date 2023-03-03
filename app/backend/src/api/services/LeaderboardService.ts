import { QueryTypes } from 'sequelize';
import { TeamInfo } from './interfaces/IServiceLeaderboard';
import MatchService from './MatchService';
import sequelize from '../../database/models';
import SELECT_LEADERBOARD_QUERY from './utils/rawQueries';

class LeaderboardService extends MatchService {
  private sequelize = sequelize;

  public async getHomeLeaderboard(): Promise<TeamInfo[]> {
    const leaderboard = await this.sequelize.query(SELECT_LEADERBOARD_QUERY, {
      type: QueryTypes.SELECT,
    });
    return leaderboard as TeamInfo[];
  }
}

export default LeaderboardService;
