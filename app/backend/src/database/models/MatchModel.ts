import { Model, DataTypes } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class MatchModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchModel.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },

  homeTeamId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },

  awayTeamId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },

  inProgress: {
    type: DataTypes.BOOLEAN,
  },

}, {
  underscored: true,
  timestamps: false,
  modelName: 'matches',
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
});

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'away_team_id',
});

export default MatchModel;
