import { QueryTypes } from 'sequelize';
import IServiceLeaderboard, { LeaderboardPath, TeamInfo } from './interfaces/IServiceLeaderboard';
import sequelize from '../../database/models';
import {
  SELECT_AWAY_LEADERBOARD_QUERY,
  SELECT_HOME_LEADERBOARD_QUERY,
  SELECT_LEADERBOARD_QUERY,
} from './utils/rawQueries';

class LeaderboardService implements IServiceLeaderboard {
  private sequelize = sequelize;

  public async getLeaderboard(path: LeaderboardPath): Promise<TeamInfo[]> {
    const query = LeaderboardService.getQueryByLeaderboardPath(path);
    const leaderboard = await this.sequelize.query(query, {
      type: QueryTypes.SELECT,
    }) as TeamInfo[];

    return leaderboard;
  }

  private static getQueryByLeaderboardPath(path: LeaderboardPath): string {
    switch (path) {
      case '/home':
        return SELECT_HOME_LEADERBOARD_QUERY;
      case '/away':
        return SELECT_AWAY_LEADERBOARD_QUERY;
      default:
        return SELECT_LEADERBOARD_QUERY;
    }
  }
}

export default LeaderboardService;
