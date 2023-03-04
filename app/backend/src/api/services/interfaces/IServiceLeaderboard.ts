export interface TeamInfo {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance?: number;
  efficiency?: number;
}

export type LeaderboardPath = '/home' | '/away' | '/';

export default interface IServiceLeaderboard {
  getLeaderboard(path: LeaderboardPath): Promise<TeamInfo[]>;
}
