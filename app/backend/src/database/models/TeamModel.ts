import { Model, DataTypes } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.NUMBER,
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

export default TeamModel;
