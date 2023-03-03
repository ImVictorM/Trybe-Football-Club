export interface PatchMatch {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface Match {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: {
    id: number;
    teamName: string;
  };
  awayTeam: {
    id: number;
    teamName: string;
  };
}

export interface NewMatch extends PatchMatch {
  id?: number;
  homeTeamId: number;
  awayTeamId: number;
  inProgress?: boolean;
}

export default interface IServiceMatch {
  findAllMatches(progress: boolean): Promise<Match[]>;
  finishMatch(matchId: number): Promise<void>;
  updateInProgressMatchGoals(
    matchId: number,
    matchGoals: PatchMatch
  ): Promise<number>;
  registerNewMatch(newMatch: NewMatch): Promise<NewMatch>;
}
