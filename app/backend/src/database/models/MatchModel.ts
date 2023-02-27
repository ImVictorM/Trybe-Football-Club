import { Model, DataTypes } from 'sequelize';
import db from '.';

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
    type: DataTypes.NUMBER,
  },

  homeTeamId: {
    type: DataTypes.NUMBER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  homeTeamGoals: {
    type: DataTypes.NUMBER,
  },

  awayTeamId: {
    type: DataTypes.NUMBER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  awayTeamGoals: {
    type: DataTypes.NUMBER,
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

export default MatchModel;
