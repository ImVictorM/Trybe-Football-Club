import MatchModel from '../../../database/models/MatchModel';

export default interface IServiceMatch {
  findAllMatches(): Promise<MatchModel[]>;
}
