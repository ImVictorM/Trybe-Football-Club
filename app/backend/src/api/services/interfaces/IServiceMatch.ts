import MatchModel from '../../../database/models/MatchModel';

export interface MatchFromReq {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default interface IServiceMatch {
  findAllMatches(progress: boolean): Promise<MatchModel[]>;
  finishMatch(matchId: number): Promise<void>;
  updateMatchGoals(matchId: number, matchGoals: MatchFromReq): Promise<number>;
}
