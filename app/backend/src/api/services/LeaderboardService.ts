import { QueryTypes } from 'sequelize';
import IServiceLeaderboard, { TeamInfo } from './interfaces/IServiceLeaderboard';
import sequelize from '../../database/models';
import { SELECT_AWAY_LEADERBOARD_QUERY, SELECT_HOME_LEADERBOARD_QUERY } from './utils/rawQueries';

class LeaderboardService implements IServiceLeaderboard {
  private sequelize = sequelize;

  public async getLeaderboard(path: '/home' | '/away'): Promise<TeamInfo[]> {
    let query: string;
    switch (path) {
      case '/home':
        query = SELECT_HOME_LEADERBOARD_QUERY;
        break;
      case '/away':
        query = SELECT_AWAY_LEADERBOARD_QUERY;
        break;
      default:
        throw new Error('this path doesn\'t exist');
    }
    const leaderboard = await this.sequelize.query(query, {
      type: QueryTypes.SELECT,
    }) as TeamInfo[];

    return leaderboard;
  }
}

export default LeaderboardService;
