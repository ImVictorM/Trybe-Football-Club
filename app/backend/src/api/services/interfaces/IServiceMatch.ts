import MatchModel from '../../../database/models/MatchModel';

export interface PatchMatch {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface NewMatch extends PatchMatch {
  id?: number;
  homeTeamId: number;
  awayTeamId: number;
  inProgress?: boolean;
}

export default interface IServiceMatch {
  findAllMatches(progress: boolean): Promise<MatchModel[]>;
  finishMatch(matchId: number): Promise<void>;
  updateInProgressMatchGoals(matchId: number, matchGoals: PatchMatch): Promise<number>;
  registerNewMatch(newMatch: NewMatch): Promise<NewMatch>;
}
