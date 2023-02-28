import { Model, DataTypes } from 'sequelize';
import MatchModel from './MatchModel';
import db from '.';

class TeamModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  timestamps: false,
  modelName: 'teams',
  sequelize: db,
});

// create associations between team and matches
TeamModel.hasMany(MatchModel, {
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});

TeamModel.hasMany(MatchModel, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'home_team_id',
  as: 'homeTeamId',
});

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'away_team_id',
  as: 'awayTeamId',
});

export default TeamModel;
