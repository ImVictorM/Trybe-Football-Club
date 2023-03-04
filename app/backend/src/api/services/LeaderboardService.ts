import { QueryTypes } from 'sequelize';
import IServiceLeaderboard, { TeamInfo } from './interfaces/IServiceLeaderboard';
import sequelize from '../../database/models';
import { SELECT_AWAY_LEADERBOARD_QUERY, SELECT_HOME_LEADERBOARD_QUERY } from './utils/rawQueries';
import { InvalidPathException } from '../errors';

class LeaderboardService implements IServiceLeaderboard {
  private sequelize = sequelize;

  public async getLeaderboard(path: '/home' | '/away'): Promise<TeamInfo[]> {
    const query = LeaderboardService.getQueryByLeaderboardPath(path);
    const leaderboard = await this.sequelize.query(query, {
      type: QueryTypes.SELECT,
    }) as TeamInfo[];

    return leaderboard;
  }

  private static getQueryByLeaderboardPath(path: '/home' | '/away'): string {
    switch (path) {
      case '/home':
        return SELECT_HOME_LEADERBOARD_QUERY;
      case '/away':
        return SELECT_AWAY_LEADERBOARD_QUERY;
      default:
        throw new InvalidPathException();
    }
  }
}

export default LeaderboardService;
