import MatchModel from '../../../database/models/MatchModel';

export default interface IServiceMatch {
  findAllMatches(progress: boolean): Promise<MatchModel[]>;
}
