import { ModelStatic } from 'sequelize';
import MatchModel from '../../database/models/MatchModel';
import IServiceMatch from './interfaces/IServiceMatch';

class MatchService implements IServiceMatch {
  private matchModel: ModelStatic<MatchModel> = MatchModel;

  findAllMatches(): Promise<MatchModel[]> {
    const matches = this.matchModel.findAll();
    return matches;
  }
}

export default MatchService;
